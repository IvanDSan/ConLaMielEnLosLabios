import executeQuery from "../../config/db.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentControllers {
  processPayment = async (req, res) => {
    try {
      const { items, email, userId, type } = req.body;
      console.log("type: " + type);

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            metadata: {
              sponsorship_type_id: item.sponsorship_type_id,
              isSubscription: item.isSubscription || false,
              type: type,
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const cartItems = items;
      const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}success?type=${type}`,
        cancel_url: `${process.env.FRONTEND_URL}cancel`,
        metadata: {
          userId: userId,
          cartTotal: cartTotal,
          type: type,
        },
      });

      if (!session.url) {
        console.error("La sesión no contiene URL de pago:", session);
        return res.status(500).json({ error: "No se recibió la URL de pago" });
      }

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error al procesar pago:", error);
      res.status(500).json({ error: "Error al procesar el pago", details: error.message });
    }
  };

  verifySession = async (req, res) => {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        return res.status(400).json({
          success: false,
          message: "No se proporcionó ID de sesión",
        });
      }

      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Verificar que el pago fue exitoso
      if (session.payment_status !== "paid") {
        return res.status(400).json({
          success: false,
          message: "El pago no se completó",
        });
      }

      const { userId, items, type } = session.metadata;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Usuario no identificado",
        });
      }

      // 1. Registrar los items comprados
      const parsedItems = JSON.parse(items || "[]");
      for (const item of parsedItems) {
        await executeQuery(
          `INSERT INTO sponsorships 
          (user_id, sponsorship_type_id, amount, status, created_at)
          VALUES (?, ?, ?, 'active', NOW())`,
          [userId, item.sponsorship_type_id, item.price]
        );
      }

      // 2. Vaciar el carrito (con confirmación)
      const deleteResult = await executeQuery("DELETE FROM cart_items WHERE user_id = ?", [userId]);

      console.log(`Carrito vaciado para usuario ${userId}. Filas afectadas:`, deleteResult.affectedRows);

      // 3. Responder con éxito
      return res.json({
        success: true,
        type: type || "cart",
        message: "Compra procesada correctamente",
      });
    } catch (error) {
      console.error("Error al verificar sesión:", error);
      res.status(500).json({
        success: false,
        message: "Error al procesar la compra",
      });
    }
  };
}

export default new PaymentControllers();

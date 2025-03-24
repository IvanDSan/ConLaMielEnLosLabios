import executeQuery from "../../config/db.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentControllers {
  processPayment = async (req, res) => {
    try {
      const { items, email, userId} = req.body;
      
      const lineItems = items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.title },
          unit_amount: Math.round(item.price * 100), // Convertir a centavos
        },
        quantity: item.quantity,
      }));

      // Guardar la información del carrito para usarla después del pago exitoso
      const cartItems = items;
      const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}cancel`,
        metadata: {
          userId: userId,
          cartTotal: cartTotal
        }
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error al procesar pago:", error);
      res.status(500).json({ error: "Error al procesar el pago" });
    }
  };
}

export default new PaymentControllers();
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";

export function Success() {
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseType, setPurchaseType] = useState("cart");
  const { cart, purchaseCart } = useContext(CartContext);
  const [query] = useSearchParams();

  const type = query.get("type");

  useEffect(() => {
    const processOrder = async () => {
      try {
        setPurchaseType(type);
       
        if (type === "cart" && cart.length > 0) { // Solo ejecuta si hay productos
          await purchaseCart();
        }

      } catch (error) {
        console.error("Error al procesar la página de éxito:", error);
        toast.error("Error al mostrar la confirmación");
      } finally {
        setIsLoading(false);
      }
    };
   
    if (cart) {
      processOrder();
    }
  }, [cart, purchaseCart, type]);

  return (
    <div
      className="success-container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}>
      {isLoading ? (
        <div className="loading">
          <h2>Procesando tu pedido...</h2>
          <div className="spinner" style={{ margin: "1rem auto" }}>
            ⟳
          </div>
        </div>
      ) : (
        <>
          <div
            className="success-icon"
            style={{
              fontSize: "4rem",
              color: "#4CAF50",
              marginBottom: "1rem",
            }}>
            ✓
          </div>
          <h1 style={{ color: "#4CAF50" }}>
            {purchaseType === "subscription" ? "¡Suscripción realizada con éxito!" : "¡Pago realizado con éxito!"}
          </h1>
          <p style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
            {purchaseType === "subscription"
              ? "Gracias por suscribirte. Tu acceso ha sido activado."
              : "Gracias por tu compra. Hemos recibido tu pedido y estará en camino pronto."}
          </p>
          <p style={{ margin: "1rem 0" }}>
            Te hemos enviado un correo electrónico con los detalles de tu{" "}
            {purchaseType === "subscription" ? "suscripción" : "compra"}.
          </p>

          <div className="actions" style={{ marginTop: "2rem" }}>
            <Link
              to="/pedidos"
              style={{
                background: "#4CAF50",
                color: "white",
                padding: "10px 20px",
                borderRadius: "4px",
                textDecoration: "none",
                marginRight: "1rem",
                display: "inline-block",
              }}>
              Ver mis {purchaseType === "subscription" ? "suscripciones" : "pedidos"}
            </Link>
            <Link
              to="/"
              style={{
                background: "#f8f8f8",
                color: "#333",
                padding: "10px 20px",
                borderRadius: "4px",
                textDecoration: "none",
                border: "1px solid #ddd",
                display: "inline-block",
              }}>
              Volver a la tienda
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Success;

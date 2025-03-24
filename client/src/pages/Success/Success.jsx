import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from "../../context/CartContextProvider";

export function Success() {
  const [isLoading, setIsLoading] = useState(true);
  const [processed, setProcessed] = useState(false);
  const location = useLocation();
  const { cart, purchaseCart } = useContext(CartContext);
 
  useEffect(() => {
    const processOrder = async () => {
      console.log("URL search params:", location.search);
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get("session_id");
      console.log("Session ID:", sessionId);
      
      // Verificar si hay productos en el carrito
      if (cart && cart.length > 0) {
        try {
          await purchaseCart(); // Aseguramos que sea asíncrono
          setProcessed(true);
        } catch (error) {
          console.error("Error al procesar la compra:", error);
        }
      }
      // Mostrar la página después de un tiempo
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    };
    
    processOrder();
  }, [location, purchaseCart, cart]);
  
  return (
    <div className="success-container" style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '2rem', 
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      {isLoading ? (
        <div className="loading">
          <h2>Procesando tu pedido...</h2>
          <div className="spinner" style={{ margin: '1rem auto' }}>⟳</div>
        </div>
      ) : (
        <>
          <div className="success-icon" style={{ 
            fontSize: '4rem', 
            color: '#4CAF50',
            marginBottom: '1rem'
          }}>
            ✓
          </div>
          <h1 style={{ color: '#4CAF50' }}>¡Pago realizado con éxito!</h1>
          <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
            Gracias por tu compra. Hemos recibido tu pedido y estará en camino pronto.
          </p>
          <p style={{ margin: '1rem 0' }}>
            Te hemos enviado un correo electrónico con los detalles de tu compra.
          </p>
          
          <div className="actions" style={{ marginTop: '2rem' }}>
            <Link to="/pedidos" style={{
              background: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              marginRight: '1rem',
              display: 'inline-block'
            }}>
              Ver mis pedidos
            </Link>
            <Link to="/" style={{
              background: '#f8f8f8',
              color: '#333',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid #ddd',
              display: 'inline-block'
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
// src/pages/Cancel.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Cancel() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="cancel-container" style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '2rem', 
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      {isLoading ? (
        <div className="loading">
          <h2>Verificando estado...</h2>
          <div className="spinner" style={{ margin: '1rem auto' }}>⟳</div>
        </div>
      ) : (
        <>
          <div className="error-icon" style={{ 
            fontSize: '4rem', 
            color: '#f44336',
            marginBottom: '1rem'
          }}>
            ⚠
          </div>
          <h1 style={{ color: '#f44336' }}>Pago no completado</h1>
          <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
            Tu proceso de pago ha sido cancelado o ha ocurrido un error.
          </p>
          <p style={{ margin: '1rem 0' }}>
            No te preocupes, no se ha realizado ningún cargo a tu tarjeta.
            Los productos siguen en tu carrito si deseas intentarlo nuevamente.
          </p>
          
          <div className="actions" style={{ marginTop: '2rem' }}>
            <Link to="/carrito" style={{
              background: '#f44336',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              textDecoration: 'none',
              marginRight: '1rem',
              display: 'inline-block'
            }}>
              Volver al carrito
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

export default Cancel;
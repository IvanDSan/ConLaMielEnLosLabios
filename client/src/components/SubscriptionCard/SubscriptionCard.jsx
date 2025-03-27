import { useNavigate } from 'react-router-dom';
import { SparklesIcon } from "lucide-react";
import './styles.css';
import { useState } from 'react';

export const SubscriptionCard = ({ subscription, mostSelected, userEmail, userId }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
  
      const items = [{
        title: subscription.title,
        price: subscription.price,
        quantity: 1,
        sponsorship_type_id: subscription.sponsorship_type_id,
        isSubscription: true
      }];
  
      const response = await fetch('http://localhost:4000/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          items,
          email: userEmail || "cliente@email.com",
          userId: localStorage.getItem("userId"),
          type: 'subscription'
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al procesar el pago');
      }
  
      const { url } = await response.json();
  
      window.location.href = url;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(error.message || 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="subscription-card-container">
      {mostSelected && (
        <span className="most-selected">
          <SparklesIcon size={20} />
          Más elegido
        </span>
      )}
      <div className="subscription-card">
        <h3>{subscription.title}</h3>
        <p className="price">
          <span>€ </span>
          {subscription.price}
          <span>/mes</span>
        </p>
        <p>{subscription.description}</p>
        <button
          onClick={handleSubscription}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Quiero apadrinar'}
        </button>
      </div>
    </article>
  );
};
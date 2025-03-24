import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './styles.css';

export const SubscriptionCard = ({ subscription, mostSelected }) => {
  const navigate = useNavigate();

  return (
    <article className="subscription-card-container">
      {mostSelected && (
        <span className="most-selected">
          <Sparkles size={20} />
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
          onClick={() =>
            navigate(`/apadrina/${subscription.sponsorship_type_id}`)
          }
        >
          Quiero apadrinar
        </button>
      </div>
    </article>
  );
};

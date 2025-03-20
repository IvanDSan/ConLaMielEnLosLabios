import { useNavigate } from 'react-router-dom';
import './styles.css';

export const SubscriptionCard = ({
  title,
  description,
  price,
  mostSelected,
}) => {
  const navigate = useNavigate();

  return (
    <article className="subscription-card-container">
      {mostSelected && (
        <span className="most-selected">
          <img src="/icons/star-shine.svg" />
          Más elegido
        </span>
      )}
      <div className="subscription-card">
        <h3>{title}</h3>
        <p className="price">
          <span>€ </span>
          {price}
          <span>/mes</span>
        </p>
        <p>{description}</p>
        <button onClick={() => navigate('/apadrina')}>Quiero apadrinar</button>
      </div>
    </article>
  );
};

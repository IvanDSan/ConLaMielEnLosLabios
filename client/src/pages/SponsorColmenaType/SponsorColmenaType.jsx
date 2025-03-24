import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './styles.css';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';

export const SponsorColmenaType = () => {
  const [subscription, setSubscription] = useState(null);
  const { id } = useParams();
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetchData(`/sponsorships/types/${id}`, 'GET');

        if (response.data.length === 0) {
          navigate('/', { replace: true });
          return;
        }

        const benefits = await fetchData(`/sponsorships/benefits/${id}`, 'GET');

        const suscription = response.data[0];
        suscription.benefits = benefits.data;

        setSubscription(suscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error('Error al obtener el plan de apadrinamiento.');
      }
    };

    fetchSubscription();
  }, [id, navigate]);

  const handlePayment = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para apadrinar.');
      return;
    }

    // STRIPE CHECKOUT
    try {
      const response = await fetchData(
        `/sponsorships/create`,
        'POST',
        { sponsorship_type_id: id },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(response);

      if (response.status === 201) {
        navigate(`/apadrina/confirmation?beehive=${response.data.data.beehive_id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al realizar el pago.');
    }
  };

  if (!subscription) return null; // Evita renderizado antes de redirigir

  return (
    <div className="sponsor-container">
      <div className="plan-info">
        <h2>{subscription.title}</h2>
        <p>{subscription.description}</p>
        <ul>
          {subscription.benefits?.map((benefit, index) => (
            <li key={index}>✅ {benefit.benefit_text}</li>
          ))}
        </ul>
      </div>

      <div className="separator"></div>

      <div className="payment-section">
        <p>
          Se te asignará una colmena de las disponibles para apadrinar. Disfruta
          de los beneficios de tu elección y apoya la conservación de las
          abejas.
        </p>
        <div className="payment-footer">
          <span className="price">${subscription.price}</span>
          <button className="sponsor-button" onClick={handlePayment}>
            Apadrinar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

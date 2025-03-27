import { useState, useEffect } from "react";
import { SubscriptionCard } from "./SubscriptionCard";
import "./styles.css";

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos del usuario (esto debería venir de autenticación)
  const userEmail = "usuario@ejemplo.com"; // Reemplazar con datos reales
  const userId = "123"; // Reemplazar con datos reales

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener suscripciones
        const subsResponse = await fetch("/api/subscriptions");
        if (!subsResponse.ok) throw new Error("Error al obtener suscripciones");
        const subsData = await subsResponse.json();
        setSubscriptions(subsData);

        // Obtener colmenas
        const hivesResponse = await fetch("/beehives");
        if (!hivesResponse.ok) throw new Error("Error al obtener colmenas");
        const hivesData = await hivesResponse.json();
        setBeehives(hivesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando opciones de apadrinamiento...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Elige tu opción de apadrinamiento</h2>
      <div className="subscriptions-container">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            userEmail={userEmail}
            userId={userId}
            beehives={beehives} // Pasamos la lista de colmenas
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;

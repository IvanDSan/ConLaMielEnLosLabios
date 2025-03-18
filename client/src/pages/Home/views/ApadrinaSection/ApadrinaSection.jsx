import { SubscriptionCard } from '../../../../components/SubscriptionCard/SubscriptionCard';
import { subscriptions } from '../../../../constants/subscriptions';
import './styles.css';

export const ApadrinaSection = () => {
  return (
    <section className="apadrina-section">
      <div className="container">
        <h2>Apadrina una colmena</h2>
        <p className="subtitle">
          Elige entre nuestros planes de apadrinamiento y contribuye a la
          conservación de las abejas
        </p>
        <div className="flex">
          {subscriptions.map((sub, index) => (
            <SubscriptionCard key={index} {...sub} mostSelected={index === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

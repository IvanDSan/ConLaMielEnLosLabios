import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const SubscriptionCard = ({ subscription, mostSelected }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <article className="subscription-card-container">
      {mostSelected && (
        <span className="most-selected">
          <Sparkles size={20} />
          {t("most_selected")}
        </span>
      )}
      <div className="subscription-card">
        <h3>{subscription.title}</h3>
        <p className="price">
          <span>€ </span>
          {subscription.price}
          <span>{t("per_month")}</span>
        </p>
        <p>{subscription.description}</p>
        <button
          onClick={() =>
            navigate(`/apadrina/${subscription.sponsorship_type_id}`)
          }
        >
          {t("sponsor_now")}
        </button>
      </div>
    </article>
  );
};

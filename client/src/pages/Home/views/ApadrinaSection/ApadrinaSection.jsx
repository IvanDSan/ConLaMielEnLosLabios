import { useEffect, useState } from "react";
import { SubscriptionCard } from "../../../../components/SubscriptionCard/SubscriptionCard";
import { fetchData } from "../../../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const ApadrinaSection = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetchData("/sponsorships/types", "GET");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error(t("error_fetching_sponsorships"));
      }
    };

    fetchSubscriptions();
  }, [t]);

  return (
    <section className="apadrina-section">
      <div className="container">
        <h2>{t("sponsor_beehive")}</h2>
        <p className="subtitle">{t("sponsorship_subtitle")}</p>
        <div className="flex">
          {subscriptions &&
            subscriptions.map((sub, index) => (
              <SubscriptionCard
                key={index}
                subscription={sub}
                mostSelected={index === 1}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

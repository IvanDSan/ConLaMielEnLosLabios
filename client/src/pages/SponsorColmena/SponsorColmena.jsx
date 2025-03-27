import React, { useEffect, useState } from "react";
import "./styles.css";
import { SubscriptionCard } from "../../components/SubscriptionCard/SubscriptionCard";
import { fetchData } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    comment: "¡Gran iniciativa para salvar abejas!",
    name: "María G.",
    rating: "★★★★★",
  },
  {
    comment: "La miel es deliciosa y apoyo una buena causa.",
    name: "Juan P.",
    rating: "★★★★★",
  },
  {
    comment: "Excelente servicio y compromiso.",
    name: "Ana R.",
    rating: "★★★★★",
  },
];

export const SponsorColmena = () => {
  const { t } = useTranslation();

  const [subscriptions, setSubscriptions] = useState([]);
  const [beehivesImages, setBeehivesImages] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetchData("/sponsorships/types", "GET");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error(t("sponsorships_error"));
      }
    };

    const fetchBeehivesImages = async () => {
      try {
        const response = await fetchData("/beehives/images", "GET");
        setBeehivesImages(response.data);
      } catch (error) {
        console.error("Error fetching beehives images:", error);
        toast.error(t("beehives_images_error"));
      }
    };

    fetchSubscriptions();
    fetchBeehivesImages();
  }, [t]);

  return (
    <div className="subscriptions-container">
      <div className="header">
        <h1>{t("make_difference")}</h1>
        <h4>{t("sponsor_and_save")}</h4>
        <p>{t("sponsor_description")}</p>
      </div>

      <div className="subscription-tiers">
        {subscriptions.length > 0 &&
          subscriptions.map((sub, index) => (
            <SubscriptionCard
              key={index}
              subscription={sub}
              mostSelected={index === 1}
            />
          ))}
      </div>

      <div className="gallery">
        <h2>{t("our_beehives")}</h2>
        <div className="gallery-grid">
          {beehivesImages.slice(0, 4).map((img, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${
                  img.image_url
                }`}
                alt={`Beehive ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials">
        <h2>{t("client_opinions_title")}</h2>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="comment">"{testimonial.comment}"</div>
              <div className="name">{testimonial.name}</div>
              <div className="rating">{testimonial.rating}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

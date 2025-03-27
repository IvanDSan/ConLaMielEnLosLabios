import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchData } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const SponsorColmenaConfirmation = () => {
  const [queryParams] = useSearchParams();
  const [beehive, setBeehive] = useState(null);
  const [beehiveImages, setBeehiveImages] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const getBeehiveData = async () => {
      const beehiveId = queryParams.get("beehive");

      try {
        const beehive = await fetchData("/beehives/get/" + beehiveId, "GET");
        const beehiveImages = await fetchData(
          "/beehives/images/" + beehiveId,
          "GET"
        );

        setBeehive(beehive.data);
        setBeehiveImages(beehiveImages.data);
      } catch (error) {
        console.error("Error fetching beehive data:", error);
        toast.error(t("error_fetching_beehive"));
      }
    };

    getBeehiveData();
  }, [queryParams, t]);

  const handleMoreInfo = () => {
    navigate(`/colmenas/${beehive.beehive_id}`);
  };

  if (!beehive) return <div>{t("loading")}</div>;

  return (
    <section className="sponsor-confirmation container">
      <h2 className="title">{t("sponsor_confirmation_title")}</h2>
      <p className="subtitle">{t("sponsor_confirmation_subtitle")}</p>
      <div className="sponsor-confirmation-container">
        <div className="sponsor-info">
          <h3>{beehive.name}</h3>
          <p>{beehive.short_description}</p>
          <div className="description">
            <h4>{t("description")}:</h4>
            <p>{beehive.large_description}</p>
          </div>
          <div className="sponsor-button-container">
            <button className="sponsor-button" onClick={handleMoreInfo}>
              {t("learn_more")}
            </button>
          </div>
        </div>
        <div className="sponsor-image">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${
              beehiveImages[0]?.image_url
            }`}
            alt={beehive.name}
          />
        </div>
      </div>
    </section>
  );
};

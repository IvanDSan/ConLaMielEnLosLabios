import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers/axiosHelper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const BeehiveIndividual = () => {
  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchBeehiveDetails = useCallback(async () => {
    try {
      setLoading(true);
      const resBeehive = await fetchData(`/beehives/get/${id}`, "GET");
      const resImages = await fetchData(`/beehives/images/${id}`, "GET");

      setBeehive({
        ...resBeehive.data,
        images: resImages.data || [],
      });
    } catch (error) {
      console.error("Error al cargar la colmena:", error);
      toast.error(t("beehive_error_loading"));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchBeehiveDetails();
  }, [fetchBeehiveDetails]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
  };

  const handleGoBack = () => {
    navigate("/colmenas");
  };

  if (loading) return <p>{t("beehive_loading")}</p>;
  if (!beehive) return <p>{t("beehive_not_found")}</p>;

  return (
    <div className="beehive-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        {t("back_to_beehives")}
      </button>

      <div className="beehive-detail-header">
        <h2>{beehive.name}</h2>
      </div>

      <div className="beehive-detail-content">
        <div className="beehive-detail-image">
          {beehive.images.length > 0 ? (
            <Slider {...sliderSettings}>
              {beehive.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${
                      image.image_url
                    }`}
                    alt={`${beehive.name} - imagen ${index + 1}`}
                    className="detail-carousel-image"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="no-image">
              <p>{t("no_image")}</p>
            </div>
          )}
        </div>

        <div className="beehive-detail-info">
          <div className="info-section">
            <h3>{t("bee_description")}</h3>
            <p>{beehive.short_description}</p>
          </div>

          <div className="info-section">
            <h3>{t("additional_info")}</h3>
            <p>{beehive.large_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

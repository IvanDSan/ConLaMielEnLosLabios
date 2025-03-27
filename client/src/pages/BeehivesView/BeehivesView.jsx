import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../../helpers/axiosHelper";
import { BeehiveCard } from "../../components/BeehiveCard/BeehiveCard";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { SpinnerLoading } from "../../components/SpinnerLoading/SpinnerLoading";

export const BeehivesView = () => {
  const { t } = useTranslation();
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBeehives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchData("/beehives/get", "GET");

      const updatedBeehives = await Promise.all(
        res.data.map(async (beehive) => {
          const resImages = await fetchData(
            `/beehives/images/${beehive.beehive_id}`,
            "GET"
          );
          return {
            ...beehive,
            images: resImages.data || [],
          };
        })
      );

      setBeehives(updatedBeehives);
    } catch (error) {
      console.error("Error al cargar las colmenas:", error);
      toast.error(t("error_loading_beehives"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchBeehives();
  }, [fetchBeehives]);

  if (loading) return <SpinnerLoading />;

  return (
    <div>
      <div className="beehives-container">
        <h2>{t("our_beehives")}</h2>

        {beehives.map((beehive) => (
          <BeehiveCard key={beehive.beehive_id} beehive={beehive} />
        ))}
      </div>

      <div className="important-message-container">
        <div className="bee-container">
          <div className="bee">
            <div className="wings"></div>
            <div className="stinger"></div>
          </div>
        </div>

        <p className="important-message">{t("bees_importance")}</p>
      </div>
    </div>
  );
};

export default BeehivesView;

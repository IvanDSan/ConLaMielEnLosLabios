import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchData } from "../../../../helpers/axiosHelper";
import { BeehiveCard } from "../../../../components/BeehiveCard/BeehiveCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const ColmenasSection = () => {
  const { t } = useTranslation();
  const [beehives, setBeehives] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeehives = async () => {
      try {
        const res = await fetchData("/beehives/get", "GET");

        const beehives = await Promise.all(
          res.data.map(async (beehive) => {
            const resImages = await fetchData(
              `/beehives/images/${beehive.beehive_id}`,
              "GET"
            );
            return {
              beehive_id: beehive.beehive_id,
              name: beehive.name,
              short_description: beehive.short_description,
              large_description: beehive.large_description,
              images: resImages.data || [],
            };
          })
        );

        setBeehives(beehives.slice(0, 4));
      } catch (error) {
        console.log(error);
        toast.error(t("error_loading_beehives"));
      }
    };

    fetchBeehives();
  }, [t]);

  return (
    <section className="colmenas-section">
      <h2>{t("some_beehives")}</h2>
      <p>{t("sponsor_message")}</p>
      <div className="container">
        <div className="flex">
          {beehives &&
            beehives.map((hive, index) => (
              <BeehiveCard key={index} beehive={hive} />
            ))}
          <button onClick={() => navigate("/colmenas")}>{t("view_all")}</button>
        </div>
      </div>
    </section>
  );
};

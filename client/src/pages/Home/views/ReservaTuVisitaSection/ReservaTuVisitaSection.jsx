import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const ReservaTuVisitaSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="reserva-tu-visita-section">
      <div className="container">
        <div className="flex">
          <h2>{t("experience_title")}</h2>
          <p>{t("experience_description")}</p>
          <button onClick={() => navigate("/talleres")}>
            {t("book_visit")}
          </button>
        </div>
      </div>
    </section>
  );
};

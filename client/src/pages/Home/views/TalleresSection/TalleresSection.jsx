import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const TalleresSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="talleres-section">
      <h2>{t("workshop_title")}</h2>
      <div className="container">
        <div className="flex">
          <div className="left">
            <p>{t("workshop_intro")}</p>
            <p>{t("workshop_students_learn")}</p>
            <ul>
              <li>{t("workshop_point_pollination")}</li>
              <li>{t("workshop_point_challenges")}</li>
              <li>{t("workshop_point_honey_process")}</li>
              <li>{t("workshop_point_sustainability")}</li>
            </ul>
            <p>{t("workshop_extra_info")}</p>
          </div>
          <div className="right">
            <h4>{t("additional_info")}</h4>
            <ul>
              <li>
                <strong>{t("duration")}:</strong> {t("duration_info")}
              </li>
              <li>
                <strong>{t("materials")}:</strong> {t("materials_info")}
              </li>
              <li>
                <strong>{t("flexibility")}:</strong> {t("flexibility_info")}
              </li>
            </ul>
            <div>
              <button onClick={() => navigate("/talleres")}>
                {t("request_more_info")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

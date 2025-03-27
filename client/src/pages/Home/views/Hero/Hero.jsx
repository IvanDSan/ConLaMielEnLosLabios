import "./styles.css";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="container">
        <div className="flex">
          <div className="left">
            <h1>{t("hero_title")}</h1>
            <h4>{t("hero_subtitle")}</h4>
          </div>
          {/* <div className="right">
            <img src="/images/logo.svg" alt="hero" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

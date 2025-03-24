import React from "react";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const Talleres = () => {
  const { t } = useTranslation();

  return (
    <section className="talleresContainer">
      <div className="talleresHero">
        <img
          src="/images/talleres-hero.png"
          alt={t("workshops.hero_alt")}
          className="talleresHeroImage"
        />
      </div>

      <div className="talleresContent">
        <h1 className="talleresTitle">{t("workshops.title")}</h1>
        <p className="talleresSubtitle">{t("workshops.subtitle")}</p>
        <p className="talleresDescription">
          {t("workshops.description_part1")}{" "}
          <strong>Con la Miel en los Labios</strong>,{" "}
          {t("workshops.description_part2")}
        </p>

        <div className="talleresInfo">
          <div className="talleresOfrecemos">
            <h3>{t("workshops.offers_title")}</h3>
            <ul>
              <li>{t("workshops.offer1")}</li>
              <li>{t("workshops.offer2")}</li>
              <li>{t("workshops.offer3")}</li>
            </ul>
          </div>

          <div className="talleresBeneficios">
            <h3>{t("workshops.benefits_title")}</h3>
            <ul>
              <li>{t("workshops.benefit1")}</li>
              <li>{t("workshops.benefit2")}</li>
              <li>{t("workshops.benefit3")}</li>
            </ul>
          </div>
        </div>

        <p className="talleresContacto">{t("workshops.contact_prompt")}</p>
      </div>
      <ContactForm />
    </section>
  );
};

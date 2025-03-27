import { ContactForm } from "../../../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const ContactoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="contacto-section">
      <div className="container">
        <h2>{t("contact_title")}</h2>
        <h4>{t("contact_subtitle")}</h4>
        <p>{t("contact_description")}</p>
        <ContactForm />
      </div>
    </section>
  );
};

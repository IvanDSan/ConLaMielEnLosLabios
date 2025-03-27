import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./styles.css";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const ContactForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    entidad: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.mensaje
    ) {
      toast.error(t("contact_error_required"));
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/users/contact`, formData);

      if (response.status === 200) {
        toast.success(t("contact_success"));
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          entidad: "",
          mensaje: "",
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error(t("contact_submit_error"));
    }
  };

  return (
    <div className="contactFormContainer">
      <form className="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="nombre">{t("name")}:</label>
        <input
          type="text"
          id="nombre"
          placeholder={t("placeholder_name")}
          value={formData.nombre}
          onChange={handleChange}
        />

        <label htmlFor="apellido">{t("last_name")}:</label>
        <input
          type="text"
          id="apellido"
          placeholder={t("placeholder_lastname")}
          value={formData.apellido}
          onChange={handleChange}
        />

        <label htmlFor="email">{t("email")}:</label>
        <input
          type="email"
          id="email"
          placeholder={t("placeholder_email")}
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="entidad">{t("phone")}:</label>
        <input
          type="text"
          id="entidad"
          placeholder={t("placeholder_phone")}
          value={formData.entidad}
          onChange={handleChange}
        />

        <label htmlFor="mensaje">{t("message")}:</label>
        <textarea
          id="mensaje"
          placeholder={t("placeholder_message")}
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="contactSubmit">
          {t("send")}
        </button>
      </form>
    </div>
  );
};

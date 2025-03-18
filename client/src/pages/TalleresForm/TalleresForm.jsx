import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const Talleres = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    entidad: "",
    mensaje: "",
  });

  const [status, setStatus] = useState({ success: false, message: "" });

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
      setStatus({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/users/contact`, formData);

      if (response.status === 200) {
        setStatus({
          success: true,
          message: "Formulario enviado correctamente.",
        });

        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          entidad: "",
          mensaje: "",
        });
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Error al enviar el formulario. Inténtalo de nuevo.",
        error,
      });
    }
  };

  return (
    <div className="talleresContainer">
      <div className="talleresHero">
        <img
          src="/images/talleres-hero.jpg"
          alt="Apicultor enseñando"
          className="talleresHeroImage"
        />
      </div>

      <div className="talleresContent">
        <h1 className="talleresTitle">Talleres y visitas guiadas</h1>
        <p className="talleresSubtitle">
          Inspira a los niños a ser guardianes de la naturaleza
        </p>
        <p className="talleresDescription">
          En <strong>Pastor D’Abeilles</strong>, ofrecemos talleres interactivos
          para escuelas y grupos educativos. Nuestro objetivo es enseñar a los
          niños la importancia de las abejas y cómo proteger nuestro medio
          ambiente.
        </p>

        <div className="talleresInfo">
          <div className="talleresOfrecemos">
            <h3>¿Qué ofrecemos?</h3>
            <ul>
              <li>Talleres interactivos y prácticos</li>
              <li>Aprendizaje sobre abejas, polinización y biodiversidad</li>
              <li>
                Materiales educativos y actividades en el aula o en la
                naturaleza
              </li>
            </ul>
          </div>

          <div className="talleresBeneficios">
            <h3>Beneficios</h3>
            <ul>
              <li>Conciencia ambiental</li>
              <li>Curiosidad científica</li>
              <li>Responsabilidad hacia la naturaleza</li>
            </ul>
          </div>
        </div>

        <p className="talleresContacto">
          ¿Quieres más información? ¡Contáctanos y planificamos un taller para
          tu escuela!
        </p>
      </div>

      <div className="contactFormContainer">
        <form className="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Introduce tu nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            placeholder="Introduce tus apellidos"
            value={formData.apellido}
            onChange={handleChange}
          />

          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="entidad">Número de teléfono:</label>
          <input
            type="text"
            id="entidad"
            placeholder="Nombre de la entidad"
            value={formData.entidad}
            onChange={handleChange}
          />

          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            placeholder="¿Qué nos quieres decir?"
            value={formData.mensaje}
            onChange={handleChange}
          ></textarea>

          <div className="statusMessageContainer">
            {status.message && (
              <p
                className={`statusMessage ${
                  status.success ? "success" : "error"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>

          <button type="submit" className="contactSubmit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

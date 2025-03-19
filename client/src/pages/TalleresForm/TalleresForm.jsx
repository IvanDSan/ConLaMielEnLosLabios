import React from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import './styles.css';

export const Talleres = () => {
  return (
    <section className="talleresContainer">
      <div className="talleresHero">
        <img
          src="/images/talleres-hero.png"
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
      <ContactForm />
    </section>
  );
};

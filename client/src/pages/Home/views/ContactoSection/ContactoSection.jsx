import { ContactForm } from '../../../../components/ContactForm/ContactForm';
import './styles.css';

export const ContactoSection = () => {
  return (
    <section className="contacto-section">
      <div className="container">
        <h2>Contáctanos</h2>
        <h4>¡Estamos aquí para ayudarte!</h4>
        <p>
          ¿Tienes alguna pregunta, sugerencia o simplemente quieres saber más
          sobre nuestros talleres y servicios? No dudes en ponerte en contacto
          con nosotros. Estamos encantados de escucharte y ayudarte en todo lo
          que necesites.
        </p>
        <ContactForm />
      </div>
    </section>
  );
};

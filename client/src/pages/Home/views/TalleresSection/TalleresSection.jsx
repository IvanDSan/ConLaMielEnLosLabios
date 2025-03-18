import { useNavigate } from 'react-router-dom';
import './styles.css';

export const TalleresSection = () => {
  const navigate = useNavigate();

  return (
    <section className="talleres-section">
      <h2>Talleres educativos</h2>
      <div className="container">
        <div className="flex">
          <div className="left">
            <p>
              En nuestro compromiso por fomentar la conciencia ambiental y el
              conocimiento sobre la importancia de las abejas en nuestro
              ecosistema, ofrecemos charlas educativas diseñadas especialmente
              para colegios y centros de estudios. Nuestras charlas están
              impartidas por expertos en apicultura y están adaptadas a
              diferentes niveles educativos, desde primaria hasta secundaria.
            </p>
            <p>Durante estas sesiones, los estudiantes aprenderán sobre:</p>
            <ul>
              <li>
                El papel crucial de las abejas en la polinización y la
                biodiversidad.
              </li>
              <li>
                Los desafíos que enfrentan las abejas y cómo podemos ayudar a
                protegerlas.
              </li>
              <li>
                El proceso de producción de la miel y otros productos de la
                colmena.
              </li>
              <li>La importancia de la apicultura sostenible.</li>
            </ul>
            <p>
              Además, las charlas pueden incluir demostraciones prácticas y
              material didáctico para una experiencia más interactiva y
              enriquecedora.
            </p>
          </div>
          <div className="right">
            <h4>Información adicional</h4>
            <ul>
              <li>
                <strong>Duración: </strong>Las charlas tienen una duración
                aproximada de 1 a 2 horas, dependiendo del nivel educativo y las
                necesidades del centro.
              </li>
              <li>
                <strong>Materiales: </strong>
                Proporcionamos todo el material necesario, incluyendo
                presentaciones, folletos informativos y, en algunos casos,
                muestras de productos apícolas.
              </li>
              <li>
                <strong>Flexibilidad: </strong>Nos adaptamos a los horarios y
                necesidades específicas de cada centro educativo.
              </li>
            </ul>
            <div>
              <button onClick={() => navigate('/talleres')}>
                Solicitar más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

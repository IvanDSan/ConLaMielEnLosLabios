import { useNavigate } from 'react-router-dom';
import './styles.css';

export const ReservaTuVisitaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="reserva-tu-visita-section">
      <div className="container">
        <div className="flex">
          <h2>Vive la experiencia de ser apicultor</h2>
          <p>
            Descubre el mundo de las abejas y participa en nuestras actividades
            educativas
          </p>
          <button onClick={() => navigate('/talleres')}>Reserva tu visita</button>
        </div>
      </div>
    </section>
  );
};

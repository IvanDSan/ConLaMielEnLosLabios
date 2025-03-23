import { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import { BeehiveCard } from '../../components/BeehiveCard/BeehiveCard';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';

export const BeehivesView = () => {
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBeehives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchData('/beehives/get', 'GET');

      const updatedBeehives = await Promise.all(
        res.data.map(async (beehive) => {
          const resImages = await fetchData(
            `/beehives/images/${beehive.beehive_id}`,
            'GET'
          );
          return {
            ...beehive,
            images: resImages.data || [],
          };
        })
      );

      setBeehives(updatedBeehives);
    } catch (error) {
      console.error('Error al cargar las colmenas:', error);
      toast.error('Error al cargar las colmenas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBeehives();
  }, [fetchBeehives]);

  if (loading) return <SpinnerLoading />;
  
  return (
    <div>
      <div className="beehives-container">
        <h2>Nuestras Colmenas</h2>

        {beehives.map((beehive) => (
          <BeehiveCard key={beehive.beehive_id} beehive={beehive} />
        ))}
      </div>

      <div className="important-message-container">
        <div className="bee-container">
          <div className="bee">
            <div className="wings"></div>
            <div className="stinger"></div>
          </div>
        </div>

        <p className="important-message">
          Las abejas son{' '}
          <span className="highlight">esenciales para la vida</span> en el
          planeta. Son las principales responsables de la polinización, un
          proceso que permite la reproducción de muchas plantas y cultivos que
          forman parte de nuestra alimentación. Sin ellas, la biodiversidad y la
          producción de alimentos estarían en peligro. Sin embargo, el uso de
          pesticidas, la deforestación y el cambio climático amenazan su
          existencia. Proteger a las abejas es proteger el equilibrio del
          ecosistema y nuestra propia supervivencia. 🌿🐝
        </p>
      </div>
    </div>
  );
};

export default BeehivesView;

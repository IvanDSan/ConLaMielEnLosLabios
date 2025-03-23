import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelper';
import { toast } from 'react-toastify';
import './styles.css';

export const SponsorColmenaConfirmation = () => {
  const [queryParams] = useSearchParams();
  const [beehive, setBeehive] = useState(null);
  const [beehiveImages, setBeehiveImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getBeehiveData = async () => {
      const beehiveId = queryParams.get('beehive');

      try {
        const beehive = await fetchData('/beehives/get/' + beehiveId, 'GET');
        const beehiveImages = await fetchData(
          '/beehives/images/' + beehiveId,
          'GET'
        );

        setBeehive(beehive.data);
        setBeehiveImages(beehiveImages.data);
      } catch (error) {
        console.error('Error fetching beehive data:', error);
        toast.error('Error al obtener los datos de la colmena.');
      }
    };

    getBeehiveData();
  }, [queryParams]);

  console.log(beehive, beehiveImages);

  const handleMoreInfo = () => {
    navigate(`/colmenas/${beehive.beehive_id}`);
  };

  if (!beehive) return <div>Loading...</div>;

  return (
    <section className="sponsor-confirmation container">
      <h2 className="title">Confirmación de patrocinio</h2>
      <p className="subtitle">¡Gracias por patrocinar nuestra colmena!</p>
      <div className="sponsor-confirmation-container">
        <div className="sponsor-info">
          <h3>{beehive.name}</h3>
          <p>{beehive.short_description}</p>
          <div className="description">
            <h4>Descripción:</h4>
            <p>{beehive.large_description}</p>
          </div>
          <div className="sponsor-button-container">
            <button className="sponsor-button" onClick={handleMoreInfo}>
              Saber más
            </button>
          </div>
        </div>
        <div className="sponsor-image">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${
              beehiveImages[0]?.image_url
            }`}
            alt={beehive.name}
          />
        </div>
      </div>
    </section>
  );
};

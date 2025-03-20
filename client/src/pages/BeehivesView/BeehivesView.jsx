import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers/axiosHelper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const BeehivesView = () => {
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeehives();
  }, []);

  const fetchBeehives = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/beehives/get", "GET");

      const updatedBeehives = await Promise.all(
        res.data.map(async (beehive) => {
          const resImages = await fetchData(`/beehives/images/${beehive.beehive_id}`, "GET");
          return {
            ...beehive,
            images: resImages.data || [],
          };
        })
      );

      setBeehives(updatedBeehives);
    } catch (error) {
      console.error("Error al cargar las colmenas:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: false,
  };

  const handleViewBeehiveDetail = (beehiveId) => {
    navigate(`/beehives/${beehiveId}`);
  };

  if (loading) return <p>Cargando colmenas...</p>;
  if (!beehives || beehives.length === 0) return <p>No hay colmenas disponibles</p>;

  return (
    <div>
      <div className="beehives-container">
        <h2>Nuestras Colmenas</h2>

        {beehives.map((beehive) => (
          <div key={beehive.beehive_id} className="beehive-card">
            <div className="beehive-image">
              {beehive.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {beehive.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${image.image_url}`}
                        alt={`${beehive.name} - imagen ${index + 1}`}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="no-image">
                  <p>No hay imagen disponible</p>
                </div>
              )}
            </div>

            <div className="beehive-info">
              <h3>{beehive.name}</h3>
              <p>{beehive.short_description}</p>

              <button className="beehive-button" onClick={() => handleViewBeehiveDetail(beehive.beehive_id)}>
                Ver más
              </button>

              <div className="honeycomb-icon">
                <img src="public/icons/colmenaCards.png" alt="Colmena Icon" />
              </div>
            </div>
          </div>
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
          Las abejas son <span className="highlight">esenciales para la vida</span> en el planeta. Son las principales
          responsables de la polinización, un proceso que permite la reproducción de muchas plantas y cultivos que
          forman parte de nuestra alimentación. Sin ellas, la biodiversidad y la producción de alimentos estarían en
          peligro. Sin embargo, el uso de pesticidas, la deforestación y el cambio climático amenazan su existencia.
          Proteger a las abejas es proteger el equilibrio del ecosistema y nuestra propia supervivencia. 🌿🐝
        </p>
      </div>
    </div>
  );
};

export default BeehivesView;

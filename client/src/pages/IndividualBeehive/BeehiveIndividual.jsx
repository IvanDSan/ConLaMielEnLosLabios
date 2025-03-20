import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers/axiosHelper";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const BeehiveDetailView = () => {
  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Obtiene el ID de la colmena desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeehiveDetails();
  }, [id]);

  const fetchBeehiveDetails = async () => {
    try {
      setLoading(true);
      // Obtener datos de la colmena específica
      const resBeehive = await fetchData(`/beehives/get/${id}`, "GET");

      // Obtener imágenes de la colmena
      const resImages = await fetchData(`/beehives/images/${id}`, "GET");

      setBeehive({
        ...resBeehive.data,
        images: resImages.data || [],
      });
    } catch (error) {
      console.error("Error al cargar la colmena:", error);
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
    adaptiveHeight: true,
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Cargando detalles de la colmena...</p>;
  if (!beehive) return <p>No se encontró la colmena</p>;

  return (
    <div className="beehive-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        Volver a todas las colmenas
      </button>

      <div className="beehive-detail-header">
        <h2>{beehive.name}</h2>
      </div>

      <div className="beehive-detail-content">
        <div className="beehive-detail-image">
          {beehive.images.length > 0 ? (
            <Slider {...sliderSettings}>
              {beehive.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${image.image_url}`}
                    alt={`${beehive.name} - imagen ${index + 1}`}
                    className="detail-carousel-image"
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

        <div className="beehive-detail-info">
          <div className="info-section">
            <h3>Descripción</h3>
            <p>{beehive.short_description}</p>
          </div>

          <div className="info-section">
            <h3>Información Adicional</h3>
            <p>{beehive.large_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeehiveDetailView;

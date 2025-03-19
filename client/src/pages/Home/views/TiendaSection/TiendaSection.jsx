import { useNavigate } from 'react-router-dom';
import { ProductsGallery } from '../../../../components/ProductsGallery/ProductsGallery';
import './styles.css';

export const TiendaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="tienda-section">
      <div className="info">
        <h2>Nuestros productos</h2>
        <p>
          Explora nuestra selección de productos relacionados con la apicultura
        </p>
      </div>
      <div className="container">
        <div className="flex">
          <ProductsGallery />
          <button onClick={() => navigate('/tienda')}>
            Ver toda la tienda
          </button>
        </div>
      </div>
    </section>
  );
};

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContextProvider';
import './styles.css';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div key={product.product_id} className="productCard">
      <img
        src={product.image_url || '/images/product-placeholder.jpg'}
        alt={product.title}
        className="productImage"
      />
      <div className="productContent">
        <h3 className="productTitle">{product.title}</h3>
        <p className="productDescription">{product.description}</p>
        <p className="productPrice">{product.price}€</p>

        <div className="productActions">
          <button
            className="moreInfo"
            onClick={() => navigate(`/producto/${product.product_id}`)}
          >
            Ver Más
          </button>
          <button className="addToCart" onClick={() => addToCart(product)}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

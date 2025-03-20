import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CartContext } from '../../context/CartContextProvider';
import './styles.css';

const apiURL = import.meta.env.VITE_SERVER_URL;

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Muestra la informaci n detallada de un producto
 *
 * Obtendra el producto con el id pasado como par metro en la URL
 * y lo renderizar  con su imagen, t tulo, descripci n y precio.
 * Adem s, buscar  otros productos que tengan la misma categor a
 * y no sean el mismo producto, y los renderizar  en una secci n
 * aparte.
 *
 * @returns {React.ReactElement}
 */
/******  fe1cfe5e-1da4-4f53-a913-d20797761cf9  *******/
export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiURL}/products/${id}`);
        setProduct(response.data);

        const relatedResponse = await axios.get(`${apiURL}/products/all`);
        const filteredProducts = relatedResponse.data.filter(
          (prod) =>
            prod.category_id === response.data.category_id &&
            prod.product_id !== response.data.product_id
        );

        setRelatedProducts(filteredProducts);
      } catch (err) {
        console.log(err);
        toast.error('Error al obtener el producto');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return <p className="notFoundMessage">Producto no encontrado</p>;

  return (
    <div className="productDetailContainer">
      <Link to="/tienda" className="backButton">
        ← Volver
      </Link>

      <h1 className="productTitle">{product.title}</h1>

      <div className="productDetailWrapper">
        <div className="productImageContainer">
          <img
            src={product.image_url || '/default-image.jpg'}
            alt={product.title}
            className="productImage"
          />

          <div className="productThumbnailContainer">
            {Array.from(Array(4).keys()).map((index) => (
              <img
                key={index}
                src={product.image_url || '/default-image.jpg'}
                alt="Miniatura"
                className="productThumbnail"
              />
            ))}
          </div>
        </div>

        <div className="productInfoContainer">
          <p className="productDescription">{product.description}</p>

          <p className="productPrice">{product.price}€</p>

          <button
            className="addToCartButton"
            onClick={() => addToCart(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h2 className="relatedProductsTitle">
            Otros productos que podrían interesarte
          </h2>
          <div className="relatedProductsGrid">
            {relatedProducts.slice(0, 3).map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.product_id}
                product={relatedProduct}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

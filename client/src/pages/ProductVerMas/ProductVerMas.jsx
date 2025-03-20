import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css';

const apiURL = import.meta.env.VITE_SERVER_URL;

export const ProductDetail = () => {
  const { id } = useParams();
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

          <div className="productDetails">
            <p className="productStock">
              <strong>Stock:</strong> Disponible
            </p>
            <p className="productSize">
              <strong>Tamaño:</strong> 1.5L
            </p>
            <p className="productColor">
              <strong>Color:</strong> Amarillo
            </p>
          </div>

          <p className="productPrice">{product.price}€</p>

          <button className="addToCartButton">Añadir al carrito</button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h2 className="relatedProductsTitle">
            Otros productos que podrían interesarte
          </h2>
          <div className="relatedProductsGrid">
            {relatedProducts.slice(0, 3).map((relatedProduct) => (
              <div
                key={relatedProduct.product_id}
                className="relatedProductCard"
              >
                <img
                  src={relatedProduct.image_url || '/default-image.jpg'}
                  alt={relatedProduct.title}
                  className="relatedProductImage"
                />
                <div className="relatedProductContent">
                  <h3 className="relatedProductTitle">
                    {relatedProduct.title}
                  </h3>
                  <p className="relatedProductDescription">
                    {relatedProduct.description}
                  </p>
                  <p className="relatedProductPrice">{relatedProduct.price}€</p>
                  <div className="relatedProductActions">
                    <Link
                      to={`/producto/${relatedProduct.product_id}`}
                      className="moreInfoButton"
                    >
                      Ver más
                    </Link>
                    <button className="addToCartButton">Añadir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

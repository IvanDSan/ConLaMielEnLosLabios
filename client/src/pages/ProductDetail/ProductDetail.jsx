import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CartContext } from '../../context/CartContextProvider';
import './styles.css';
import { useTranslation } from "react-i18next";
import { SpinnerLoading } from '../../components/SpinnerLoading/SpinnerLoading';

const apiURL = import.meta.env.VITE_SERVER_URL;

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiURL}/products/${id}`);

        const relatedResponse = await axios.get(`${apiURL}/products/all`);
        const filteredProducts = relatedResponse.data.filter(
          (prod) =>
            prod.category_id === response.data.category_id &&
            prod.product_id !== response.data.product_id
        );

        setProduct(response.data);
        setRelatedProducts(filteredProducts);
        setSelectedImage(response.data.images[0].image_url);
      } catch (err) {
        console.log(err);
        toast.error(t("error_fetching_product"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  if (loading) return <SpinnerLoading />;

  if (!product)
    return <p className="notFoundMessage">{t("product_not_found")}</p>;

  return (
    <div className="productDetailContainer">
      <Link to="/tienda" className="backButton">
        ← {t("back")}
      </Link>

      <div className="productDetailWrapper">
        <div className="productImageContainer">
          {
            <img
              src={
                selectedImage
                  ? `${apiURL}/images/products/${selectedImage}`
                  : `${apiURL}/images/products/${product.images[0].image_url}`
              }
              alt={product.title}
              className="productImage"
            />
          }

          <div className="productThumbnailContainer">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`${apiURL}/images/products/${img.image_url}`}
                alt="Miniatura"
                className="productThumbnail"
                style={
                  selectedImage === img.image_url
                    ? { border: '2px solid var(--yellow)' }
                    : {}
                }
                onClick={() => setSelectedImage(img.image_url)}
              />
            ))}
          </div>
        </div>

        <div className="productInfoContainer">
          <h2 className="productTitle">{product.title}</h2>
          <p className="productDescription">{product.description}</p>

          <p className="productPrice">{product.price}€</p>

          <button
            className="addToCartButton"
            onClick={() => addToCart(product)}
          >
            {t("add_to_cart")}
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h2 className="relatedProductsTitle">{t("related_products")}</h2>
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

import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { CartContext } from "../../context/CartContextProvider";
import "./styles.css";
import { useTranslation } from "react-i18next";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { t } = useTranslation();

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
        toast.error(t("error_fetching_product"));
      }
    };

    fetchProduct();
  }, [id, t]);

  if (!product)
    return <p className="notFoundMessage">{t("product_not_found")}</p>;

  return (
    <div className="productDetailContainer">
      <Link to="/tienda" className="backButton">
        ← {t("back")}
      </Link>

      <h1 className="productTitle">{product.title}</h1>

      <div className="productDetailWrapper">
        <div className="productImageContainer">
          <img
            src={product.image_url || "/default-image.jpg"}
            alt={product.title}
            className="productImage"
          />

          <div className="productThumbnailContainer">
            {Array.from(Array(4).keys()).map((index) => (
              <img
                key={index}
                src={product.image_url || "/default-image.jpg"}
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

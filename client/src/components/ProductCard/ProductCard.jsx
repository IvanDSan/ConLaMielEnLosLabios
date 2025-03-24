import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div key={product.product_id} className="productCard">
      <img
        src={product.image_url || "/images/product-placeholder.jpg"}
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
            {t("view_more")}
          </button>
          <button
            className="addToCart"
            onClick={() => {
              addToCart(product);
            }}
          >
            {t("add")}
          </button>
        </div>
      </div>
    </div>
  );
};

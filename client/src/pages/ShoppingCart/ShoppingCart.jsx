import { useContext } from "react";
import { CartContext } from "../../context/CartContextProvider";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const ShoppingCart = () => {
  const {
    calculateTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    cart,
    purchaseCart,
  } = useContext(CartContext);

  const { t } = useTranslation();

  return (
    <div className="carrito">
      <h1>{t("cart")}</h1>
      {cart.length === 0 ? (
        <p>{t("cart_empty")}</p>
      ) : (
        <ul>
          {cart?.map((item) =>
            item && item.title && item.price ? (
              <li className="cartItem" key={item.product_id}>
                <span>
                  {item.title} - {parseFloat(item.price).toFixed(2)} €
                </span>
                <div className="botonesCart">
                  <div className="contador">
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity, -1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity, 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item.product_id)}>
                    {t("remove")}
                  </button>
                </div>
              </li>
            ) : (
              <li key={item.product_id || Math.random()}>
                {t("invalid_product")}
              </li>
            )
          )}
          <div className="cartTotal">
            <p>{t("cart_total")}</p>
            <p>
              {t("subtotal")}: {calculateTotal().subtotal.toFixed(2)} €
            </p>
            <p>
              {t("shipping")}: {calculateTotal().envio.toFixed(2)} €
            </p>
            <span className="rayaCart"></span>
            <p>
              {t("total")}: {calculateTotal().total.toFixed(2)} €
            </p>

            <div>
              <button className="botonesCart2" onClick={() => purchaseCart()}>
                {t("checkout")}
              </button>
              <button className="botonesCart2" onClick={() => clearCart()}>
                {t("clear_cart")}
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

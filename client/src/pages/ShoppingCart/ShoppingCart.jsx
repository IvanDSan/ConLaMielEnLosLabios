import { useContext, useState, useMemo } from "react";
import { CartContext } from "../../context/CartContextProvider";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { CheckoutButton } from "../../components/PaymentButton/PaymentButton";

export const ShoppingCart = () => {
  const { calculateTotal, removeFromCart, updateQuantity, clearCart, cart } = useContext(CartContext);

  const [isRemoving, setIsRemoving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState({});

  const total = useMemo(() => calculateTotal(), [cart]);

  const handleRemove = async (product_id) => {
    setIsRemoving(true);
    setError(null);
    try {
      await removeFromCart(product_id);
    } catch (err) {
      setError("Error al eliminar el producto");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    setError(null);
    try {
      await clearCart();
    } catch (err) {
      setError("Error al vaciar el carrito");
    } finally {
      setIsClearing(false);
    }
  };

  const handleUpdateQuantity = async (product_id, quantity, factor) => {
    setUpdatingItems((prev) => ({ ...prev, [product_id]: true }));
    try {
      await updateQuantity(product_id, quantity, factor);
    } catch (err) {
      setError("Error al actualizar cantidad");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [product_id]: false }));
    }
  };

  const { t } = useTranslation();

  return (
    <div className="carrito">
      <h1>{t("cart")}</h1>
      {cart.length === 0 ? (
        <p>{t("cart_empty")}</p>
      {error && <div className="error-message">{error}</div>}

      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart?.map((item) => {
              if (!item || !item.title || !item.price) {
                return (
                  <div className="invalid-item" key={item?.product_id || Math.random()}>
                    Producto no disponible
                  </div>
                );
              }

              return (
                <div className="cartItem" key={item.product_id}>
                  <div className="item-info">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-price">{parseFloat(item.price).toFixed(2)} €</p>
                  </div>

                  <div className="contador">
                    <button
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
                      disabled={updatingItems[item.product_id]}>
                      -
                    </button>
                    <span className="quantity-display">{updatingItems[item.product_id] ? "..." : item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
                      disabled={updatingItems[item.product_id]}>
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
        </div>
      )}
    </div>
  );
};

import { useContext, useState, useMemo } from "react";
import { CartContext } from "../../context/CartContextProvider";
import "./styles.css";
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

  return (
    <div className="carrito">
      <h1>Carrito</h1>
      {error && <div className="error-message">{error}</div>}

      {cart?.length === 0 ? (
        <p>El carrito está vacío.</p>
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

                  <div className="item-subtotal">
                    <p>Subtotal: {(parseFloat(item.price) * item.quantity).toFixed(2)} €</p>
                  </div>

                  <button className="remove-btn" onClick={() => handleRemove(item.product_id)} disabled={isRemoving}>
                    {isRemoving ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-row">
              <p>Subtotal:</p>
              <p>{total.subtotal.toFixed(2)} €</p>
            </div>
            <div className="summary-row">
              <p>Envío:</p>
              <p>{total.envio.toFixed(2)} €</p>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <p>Total:</p>
              <p>{total.total.toFixed(2)} €</p>
            </div>

            <div className="cart-actions">
              <CheckoutButton />
              <button className="clear-btn" onClick={handleClearCart} disabled={isClearing || cart.length === 0}>
                {isClearing ? "Vaciando..." : "Vaciar Carrito"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

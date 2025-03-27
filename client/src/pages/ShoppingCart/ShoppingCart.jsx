import { useContext, useState, useMemo } from 'react';
import { CartContext } from '../../context/CartContextProvider';
import './styles.css';
import { useTranslation } from 'react-i18next';
import { CheckoutButton } from '../../components/PaymentButton/PaymentButton';

export const ShoppingCart = () => {
  const { calculateTotal, removeFromCart, updateQuantity, clearCart, cart } =
    useContext(CartContext);

  const [isRemoving, setIsRemoving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState({});

  const total = useMemo(() => calculateTotal(), [cart]);
  const { t } = useTranslation();

  const handleRemove = async (product_id) => {
    setIsRemoving(true);
    setError(null);
    try {
      await removeFromCart(product_id);
    } catch (err) {
      setError(t('error_removing_product'));
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
      setError(t('error_clearing_cart'));
    } finally {
      setIsClearing(false);
    }
  };

  const handleUpdateQuantity = async (product_id, quantity, factor) => {
    setUpdatingItems((prev) => ({ ...prev, [product_id]: true }));
    try {
      await updateQuantity(product_id, quantity + factor);
    } catch (err) {
      setError(t('error_updating_quantity'));
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [product_id]: false }));
    }
  };

  return (
    <div className="carrito">
      <h1>{t('cart')}</h1>
      {error && <div className="error-message">{error}</div>}
      {cart.length === 0 ? (
        <p>{t('cart_empty')}</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) =>
              item && item.title && item.price ? (
                <div className="cartItem" key={item.product_id}>
                  <div className="item-info">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-price">
                      {parseFloat(item.price).toFixed(2)} €
                    </p>
                  </div>
                  <div className="contador">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, item.quantity, -1)
                      }
                      disabled={
                        updatingItems[item.product_id] || item.quantity <= 1
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {updatingItems[item.product_id] ? '...' : item.quantity}
                    </span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, item.quantity, 1)
                      }
                      disabled={updatingItems[item.product_id]}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.product_id)}
                    disabled={isRemoving}
                  >
                    {t('remove')}
                  </button>
                </div>
              ) : (
                <div
                  className="invalid-item"
                  key={item?.product_id || Math.random()}
                >
                  {t('invalid_product')}
                </div>
              )
            )}
          </div>
          <div className="cartTotal">
            <p>{t('cart_total')}</p>
            <p>
              {t('subtotal')}: {total.subtotal.toFixed(2)} €
            </p>
            <p>
              {t('shipping')}: {total.envio.toFixed(2)} €
            </p>
            <span className="rayaCart"></span>
            <p>
              {t('total')}: {total.total.toFixed(2)} €
            </p>
            <div>
              <CheckoutButton total={total.total} />
              <button
                className="botonesCart2"
                onClick={handleClearCart}
                disabled={isClearing}
              >
                {t('clear_cart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

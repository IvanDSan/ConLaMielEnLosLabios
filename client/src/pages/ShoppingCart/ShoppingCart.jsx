import { useContext } from 'react';
import { CartContext } from '../../context/CartContextProvider';
import './styles.css';
import { CheckoutButton } from '../../components/PaymentButton/PaymentButton';


export const ShoppingCart = () => {
  const {
    calculateTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    cart,
    // purchaseCart,
  } = useContext(CartContext);

  return (
    <div className="carrito">
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart?.map((item) =>
              item && item.title && item.price ? (
                <div className="cartItem" key={item.product_id}>
                  <div className="item-info">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-price">{parseFloat(item.price).toFixed(2)} €</p>
                  </div>
                  
                  <div className="contador">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity, -1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-subtotal">
                    <p>Subtotal: {(parseFloat(item.price) * item.quantity).toFixed(2)} €</p>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <div className="invalid-item" key={item.product_id || Math.random()}>
                  Producto no válido
                </div>
              )
            )}
          </div>

          <div className="cart-summary">
            <h2>Resumen del pedido</h2>
            <div className="summary-row">
              <p>Subtotal:</p>
              <p>{calculateTotal().subtotal.toFixed(2)} €</p>
            </div>
            <div className="summary-row">
              <p>Envío:</p>
              <p>{calculateTotal().envio.toFixed(2)} €</p>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <p>Total:</p>
              <p>{calculateTotal().total.toFixed(2)} €</p>
            </div>

            <div className="cart-actions">
              {/* <button className="checkout-btn" onClick={() => purchaseCart()}>
                Finalizar compra
              </button> */}
              <CheckoutButton />
              <button className="clear-btn" onClick={() => clearCart()}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
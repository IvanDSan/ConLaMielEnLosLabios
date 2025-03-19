import { useContext } from 'react';
import './styles.css';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContextProvider';

export const ShoppingCart = () => {
  const {
    calculateTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    cart,
    purchaseCart,
  } = useContext(CartContext);

  return (
    <div className="carrito">
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
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
                    Eliminar
                  </button>
                </div>
              </li>
            ) : (
              <li key={item.product_id || Math.random()}>Producto no válido</li>
            )
          )}
          <div className="cartTotal">
            <p>Total del carrito</p>
            <p>Subtotal: {calculateTotal().subtotal.toFixed(2)} €</p>
            <p>Envío: {calculateTotal().envio.toFixed(2)} €</p>
            <span className="rayaCart"></span>
            <p>Total: {calculateTotal().total.toFixed(2)} €</p>

            <div>
              <button className="botonesCart2" onClick={() => purchaseCart()}>
                Finaliza tu compra
              </button>
              <button className="botonesCart2" onClick={() => clearCart()}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

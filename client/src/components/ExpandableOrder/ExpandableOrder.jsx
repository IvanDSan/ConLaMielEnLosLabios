import { useContext, useState } from 'react';
import './styles.css';
import { UserContext } from '../../context/UserContext';

export const ExpandableOrder = ({
  orderId,
  orderTitle,
  orderDate,
  userId,
  userDetails,
  items,
  actions,
  deleteSale,
  modifyStatusOrder,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [orderItems, setOrderItems] = useState(items);
  const { user } = useContext(UserContext);

  const toggleDetails = () => {
    setExpanded((prev) => !prev);
  };

  const handleStatusChange = (productId, newStatus) => {
    // Actualiza el estado local de los items de la orden inmediatamente
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, sale_status: newStatus } // Actualiza el estado del producto
          : item
      )
    );

    // Llama a la función modifyStatusOrder para hacer la actualización en el backend
    modifyStatusOrder(orderId, userId, productId, newStatus);
  };

  return (
    <div
      className={`orderGroup ${
        items.some((item) => item.sale_status === 1) ? 'pending-order' : ''
      }`}
    >
      <div className="orderGroupTitle" onClick={toggleDetails}>
        <h6>{orderTitle}</h6>
        <p className="orderDate">
          {new Date(orderDate).toLocaleDateString('es-ES')}
        </p>
        <p>{orderItems.length} productos</p>
        <p>{userDetails}</p>
        <span className={`arrow ${expanded ? 'open' : ''}`}>►</span>
      </div>

      {expanded && (
        <div className="orderDetailsWrapper">
          {orderItems.map((item, index) => (
            <div key={index} className="orderCard">
              <img
                src={
                  item.image_url
                    ? `${import.meta.env.VITE_SERVER_URL}/images/products/${
                        item.image_url
                      }`
                    : '/images/product-placeholder.jpg'
                }
                alt={item.title}
                className="orderImage"
              />
              <div className="orderDetails">
                <p className="orderTitle">{item.title}</p>
                <p className="orderQuantity">Cantidad: {item.quantity}</p>
              </div>
              <div className="orderStatusWrapper">
                <p
                  className={`orderStatus ${
                    item.sale_status === 1
                      ? 'pending'
                      : item.sale_status === 2
                      ? 'canceled'
                      : 'completed'
                  }`}
                >
                  {item.sale_status === 1
                    ? 'Pendiente'
                    : item.sale_status === 2
                    ? 'Cancelado'
                    : 'Completado'}
                </p>
                {item.sale_status === 1 && user.user_type === 1 && (
                  <div className="orderActions">
                    <button
                      onClick={() => handleStatusChange(item.product_id, 3)} // Confirmar
                      className="confirmar"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.product_id, 2)} // Cancelar
                      className="cancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {user.user_type === 1 && (
            <div className="actions">
              {actions &&
                actions.map((action, index) => <div key={index}>{action}</div>)}
              <button onClick={deleteSale}>Borrar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

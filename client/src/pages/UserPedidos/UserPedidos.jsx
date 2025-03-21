import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.css";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Debes iniciar sesión para ver tus pedidos.");
          return;
        }

        const response = await axios.get(`${apiURL}/sales/getSalesByUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const groupedOrders = response.data.reduce((acc, order) => {
          if (!acc[order.sale_id]) {
            acc[order.sale_id] = {
              sale_id: order.sale_id,
              date: order.date,
              items: [],
            };
          }

          acc[order.sale_id].items.push({
            title: order.title,
            image_url: order.image_url,
            quantity: order.quantity,
            sale_status: order.sale_status,
          });

          return acc;
        }, {});

        const groupedArray = Object.values(groupedOrders);
        setOrders(groupedArray);
        setFilteredOrders(groupedArray);
      } catch (error) {
        console.log(error);
        toast.error("Error al obtener tus pedidos.");
      }
    };

    fetchOrders();
  }, []);

  const filterByStatus = (status) => {
    let filtered = [];

    orders.forEach((order) => {
      const matchingItems = order.items.filter(
        (item) => item.sale_status === status
      );
      if (status === null || matchingItems.length > 0) {
        filtered.push({
          ...order,
          items: status === null ? order.items : matchingItems,
        });
      }
    });

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((order) =>
        order.sale_id.toString().includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
    setSelectedStatus(status);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let filtered = [];

    orders.forEach((order) => {
      const matchingItems =
        selectedStatus === null
          ? order.items
          : order.items.filter((item) => item.sale_status === selectedStatus);

      if (order.sale_id.toString().includes(query)) {
        if (matchingItems.length > 0) {
          filtered.push({ ...order, items: matchingItems });
        }
      }
    });

    setFilteredOrders(filtered);
  };

  if (orders.length === 0) {
    return <p className="noOrdersMessage">No tienes pedidos aún.</p>;
  }

  return (
    <div className="ordersContainer">
      <h1 className="ordersTitle">Mis Pedidos</h1>

      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Buscar por ID de compra..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="statusFilters">
        <button
          className={`filterButton ${selectedStatus === null ? "active" : ""}`}
          onClick={() => filterByStatus(null)}
        >
          Todos
        </button>
        <button
          className={`filterButton ${selectedStatus === 1 ? "active" : ""}`}
          onClick={() => filterByStatus(1)}
        >
          Pendiente
        </button>
        <button
          className={`filterButton ${selectedStatus === 3 ? "active" : ""}`}
          onClick={() => filterByStatus(3)}
        >
          Recibido
        </button>
        <button
          className={`filterButton ${selectedStatus === 2 ? "active" : ""}`}
          onClick={() => filterByStatus(2)}
        >
          Cancelado
        </button>
      </div>

      <div className="ordersList">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.sale_id} className="orderGroup">
              <h3 className="orderGroupTitle">Compra ID: {order.sale_id}</h3>
              <p className="orderDate">
                {new Date(order.date).toLocaleDateString("es-ES")}
              </p>

              {order.items.map((item, index) => (
                <div key={index} className="orderCard">
                  <img
                    src={item.image_url || "/default-image.jpg"}
                    alt={item.title}
                    className="orderImage"
                  />
                  <div className="orderDetails">
                    <p className="orderTitle">{item.title}</p>
                    <p className="orderQuantity">Cantidad: {item.quantity}</p>
                  </div>
                  <p
                    className={`orderStatus ${
                      item.sale_status === 1
                        ? "pending"
                        : item.sale_status === 2
                        ? "canceled"
                        : "completed"
                    }`}
                  >
                    {item.sale_status === 1
                      ? "Pendiente"
                      : item.sale_status === 2
                      ? "Cancelado"
                      : "Recibido"}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="noOrdersMessage">No hay pedidos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

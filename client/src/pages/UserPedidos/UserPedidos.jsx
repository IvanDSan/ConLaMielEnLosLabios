import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css';
import { ExpandableOrder } from '../../components/ExpandableOrder/ExpandableOrder';
import { UserContext } from '../../context/UserContext';

const apiURL = import.meta.env.VITE_SERVER_URL;

export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          toast.error('Debes iniciar sesión para ver tus pedidos.');
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
        toast.error('Error al obtener tus pedidos.');
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

    if (searchQuery.trim() !== '') {
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

    if (query.trim() !== '') {
      filtered = filtered.filter((order) =>
        order.sale_id.toString().includes(query)
      );
    }

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
          className={`filterButton ${selectedStatus === null ? 'active' : ''}`}
          onClick={() => filterByStatus(null)}
        >
          Todos
        </button>
        <button
          className={`filterButton ${selectedStatus === 1 ? 'active' : ''}`}
          onClick={() => filterByStatus(1)}
        >
          Pendiente
        </button>
        <button
          className={`filterButton ${selectedStatus === 2 ? 'active' : ''}`}
          onClick={() => filterByStatus(2)}
          className={`filterButton ${selectedStatus === 3 ? "active" : ""}`}
          onClick={() => filterByStatus(3)}
        >
          Recibido
        </button>
        <button
          className={`filterButton ${selectedStatus === 3 ? 'active' : ''}`}
          onClick={() => filterByStatus(3)}

          className={`filterButton ${selectedStatus === 2 ? "active" : ""}`}
          onClick={() => filterByStatus(2)}
        >
          Cancelado
        </button>
      </div>

      <div className="ordersList">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <ExpandableOrder
              key={order.sale_id}
              orderId={order.sale_id}
              orderTitle={`Compra ID: ${order.sale_id}`}
              orderDate={order.date}
              items={order.items}
            />
          ))
        ) : (
          <p className="noOrdersMessage">No hay pedidos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

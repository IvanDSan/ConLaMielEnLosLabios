import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { ExpandableOrder } from '../../components/ExpandableOrder/ExpandableOrder';
import './styles.css';

export const Sales = () => {
  const { token } = useContext(UserContext);
  const [sales, setSales] = useState([]);

  const fetchSales = useCallback(async () => {
    try {
      const response = await fetchData('/sales/all', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      console.log(response.data);

      const groupedOrders = response.data.reduce((acc, order) => {
        if (!acc[order.sale_id]) {
          acc[order.sale_id] = {
            sale_id: order.sale_id,
            user_id: order.user_id,
            user: order.name + ' ' + order.lastname,
            date: order.date,
            items: [],
          };
        }

        acc[order.sale_id].items.push({
          title: order.title,
          image_url: order.image_url,
          quantity: order.quantity,
          sale_status: order.sale_status,
          product_id: order.product_id,
        });

        return acc;
      }, {});

      setSales(Object.values(groupedOrders));
    } catch (err) {
      console.log(err);
      toast.error('Error al obtener las ventas');
    }
  }, [token]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const deleteSale = async (sale_id) => {
    try {
      await fetchData(`/sales/deleteLogic/${sale_id}`, 'PUT', null, {
        Authorization: `Bearer ${token}`,
      }).then((res) => {
        if (res.status === 200) {
          setSales(sales.filter((sale) => sale.sale_id !== sale_id));
        }
      });
    } catch (err) {
      console.log(err);
      toast.error('Error al eliminar la venta');
    }
  };

  const modifyStatusOrder = async (sale_id, user_id, product_id, newStatus) => {
    console.log(sale_id, user_id, product_id, newStatus);
    try {
      const response = await fetchData(
        `/sales/modifyStatusOfOrder`,
        'POST',
        {
          sale_status: newStatus,
          user_id,
          product_id,
          sale_id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.status === 200) {
        setSales((prevSales) =>
          prevSales.map((sale) =>
            sale.sale_id === sale_id &&
            sale.product_id === product_id &&
            sale.user_id === user_id
              ? { ...sale, sale_status: newStatus }
              : sale
          )
        );
      }
    } catch (err) {
      console.log('Error en la petición', err);
      toast.error('Error al modificar el estado de la venta');
    }
  };

  console.log(sales);

  return (
    <div className="admin-table">
      <div className="container">
        <h3>Historial de Ventas</h3>
        <div className="ordersList">
          {sales && sales.length > 0 ? (
            sales.map((sale, index) => (
              <ExpandableOrder
                key={index}
                orderId={sale.sale_id}
                userId={sale.user_id}
                userDetails={sale.user}
                orderTitle={`Compra ID: ${sale.sale_id}`}
                orderDate={sale.date}
                items={sale.items || []}
                modifyStatusOrder={modifyStatusOrder}
                actions={
                  sale.sale_status === 1
                    ? [
                        <button
                          key="complete"
                          onClick={() =>
                            modifyStatusOrder(
                              sale.sale_id,
                              sale.user_id,
                              sale.product_id,
                              3
                            )
                          }
                        >
                          Completar
                        </button>,
                        <button
                          key="cancel"
                          onClick={() =>
                            modifyStatusOrder(
                              sale.sale_id,
                              sale.user_id,
                              sale.product_id,
                              2
                            )
                          }
                        >
                          Cancelar
                        </button>,
                      ]
                    : []
                }
                deleteSale={() => deleteSale(sale.sale_id)} // Acciones de eliminar
              />
            ))
          ) : (
            <p>No hay pedidos</p>
          )}
        </div>
      </div>
    </div>
  );
};

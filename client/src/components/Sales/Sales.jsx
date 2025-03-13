import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const Sales = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${apiURL}/sales/all`);
      console.log(response);
      setSales(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const deleteSale = async (sale_id) => {
    try {
      await axios.put(`${apiURL}/sales/deleteLogic/${sale_id}`);
      fetchSales();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sales-container">
      <h1 className="sales-title">Historial de Ventas</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales && sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>
                  {sale.name} {sale.lastname}
                </td>
                <td>{sale.title}</td>
                <td>{sale.quantity}</td>
                <td>
                  {sale.sale_status === 1
                    ? "Pendiente"
                    : sale.sale_status === 2
                    ? "Cancelado"
                    : "Completado"}
                </td>
                <td>{sale.date}</td>
                <td className="actions">
                  <button onClick={() => deleteSale(sale.sale_id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No hay pedidos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

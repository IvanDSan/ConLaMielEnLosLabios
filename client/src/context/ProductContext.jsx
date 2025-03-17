import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductsContext = createContext();

const apiURL = import.meta.env.VITE_SERVER_URL;

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiURL}/products/all`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/products/all`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="storeContainer">
      <h1 className="storeTitle">
        Descubre el sabor y la magia de la apicultura
      </h1>
      <p className="storeDescription">
        Explora nuestra tienda y lleva contigo un pedazo de la naturaleza.
        Encuentra miel pura, accesorios ecológicos y más. Cada compra apoya la
        apicultura sostenible.
      </p>

      <div className="productsGrid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="productCard">
              <img
                src={product.image_url || "/default-image.jpg"}
                alt={product.title}
                className="productImage"
              />
              <div className="productContent">
                <h3 className="productTitle">{product.title}</h3>
                <p className="productDescription">{product.description}</p>
                <p className="productPrice">{product.price}€</p>

                <div className="productActions">
                  <button className="moreInfo">Ver Más</button>
                  <button className="addToCart">Añadir</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="noProducts">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

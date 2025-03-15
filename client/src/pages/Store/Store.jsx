import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";
import { useNavigate } from "react-router-dom";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get(`${apiURL}/products/all`);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        const categoriesResponse = await axios.get(
          `${apiURL}/categories/public`
        );
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error("Error al obtener los productos o categorías:", err);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filterByCategory = (categoryId) => {
    let filtered = products;

    if (categoryId !== null) {
      filtered = products.filter(
        (product) => product.category_id === categoryId
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setSelectedCategory(categoryId);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];

    switch (option) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
    setSortOption(option);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let filtered = products;

    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    if (query.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

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

      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="categoryFilters">
        <button
          className={`filterButton ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => filterByCategory(null)}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.category_id}
            className={`filterButton ${
              selectedCategory === category.category_id ? "active" : ""
            }`}
            onClick={() => filterByCategory(category.category_id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="sortContainer">
        <label className="sortLabel" htmlFor="sortSelect">
          Ordenar por:
        </label>
        <select
          className="sortSelect"
          id="sortSelect"
          value={sortOption}
          onChange={(e) => sortProducts(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="priceAsc">Precio: Menor a Mayor</option>
          <option value="priceDesc">Precio: Mayor a Menor</option>
          <option value="nameAsc">Nombre: A - Z</option>
          <option value="nameDesc">Nombre: Z - A</option>
        </select>
      </div>

      <div className="productsGrid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                  <button
                    className="moreInfo"
                    onClick={() => navigate(`/producto/${product.product_id}`)}
                  >
                    Ver Más
                  </button>
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

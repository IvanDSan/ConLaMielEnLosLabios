import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import "./styles.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

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
        toast.error(t("error_fetching_products_categories"));
      }
    };

    fetchProductsAndCategories();
  }, [t]);

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
      <h1 className="storeTitle">{t("store_title")}</h1>
      <p className="storeDescription">{t("store_description")}</p>

      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder={t("search_products")}
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
          {t("all")}
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
          {t("sort_by")}:
        </label>
        <select
          className="sortSelect"
          id="sortSelect"
          value={sortOption}
          onChange={(e) => sortProducts(e.target.value)}
        >
          <option value="">{t("select_option")}</option>
          <option value="priceAsc">{t("price_low_high")}</option>
          <option value="priceDesc">{t("price_high_low")}</option>
          <option value="nameAsc">{t("name_az")}</option>
          <option value="nameDesc">{t("name_za")}</option>
        </select>
      </div>

      <div className="container">
        <div className="productsGrid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <p className="noProducts">{t("no_products")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

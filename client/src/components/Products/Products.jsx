import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [productToEdit, setProductToEdit] = useState(null);
  const { token } = useContext(UserContext);
  console.log(token);
  useEffect(() => {
    axios
      .get("http://localhost:4000/products/all")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error al obtener los productos", error));
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log("Ejecutando handleCreateProduct");
    try {
      const res = await fetchData("/products/create", "POST", newProduct, {
        Authorization: `Bearer ${token}`,
      });
      if (res.status === 200) {
        let newProd = { ...newProduct, product_id: res.data.product_id };
        setProducts([...products, newProd]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = (id) => {
    if (productToEdit) {
      axios
        .put(`http://localhost:4000/products/${id}`, productToEdit, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setProductToEdit(null);
          axios
            .get("http://localhost:4000/products/all", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setProducts(res.data));
        })
        .catch((error) => console.error("Error al editar el producto", error));
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log(`/products/${id}`);
    try {
      const res = await fetchData(
        `/products/${id}`,
        "delete",
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  console.log("****", products);
  return (
    <div className="products-container">
      <aside className="sidebar">
        <div className="menu-item">📂 Apadrinamiento</div>
        <div className="menu-item">👤 Users</div>
        <div className="menu-item active">🛒 Productos</div>
      </aside>
      <main className="content">
        <h1>Productos</h1>
        <form className="create-form" onSubmit={handleCreateProduct}>
          <h2>Crear Producto</h2>
          <label>
            Título:
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              placeholder="Título"
              required
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="Descripción"
              required
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder="Precio"
              required
            />
          </label>
          <label>
            ID de categoría:
            <input
              type="text"
              value={newProduct.category_id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category_id: e.target.value })
              }
              placeholder="ID de categoría"
              required
            />
          </label>
          <button onClick={handleCreateProduct} type="submit">
            Crear Producto
          </button>
        </form>

        <div className="filters">
          <select>
            <option>Seleccionar</option>
          </select>
          <input
            type="text"
            placeholder="Buscar por código o ID"
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <button>Productos</button>
          <div className="right-controls">
            <select>
              <option>Hoy</option>
            </select>

            <button className="delete">🗑 Borrar</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>All</th>
              <th>No.</th>
              <th>Imagen</th>
              <th>ID del producto</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Tamaño</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.product_id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td>
                  <img src={product.image_url} alt={product.title} width="50" />
                </td>
                <td>{product.product_id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td>{product.size || "N/A"}</td>
                <td>{product.color || "N/A"}</td>
                <td>{product.price}€</td>
                <td>
                  <button onClick={() => setProductToEdit(product)}>✏️</button>
                  <button
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>◀ Previous</button>
          <span>1 2 3</span>
          <button>Next ▶</button>
        </div>

        {productToEdit && (
          <div className="edit-form">
            <h2>Editar Producto</h2>
            <input
              type="text"
              value={productToEdit.title}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, title: e.target.value })
              }
              placeholder="Título"
            />
            <textarea
              value={productToEdit.description}
              onChange={(e) =>
                setProductToEdit({
                  ...productToEdit,
                  description: e.target.value,
                })
              }
              placeholder="Descripción"
            />
            <input
              type="number"
              value={productToEdit.price}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, price: e.target.value })
              }
              placeholder="Precio"
            />
            <input
              type="text"
              value={productToEdit.category_id}
              onChange={(e) =>
                setProductToEdit({
                  ...productToEdit,
                  category_id: e.target.value,
                })
              }
              placeholder="ID de categoría"
            />
            <button onClick={() => handleEditProduct(productToEdit.product_id)}>
              Actualizar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

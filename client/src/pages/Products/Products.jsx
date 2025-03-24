import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { PencilLine, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:4000/products/all")
      .then((res) => setProducts(res.data))
      .catch((error) => {
        console.error("Error al obtener los productos", error);
        toast.error(t("error_fetching_products"));
      });
  }, [t]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
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
      toast.error(t("error_creating_product"));
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
        .catch((error) => {
          console.error("Error al editar el producto", error);
          toast.error(t("error_editing_product"));
        });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetchData(`/products/${id}`, "delete", null, {
        Authorization: `Bearer ${token}`,
      });

      if (res.status === 200) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      toast.error(t("error_deleting_product"));
    }
  };

  return (
    <div className="products-container">
      <main className="content">
        <form className="create-form" onSubmit={handleCreateProduct}>
          <label>
            {t("title")}:
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              placeholder={t("title")}
              required
            />
          </label>
          <label>
            {t("description")}:
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder={t("description")}
              required
            />
          </label>
          <label>
            {t("price")}:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              placeholder={t("price")}
              required
            />
          </label>
          <label>
            {t("category_id")}:
            <input
              type="text"
              value={newProduct.category_id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category_id: e.target.value })
              }
              placeholder={t("category_id")}
              required
            />
          </label>
          <button onClick={handleCreateProduct} type="submit">
            {t("create_product")}
          </button>
        </form>

        <div className="admin-table">
          <div className="container">
            <h3>{t("products")}</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t("image")}</th>
                    <th>{t("title")}</th>
                    <th>{t("description")}</th>
                    <th>{t("price")}</th>
                    <th>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>
                        <img
                          src={product.image_url}
                          alt={product.title}
                          width="50"
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.price}€</td>
                      <td className="actions">
                        <button onClick={() => setProductToEdit(product)}>
                          <PencilLine />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProduct(product.product_id)
                          }
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {productToEdit && (
          <div className="edit-form">
            <h2>{t("edit_product")}</h2>
            <input
              type="text"
              value={productToEdit.title}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, title: e.target.value })
              }
              placeholder={t("title")}
            />
            <textarea
              value={productToEdit.description}
              onChange={(e) =>
                setProductToEdit({
                  ...productToEdit,
                  description: e.target.value,
                })
              }
              placeholder={t("description")}
            />
            <input
              type="number"
              value={productToEdit.price}
              onChange={(e) =>
                setProductToEdit({ ...productToEdit, price: e.target.value })
              }
              placeholder={t("price")}
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
              placeholder={t("category_id")}
            />
            <button onClick={() => handleEditProduct(productToEdit.product_id)}>
              {t("update")}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

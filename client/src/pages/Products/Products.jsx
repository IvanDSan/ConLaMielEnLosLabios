import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { PencilLine, Trash2 } from "lucide-react";
import { Modal } from "../../components/Modal/Modal";
import "./styles.css";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [productsImages, setProductsImages] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [productToEdit, setProductToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products/all")
      .then((res) => setProducts(res.data))
      .catch((error) => {
        console.error("Error al obtener los productos", error);
        toast.error("Error al obtener los productos");
      });
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("newProduct", JSON.stringify(newProduct));
      images.forEach((image) => formData.append("images", image));

      const res = await fetchData.post("/products/create", formData, {
        header: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setProducts([
          ...products,
          { ...newProduct, product_id: res.data.product_id },
        ]);
        setIsModalOpen(false);
        setNewProduct({
          title: "",
          description: "",
          price: "",
          category_id: "",
        });
        setImages([]);
        toast.success("Producto creado con éxito");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto");
    }
  };

  const handleAddImage = async (productId) => {
    if (!images.length) return toast.error("Selecciona una imagen primero");
    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      const res = await axios.post(
        `http://localhost:4000/products/${productId}/images`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success("Imagen añadida correctamente");
        // Recargar imágenes o productos
        const updatedProducts = products.map((product) =>
          product.product_id === productId
            ? { ...product, images: [...product.images, ...res.data.images] }
            : product
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error al agregar la imagen", error);
      toast.error("Error al agregar la imagen");
    }
  };

  const handleDeleteImage = async (product_image_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/products/images/${product_image_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success("Imagen eliminada correctamente");
        const updatedProducts = products.map((product) => ({
          ...product,
          images: product.images.filter(
            (img) => img.product_image_id !== product_image_id
          ),
        }));
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error al eliminar la imagen", error);
      toast.error("Error al eliminar la imagen");
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
          toast.error("Error al editar el producto");
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
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <div className="products-container">
      <main className="content">
        <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
          Crear nuevo producto
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Crear Nuevo Producto</h2>
          <form className="create-form" onSubmit={handleCreateProduct}>
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
            <label htmlFor="">
              Imágen:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </label>
            <button type="submit">Crear Producto</button>
          </form>
        </Modal>

        <div className="admin-table">
          <div className="container">
            <h3>Productos</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>
                        {product.images && product.images.length > 0 ? (
                          product.images.map((img) => (
                            <img
                              key={img.product_image_id}
                              src={`/uploads/products/${img.image_url}`}
                              alt={product.title}
                              width="50"
                            />
                          ))
                        ) : (
                          <span>Sin imagen</span>
                        )}
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

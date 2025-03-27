import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { PencilLine, Trash2 } from 'lucide-react';
import { Modal } from '../../components/Modal/Modal';
import './styles.css';
import { NewProductForm } from '../../components/NewProductForm/NewProductForm';
import { EditProductForm } from '../../components/EditProductForm/EditProductForm';
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [openNewProductForm, setOpenNewProductForm] = useState(false);
  const [openEditProductForm, setOpenEditProductForm] = useState(false);
  const { token } = useContext(UserContext);

  const getProducts = async () => {
    try {
      const res = await fetchData('/products/all', 'GET');
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
      toast.error('Error al obtener los productos');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setOpenEditProductForm(true);
    }
  }, [productToEdit]);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetchData(`/products/${id}`, 'delete', null, {
        Authorization: `Bearer ${token}`,
      });

      if (res.status === 200) {
        setProducts(products.filter((product) => product.product_id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <>
      <div className="products-container">
        <section className="content">
          <button
            className="open-modal-btn"
            onClick={() => setOpenNewProductForm(true)}
          >
            Crear nuevo producto
          </button>

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
                            <p>{product.images.length} imgs</p>
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
        </section>
      </div>

      <Modal
        isOpen={openNewProductForm}
        onClose={() => {
          setOpenNewProductForm(false);
        }}
      >
        <NewProductForm
          closeModal={() => {
            setOpenNewProductForm(false);
            getProducts();
          }}
          setProducts={setProducts}
        />
      </Modal>

      <Modal
        isOpen={openEditProductForm}
        onClose={() => {
          setProductToEdit(null);
          setOpenEditProductForm(false);
        }}
      >
        <EditProductForm
          closeModal={() => {
            setOpenEditProductForm(false);
            getProducts();
          }}
          productToEdit={productToEdit}
        />
      </Modal>
    </>
  );
};

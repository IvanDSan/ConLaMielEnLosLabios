import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';

const initialState = {
  title: '',
  description: '',
  price: '',
  categoryId: null,
};

export const NewProductForm = ({ closeModal }) => {
  const [newProduct, setNewProduct] = useState(initialState);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData('/categories/get', 'GET', null, {
          Authorization: `Bearer ${token}`,
        });

        setCategories(response.data);
      } catch (err) {
        console.log(err);
        toast.error('Error al obtener las categorias');
      }
    };

    fetchCategories();
  }, [token]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.categoryId
    ) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    if (images.length === 0) {
      toast.error('Por favor, selecciona al menos una imagen');
      return;
    }

    // ENVIAR PRODUCTO
    try {
      const newFormData = new FormData();
      newFormData.append('newProduct', JSON.stringify(newProduct));

      if (images && images.length > 0) {
        for (const elem of images) {
          if (elem instanceof File) {
            newFormData.append('imgs', elem);
          }
        }
      }

      const response = await fetchData(
        '/products/create',
        'POST',
        newFormData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.status === 200) {
        toast.success('Producto creado correctamente');
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al crear el producto');
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      setImages(filesArray);
    }
  };

  return (
    <>
      <h2>Crear Nuevo Producto</h2>
      <form className="create-form" onSubmit={handleCreateProduct}>
        <label>
          Título:
          <input
            type="text"
            value={newProduct.title}
            onChange={handleChange}
            placeholder="Título"
            name="title"
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Descripción"
            name="description"
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Precio"
            name="price"
            required
          />
        </label>
        <label>
          Categoría:
          <select
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                categoryId: parseInt(e.target.value),
              })
            }
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((categorie) => (
              <option key={categorie.category_id} value={categorie.category_id}>
                {categorie.name}
              </option>
            ))}
          </select>
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
    </>
  );
};

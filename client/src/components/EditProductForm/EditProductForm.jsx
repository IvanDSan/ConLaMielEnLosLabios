import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';
import './styles.css';
import { X } from 'lucide-react';

export const EditProductForm = ({ closeModal, productToEdit }) => {
  const [product, setProduct] = useState(productToEdit);
  const [productImages, setProductImages] = useState(productToEdit.images);
  const [newImages, setNewImages] = useState([]);
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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      setNewImages(filesArray);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category_id
    ) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    // ENVIAR PRODUCTO
    try {
      const newFormData = new FormData();
      newFormData.append('newProduct', JSON.stringify(product));

      if (newImages && newImages.length > 0) {
        for (const elem of newImages) {
          if (elem instanceof File) {
            newFormData.append('imgs', elem);
          }
        }
      }

      const response = await fetchData(
        `/products/${product.product_id}`,
        'PUT',
        newFormData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.status === 200) {
        toast.success('Producto actualizado');
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al actualizar el producto');
    }
  };

  const handleProductImageDelete = async (image) => {
    try {
      const response = await fetchData(
        `/products/deleteImage/${image.product_image_id}`,
        'DELETE',
        { image_url: image.image_url },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.status === 200) {
        toast.success('Imagen eliminada');
        setProductImages(
          productImages.filter(
            (img) => img.product_image_id !== image.product_image_id
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar la imagen');
    }
  };

  return (
    <>
      <h2>Editar Producto</h2>
      <form className="create-form" onSubmit={handleEditProduct}>
        <label>
          Título:
          <input
            type="text"
            value={product.title}
            onChange={handleChange}
            placeholder="Título"
            name="title"
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={product.description}
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
            value={product.price}
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
              setProduct({
                ...product,
                categoryId: parseInt(e.target.value),
              })
            }
          >
            {categories.map((categorie) => (
              <option
                key={categorie.category_id}
                value={categorie.category_id}
                selected={categorie.category_id === product.category_id}
              >
                {categorie.name}
              </option>
            ))}
          </select>
        </label>
        <div className="product-images">
          {productImages.map((image, index) => (
            <div key={index} className="product-image">
              <X
                className="delete-image"
                size={28}
                color="red"
                onClick={() => handleProductImageDelete(image)}
              />
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/images/products/${
                  image.image_url
                }`}
                alt="img"
              />
            </div>
          ))}
        </div>
        <label htmlFor="">
          Imágenes nuevas:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </label>
        <button type="submit">Guardar cambios</button>
      </form>
    </>
  );
};

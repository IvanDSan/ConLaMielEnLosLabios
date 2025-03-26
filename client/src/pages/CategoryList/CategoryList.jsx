import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import './styles.css';
import { PencilLine, Trash2 } from 'lucide-react';

export const CategoryList = () => {
  const { token } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const dataCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchData('/categories/get', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setCategories(
        Array.isArray(res.data) ? res.data : res.data.categories || []
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Error al obtener las categorias');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    dataCategories();
  }, [dataCategories]);

  const openModal = (type, category = null) => {
    setModalType(type);
    setCategoryName(category ? category.name : '');
    setEditingCategoryId(category ? category.category_id || category.id : null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) return;

    try {
      if (modalType === 'create') {
        await fetchData(
          '/categories/create',
          'POST',
          { name: categoryName },
          {
            Authorization: `Bearer ${token}`,
          }
        );
      } else {
        await fetchData(
          `/categories/update/${editingCategoryId}`,
          'PUT',
          {
            name: categoryName,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
      }
      setShowModal(false);
      setCategoryName('');
      setEditingCategoryId(null);
      dataCategories();
    } catch (error) {
      console.log(error);
      toast.error('Error al guardar la categoría');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchData(`/categories/delete/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      });
      dataCategories();
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar la categoría');
    }
  };

  return (
    <div className="category-list">
      {showModal && (
        <div className="modal">
          <h3>
            {modalType === 'create'
              ? 'Agregar Nueva Categoría'
              : 'Editar Categoría'}
          </h3>
          <input
            type="text"
            className="category-input"
            placeholder="Nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="buttonsModal">
            <button className="save-btn" onClick={handleSave}>
              {modalType === 'create' ? 'Guardar' : 'Actualizar'}
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading && <p className="loading">Cargando categorías...</p>}

      <div className="admin-table">
        <div className="container">
          <h3>Categorías</h3>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => openModal('create')}
            >
              Agregar categoría
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.category_id || category.id}>
                      <td>{category.category_id || category.id}</td>
                      <td>{category.name}</td>
                      <td className="actions">
                        <button onClick={() => openModal('edit', category)}>
                          <PencilLine size={28} color="black" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(category.category_id || category.id)
                          }
                        >
                          <Trash2 size={28} color="black" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay categorías disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

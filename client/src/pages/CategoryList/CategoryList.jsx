import { useContext, useEffect, useState } from 'react';
// import axios from "axios";
import './styles.css';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';

const CategoryList = () => {
  const { token } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    dataCategories();
  }, []);

  const dataCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchData('/categories/get', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setCategories(
        Array.isArray(res.data) ? res.data : res.data.categories || []
      );
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(
        'Error al cargar las categorías: ' +
          (error.message || 'Problema de conexión')
      );
    }
  };

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
        fetchData(
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
      setError(
        `Error al ${
          modalType === 'create' ? 'crear' : 'actualizar'
        } la categoría: ${error.message}`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchData(`/categories/delete/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      });
      dataCategories();
    } catch (error) {
      setError(
        'Error al borrar la categoría: ' +
          (error.message || 'No se ha podido borrar la categoría')
      );
    }
  };

  return (
    <div className="category-list">
      <h2>Categorías</h2>
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
      <button className="add-category-btn" onClick={() => openModal('create')}>
        Agregar Categoría
      </button>

      {loading && <p className="loading">Cargando categorías...</p>}
      {error && <p className="error">{error}</p>}

      <table className="category-table" border="1">
        <thead>
          <tr>
            <th className="idTh">ID</th>
            <th>Nombre</th>
            <th className="actionTh">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.category_id || category.id}>
                <td>{category.category_id || category.id}</td>
                <td>{category.name}</td>
                <td className="buttonsTable">
                  <button
                    className="edit-btn"
                    onClick={() => openModal('edit', category)}
                  >
                    {' '}
                    <img src="/icons/edit.svg" alt="imagen edit" />{' '}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(category.category_id || category.id)
                    }
                  >
                    {' '}
                    <img src="/icons/bin.svg" alt="bin image" />
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
  );
};

export default CategoryList;

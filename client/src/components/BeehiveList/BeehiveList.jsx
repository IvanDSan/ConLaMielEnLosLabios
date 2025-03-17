import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../helpers/axiosHelper";
import "./styles.css";
import { UserContext } from "../../context/UserContext";

const innitValues = {
  name: "",
  description: "",
};

const BeehiveList = () => {
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [beehiveName, setBeehiveName] = useState("");
  const [beehiveDescription, setBeehiveDescription] = useState("");
  const [beehiveImages, setBeehiveImages] = useState([]);
  const [editingBeehiveId, setEditingBeehiveId] = useState(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    fetchBeehives();
  }, []);

  const fetchBeehives = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/beehives/get", "GET");

      const beehives = await Promise.all(
        res.data.map(async (beehive) => {
          const resImages = await fetchData(`/beehives/images/${beehive.beehive_id}`, "GET");
          return {
            beehive_id: beehive.beehive_id,
            name: beehive.name,
            description: beehive.description,
            images: resImages.data || [],
          };
        })
      );
      console.log(beehives);

      setBeehives(beehives);
      setError(null);
    } catch (error) {
      handleError("cargar las colmenas", error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (action, error) => {
    console.error(`Error en ${action}:`, error);
    setError(`Error al ${action}: ${error.response?.data?.message || error.message || "Problema de conexión"}`);
  };

  const openModal = (type, beehive = null) => {
    setModalType(type);
    setBeehiveName(beehive ? beehive.name : "");
    setBeehiveDescription(beehive ? beehive.description : "");
    setBeehiveImages([]);
    setEditingBeehiveId(beehive ? beehive.beehive_id : null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setBeehiveImages(filesArray);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const beehiveData = { name: beehiveName, description: beehiveDescription };
      const newFormData = new FormData();
      newFormData.append("newBeehive", JSON.stringify(beehiveData));
      if (beehiveImages) {
        for (const elem of beehiveImages) {
          newFormData.append("imgs", elem);
        }
      }
      const res = await fetchData("/beehives/create", "POST", newFormData);
      if (res.status === 200) {
        console.log("creado");
      }
      fetchBeehives();
      setBeehiveDescription("");
      setBeehiveImages(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!beehiveName.trim() || !beehiveDescription.trim()) return;

    try {
      const payload = { name: beehiveName, description: beehiveDescription };
      const newFormData = new FormData();
      newFormData.append("updatedBeehive", JSON.stringify(payload));
      if (beehiveImages) {
        for (const elem of beehiveImages) {
          newFormData.append("imgs", elem);
        }
      }
      const resp = await fetchData(`/beehives/update/${editingBeehiveId}`, "PUT", payload, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      fetchBeehives();
      setBeehiveName("");
      setBeehiveDescription("");
      setBeehiveImages(null);
      setEditingBeehiveId(null);
      setShowModal(false);
    } catch (error) {
      setError(`Error al actualizar la colmena: ${error.message || "Problema de conexión"}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchData(`/beehives/delete/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      fetchBeehives();
    } catch (error) {
      setError("Error al borrar la colmena: " + (error.message || "No se ha podido borrar la colmena"));
    }
  };

  return (
    <div className="category-list">
      <h2>Colmenas</h2>
      {showModal && (
        <div className="modal">
          <h3>{modalType === "create" ? "Agregar Nueva Colmena" : "Editar Colmena"}</h3>
          <div>
            <label>Seleccionar Imagen:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <input
            type="text"
            className="category-input"
            placeholder="Nombre de la colmena"
            value={beehiveName}
            onChange={(e) => setBeehiveName(e.target.value)}
          />
          <textarea
            className="category-description"
            placeholder="Descripción de la colmena"
            value={beehiveDescription}
            onChange={(e) => setBeehiveDescription(e.target.value)}
          />
          <div className="buttonsModal">
            <button className="save-btn" onClick={modalType === "create" ? handleSave : handleUpdate}>
              {modalType === "create" ? "Guardar" : "Actualizar"}
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      <button className="add-category-btn" onClick={() => openModal("create")}>
        Agregar Colmena
      </button>

      {loading && <p className="loading">Cargando colmenas...</p>}
      {error && <p className="error">{error}</p>}

      <table className="category-table" border="1">
        <thead>
          <tr>
            <th className="idTh">ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
            <th className="actionTh">Imagenes</th>
          </tr>
        </thead>
        <tbody>
          {beehives.length > 0 ? (
            beehives.map((beehive) => (
              <tr key={beehive.beehive_id || beehive.id}>
                <td>{beehive.beehive_id || beehive.id}</td>
                <td>{beehive.name}</td>
                <td>{beehive.description}</td>
                <td>
                  {beehive.images.length > 0 ? (
                    <img width={"60rem"}
                      src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${beehive.images[0].image_url}`}
                      alt="Beehive"
                      className="beehive-image"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="buttonsTable">
                  <button className="edit-btn" onClick={() => openModal("edit", beehive)}>
                    <img src="/icons/edit.svg" alt="imagen edit" />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(beehive.beehive_id || beehive.id)}>
                    <img src="/icons/bin.svg" alt="bin image" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay colmenas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BeehiveList;

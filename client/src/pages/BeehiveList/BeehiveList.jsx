import { useCallback, useContext, useEffect, useState } from "react";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { PencilLine, Trash2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const BeehiveList = () => {
  const { t } = useTranslation();
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [beehiveName, setBeehiveName] = useState("");
  const [beehiveDescription, setBeehiveDescription] = useState("");
  const [beehiveLargeDescription, setBeehiveLargeDescription] = useState("");
  const [beehiveImages, setBeehiveImages] = useState([]);
  const [editingBeehiveId, setEditingBeehiveId] = useState(null);
  const { token } = useContext(UserContext);

  const fetchBeehives = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchData("/beehives/get", "GET");

      const beehives = await Promise.all(
        res.data.map(async (beehive) => {
          const resImages = await fetchData(
            `/beehives/images/${beehive.beehive_id}`,
            "GET"
          );
          return {
            beehive_id: beehive.beehive_id,
            name: beehive.name,
            short_description: beehive.short_description,
            large_description: beehive.large_description,
            images: resImages.data || [],
          };
        })
      );

      setBeehives(beehives);
    } catch (error) {
      console.log(error);
      toast.error(t("error_loading_beehives"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchBeehives();
  }, [fetchBeehives]);

  const openModal = (type, beehive = null) => {
    setModalType(type);
    setBeehiveName(beehive ? beehive.name : "");
    setBeehiveDescription(beehive ? beehive.short_description || "" : "");
    setBeehiveLargeDescription(beehive ? beehive.large_description || "" : "");
    setBeehiveImages(beehive ? beehive.images || [] : []);
    setEditingBeehiveId(beehive ? beehive.beehive_id : null);
    setShowModal(true);
  };

  const renameImageFile = (file) => {
    if (!(file instanceof File)) return file;
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop();
    const newName = `bee_${timestamp
      .toString()
      .slice(-4)}_${randomString}.${extension}`;
    return new File([file], newName, { type: file.type });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const renamedFiles = filesArray.map((file, index) =>
        renameImageFile(file, index)
      );
      setBeehiveImages((prevImages) => [...prevImages, ...renamedFiles]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!beehiveName.trim() || !beehiveDescription.trim()) {
      toast.error(t("error_fields_required"));
      return;
    }

    try {
      const beehiveData = {
        name: beehiveName,
        short_description: beehiveDescription,
        large_description: beehiveLargeDescription,
      };

      const newFormData = new FormData();
      newFormData.append("newBeehive", JSON.stringify(beehiveData));

      if (beehiveImages && beehiveImages.length > 0) {
        for (const elem of beehiveImages) {
          if (elem instanceof File) {
            newFormData.append("imgs", elem);
          }
        }
      }

      await fetchData("/beehives/create", "POST", newFormData, {
        Authorization: `Bearer ${token}`,
      });

      fetchBeehives();
      setBeehiveName("");
      setBeehiveDescription("");
      setBeehiveLargeDescription("");
      setBeehiveImages([]);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(t("error_create_beehive"));
    }
  };

  const handleUpdate = async () => {
    if (!beehiveName.trim() || !beehiveDescription.trim()) {
      toast.error(t("error_fields_required"));
      return;
    }

    try {
      const payload = {
        name: beehiveName,
        short_description: beehiveDescription,
        large_description: beehiveLargeDescription,
      };

      const newFormData = new FormData();
      newFormData.append("updatedBeehive", JSON.stringify(payload));

      if (beehiveImages && beehiveImages.length > 0) {
        for (const elem of beehiveImages) {
          if (elem instanceof File) {
            const renamedFile = renameImageFile(elem);
            newFormData.append("imgs", renamedFile);
          }
        }
      }

      await fetchData(
        `/beehives/update/${editingBeehiveId}`,
        "PUT",
        newFormData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      fetchBeehives();
      setBeehiveName("");
      setBeehiveDescription("");
      setBeehiveLargeDescription("");
      setBeehiveImages([]);
      setEditingBeehiveId(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(t("error_update_beehive"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchData(`/beehives/delete/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      fetchBeehives();
    } catch (error) {
      console.log(error);
      toast.error(t("error_delete_beehive"));
    }
  };

  const handleDeleteImage = async (imageId, beehiveId) => {
    try {
      await fetchData(`/beehives/images/${imageId}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });

      setBeehives((prev) =>
        prev.map((beehive) =>
          beehive.beehive_id === beehiveId
            ? {
                ...beehive,
                images: beehive.images.filter(
                  (img) => img.beehive_image_id !== imageId
                ),
              }
            : beehive
        )
      );

      setBeehiveImages((prev) =>
        prev.filter((img) => img.beehive_image_id !== imageId)
      );
    } catch (error) {
      toast.error(t("error_delete_image"));
    }
  };

  return (
    <div className="beehives-list">
      <h2>{t("beehives")}</h2>

      {showModal && (
        <div className="modal">
          <h3>
            {modalType === "create" ? t("add_beehive") : t("edit_beehive")}
          </h3>

          <label>{t("select_image")}:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />

          {modalType === "edit" && (
            <div>
              <h4>{t("current_images")}:</h4>
              <div className="image-container">
                {beehiveImages.length > 0 ? (
                  beehiveImages.map((image, index) => (
                    <div key={index} className="image-wrapper">
                      {image.image_url && (
                        <>
                          <img
                            style={{ width: "10rem" }}
                            src={`${
                              import.meta.env.VITE_SERVER_URL
                            }/images/beehives/${image.image_url}`}
                            alt="Beehive"
                          />
                          <X
                            size={28}
                            className="delete-img-btn"
                            onClick={() =>
                              handleDeleteImage(
                                image.beehive_image_id,
                                editingBeehiveId
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{t("no_image")}</p>
                )}
              </div>
            </div>
          )}

          <input
            type="text"
            className="category-input"
            placeholder={t("beehive_name")}
            value={beehiveName}
            onChange={(e) => setBeehiveName(e.target.value)}
          />
          <textarea
            className="category-description"
            placeholder={t("beehive_short_description")}
            value={beehiveDescription}
            onChange={(e) => setBeehiveDescription(e.target.value)}
          />
          <textarea
            className="category-description"
            placeholder={t("beehive_large_description")}
            value={beehiveLargeDescription}
            onChange={(e) => setBeehiveLargeDescription(e.target.value)}
          />

          <div className="buttonsModal">
            <button
              className="save-btn"
              onClick={modalType === "create" ? handleSave : handleUpdate}
            >
              {modalType === "create" ? t("save") : t("update")}
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              {t("cancel")}
            </button>
          </div>
        </div>
      )}

      <button className="add-category-btn" onClick={() => openModal("create")}>
        {t("add_beehive")}
      </button>

      {loading && <p className="loading">{t("loading_beehives")}</p>}

      <table className="category-table" border="1">
        <thead>
          <tr>
            <th className="idTh">ID</th>
            <th>{t("name")}</th>
            <th>{t("description")}</th>
            <th>{t("long_description")}</th>
            <th>{t("images")}</th>
            <th className="actionTh">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {beehives.length > 0 ? (
            beehives.map((beehive) => (
              <tr key={beehive.beehive_id}>
                <td>{beehive.beehive_id}</td>
                <td>{beehive.name}</td>
                <td>{beehive.short_description}</td>
                <td>{beehive.large_description}</td>
                <td>
                  {beehive?.images?.length > 0 ? (
                    <div className="image-container" width="10rem">
                      {beehive.images.map((image, index) => (
                        <div key={index} className="image-wrapper">
                          <img
                            width="60"
                            src={`${
                              import.meta.env.VITE_SERVER_URL
                            }/images/beehives/${image.image_url}`}
                            alt="Beehive"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{t("no_image")}</span>
                  )}
                </td>
                <td className="buttonsTable">
                  <button
                    className="edit-btn"
                    onClick={() => openModal("edit", beehive)}
                  >
                    <PencilLine size={28} color="black" />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(beehive.beehive_id)}
                  >
                    <Trash2 size={28} color="black" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{t("no_beehives")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

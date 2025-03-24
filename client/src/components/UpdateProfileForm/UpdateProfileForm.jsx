import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const UpdateProfileForm = () => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ ...user });
  const [image, setImage] = useState(user?.image);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form className="profile-content">
      {/* IMAGEN */}
      <div className="profile-left">
        <img src={image || "/images/user-placeholder.png"} alt="Perfil" />
        {isEditing && <input type="file" onChange={handleFileChange} />}
      </div>

      {/* DATOS PERSONALES */}
      <div className="profile-right">
        <div className="profile-field">
          <label htmlFor="name">{t("name")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          ) : (
            <span>{user?.name}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="lastname">{t("last_name")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          ) : (
            <span>{user?.lastname}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email:</label>
          <span>{user?.email}</span>
        </div>

        <div className="profile-field">
          <label htmlFor="password">{t("password")}:</label>
          {isEditing ? (
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          ) : (
            <span>••••••••</span>
          )}
        </div>

        {isEditing && (
          <div className="profile-field">
            <label htmlFor="confirmPassword">{t("confirm_password")}:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
        )}

        <div className="profile-field">
          <label htmlFor="dni">DNI:</label>
          <span>{user?.dni}</span>
        </div>

        <div className="profile-field">
          <label htmlFor="phone_number">{t("phone")}:</label>
          {isEditing ? (
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
          ) : (
            <span>{user?.phone_number}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="address">{t("address")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          ) : (
            <span>{user?.address || "No especificada"}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="city">{t("city")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          ) : (
            <span>{user?.city}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="province">{t("province")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
            />
          ) : (
            <span>{user?.province}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="zipcode">{t("zipcode")}:</label>
          {isEditing ? (
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={(e) =>
                setFormData({ ...formData, zipcode: e.target.value })
              }
            />
          ) : (
            <span>{user?.zipcode}</span>
          )}
        </div>

        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? t("save_changes") : t("edit_profile")}
        </button>
      </div>
    </form>
  );
};

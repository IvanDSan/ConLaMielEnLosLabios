import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './styles.css';

export const UpdateProfileForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ ...user });
  const [image, setImage] = useState(user?.image);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form className="profile-content">
      {/** IMAGEN */}
      <div className="profile-left">
        <img src={image || '/images/user-placeholder.png'} alt="Perfil" />
        {isEditing && <input type="file" onChange={handleFileChange} />}
      </div>

      {/** DATOS PERSONALES */}
      <div className="profile-right">
        <div className="profile-field">
          <label htmlFor="name">Nombre:</label>
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
            <span>{user && user.name}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="lastname">
            <strong>Apellidos:</strong>
          </label>
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
          <label htmlFor="email">
            <strong>Email:</strong>
          </label>
          <span>{user?.email}</span>
        </div>

        <div className="profile-field">
          <label htmlFor="password">
            <strong>Contraseña:</strong>
          </label>
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
            <label htmlFor="confirmPassword">
              <strong>Repetir contraseña:</strong>
            </label>
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
          <label htmlFor="dni">
            <strong>DNI:</strong>
          </label>
          <span>{user?.dni}</span>
        </div>

        <div className="profile-field">
          <label htmlFor="phone_number">
            <strong>Teléfono:</strong>
          </label>
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
          <label htmlFor="address">
            <strong>Dirección:</strong>
          </label>
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
            <span>{user?.address || 'No especificada'}</span>
          )}
        </div>

        <div className="profile-field">
          <label htmlFor="city">
            <strong>Ciudad:</strong>
          </label>
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
          <label htmlFor="province">
            <strong>Provincia:</strong>
          </label>
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
          <label htmlFor="zipcode">
            <strong>Código Postal:</strong>
          </label>
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
          {isEditing ? 'Guardar cambios' : 'Editar perfil'}
        </button>
      </div>
    </form>
  );
};

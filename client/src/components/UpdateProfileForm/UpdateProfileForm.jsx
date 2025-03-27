import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './styles.css';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';

export const UpdateProfileForm = () => {
  const { user, setUser, token } = useContext(UserContext);

  const initialState = {
    name: user?.name,
    lastname: user?.lastname,
    email: user?.email,
    dni: user?.dni,
    phoneNumber: user?.phone_number,
    city: user?.city,
    province: user?.province,
    address: user?.address,
    zipcode: user?.zipcode,
  };

  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        const newFormData = new FormData();

        // Agregar cada campo manualmente a FormData
        Object.entries(formData).forEach(([key, value]) => {
          if (value) newFormData.append(key, value);
        });

        if (image) {
          newFormData.append('img', image);
        }

        const response = await fetchData('/users/edit', 'PUT', newFormData, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          setUser(response.data.user);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        toast.error('Error al enviar el formulario. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <form className="profile-content">
      {/** IMAGEN */}
      <div className="profile-left">
        <img
          src={
            (user?.image &&
              `${import.meta.env.VITE_SERVER_URL}/images/users/${
                user?.image
              }`) ||
            '/images/user-placeholder.png'
          }
          alt="Perfil"
        />
        {isEditing && <input type="file" onChange={handleFileChange} />}
      </div>

      {/** DATOS PERSONALES */}
      <div className="profile-right">
        <div className="form-field">
          <p>
            <strong>Email: </strong>
            {user?.email}
          </p>
        </div>
        <div className="form-field">
          <p>
            <strong>Contraseña:</strong>
          </p>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          ) : (
            <span>********</span>
          )}
        </div>
        {isEditing && (
          <div className="form-field">
            <p>
              <strong>Confirmar contraseña:</strong>
            </p>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="form-field">
          <p>
            <strong>Nombre:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.name}</span>
          )}
        </div>
        <div className="form-field">
          <p>
            <strong>Apellidos:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastname}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.lastname}</span>
          )}
        </div>
        <div className="form-field">
          <p>
            <strong>DNI:</strong> {user?.dni}
          </p>
        </div>
        <div className="form-field">
          <p>
            <strong>Teléfono:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.phone_number}</span>
          )}
        </div>
        <div className="form-field">
          <p>
            <strong>Provincia:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.province}</span>
          )}
        </div>
        <div className="form-field">
          <p>
            <strong>Ciudad:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.city}</span>
          )}
        </div>

        <div className="form-field">
          <p>
            <strong>Dirección:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.address}</span>
          )}
        </div>

        <div className="form-field">
          <p>
            <strong>Código Postal:</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          ) : (
            <span>{user?.zipcode}</span>
          )}
        </div>

        <button type="button" onClick={handleSubmit}>
          {isEditing ? 'Guardar cambios' : 'Editar perfil'}
        </button>
      </div>
    </form>
  );
};

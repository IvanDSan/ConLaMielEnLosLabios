import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';
import { useTranslation } from 'react-i18next';
import './styles.css';

export const UpdateProfileForm = () => {
  const { user, setUser, token } = useContext(UserContext);
  const { t } = useTranslation();

  const initialState = {
    name: user?.name || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    dni: user?.dni || '',
    phoneNumber: user?.phone_number || '',
    city: user?.city || '',
    province: user?.province || '',
    address: user?.address || '',
    zipcode: user?.zipcode || '',
    password: '',
    confirmPassword: '',
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
      return;
    }

    try {
      const newFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) newFormData.append(key, value);
      });
      if (image) newFormData.append('img', image);

      const response = await fetchData('/users/edit', 'PUT', newFormData, {
        Authorization: `Bearer ${token}`,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success(t('profile_updated'));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('error_saving_profile'));
    }
  };

  return (
    <form className="profile-content" onSubmit={handleSubmit}>
      <div className="profile-left">
        <img
          src={
            user?.image
              ? `${import.meta.env.VITE_SERVER_URL}/images/users/${user.image}`
              : '/images/user-placeholder.png'
          }
          alt="Perfil"
        />
        {isEditing && <input type="file" onChange={handleFileChange} />}
      </div>
      <div className="profile-right">
        {[
          'name',
          'lastname',
          'email',
          'dni',
          'phoneNumber',
          'city',
          'province',
          'address',
          'zipcode',
        ].map((field) => (
          <div className="profile-field" key={field}>
            <label htmlFor={field}>{t(field)}:</label>
            {isEditing ? (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <span>{user?.[field] || 'N/A'}</span>
            )}
          </div>
        ))}

        {isEditing && (
          <>
            <div className="profile-field">
              <label htmlFor="password">{t('password')}:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="confirmPassword">{t('confirm_password')}:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? t('save_changes') : t('edit_profile')}
        </button>
      </div>
    </form>
  );
};

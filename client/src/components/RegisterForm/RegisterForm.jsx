import { useState } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import './styles.css';
import { SpinnerLoading } from '../SpinnerLoading/SpinnerLoading';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  lastname: '',
  dni: '',
  phoneNumber: '',
  city: '',
  province: '',
  address: '',
  zipcode: '',
};

export const RegisterForm = ({ onCancelClick, onClose }) => {
  const [registerForm, setRegisterForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [showValidateMessage, setShowValidateMessage] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('registerData', JSON.stringify(registerForm));
    formData.append('img', image);

    try {
      const res = await fetchData('/users/register', 'POST', formData);

      if (res.status === 201) {
        setShowValidateMessage(true);
      }
    } catch (err) {
      console.log(err);
      setErrors([...errors, err.response.data.error[0]]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    const {
      email,
      password,
      confirmPassword,
      name,
      lastname,
      dni,
      phoneNumber,
      city,
      province,
      address,
      zipcode,
    } = registerForm;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    if (!email) newErrors.push('email');
    if (!password || password.length < 8 || !passwordRegex.test(password))
      newErrors.push('password');
    if (!confirmPassword) newErrors.push('confirmPassword');
    if (!name || name.length < 2) newErrors.push('name');
    if (!lastname || lastname.length < 2) newErrors.push('lastname');
    if (!dni) newErrors.push('dni');
    if (!phoneNumber || phoneNumber.length < 9 || phoneNumber.length > 15)
      newErrors.push('phoneNumber');
    if (!city || city.length < 2) newErrors.push('city');
    if (!province || province.length < 2) newErrors.push('province');
    if (!address || address.length < 5) newErrors.push('address');
    if (!zipcode || zipcode.length < 5) newErrors.push('zipcode');

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.push('passwordMismatch');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {!showValidateMessage ? (
        <>
          <div className="register">
            <div>
              <label htmlFor="email">
                Email *
                <input
                  type="email"
                  name="email"
                  placeholder="Introduce tu email"
                  required
                  value={registerForm.email}
                  onChange={handleChange}
                  style={
                    errors.includes('email') ? { border: '1px solid red' } : {}
                  }
                />
              </label>

              <label htmlFor="password">
                Password *
                <input
                  type="password"
                  name="password"
                  placeholder="Introduce tu password"
                  autoComplete="off"
                  required
                  value={registerForm.password}
                  onChange={handleChange}
                  style={
                    errors.includes('confirmPassword') ||
                    errors.includes('passwordMismatch')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="confirmPassword">
                Confirmar Password *
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirma tu password"
                  autoComplete="off"
                  required
                  value={registerForm.confirmPassword}
                  onChange={handleChange}
                  style={
                    errors.includes('confirmPassword') ||
                    errors.includes('passwordMismatch')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="name">
                Nombre *
                <input
                  type="text"
                  name="name"
                  placeholder="Introduce tu nombre"
                  required
                  value={registerForm.name}
                  onChange={handleChange}
                  style={
                    errors.includes('name') ? { border: '1px solid red' } : {}
                  }
                />
              </label>

              <label htmlFor="lastname">
                Apellido *
                <input
                  type="text"
                  name="lastname"
                  placeholder="Introduce tu apellido"
                  required
                  value={registerForm.lastname}
                  onChange={handleChange}
                  style={
                    errors.includes('lastname')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="dni">
                DNI *
                <input
                  type="text"
                  name="dni"
                  placeholder="Introduce tu DNI"
                  required
                  value={registerForm.dni}
                  onChange={handleChange}
                  style={
                    errors.includes('dni') ? { border: '1px solid red' } : {}
                  }
                />
              </label>
            </div>

            <div>
              <label htmlFor="phoneNumber">
                Teléfono *
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Introduce tu teléfono"
                  required
                  value={registerForm.phoneNumber}
                  onChange={handleChange}
                  style={
                    errors.includes('phoneNumber')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="city">
                Ciudad *
                <input
                  type="text"
                  name="city"
                  placeholder="Introduce tu ciudad"
                  required
                  value={registerForm.city}
                  onChange={handleChange}
                  style={
                    errors.includes('city') ? { border: '1px solid red' } : {}
                  }
                />
              </label>

              <label htmlFor="province">
                Provincia *
                <input
                  type="text"
                  name="province"
                  placeholder="Introduce tu provincia"
                  required
                  value={registerForm.province}
                  onChange={handleChange}
                  style={
                    errors.includes('province')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="address">
                Dirección *
                <input
                  type="text"
                  name="address"
                  placeholder="Introduce tu dirección"
                  required
                  value={registerForm.address}
                  onChange={handleChange}
                  style={
                    errors.includes('address')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="zipcode">
                Código Postal *
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Introduce tu código postal"
                  required
                  value={registerForm.zipcode}
                  onChange={handleChange}
                  style={
                    errors.includes('zipcode')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </label>

              <label htmlFor="imagen">
                Imagen de perfil
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleFile}
                />
              </label>
            </div>
          </div>

          {errors.includes('fetchError') && (
            <span className="error">{errors[0]}</span>
          )}

          <button type="submit">
            {loading ? <SpinnerLoading /> : 'Registrar'}
          </button>
          <button type="button" onClick={onCancelClick}>
            Volver
          </button>
        </>
      ) : (
        <>
          <p>
            Para poder usar tu cuenta antes tienes que verificarla. Revisa tu
            correo electrónico.
          </p>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </>
      )}

      <div>
        <img src="/images/panal.svg" alt="panal" />
      </div>
    </form>
  );
};

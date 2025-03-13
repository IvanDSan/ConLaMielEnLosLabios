import { useState } from 'react';
import { fetchData } from '../../helpers/axiosHelper';
import './styles.css';
import { SpinnerLoading } from '../SpinnerLoading/SpinnerLoading';

export const RecoverPasswordForm = ({ onLoginClick, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetchData('/users/recoveryPassword', 'POST', {
        email,
      });

      if (response.status === 200) {
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <h2>Recuperar contraseña</h2>

          <label htmlFor="email">
            Email *
            <input
              type="email"
              name="email"
              placeholder="Introduce tu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit" className="btn-primary">
            {loading ? <SpinnerLoading /> : 'Recuperar contraseña'}
          </button>
          <button type="button" className="btn-primary" onClick={onLoginClick}>
            Volver
          </button>

          <div>
            <img src="/images/panal.svg" alt="panal" />
          </div>
        </form>
      ) : (
        <div className="message">
          <p>
            Si tu correo está registrado en nuestros sitemas, recibirás un correo
            con tu nueva contraseña. La podrás cambiar cuando quieras desde tu
            perfil de usuario.
          </p>
          <button onClick={onClose}>Volver</button>
        </div>
      )}
    </>
  );
};

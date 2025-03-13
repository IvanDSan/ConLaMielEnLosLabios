import { useContext, useState } from 'react';
import './styles.css';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';
import { SpinnerLoading } from '../SpinnerLoading/SpinnerLoading';

export const LoginForm = ({
  onRegisterClick,
  onRecoverPasswordClick,
  onClose,
}) => {
  const { setToken } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchData('/users/login', 'POST', loginForm);

      if (res.status === 200) {
        setToken(res.data.token);
        onClose();
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <label htmlFor="email">
        Email *
        <input
          type="email"
          name="email"
          placeholder="Introduce tu email"
          required
          value={loginForm.email}
          onChange={handleChange}
          style={error ? { border: '1px solid red' } : {}}
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
          value={loginForm.password}
          onChange={handleChange}
          style={error ? { border: '1px solid red' } : {}}
        />
      </label>

      <button type="submit" className="btn-primary">
        {!loading ? 'Iniciar sesión' : <SpinnerLoading />}
      </button>

      {error && <span className="error">{error}</span>}

      <div>
        <p className="link" onClick={onRecoverPasswordClick}>
          ¿Olvidaste tu contraseña?
        </p>
        <p className="link" onClick={onRegisterClick}>
          ¿No tienes una cuenta? <span>Regístrate</span>
        </p>
        <img src="/images/panal.svg" alt="panal" />
      </div>
    </form>
  );
};

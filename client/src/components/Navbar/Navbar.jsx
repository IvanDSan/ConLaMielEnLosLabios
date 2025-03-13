import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { RecoverPasswordForm } from '../RecoverPasswordForm/RecoverPasswordForm';
import './styles.css';
import { UserContext } from '../../context/UserContext';

export const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [recoverPassword, setRecoverPassword] = useState(false);

  const navigate = useNavigate();

  const changeModal = (modal) => {
    if (modal === 'login') {
      setLogin(true);
      setRegister(false);
      setRecoverPassword(false);
    } else if (modal === 'register') {
      setLogin(false);
      setRegister(true);
      setRecoverPassword(false);
    } else if (modal === 'recoverPassword') {
      setLogin(false);
      setRegister(false);
      setRecoverPassword(true);
    }
  };

  const handleLoginClick = () => {
    if (!user) {
      changeModal('login');
      setIsOpen(true);
    } else {
      logout();
    }
  };

  return (
    <>
      <header className="container">
        <nav>
          <div className="left">
            <img
              src="/images/logo.svg"
              alt="logo"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
            <ul>
              <li>
                <NavLink
                  to="/tienda"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Nuestra tienda
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/talleres"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Cursos y talleres
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apadrina"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Apoya una colmena
                </NavLink>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <NavLink
                to="/carrito"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <img src="/images/cart.svg" alt="cart" />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/images/users/${
                      user.image
                    }`}
                    alt="profile"
                    className="profile-img"
                  />
                </NavLink>
              </li>
            )}
            <li>
              <img
                src={`/images/${user ? 'logout' : 'login'}.svg`}
                alt="login"
                style={{ cursor: 'pointer' }}
                onClick={handleLoginClick}
              />
            </li>
          </ul>
        </nav>
      </header>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {login && (
          <LoginForm
            onRegisterClick={() => changeModal('register')}
            onRecoverPasswordClick={() => changeModal('recoverPassword')}
            onClose={() => setIsOpen(false)}
          />
        )}
        {register && (
          <RegisterForm
            onCancelClick={() => changeModal('login')}
            onClose={() => setIsOpen(false)}
          />
        )}
        {recoverPassword && (
          <RecoverPasswordForm
            onLoginClick={() => changeModal('login')}
            onClose={() => setIsOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

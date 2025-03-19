import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { RecoverPasswordForm } from '../RecoverPasswordForm/RecoverPasswordForm';
import { UserContext } from '../../context/UserContext';
import './styles.css';

export const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [recoverPassword, setRecoverPassword] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      navigate('/');
    }
  };

  return (
    <>
      <header>
        <nav>
          <img
            src="/images/logo.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate('/')}
          />
          <div className="links">
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
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Nuestras colmenas
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
                <img src="/icons/cart.svg" alt="cart" />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/icons/users/${
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
                src={`/icons/${user ? 'logout' : 'login'}.svg`}
                alt="login"
                style={{ cursor: 'pointer' }}
                onClick={handleLoginClick}
              />
            </li>
            <li className="hamburger">
              <img
                src="/icons/hamburger.svg"
                alt="search"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            </li>
          </ul>
          <div className={`mobile-menu ${showMobileMenu ? 'open' : ''}`}>
            <img
              src="/icons/close.svg"
              alt="close"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowMobileMenu(false)}
              className="close-icon"
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
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Nuestras colmenas
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
            <img src="/icons/panal.svg" alt="panal" className="panal-icon" />
          </div>
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

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from '../Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { RecoverPasswordForm } from '../RecoverPasswordForm/RecoverPasswordForm';
import './styles.css';

export const Navbar = () => {
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
            <li>
              <NavLink
                to="/perfil"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <img src="/images/person.svg" alt="profile" />
              </NavLink>
            </li>
            <li>
              <img
                src="/images/login.svg"
                alt="login"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsOpen(true);
                  changeModal('login');
                }}
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
        {register && <RegisterForm onLoginClick={() => changeModal('login')} />}
        {recoverPassword && (
          <RecoverPasswordForm onLoginClick={() => changeModal('login')} />
        )}
      </Modal>
    </>
  );
};

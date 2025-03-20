import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const NavbarAdmin = () => {
  const { logout } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="container">
        <nav className="navBarAdmin">
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
                  to="/productos"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categorias"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Categorias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usuarios"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/suscripciones"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Suscripciones
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Colmenas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ventas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Ventas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/*"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                ></NavLink>
              </li>
            </ul>
          </div>

          <ul>
            <li>
              <img
                src="/icons/logout.svg"
                alt="logout"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
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
                  to="/productos"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categorias"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Categorias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usuarios"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/suscripciones"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Suscripciones
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Colmenas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ventas"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Ventas
                </NavLink>
              </li>
            </ul>
            <img src="/icons/panal.svg" alt="panal" className="panal-icon" />
          </div>
        </nav>
      </header>
    </>
  );
};

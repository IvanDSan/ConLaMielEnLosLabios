import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { LogOut, Menu, X } from 'lucide-react';

export const NavbarAdmin = () => {
  const { logout } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav className="navBarAdmin">
          <img
            src="/images/logo.svg"
            alt="l  ogo"
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
              <a href="#">
                <LogOut
                  size={24}
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                />
              </a>
            </li>
            <li className="hamburger">
              <a href="#">
                <Menu
                  size={28}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                />
              </a>
            </li>
          </ul>

          <div className={`mobile-menu ${showMobileMenu ? 'open' : ''}`}>
            <a href="#">
              <X
                size={28}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="close-icon"
              />
            </a>
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

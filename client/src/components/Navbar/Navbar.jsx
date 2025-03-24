import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { RecoverPasswordForm } from "../RecoverPasswordForm/RecoverPasswordForm";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContextProvider";
import { LogOut, Menu, ShoppingCart, UserRound, X } from "lucide-react";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(UserContext);
  const { getNumberOfTotalProducts } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [recoverPassword, setRecoverPassword] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  const changeModal = (modal) => {
    if (modal === "login") {
      setLogin(true);
      setRegister(false);
      setRecoverPassword(false);
    } else if (modal === "register") {
      setLogin(false);
      setRegister(true);
      setRecoverPassword(false);
    } else if (modal === "recoverPassword") {
      setLogin(false);
      setRegister(false);
      setRecoverPassword(true);
    }
  };

  const handleLoginClick = () => {
    if (!user) {
      changeModal("login");
      setIsOpen(true);
    } else {
      logout();
      navigate("/");
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
            onClick={() => navigate("/")}
          />
          <div className="links">
            <ul>
              <li>
                <NavLink
                  to="/tienda"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("our_store")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("our_beehives")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/talleres"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("workshops_visits")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apadrina"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("sponsor_beehive")}
                </NavLink>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <NavLink
                to="/carrito"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="cart-container">
                  {user && (
                    <span className="cart-quantity">
                      {getNumberOfTotalProducts()}
                    </span>
                  )}
                  <ShoppingCart size={28} />
                </div>
              </NavLink>
            </li>
            {user && (
              <li
                className="profile-img"
                onClick={() => setShowUserMenu(!showUserMenu)}
                onMouseLeave={() => setShowUserMenu(false)}
                onMouseEnter={() => setShowUserMenu(true)}
              >
                <img
                  src={`${
                    user.image
                      ? import.meta.env.VITE_SERVER_URL +
                        "/images/users/" +
                        user.image
                      : "/images/user-placeholder.png"
                  }`}
                  alt="profile"
                  className="profile-img"
                />
                {showUserMenu && (
                  <ul className="user-menu">
                    <li>
                      <NavLink
                        to="/perfil"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {t("profile")}
                      </NavLink>
                    </li>
                    <div className="separator"></div>
                    <li>
                      <NavLink
                        to="/pedidos"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {t("my_orders")}
                      </NavLink>
                    </li>
                    <div className="separator"></div>
                    <li>
                      <NavLink
                        to="/suscripciones"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {t("my_subscriptions")}
                      </NavLink>
                    </li>
                    <div className="separator"></div>
                    <li>
                      <a href="#" onClick={handleLoginClick}>
                        {t("logout")}
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li>
              <a href="#">
                {!user ? (
                  <UserRound size={28} onClick={handleLoginClick} />
                ) : (
                  <LogOut size={28} onClick={handleLoginClick} />
                )}
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
          <div className={`mobile-menu ${showMobileMenu ? "open" : ""}`}>
            <a href="#">
              <X
                size={28}
                onClick={() => setShowMobileMenu(false)}
                className="close-icon"
              />
            </a>
            <ul>
              <li>
                <NavLink
                  to="/tienda"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("our_store")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/colmenas"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("our_beehives")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/talleres"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("workshops_visits")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/apadrina"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {t("sponsor_beehive")}
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
            onRegisterClick={() => changeModal("register")}
            onRecoverPasswordClick={() => changeModal("recoverPassword")}
            onClose={() => {
              setIsOpen(false);
              navigate("/");
            }}
          />
        )}
        {register && (
          <RegisterForm
            onCancelClick={() => changeModal("login")}
            onClose={() => setIsOpen(false)}
          />
        )}
        {recoverPassword && (
          <RecoverPasswordForm
            onLoginClick={() => changeModal("login")}
            onClose={() => setIsOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

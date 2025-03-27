import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { LogOut, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const NavbarAdmin = () => {
  const { t } = useTranslation();
  const { logout } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav className="navBarAdmin">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
          />
          <div className="links">
            <ul>
              <li>
                <NavLink to="/productos">{t("admin_products")}</NavLink>
              </li>
              <li>
                <NavLink to="/categorias">{t("admin_categories")}</NavLink>
              </li>
              <li>
                <NavLink to="/usuarios">{t("admin_users")}</NavLink>
              </li>
              <li>
                <NavLink to="/suscripciones">
                  {t("admin_subscriptions")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/colmenas">{t("admin_beehives")}</NavLink>
              </li>
              <li>
                <NavLink to="/ventas">{t("admin_sales")}</NavLink>
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
                    navigate("/");
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
                <NavLink to="/productos">{t("admin_products")}</NavLink>
              </li>
              <li>
                <NavLink to="/categorias">{t("admin_categories")}</NavLink>
              </li>
              <li>
                <NavLink to="/usuarios">{t("admin_users")}</NavLink>
              </li>
              <li>
                <NavLink to="/suscripciones">
                  {t("admin_subscriptions")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/colmenas">{t("admin_beehives")}</NavLink>
              </li>
              <li>
                <NavLink to="/ventas">{t("admin_sales")}</NavLink>
              </li>
            </ul>
            <img src="/icons/panal.svg" alt="panal" className="panal-icon" />
          </div>
        </nav>
      </header>
    </>
  );
};

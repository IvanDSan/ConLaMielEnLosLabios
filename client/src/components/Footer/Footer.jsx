import {
  GlobeLock,
  Handshake,
  Home,
  PencilRuler,
  ReceiptText,
  Store,
} from "lucide-react";
import "./styles.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    {
      img: <Home />,
      href: "/",
      name: t("home"),
    },
    {
      img: <Handshake />,
      href: "/apadrina",
      name: t("sponsor_beehive"),
    },
    {
      img: <PencilRuler />,
      href: "/talleres",
      name: t("workshops_visits"),
    },
    {
      img: <Store />,
      href: "/tienda",
      name: t("our_store"),
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="flex">
          <div className="links">
            {links.map((link, index) => (
              <a href={link.href} key={index}>
                {link.img}
                <p>{link.name}</p>
              </a>
            ))}
          </div>

          <div className="separator"></div>

          <div className="social">
            <p>{t("follow_us_instagram")}</p>
            <img src="/icons/footer-instagram.svg" alt="Instagram" />
          </div>

          <div className="separator"></div>

          <div className="terms">
            <a href="#">
              <ReceiptText />
              {t("terms_conditions")}
            </a>
            <a href="#">
              <GlobeLock />
              {t("privacy_policy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

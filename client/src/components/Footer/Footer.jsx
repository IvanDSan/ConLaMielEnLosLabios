import { GlobeLock, Handshake, Home, PencilRuler, ReceiptText, Store } from 'lucide-react';
import './styles.css';

const links = [
  {
    img: <Home />,
    href: '/',
    name: 'Inicio',
  },
  {
    img: <Handshake />,
    href: '/apadrina',
    name: 'Apadrina',
  },
  {
    img: <PencilRuler />,
    href: '/talleres',
    name: 'Talleres y visitas',
  },
  {
    img: <Store />,
    href: '/tienda',
    name: 'Tienda',
  },
];

export const Footer = () => {
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
            <p>¡Síguenos en Instagram!</p>
            <img src="/icons/footer-instagram.svg" alt="Instagram" />
          </div>
          <div className="separator"></div>
          <div className="terms">
            <a href="#">
              <ReceiptText />
              Términos y condiciones
            </a>
            <a href="#">
              <GlobeLock />
              Políticas de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

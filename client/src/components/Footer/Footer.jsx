import './styles.css';

const links = [
  {
    img: '/icons/footer-home.svg',
    href: '/',
    name: 'Inicio',
  },
  {
    img: '/icons/footer-deal.svg',
    href: '/apadrina',
    name: 'Apadrina',
  },
  {
    img: '/icons/footer-bee.svg',
    href: '/talleres',
    name: 'Talleres y visitas',
  },
  {
    img: '/icons/footer-shop.svg',
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
                <img src={link.img} alt={link.name} />
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
            <a href="#">Términos y condiciones</a>
            <a href="#">Políticas de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

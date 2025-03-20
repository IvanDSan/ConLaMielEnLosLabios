import { Hero } from './views/Hero/Hero';
import { ApadrinaSection } from './views/ApadrinaSection/ApadrinaSection';
import { ColmenasSection } from './views/ColmenasSection/ColmenasSection';
import { ReservaTuVisitaSection } from './views/ReservaTuVisitaSection/ReservaTuVisitaSection';
import { TiendaSection } from './views/TiendaSection/TiendaSection';
import { TalleresSection } from './views/TalleresSection/TalleresSection';
import { ContactoSection } from './views/ContactoSection/ContactoSection';

export const Home = () => {
  return (
    <>
      <Hero />
      <ApadrinaSection />
      <ReservaTuVisitaSection />
      <ColmenasSection />
      <TiendaSection />
      <TalleresSection />
      <ContactoSection />
    </>
  );
};

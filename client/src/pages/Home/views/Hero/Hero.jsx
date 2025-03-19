import './styles.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="flex">
          <div className="left">
            <h1>Con la miel en los labios</h1>
            <h4>Endulza tu vida, salva las abejas</h4>
          </div>
          {/* <div className="right">
            <img src="/images/logo.svg" alt="hero" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

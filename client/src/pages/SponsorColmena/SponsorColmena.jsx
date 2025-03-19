import React from "react";
import "./Styles.css";

export const SponsorColmena = () => {
  const subscriptionTiers = [
    {
      title: "Single",
      description:
        "Patrocinio anual individual que incluye acceso a contenido exclusivo y descuentos en productos.",
      price: "70.00€",
    },
    {
      title: "Pro",
      description:
        "Patrocinio premium con ventajas exclusivas como visitas a colmenares y productos personalizados.",
      price: "110.00€",
    },
  ];
  const galleryImages = [
    "/images/colmenas/caja1.png",
    "/images/colmenas/caja2.png",
    "/images/colmenas/caja3.png",
    "/images/colmenas/caja4.png",
  ];

  const testimonials = [
    {
      comment: "¡Gran iniciativa para salvar abejas!",
      name: "María G.",
      rating: "★★★★★",
    },
    {
      comment: "La miel es deliciosa y apoyo una buena causa.",
      name: "Juan P.",
      rating: "★★★★★",
    },
    {
      comment: "Excelente servicio y compromiso.",
      name: "Ana R.",
      rating: "★★★★★",
    },
  ];

  return (
    <div className="subscriptions-container">
      <div className="header">
        <h1>¡HAZ LA DIFERENCIA!</h1>
        <h1>Apadrina una colmena y salva abejas</h1>
        <p>
          Disfruta de miel exclusiva, ayuda a la biodiversidad y vive una
          experiencia única en el campo
        </p>
      </div>
      <div className="subscription-tiers">
        {subscriptionTiers.map((tier, index) => (
          <div className="tier-card" key={index}>
            <div className="title">{tier.title}</div>
            <div className="description">{tier.description}</div>
            <div className="price">{tier.price}</div>
            <button className="button">Seleccionar</button>
          </div>
        ))}
      </div>
      <div className="gallery">
        <h2>Nuestras Colmenas</h2>
        <div className="gallery-grid">
          {galleryImages.map((src, index) => (
            <div className="gallery-item" key={index}>
              <img src={src} alt={`Beehive ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="testimonials">
        <h2>Las opiniones de nuestros clientes son muy importantes</h2>
        <div className="testimonial-cards">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="comment">"{testimonial.comment}"</div>
              <div className="name">{testimonial.name}</div>
              <div className="rating">{testimonial.rating}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

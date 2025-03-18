import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { ProductCard } from '../ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

const apiURL = import.meta.env.VITE_SERVER_URL;

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} customArrow customPrev`}
      onClick={onClick}
    ></div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} customArrow customNext`}
      onClick={onClick}
    ></div>
  );
};

export const ProductsGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiURL}/products/all`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error al obtener los productos:', err);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 productos en escritorio
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 productos en tablets
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 1 producto en móviles
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="galleryContainer">
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </Slider>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { ProductsGallery } from "../../../../components/ProductsGallery/ProductsGallery";
import { useTranslation } from "react-i18next";
import "./styles.css";

export const TiendaSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="tienda-section">
      <div className="info">
        <h2>{t("our_products")}</h2>
        <p>{t("explore_beekeeping_products")}</p>
      </div>
      <div className="container">
        <div className="flex">
          <ProductsGallery />
          <button onClick={() => navigate("/tienda")}>{t("view_store")}</button>
        </div>
      </div>
    </section>
  );
};

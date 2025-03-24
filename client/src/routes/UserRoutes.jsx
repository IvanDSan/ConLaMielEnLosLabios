/** REACT UTILS */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/** PAGES */
import { Home } from "../pages/Home/Home";
import { Store } from "../pages/Store/Store";
import { SponsorColmena } from "../pages/SponsorColmena/sponsorColmena";
import { Talleres } from "../pages/TalleresForm/TalleresForm";
import { ShoppingCart } from "../pages/ShoppingCart/ShoppingCart";
import { BeehivesView } from "../pages/BeehivesView/BeehivesView";
import { BeehiveIndividual } from "../pages/IndividualBeehive/BeehiveIndividual";
import { VerifyEmail } from "../pages/VerifyEmail/VerifyEmail";
import { UserOrders } from "../pages/UserPedidos/UserOrders";
import { ProductDetail } from "../pages/ProductDetail/ProductDetail";
import { SponsorColmenaType } from "../pages/SponsorColmenaType/SponsorColmenaType";
import { SponsorColmenaConfirmation } from "../pages/SponsorColmenaConfirmation/SponsorColmenaConfirmation";
import { Profile } from "../pages/Profile/Profile";

/** COMPONENTS */
import { Navbar } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export const UserRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/apadrina" element={<SponsorColmena />} />
          <Route path="/apadrina/:id" element={<SponsorColmenaType />} />
          <Route
            path="/apadrina/confirmation"
            element={<SponsorColmenaConfirmation />}
          />
          <Route path="/talleres" element={<Talleres />} />
          <Route path="/carrito" element={<ShoppingCart />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/colmenas" element={<BeehivesView />} />
          <Route path="/colmenas/:id" element={<BeehiveIndividual />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/pedidos" element={<UserOrders />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/suscripciones" element={<h1>Suscripciones</h1>} />
          <Route path="/*" element={<h1>404</h1>} />
        </Routes>
        <ToastContainer position="top-left" autoClose={3000} />
      </main>

      <Footer />
    </BrowserRouter>
  );
};

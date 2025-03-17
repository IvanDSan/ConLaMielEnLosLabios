import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import CategoryList from "../pages/CategoryList/CategoryList";
import { UserContext } from "../context/UserContext";
import { Sales } from "../pages/Sales/Sales";
import { VerifyEmail } from "../pages/VerifyEmail/VerifyEmail";
import { SpinnerLoading } from "../components/SpinnerLoading/SpinnerLoading";
import { Store } from "../pages/Store/Store";
import { Products } from "../components/Products/Products";
import { UserManagement } from "../components/UserManagement/UserManagement";
import { ProductDetail } from "../pages/ProductVerMas/ProductVerMas";
import { Talleres } from "../pages/TalleresForm/TalleresForm";

export const RoutesApp = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <main
        style={{
          position: "fixed",
          width: "100dvw",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SpinnerLoading />
      </main>
    );
  }

  return (
    <>
      {user && user.user_type === 1 ? (
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<h1>Admin Home</h1>} />
              <Route path="/productos" element={<Products />} />
              <Route path="/categorias" element={<CategoryList />} />
              <Route path="/usuarios" element={<UserManagement />} />
              <Route path="/suscripciones" element={<h1>Admin Home</h1>} />
              <Route path="/colmenas" element={<h1>Admin Home</h1>} />
              <Route path="/ventas" element={<Sales />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </main>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/tienda" element={<Store />} />
              <Route path="/talleres" element={<Talleres />} />
              <Route path="/apadrina" element={<h1>Apadrina</h1>} />
              <Route path="/carrito" element={<ShoppingCart />} />
              <Route path="/perfil" element={<h1>Perfil</h1>} />
              <Route path="/colmenas" element={<h1>Colmenas</h1>} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/pedidos" element={<h1>Pedidos</h1>} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/*" element={<h1>404</h1>} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

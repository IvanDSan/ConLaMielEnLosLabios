import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { UserContext } from '../context/UserContext';

export const RoutesApp = () => {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <>
      {user && user.user_type === 1 ? (
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<h1>Admin Home</h1>} />
              <Route path="/productos" element={<h1>Admin Home</h1>} />
              <Route path="/categorias" element={<h1>Admin Home</h1>} />
              <Route path="/usuarios" element={<h1>Admin Home</h1>} />
              <Route path="/suscripciones" element={<h1>Admin Home</h1>} />
              <Route path="/colmenas" element={<h1>Admin Home</h1>} />
              <Route path="/ventas" element={<h1>Admin Home</h1>} />
            </Routes>
          </main>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/tienda" element={<h1>Tienda</h1>} />
              <Route path="/talleres" element={<h1>Talleres</h1>} />
              <Route path="/apadrina" element={<h1>Apadrina</h1>} />
              <Route path="/carrito" element={<h1>Carrito</h1>} />
              <Route path="/perfil" element={<h1>Perfil</h1>} />
              <Route path="/admin" element={<h1>Admin</h1>} />
              <Route path="/*" element={<h1>404</h1>} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

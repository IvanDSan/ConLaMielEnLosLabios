import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/admin" element={<h1>Admin</h1>} />
          <Route path="/tienda" element={<h1>Tienda</h1>} />
          <Route path="/carrito" element={<h1>Carrito</h1>} />
          <Route path="/visitas" element={<h1>Visitas</h1>} />
          <Route path="/apadrina" element={<h1>Apadrina</h1>} />
          <Route path="/talleres" element={<h1>Talleres</h1>} />
          <Route path="/contacto" element={<h1>Contacto</h1>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

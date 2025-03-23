/** REACT UTILS */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/** PAGES */
import { Products } from '../pages/Products/Products';
import { CategoryList } from '../pages/CategoryList/CategoryList';
import { UserManagement } from '../pages/UserManagement/UserManagement';
import { BeehiveList } from '../pages/BeehiveList/BeehiveList';
import { Sales } from '../pages/Sales/Sales';
import { Sponsorships } from '../pages/Sponsorships/Sponsorships';

/** COMPONENTS */
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin';

export const AdminRoutes = () => {
  return (
    <BrowserRouter>
      <NavbarAdmin />
      <main>
        <Routes>
          <Route path="/" element={<h1>Admin Home</h1>} />
          <Route path="/productos" element={<Products />} />
          <Route path="/categorias" element={<CategoryList />} />
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/suscripciones" element={<Sponsorships />} />
          <Route path="/colmenas" element={<BeehiveList />} />
          <Route path="/ventas" element={<Sales />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </BrowserRouter>
  );
};

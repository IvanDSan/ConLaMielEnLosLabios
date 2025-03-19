import { CartContextProvider } from './context/CartContextProvider';
import { UserProvider } from './context/UserContext';
import { RoutesApp } from './routes/RoutesApp';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <RoutesApp />
        <ToastContainer position="top-right" autoClose={3000} />
      </CartContextProvider>
    </UserProvider>
  );
}

export default App;

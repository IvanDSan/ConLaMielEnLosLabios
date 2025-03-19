import { CartContextProvider } from './context/CartContextProvider';
import { UserProvider } from './context/UserContext';
import { RoutesApp } from './routes/RoutesApp';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <RoutesApp />
      </CartContextProvider>
    </UserProvider>
  );
}

export default App;

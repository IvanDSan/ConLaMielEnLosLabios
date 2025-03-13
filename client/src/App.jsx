import './App.css';
import { UserProvider } from './context/UserContext';
import { RoutesApp } from './routes/RoutesApp';

function App() {
  return (
    <UserProvider>
      <RoutesApp />
    </UserProvider>
  );
}

export default App;

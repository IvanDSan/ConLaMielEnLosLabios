import { CartContextProvider } from "./context/CartContextProvider";
import { UserProvider } from "./context/UserContext";
import { RoutesApp } from "./routes/RoutesApp";
import "./App.css";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div style={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}>
      <button onClick={() => changeLanguage("es")}>🇪🇸</button>
      <button onClick={() => changeLanguage("en")}>🇬🇧</button>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <CartContextProvider>
        <LanguageSwitcher />
        <RoutesApp />
      </CartContextProvider>
    </UserProvider>
  );
}

export default App;

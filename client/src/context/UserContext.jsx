import { createContext, useEffect, useState } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    // Añadir el token al localStorage al iniciar sesión
    if (token) localStorage.setItem('token', token);

    // Pedir la información del usuario
    if (token) {
      fetchData('/users/getUserById', 'GET', null, {
        Authorization: `Bearer ${token}`,
      }).then((res) => {
        setUser(res.data);
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

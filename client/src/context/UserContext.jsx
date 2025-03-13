import { createContext, useEffect, useState } from 'react';
import { fetchData } from '../helpers/axiosHelper';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Añadir el token al localStorage al iniciar sesión
    if (token) localStorage.setItem('token', token);

    // Pedir la información del usuario
    if (token && !user) {
      setLoading(true);
      fetchData('/users/getUserById', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
        .then((res) => {
          setUser(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, user]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

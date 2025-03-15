import "./UserManagement.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/users`);
        if (!Array.isArray(response.data)) {
          throw new Error("La respuesta no es un array");
        }
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("No se pudieron cargar los usuarios");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, isDisabled) => {
    const endpoint = isDisabled ? "admin/enableUser" : "admin/disableUser";
    try {
      await axios.put(`${apiURL}/${endpoint}`, { user_id: userId });
      setUsers(
        users.map((u) =>
          u.user_id === userId ? { ...u, is_disabled: !isDisabled } : u
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(users)) {
    console.error("Users no es un array:", users);
    return <div>Error: Datos inválidos</div>;
  }

  return (
    <div className="container">
      <h2>Manejo de Usuarios</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>
                  {user.name} {user.lastname}
                </td>
                <td>{user.email}</td>
                <td>{user.is_disabled ? "Baneado" : "Activo"}</td>
                <td>
                  {user.user_type !== 1 && (
                    <button
                      onClick={() =>
                        toggleUserStatus(user.user_id, user.is_disabled)
                      }
                    >
                      {user.is_disabled ? "Activar" : "Desactivar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const apiURL = import.meta.env.VITE_SERVER_URL;

export const UserManagement = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        toast.error(t("user_management.fetch_error"));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]);

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
      toast.error(t("user_management.update_error"));
    }
  };

  if (loading) return <div>{t("loading")}</div>;
  if (!Array.isArray(users)) {
    console.error("Users no es un array:", users);
    return <div>{t("user_management.invalid_data")}</div>;
  }

  return (
    <div className="admin-table">
      <div className="container">
        <h3>{t("user_management.title")}</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{t("user_management.id")}</th>
                <th>{t("user_management.name")}</th>
                <th>{t("user_management.email")}</th>
                <th>{t("user_management.status")}</th>
                <th>{t("user_management.action")}</th>
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
                  <td>
                    {user.is_disabled
                      ? t("user_management.banned")
                      : t("user_management.active")}
                  </td>
                  <td>
                    {user.user_type !== 1 && (
                      <button
                        onClick={() =>
                          toggleUserStatus(user.user_id, user.is_disabled)
                        }
                      >
                        {user.is_disabled
                          ? t("user_management.activate")
                          : t("user_management.deactivate")}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { useContext, useState } from "react";
import "./styles.css";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useTranslation } from "react-i18next";

export const LoginForm = ({
  onRegisterClick,
  onRecoverPasswordClick,
  onClose,
}) => {
  const { t } = useTranslation();
  const { setToken } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchData("/users/login", "POST", loginForm);

      if (res.status === 200) {
        setToken(res.data.token);
        onClose();
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t("login_title")}</h2>

      <label htmlFor="email">
        {t("email")} *
        <input
          type="email"
          name="email"
          placeholder={t("enter_email")}
          required
          value={loginForm.email}
          onChange={handleChange}
          style={error ? { border: "1px solid red" } : {}}
        />
      </label>

      <label htmlFor="password">
        {t("password")} *
        <input
          type="password"
          name="password"
          placeholder={t("enter_password")}
          autoComplete="off"
          required
          value={loginForm.password}
          onChange={handleChange}
          style={error ? { border: "1px solid red" } : {}}
        />
      </label>

      <button type="submit" className="btn-primary">
        {!loading ? t("login_button") : <SpinnerLoading />}
      </button>

      {error && <span className="error">{error}</span>}

      <div>
        <p className="link" onClick={onRecoverPasswordClick}>
          {t("forgot_password")}
        </p>
        <p className="link" onClick={onRegisterClick}>
          {t("no_account")} <span>{t("register_link")}</span>
        </p>
        <img src="/icons/panal.svg" alt="panal" />
      </div>
    </form>
  );
};

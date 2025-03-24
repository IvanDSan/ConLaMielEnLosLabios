import { useState } from "react";
import { fetchData } from "../../helpers/axiosHelper";
import "./styles.css";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useTranslation } from "react-i18next";

export const RecoverPasswordForm = ({ onLoginClick, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetchData("/users/recoveryPassword", "POST", {
        email,
      });

      if (response.status === 200) {
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <h2>{t("recover_password_title")}</h2>

          <label htmlFor="email">
            {t("email")} *
            <input
              type="email"
              name="email"
              placeholder={t("enter_email")}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit" className="btn-primary">
            {loading ? <SpinnerLoading /> : t("recover_password_button")}
          </button>
          <button type="button" className="btn-primary" onClick={onLoginClick}>
            {t("back")}
          </button>

          <div>
            <img src="/icons/panal.svg" alt="panal" />
          </div>
        </form>
      ) : (
        <div className="message">
          <p>{t("recover_password_message")}</p>
          <button onClick={onClose}>{t("back")}</button>
        </div>
      )}
    </>
  );
};

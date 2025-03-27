import { useState } from "react";
import { fetchData } from "../../helpers/axiosHelper";
import "./styles.css";
import { SpinnerLoading } from "../SpinnerLoading/SpinnerLoading";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastname: "",
  dni: "",
  phoneNumber: "",
  city: "",
  province: "",
  address: "",
  zipcode: "",
};

export const RegisterForm = ({ onCancelClick, onClose }) => {
  const { t } = useTranslation();
  const [registerForm, setRegisterForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [showValidateMessage, setShowValidateMessage] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("registerData", JSON.stringify(registerForm));
    formData.append("img", image);

    try {
      const res = await fetchData("/users/register", "POST", formData);

      if (res.status === 201) {
        setShowValidateMessage(true);
      }
    } catch (err) {
      console.log(err);
      setErrors([...errors, err.response.data.error[0]]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    const {
      email,
      password,
      confirmPassword,
      name,
      lastname,
      dni,
      phoneNumber,
      city,
      province,
      address,
      zipcode,
    } = registerForm;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    if (!email) newErrors.push("email");
    if (!password || password.length < 8 || !passwordRegex.test(password))
      newErrors.push("password");
    if (!confirmPassword) newErrors.push("confirmPassword");
    if (!name || name.length < 2) newErrors.push("name");
    if (!lastname || lastname.length < 2) newErrors.push("lastname");
    if (!dni) newErrors.push("dni");
    if (!phoneNumber || phoneNumber.length < 9 || phoneNumber.length > 15)
      newErrors.push("phoneNumber");
    if (!city || city.length < 2) newErrors.push("city");
    if (!province || province.length < 2) newErrors.push("province");
    if (!address || address.length < 5) newErrors.push("address");
    if (!zipcode || zipcode.length < 5) newErrors.push("zipcode");

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.push("passwordMismatch");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t("register_title")}</h2>
      {!showValidateMessage ? (
        <>
          <div className="register">
            <div>
              <label htmlFor="email">
                {t("email")} *
                <input
                  type="email"
                  name="email"
                  placeholder={t("enter_email")}
                  required
                  value={registerForm.email}
                  onChange={handleChange}
                  style={
                    errors.includes("email") ? { border: "1px solid red" } : {}
                  }
                />
              </label>

              <label htmlFor="password" className="password">
                {t("password")} *
                <input
                  type="password"
                  name="password"
                  placeholder={t("enter_password")}
                  autoComplete="off"
                  required
                  value={registerForm.password}
                  onChange={handleChange}
                  style={
                    errors.includes("confirmPassword") ||
                    errors.includes("passwordMismatch")
                      ? { border: "1px solid red" }
                      : {}
                  }
                  onFocus={() => setShowPasswordConditions(true)}
                  onBlur={() => setShowPasswordConditions(false)}
                />
                {showPasswordConditions && (
                  <div className="password-conditions">
                    <p>{t("password_conditions_title")}</p>
                    <ul>
                      <li>{t("password_min_length")}</li>
                      <li>{t("password_uppercase")}</li>
                      <li>{t("password_lowercase")}</li>
                      <li>{t("password_number")}</li>
                      <li>{t("password_special")}</li>
                    </ul>
                  </div>
                )}
              </label>

              <label htmlFor="confirmPassword">
                {t("confirm_password")} *
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t("confirm_password")}
                  autoComplete="off"
                  required
                  value={registerForm.confirmPassword}
                  onChange={handleChange}
                  style={
                    errors.includes("confirmPassword") ||
                    errors.includes("passwordMismatch")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="name">
                {t("name")} *
                <input
                  type="text"
                  name="name"
                  placeholder={t("placeholder_name")}
                  required
                  value={registerForm.name}
                  onChange={handleChange}
                  style={
                    errors.includes("name") ? { border: "1px solid red" } : {}
                  }
                />
              </label>

              <label htmlFor="lastname">
                {t("last_name")} *
                <input
                  type="text"
                  name="lastname"
                  placeholder={t("placeholder_lastname")}
                  required
                  value={registerForm.lastname}
                  onChange={handleChange}
                  style={
                    errors.includes("lastname")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="dni">
                DNI *
                <input
                  type="text"
                  name="dni"
                  placeholder="Introduce tu DNI"
                  required
                  value={registerForm.dni}
                  onChange={handleChange}
                  style={
                    errors.includes("dni") ? { border: "1px solid red" } : {}
                  }
                />
              </label>
            </div>

            <div>
              <label htmlFor="phoneNumber">
                {t("phone")} *
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder={t("placeholder_phone")}
                  required
                  value={registerForm.phoneNumber}
                  onChange={handleChange}
                  style={
                    errors.includes("phoneNumber")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="city">
                {t("city")} *
                <input
                  type="text"
                  name="city"
                  placeholder={t("placeholder_city")}
                  required
                  value={registerForm.city}
                  onChange={handleChange}
                  style={
                    errors.includes("city") ? { border: "1px solid red" } : {}
                  }
                />
              </label>

              <label htmlFor="province">
                {t("province")} *
                <input
                  type="text"
                  name="province"
                  placeholder={t("placeholder_province")}
                  required
                  value={registerForm.province}
                  onChange={handleChange}
                  style={
                    errors.includes("province")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="address">
                {t("address")} *
                <input
                  type="text"
                  name="address"
                  placeholder={t("placeholder_address")}
                  required
                  value={registerForm.address}
                  onChange={handleChange}
                  style={
                    errors.includes("address")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="zipcode">
                {t("zipcode")} *
                <input
                  type="text"
                  name="zipcode"
                  placeholder={t("placeholder_zipcode")}
                  required
                  value={registerForm.zipcode}
                  onChange={handleChange}
                  style={
                    errors.includes("zipcode")
                      ? { border: "1px solid red" }
                      : {}
                  }
                />
              </label>

              <label htmlFor="imagen">
                {t("profile_image")}
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleFile}
                />
              </label>
            </div>
          </div>

          {errors.length > 0 && (
            <span className="error">{t("form_error")}</span>
          )}

          <button type="submit">
            {loading ? <SpinnerLoading /> : t("register_button")}
          </button>
          <button type="button" onClick={onCancelClick}>
            {t("back")}
          </button>
        </>
      ) : (
        <>
          <p>{t("register_validation_message")}</p>
          <button type="button" onClick={onClose}>
            {t("close")}
          </button>
        </>
      )}

      <div>
        <img src="/icons/panal.svg" alt="panal" />
      </div>
    </form>
  );
};

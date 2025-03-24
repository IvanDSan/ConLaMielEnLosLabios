import { UpdateProfileForm } from "../../components/UpdateProfileForm/UpdateProfileForm";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { t } = useTranslation();

  return (
    <section className="profile-container">
      <div className="profile-header">
        <h1>{t("your_profile")}</h1>
      </div>

      <UpdateProfileForm />
    </section>
  );
};

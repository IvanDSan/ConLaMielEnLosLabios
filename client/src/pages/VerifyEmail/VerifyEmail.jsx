import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchData } from "../../helpers/axiosHelper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const VerifyEmail = () => {
  const { t } = useTranslation();
  const [queryParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = queryParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetchData(`/users/verify/${token}`, "GET");
        if (response.status === 200) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    verify();
  }, [navigate, token]);

  return (
    <>
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <div>
          <h2>{t("email_verified")}</h2>
          <button onClick={() => navigate("/")}>{t("back_to_home")}</button>
        </div>
      )}
    </>
  );
};

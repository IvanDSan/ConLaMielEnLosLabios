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
          <h2 style={{ textAlign: 'center' }}>
            Email verificado correctamente
          </h2>
          <p style={{ textAlign: 'center' }}>Gracias por confiar en nosotros</p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
          </div>
        </div>
      )}
    </>
  );
};

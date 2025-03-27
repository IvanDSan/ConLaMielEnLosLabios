import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchData } from "../../helpers/axiosHelper";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

export const Sponsorships = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const { token } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await fetchData("/sponsorships/get", "GET", null, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          setSponsorships(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las suscripciones:", error);
        toast.error(t("error_fetching_subscriptions"));
      }
    };

    fetchSponsorships();
  }, [token, t]);

  return (
    <div className="admin-table">
      <div className="container">
        <h3>{t("subscriptions")}</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("beehive_name")}</th>
                <th>{t("subscription_type")}</th>
                <th>{t("start_date")}</th>
                <th>{t("user_name")}</th>
                <th>{t("status")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {sponsorships.map((sponsorship) => (
                <tr key={sponsorship.sponsorship_id}>
                  <td>{sponsorship.sponsorship_id}</td>
                  <td>{sponsorship.beehive_name}</td>
                  <td>{sponsorship.sponsorship_type}</td>
                  <td>{sponsorship.start_date}</td>
                  <td>{sponsorship.user_name}</td>
                  <td>
                    {sponsorship.is_deleted ? t("inactive") : t("active")}
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

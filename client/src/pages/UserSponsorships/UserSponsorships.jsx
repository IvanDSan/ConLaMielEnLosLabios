import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { fetchData } from '../../helpers/axiosHelper';
import './styles.css';

export const UserSponsorships = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const res = await fetchData('/sponsorships/getByUserId', 'GET', null, {
          Authorization: `Bearer ${token}`,
        });

        if (res.status === 200) {
          setSponsorships(res.data);
        }
      } catch (error) {
        console.error('Error al obtener las suscripciones:', error);
        toast.error('Error al obtener las suscripciones');
      }
    };

    fetchSponsorships();
  }, [token]);

  const handleCancel = async (sponsorshipId) => {
    try {
      const res = await fetchData(
        `/sponsorships/cancel/${sponsorshipId}`,
        'PUT',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (res.status === 200) {
        setSponsorships(
          sponsorships.map((s) =>
            s.sponsorship_id === sponsorshipId ? { ...s, is_deleted: 1 } : s
          )
        );
        toast.success('Suscripción cancelada correctamente');
      }
    } catch (error) {
      console.error('Error al cancelar la suscripción:', error);
      toast.error('Error al cancelar la suscripción');
    }
  };

  console.log('sponsorships', sponsorships);

  return (
    <div className="sponsorships">
      <h2>Mis Suscripciones</h2>
      <ul className="sponsorship-list">
        {sponsorships.map((sponsorship, index) => (
          <li className="sponsorship-item" key={index}>
            <div className="flex">
              <div className="sponsorship-details">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/images/beehives/${
                    sponsorship.beehive_image
                  }`}
                  alt={sponsorship.beehive_name}
                />
                <div className="sponsorship-info">
                  <span className="beehive-name">
                    {sponsorship.beehive_name}
                  </span>
                  <span className="sponsorship-type">
                    {sponsorship.sponsorship_type}
                  </span>
                  <span className="start-date">
                    Inicio: {sponsorship.start_date}
                  </span>
                </div>
              </div>
              {sponsorship.is_deleted === 0 ? (
                <button
                  className="cancel-sponsorship"
                  onClick={() => handleCancel(sponsorship.sponsorship_id)}
                >
                  Cancelar
                </button>
              ) : (
                <span className="deleted">
                  Fecha de fin:{' '}
                  {
                    new Date(
                      new Date(sponsorship.start_date).setMonth(
                        new Date(sponsorship.start_date).getMonth() + 1
                      )
                    )
                      .toISOString()
                      .split('T')[0]
                  }
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

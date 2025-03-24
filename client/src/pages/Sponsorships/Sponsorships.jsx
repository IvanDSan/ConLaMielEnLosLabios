import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchData } from '../../helpers/axiosHelper';
import { UserContext } from '../../context/UserContext';

export const Sponsorships = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await fetchData('/sponsorships/get', 'GET', null, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          setSponsorships(response.data);
        }
      } catch (error) {
        console.error('Error al obtener las suscripciones:', error);
        toast.error('Error al obtener las suscripciones');
      }
    };

    fetchSponsorships();
  }, [token]);

  console.log('sponsorships', sponsorships);

  return (
    <div className="admin-table">
      <div className="container">
        <h3>Suscripciones</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de la Colmena</th>
                <th>Tipo de Suscripción</th>
                <th>Fecha de Inicio</th>
                <th>Nombre del Usuario</th>
                <th>Estado</th>
                <th>Acción</th>
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
                  <td>{sponsorship.is_deleted ? 'Inactiva' : 'Activa'}</td>
                  <td>
                    {/* Aquí agregar botones o acciones, por ejemplo, para editar o eliminar */}
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

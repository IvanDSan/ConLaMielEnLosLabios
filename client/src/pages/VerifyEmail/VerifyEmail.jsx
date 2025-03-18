import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelper';
import { useEffect, useState } from 'react';

export const VerifyEmail = () => {
  const [queryParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Recoger el token
  const token = queryParams.get('token');

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetchData(`/users/verify/${token}`, 'GET');

        if (response.status === 200) {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };

    verify();
  }, [navigate, token]);

  return (
    <>
      {loading ? (
        <p>Spinner</p>
      ) : (
        <div>
          <h2>Email verificado correctamente</h2>
          <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
      )}
    </>
  );
};

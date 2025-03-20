import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { SpinnerLoading } from '../components/SpinnerLoading/SpinnerLoading';
import { AdminRoutes } from './AdminRoutes';
import { UserRoutes } from './UserRoutes';

export const RoutesApp = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <main
        style={{
          position: 'fixed',
          width: '100dvw',
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SpinnerLoading />
      </main>
    );
  }

  return <>{user && user.user_type === 1 ? <AdminRoutes /> : <UserRoutes />}</>;
};

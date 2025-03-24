import { UpdateProfileForm } from '../../components/UpdateProfileForm/UpdateProfileForm';
import './styles.css';

export const Profile = () => {
  return (
    <section className="profile-container">
      <div className="profile-header">
        <h1>Tu perfil</h1>
      </div>

      <UpdateProfileForm />
    </section>
  );
};

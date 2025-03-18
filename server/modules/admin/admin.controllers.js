import executeQuery from '../../config/db.js';

class AdminController {
  getAllUsers = async (req, res) => {
    try {
      const users = await executeQuery(
        'SELECT user_id, name, lastname, email, user_type, is_disabled FROM user'
      );
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

  enableUser = async (req, res) => {
    const { user_id } = req.body;
    try {
      const result = await executeQuery(
        'UPDATE user SET is_disabled = 0 WHERE user_id = ?',
        [user_id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User habilitado' });
    } catch (error) {
      console.error('Error enabling user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  disableUser = async (req, res) => {
    const { user_id } = req.body;
    try {
      const result = await executeQuery(
        'UPDATE user SET is_disabled = 1 WHERE user_id = ?',
        [user_id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deshabilitado' });
    } catch (error) {
      console.error('Error disabling user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new AdminController();

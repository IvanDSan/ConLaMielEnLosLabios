import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no válido' });
  }

  try {
    jwt.verify(token, process.env.JWT_ADMIN_LOGIN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(401).json({ message: 'Token no válido' });
      }

      req.user_id = decoded.id;
      next();
    });
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(401).json({ message: 'Token no válido' });
  }
};

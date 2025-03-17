import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken =
  (role = null) =>
  (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log(token);
    

    if (!token) {
      return res.status(401).json({ message: 'Token no válido' });
    }

    const verifyWithSecret = (secret) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
    };

    const handleSuccess = (decoded) => {
      req.user_id = decoded.id;
      next();
    };

    (async () => {
      try {
        if (role === 'user') {
          const decoded = await verifyWithSecret(
            process.env.JWT_USER_LOGIN_SECRET
          );
          return handleSuccess(decoded);
        }

        if (role === 'admin') {
          const decoded = await verifyWithSecret(
            process.env.JWT_ADMIN_LOGIN_SECRET
          );
          return handleSuccess(decoded);
        }

        // Si no se especifica un role, probar ambos
        try {
          const decodedUser = await verifyWithSecret(
            process.env.JWT_USER_LOGIN_SECRET
          );
          return handleSuccess(decodedUser);
        } catch (errUser) {
          const decodedAdmin = await verifyWithSecret(
            process.env.JWT_ADMIN_LOGIN_SECRET
          );
          return handleSuccess(decodedAdmin);
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(401).json({ message: 'Token no válido' });
      }
    })();
  };

import { validateUser } from '../../schemas/userSchema.js';
import executeQuery from '../../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  sendVerificationEmail,
  sendRecoveryPassword,
} from '../../services/mailer.js';
import generateRandomPassword from '../../utils/generateRandomPassword.js';

dotenv.config();

class UsersController {
  register = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/register
     *
     *    INPUT (body): {
     *      email: string,
     *      password: string,
     *      confirmPassword: string,
     *      imagen?: file,
     *      name: string,
     *      lastname: string,
     *      dni: string,
     *      phoneNumber: string
     *      city: string,
     *      province: string,
     *      address: string,
     *      zipcode: string
     *    }
     *
     *    OUTPUT:
     *      - En caso de exito: 201 - "Registrado correctamente"
     *      - En caso de error:
     *        - Faltan inputs: 400 - {error: "Faltan campos obligatorios"}
     *        - Validaciones zod: 400 - {error: [string]}
     *        - Email ya registrado: 409 - {error: "Email ya registrado"}
     *        - Error interno: 500 - {error: "Internal error"}
     */

    const {
      email,
      password,
      confirmPassword,
      name,
      lastname,
      dni,
      phoneNumber,
      city,
      province,
      address,
      zipcode,
    } = JSON.parse(req.body.registerData);

    console.log(
      email,
      password,
      confirmPassword,
      name,
      lastname,
      dni,
      phoneNumber,
      city,
      province,
      address,
      zipcode
    );

    // VALIDACIONES
    // Falta algún campo
    if (
      !email?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim() ||
      !name?.trim() ||
      !lastname?.trim() ||
      !dni?.trim() ||
      !phoneNumber?.trim() ||
      !city?.trim() ||
      !province?.trim() ||
      !address?.trim() ||
      !zipcode?.trim()
    ) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Zod
    const result = validateUser(JSON.parse(req.body.registerData));
    if ('error' in result) {
      return res.status(400).json(result);
    }

    try {
      // ENCRIPTAR CONTRASEÑA
      const hash = await bcrypt.hash(password, 10);

      // GENERAR TOKEN DE VERIFICACION
      const verificationToken = jwt.sign(
        { email },
        process.env.JWT_VERIFICATION_SECRET
      );

      // ENVIAR EMAIL DE VERIFICACION
      await sendVerificationEmail(email, verificationToken);

      // AÑADIR A BD
      let sql =
        'INSERT INTO user (email, password, name, lastname, phone_number, dni, city, province, address, zipcode, verify_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      let values = [
        email,
        hash,
        name,
        lastname,
        phoneNumber,
        dni,
        city,
        province,
        address,
        zipcode,
        verificationToken,
      ];

      if (req.file) {
        sql =
          'INSERT INTO user (email, password, name, lastname, phone_number, dni, city, province, address, zipcode, verify_token, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        values = [...values, req.file.filename];
      }

      await executeQuery(sql, values);

      res.status(201).json({ message: 'Registrado correctamente' });
    } catch (err) {
      if (err.errno === 1062) {
        return res.status(409).json({ error: 'Email ya registrado' });
      } else {
        console.log(err);
        return res.status(500).json({ error: 'Internal error' });
      }
    }
  };

  login = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/login
     *
     *    INPUT (body): {
     *      email: string,
     *      password: string
     *    }
     *
     *    OUTPUT:
     *      - En caso de exito: 200 - {token: string}
     *      - En caso de error:
     *        - Faltan inputs: 400 - {error: "Faltan campos obligatorios"}
     *        - Email no existe: 401 - {error: "Error al iniciar sesión"}
     *        - Password incorrecta: 401 - {error: "Error al iniciar sesión"}
     *        - Email no verificado: 401 - {error: "El usuario no está verificado"}
     *        - Error interno: 500 - {error: "Internal error"}
     */

    const { email, password } = req.body;

    // VALIDACIONES
    // Falta algún campo
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
      // BUSCAR EN BD
      let sql = 'SELECT * FROM user WHERE email = ? AND is_disabled = 0';
      let values = [email];

      const result = await executeQuery(sql, values);

      if (result.length === 0) {
        return res.status(401).json({ error: 'Error al iniciar sesión' });
      }

      // VERIFICAR PASSWORD
      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Error al iniciar sesión' });
      }

      // COMPROBAR QUE EL USUARIO ESTÁ VERIFICADO
      if (user.is_verified === 0) {
        return res.status(401).json({ error: 'El usuario no está verificado' });
      }

      // GENERAR TOKEN
      const token = jwt.sign(
        { id: user.user_id },
        user.user_type === 1
          ? process.env.JWT_ADMIN_LOGIN_SECRET
          : process.env.JWT_USER_LOGIN_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal error' });
    }
  };

  verify = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/verify/:token
     *
     *    INPUT (params): {
     *      token: string  // Token JWT recibido en el correo de verificación
     *    }
     *
     *    OUTPUT:
     *      - En caso de éxito: 200 - {message: "Usuario verificado correctamente"}
     *      - En caso de error:
     *        - Token incorrecto: 401 - {error: "Token incorrecto"}
     *        - Email no encontrado: 400 - {error: "Email no encontrado"}
     *        - Error interno: 500 - {error: "Internal error"}
     */

    // RECOGER EL TOKEN
    const { token } = req.params;

    let email = '';

    try {
      // VERIFICAR EL TOKEN DE FORMA ASINCRÓNICA
      const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
      email = decoded.email;

      // ACTUALIZAR LA BD
      let sql =
        'UPDATE user SET is_verified = 1, verify_token = NULL WHERE email = ?';
      let values = [email];

      let result = await executeQuery(sql, values);

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Email no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario verificado correctamente' });
      }
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Token incorrecto' });
      } else {
        console.log(err);
        return res.status(500).json({ error: 'Internal error' });
      }
    }
  };

  recoveryPassword = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/recoveryPassword
     *
     *    INPUT (body): {
     *      email: string  // Email del usuario que solicita el restablecimiento de contraseña
     *    }
     *
     *    OUTPUT:
     *      - En caso de éxito: 200 - {message: "Contraseña restablecida, comprobar email"}
     *      - En caso de error:
     *        - Falta el email: 400 - {error: "Falta el email"}
     *        - No se encuentra el email: 200 - {message: "Email enviado"}
     *        - Error interno: 500 - {error: "Internal error"}
     */

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Falta el email' });
    }

    let sql = 'SELECT * FROM user WHERE email = ?';
    let values = [email];

    try {
      let result = await executeQuery(sql, values);

      // Si tengo usuario
      if (result.length > 0) {
        // Genero una contraseña aleatoria nueva
        const newPassword = generateRandomPassword();

        // La hasheo
        const hash = await bcrypt.hash(newPassword, 10);

        // Actualizo BD
        let sql = 'UPDATE user SET password = ? WHERE email = ?';
        let values = [hash, email];
        await executeQuery(sql, values);

        // Mando correo con la contraseña nueva al usuario
        await sendRecoveryPassword(email, newPassword);

        res
          .status(200)
          .json({ message: 'Contraseña restablecida, comprobar email' });
      } else {
        res.status(200).json({ message: 'Email enviado' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal error' });
    }
  };

  getUserById = async (req, res) => {
    const { user_id } = req;

    let sql = 'SELECT * FROM user WHERE user_id = ?';
    let values = [user_id];

    try {
      let result = await executeQuery(sql, values);

      if (result.length > 0) {
        res.status(200).json({
          user_id: result[0].user_id,
          name: result[0].name,
          lastname: result[0].lastname,
          image: result[0].image_url,
          dni: result[0].dni,
          email: result[0].email,
          phone_number: result[0].phone_number,
          address: result[0].address,
          city: result[0].city,
          province: result[0].province,
          zipcode: result[0].zipcode,
          user_type: result[0].user_type,
        });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal error' });
    }
  };
}

export default new UsersController();

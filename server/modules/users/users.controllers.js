import { validateUser } from '../../schemas/userSchema.js';
import executeQuery from '../../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { dbPool } from '../../config/db.js';
import {
  sendVerificationEmail,
  sendRecoveryPassword,
  sendContactEmail,
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

  editUser = async (req, res) => {
    /**
     *    ENDPOINT: http://localhost:4000/users/edit
     *
     *    INPUT (body): {
     *      name: string,
     *      lastname: string,
     *      password: string,
     *      confirmPassword: string,
     *      phone_number: string,
     *      dni: string,
     *      city: string,
     *      province: string,
     *      address: string,
     *      zipcode: string
     *    }
     *
     *    OUTPUT:
     *      - En caso de exito: 200 - {message: "Usuario editado correctamente"}
     *      - En caso de error:
     *        - Faltan inputs: 400 - {error: "Faltan campos obligatorios"}
     *        - Password incorrecta: 401 - {error: "Password incorrecta"}
     *        - Error interno: 500 - {error: "Internal error"}
     */

    const { user_id } = req;
    const {
      name,
      lastname,
      email,
      dni,
      phoneNumber,
      city,
      province,
      address,
      zipcode,
      password,
      confirmPassword,
    } = req.body;

    // VALIDACIONES
    // Falta alguno de los campos
    if (
      !name ||
      !lastname ||
      !email ||
      !dni ||
      !phoneNumber ||
      !city ||
      !province ||
      !address ||
      !zipcode
    ) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    
    // Password incorrecta
    if (password !== confirmPassword) {
      return res.status(401).json({ error: 'Password incorrecta' });
    }
    
    // Zod
    const result = validateUser(req.body);
    if ('error' in result) {
      console.log(req.body);
      return res.status(400).json(result);
    }

    try {
      // HASEAR PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);


      // ACTUALIZAR EN BD
      let sql =
        'UPDATE user SET name = ?, lastname = ?, email = ?, password = ?, dni = ?, phone_number = ?, city = ?, province = ?, address = ?, zipcode = ? WHERE user_id = ?';
      let values = [
        name,
        lastname,
        email,
        hashedPassword,
        dni,
        phoneNumber,
        city,
        province,
        address,
        zipcode,
        user_id,
      ];

      if (req.file) {
        sql =
          'UPDATE user SET name = ?, lastname = ?, email = ?, password = ?, dni = ?, phone_number = ?, city = ?, province = ?, address = ?, zipcode = ?, image_url = ? WHERE user_id = ?';
        values = [
          name,
          lastname,
          email,
          hashedPassword,
          dni,
          phoneNumber,
          city,
          province,
          address,
          zipcode,
          req.file.filename,
          user_id,
        ];
      }

      const result = await executeQuery(sql, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'Usuario editado correctamente' });
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

  addProductToCart = async (req, res) => {
    const { product_id, quantity = 1 } = req.body;
    const { user_id } = req;
    const checkCart = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';

    try {
      let result = await executeQuery(checkCart, [user_id, product_id]);
      if (result.length !== 0) {
        const updateCart =
          'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
        let result3 = await executeQuery(updateCart, [
          quantity,
          user_id,
          product_id,
        ]);
      } else {
        const insertCart =
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
        let result2 = await executeQuery(insertCart, [
          user_id,
          product_id,
          quantity,
        ]);
      }

      res.status(200).json({ message: '' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  modifyCartQuantityToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const { user_id } = req;
    const modifyCart =
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
    try {
      //si la cantidad es menor q -1 no puede cambiar
      if (quantity > 0) {
        let result = await executeQuery(modifyCart, [
          quantity,
          user_id,
          product_id,
        ]);
        res.status(200).json({ message: 'Se ha modificado correctamente' });
      } else {
        throw new Error('No se admiten cantidades negativas');
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  deleteProductToCart = async (req, res) => {
    const { product_id } = req.body;
    const { user_id } = req;
    const deletedCartProduct =
      'DELETE FROM cart WHERE user_id = ? AND  product_id = ?';
    try {
      let result = await executeQuery(deletedCartProduct, [
        user_id,
        product_id,
      ]);
      res.status(200).json({
        message: 'El producto se ha eliminado correctamente del carrito',
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  deleteCartFromUser = async (req, res) => {
    const { user_id } = req;
    const deleteAllCart = 'DELETE FROM cart WHERE user_id = ?';

    try {
      let result = await executeQuery(deleteAllCart, [user_id]);
      res
        .status(200)
        .json({ message: 'El carrito se ha eliminado correctamente' });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  showAllFromCartToUser = async (req, res) => {
    const { user_id } = req;
    const showAllCartToUser = `SELECT p.product_id, p.title, p.price, c.quantity 
    FROM cart c 
    JOIN product p 
    ON c.product_id = p.product_id WHERE c.user_id = ?`;
    try {
      const cart = await executeQuery(showAllCartToUser, [user_id]);

      if (cart.length === 0) {
        return res
          .status(200)
          .json({ message: 'El carrito está vacío', cart: [] });
      }
      res.status(200).json({ cart, message: 'ok' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al obtener el carrito', error: error.message });
    }
  };

  completePurchaseCart = async (req, res) => {
    const connection = await dbPool.getConnection();
    let user_id = req.user_id;
    try {
      await connection.beginTransaction();
      let sql = 'SELECT MAX(sale_id) as lastSale FROM sale';
      const result = await connection.query(sql);
      let maxId = result[0][0].lastSale || 0;
      let newSaleId = maxId + 1;
      let cart = req.body;
      for (const item of cart) {
        const { product_id, quantity } = item;
        await connection.query(
          'INSERT INTO sale (sale_id, user_id, product_id, quantity, sale_status) VALUES (?, ?, ?, ?, 1)', // Insertar cada producto en sale
          [newSaleId, user_id, product_id, quantity]
        );
      }

      await connection.query('DELETE FROM cart WHERE user_id = ?', [user_id]);

      await connection.commit(); // Confirmar la transacción
      //   console.log("Compra realizada con éxito");
      res.status(200).json({ message: 'compra realizada correctamente' });
    } catch (error) {
      console.error('Error en la compra:', error);
      await connection.rollback();
      res.status(500).json(error);
    } finally {
      connection.release();
    }
  };

  sendContactEmail = async (req, res) => {
    try {
      const { nombre, apellido, email, telephone, mensaje } = req.body;

      if (!nombre || !apellido || !email || !mensaje) {
        return res
          .status(400)
          .json({ error: 'Todos los campos son obligatorios' });
      }

      await sendContactEmail(nombre, apellido, email, telephone, mensaje);
      res.status(200).json({ message: 'Formulario enviado correctamente' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al enviar el formulario de contacto' });
    }
  };
}

export default new UsersController();

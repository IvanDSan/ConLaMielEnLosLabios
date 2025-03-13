import express from 'express';
import UsersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import uploadImage from '../../middlewares/multerSingle.js';

// Endpoint: http://localhost:4000/users
const router = express.Router();

//Historial de pedidos

router.post('/register', uploadImage('users'), UsersController.register);
router.post('/login', UsersController.login);
router.get('/verify/:token', UsersController.verify);
router.post('/recoveryPassword', UsersController.recoveryPassword);
router.get('/getUserById', verifyToken(), UsersController.getUserById);

export default router;

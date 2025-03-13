import express from 'express';
import usersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

// Endpoint: http://localhost:4000/users
const router = express.Router();

//Historial de pedidos
router.get("/all", usersController.getsalesHistory);

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/verify/:token', usersController.verify);
router.get('/recoveryPassword', usersController.recoveryPassword);
router.get('/getUserById', verifyToken(), usersController.getUserById);

export default router;

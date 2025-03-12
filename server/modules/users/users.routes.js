import express from 'express';
import usersController from './users.controllers.js';

// Endpoint: http://localhost:4000/users
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/verify/:token', usersController.verify);
router.get('/recoveryPassword', usersController.recoveryPassword);

export default router;

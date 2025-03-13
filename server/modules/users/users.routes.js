import express from 'express';
import UsersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import uploadImage from '../../middlewares/multerSingle.js';

const router = express.Router();

router.post('/addProductToCart', UsersControllers.addProductToCart);
router.post('/modifyCartQuantityToCart', UsersControllers.modifyCartQuantityToCart);
router.post('/deleteProductToCart', UsersControllers.deleteProductToCart);
router.post('/deleteCartFromUser', UsersControllers.deleteCartFromUser);
router.get('/showAllFromCartToUser', UsersControllers.showAllFromCartToUser);
// router.post('/buyCart', usersControllers.buyCart);// COMPRA DEL CARRITO PENDIENTE

router.post('/register', uploadImage('users'), UsersController.register);
router.post('/login', UsersController.login);
router.get('/verify/:token', UsersController.verify);
router.post('/recoveryPassword', UsersController.recoveryPassword);
router.get('/getUserById', verifyToken(), UsersController.getUserById);

export default router;

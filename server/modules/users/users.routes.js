import express from 'express';
import UsersController from './users.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import uploadImage from '../../middlewares/multerSingle.js';

const router = express.Router();

router.post(
  '/addProductToCart',
  verifyToken('user'),
  UsersController.addProductToCart
);
router.post(
  '/modifyCartQuantityToCart',
  verifyToken('user'),
  UsersController.modifyCartQuantityToCart
);
router.post(
  '/deleteProductToCart',
  verifyToken('user'),
  UsersController.deleteProductToCart
);
router.post(
  '/deleteCartFromUser',
  verifyToken('user'),
  UsersController.deleteCartFromUser
);
router.get(
  '/showAllFromCartToUser',
  verifyToken('user'),
  UsersController.showAllFromCartToUser
);
router.post(
  '/completePurchaseCart',
  verifyToken('user'),
  UsersController.completePurchaseCart
);

router.post('/register', uploadImage('users'), UsersController.register);
router.post('/login', UsersController.login);
router.get('/verify/:token', UsersController.verify);
router.post('/recoveryPassword', UsersController.recoveryPassword);
router.get('/getUserById', verifyToken(), UsersController.getUserById);
router.put(
  '/edit',
  verifyToken('user'),
  uploadImage('users'),
  UsersController.editUser
);

router.post('/contact', UsersController.sendContactEmail);

export default router;

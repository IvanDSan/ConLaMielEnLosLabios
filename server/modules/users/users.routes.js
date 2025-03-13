import express from 'express';
import usersControllers from './users.controllers.js';

const router = express.Router();
router.post('/addProductToCart', usersControllers.addProductToCart);
router.post('/modifyCartQuantityToCart', usersControllers.modifyCartQuantityToCart);
router.post('/deleteProductToCart', usersControllers.deleteProductToCart);
router.post('/deleteCartFromUser', usersControllers.deleteCartFromUser);
router.get('/showAllFromCartToUser', usersControllers.showAllFromCartToUser);
// router.post('/buyCart', usersControllers.buyCart);// COMPRA DEL CARRITO PENDIENTE
export default router;

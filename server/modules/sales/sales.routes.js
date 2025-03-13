import express from 'express';
import SalesControllers from './sales.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

//Historial de pedidos
router.get('/all', SalesControllers.getAll);
//Borrado Logico
router.put('/deleteLogic/:sale_id', SalesControllers.logicDeleteSale);
//Historial de pedidos de un usuario
router.get(
  '/getSalesByUser',
  verifyToken('user'),
  SalesControllers.getSalesByUser
);

export default router;

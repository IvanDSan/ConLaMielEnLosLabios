import express from 'express';
const router = express.Router();
import uploadImage from '../../middlewares/multerArray.js';
import productsControllers from './products.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

router.get('/all', productsControllers.getProducts); // Obtener todos los productos

router.post(
  '/create',
  verifyToken('admin'),
  uploadImage('products'),
  productsControllers.createProduct
); // Crear producto

router.put(
  '/:id',
  verifyToken('admin'),
  uploadImage('products'),
  productsControllers.editProduct
); // Editar producto

router.delete('/:id', verifyToken('admin'), productsControllers.deleteProduct); // Borrar producto

router.get('/:id', productsControllers.getProductById); //Obtener producto por id

router.delete(
  '/deleteImage/:product_image_id',
  verifyToken('admin'),
  productsControllers.deleteProductImage
);

export default router;

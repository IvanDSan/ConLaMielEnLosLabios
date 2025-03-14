import express from 'express'
const router = express.Router();
import productsControllers from './products.controllers.js';

router.get("/all", productsControllers.getProducts); // Obtener todos los productos
router.post("/verify", productsControllers.verifyAdmin, productsControllers.createProduct); // Crear producto
router.put("/:id", productsControllers.verifyAdmin, productsControllers.editProduct); // Editar producto
router.delete("/:id", productsControllers.verifyAdmin, productsControllers.deleteProduct); // Borrar producto

export default router;

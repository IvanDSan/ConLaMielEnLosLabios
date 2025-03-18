import express from "express";
const router = express.Router();
import productsControllers from "./products.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

router.get("/all", productsControllers.getProducts); // Obtener todos los productos
router.post("/verify", verifyToken("admin"), productsControllers.createProduct); // Crear producto
router.put("/:id", verifyToken("admin"), productsControllers.editProduct); // Editar producto
router.delete("/:id", verifyToken("admin"), productsControllers.deleteProduct); // Borrar producto
router.get("/:id", productsControllers.getProductById); //Obtener producto por id

export default router;

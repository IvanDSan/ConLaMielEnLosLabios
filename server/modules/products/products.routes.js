import express from "express";
import ProductsController from "./products.controllers.js";

const router = express.Router();

router.get("/getNonDeletedProducts", ProductsController.getAllProducts);

export default router;

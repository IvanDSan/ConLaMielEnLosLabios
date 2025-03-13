import express from "express";
import CategoryController from "./categories.controllers.js";
const router = express.Router();

router.get("/get", CategoryController.getAllCategories);
router.post("/create", CategoryController.createCategory);
router.put("/update/:category_id", CategoryController.updateCategory);
router.delete("/delete/:category_id", CategoryController.logicDeleteCategory); 

export default router;

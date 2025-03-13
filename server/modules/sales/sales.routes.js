import express from "express";
import SalesControllers from "./sales.controllers.js";

const router = express.Router();

//Historial de pedidos
router.get("/all", SalesControllers.getsalesHistory);
//Borrado Logico
router.put("/deleteLogic/:sale_id", SalesControllers.logicDeleteSale);

export default router;

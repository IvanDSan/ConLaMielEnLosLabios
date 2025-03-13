import express from "express";
import usersController from "./users.controllers.js";

// Endpoint: http://localhost:4000/users
const router = express.Router();

//Historial de pedidos
router.get("/all", usersController.getsalesHistory);

export default router;

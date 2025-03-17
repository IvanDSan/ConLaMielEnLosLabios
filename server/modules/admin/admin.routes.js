import express from "express";
import adminController from "./admin.controllers.js";

const router = express.Router();

router.get("/users", adminController.getAllUsers);
router.put("/enableUser", adminController.enableUser);
router.put("/disableUser", adminController.disableUser);

export default router;

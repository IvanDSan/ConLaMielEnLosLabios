import express from "express";
import PaymentControllers from "./payment.controller.js";

const router = express.Router();

router.post("/checkout", PaymentControllers.processPayment);


export default router;
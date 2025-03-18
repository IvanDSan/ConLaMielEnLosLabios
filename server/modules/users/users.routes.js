import express from "express";
import UsersController from "./users.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import uploadImage from "../../middlewares/multerSingle.js";
import { sendContactEmail } from "../../services/mailer.js";


const router = express.Router();

router.post('/addProductToCart', verifyToken("user"), UsersController.addProductToCart);
router.post('/modifyCartQuantityToCart', verifyToken("user"), UsersController.modifyCartQuantityToCart);
router.post('/deleteProductToCart', verifyToken("user"), UsersController.deleteProductToCart);
router.post('/deleteCartFromUser', verifyToken("user"), UsersController.deleteCartFromUser);
router.get('/showAllFromCartToUser', verifyToken("user"), UsersController.showAllFromCartToUser);
router.post('/completePurchaseCart', verifyToken("user"), UsersController.completePurchaseCart);

router.post("/register", uploadImage("users"), UsersController.register);
router.post("/login", UsersController.login);
router.get("/verify/:token", UsersController.verify);
router.post("/recoveryPassword", UsersController.recoveryPassword);
router.get("/getUserById", verifyToken(), UsersController.getUserById);

router.post("/contact", async (req, res) => {
  try {
    const { nombre, apellido, email, entidad, mensaje } = req.body;

    if (!nombre || !apellido || !email || !mensaje) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    await sendContactEmail(nombre, apellido, email, entidad, mensaje);
    res.status(200).json({ message: "Formulario enviado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al enviar el formulario de contacto" });
  }
});

export default router;

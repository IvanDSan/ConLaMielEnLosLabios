import express from "express";
import BeehiveController from "./beehive.controller.js";
import uploadImage from "../../middlewares/multerArray.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/get", BeehiveController.getAllBeehives);
router.get("/get/:beehive_id", BeehiveController.getBeehiveById);

router.post("/create", verifyToken("admin"), uploadImage("beehives"), BeehiveController.createBeehive);
router.put("/update/:beehive_id", verifyToken("admin"), uploadImage("beehives"), BeehiveController.updateBeehive);
router.delete("/delete/:beehive_id", verifyToken("admin"), BeehiveController.logicDeleteBeehive);

router.get("/images/:beehive_id", BeehiveController.getBeehiveImages);

router.post("/images/:beehive_id", verifyToken("admin"), BeehiveController.uploadBeehiveImage);
router.delete("/images/:beehive_image_id", verifyToken("admin"), BeehiveController.deleteBeehiveImage);

export default router;

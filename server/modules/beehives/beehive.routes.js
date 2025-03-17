import express from "express";
import BeehiveController from "./beehive.controller.js";
import uploadImage from "../../middlewares/multerArray.js";
const router = express.Router();

router.get("/get", BeehiveController.getAllBeehives);
router.get("/get/:beehive_id", BeehiveController.getBeehiveById);
router.post("/create", uploadImage("beehives"), BeehiveController.createBeehive);
router.put("/update/:beehive_id", BeehiveController.updateBeehive);
router.delete("/delete/:beehive_id", BeehiveController.logicDeleteBeehive);

router.post("/images/:beehive_id", BeehiveController.uploadBeehiveImage);
router.get("/images/:beehive_id", BeehiveController.getBeehiveImages);
router.delete("/images/:beehive_image_id", BeehiveController.deleteBeehiveImage);

export default router;

import express from "express";
import controller from "../../controllers/phuong/bangQC-controller.js";
import multer from "multer";
import { storage } from "../../cloudinary/index.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/:bangId", controller.showDetail);

router.route("/:bangId/chinh-sua").get(controller.showEdit).post(upload.single("image"), controller.processEdit);

export default router;

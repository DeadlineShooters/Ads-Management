import express from "express";
import controller from "../../controllers/phuong/bangQC-controller.js";
import multer from "multer";
import { storage } from "../../cloudinary/index.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/:bangId?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.bangId ? controller.showDetail(req, res) : controller.show(req, res);
});

router.get("/:bangId/xem-yeu-cau", controller.showYeuCauCapPhep);
router.get("/:bangId/chinh-sua", controller.showEdit);
router.route("/:bangId/chinh-sua").get(controller.showEdit).post(upload.single("image"), controller.processEdit);

export default router;

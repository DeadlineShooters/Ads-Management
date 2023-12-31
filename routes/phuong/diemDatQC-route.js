import express from "express";
import controller from "../../controllers/phuong/diemDatQC-controller.js";
import multer from "multer";
import { storage } from "../../cloudinary/index.js";
import catchAsync from "../../utils/catchAsync.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/:diemId?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.diemId ? controller.showDetail(req, res) : controller.show(req, res);
});

router.route("/:diemId/chinh-sua").get(catchAsync(controller.showEdit)).post(upload.single("image"), controller.processEdit);
router.route("/:diemId/tao-yeu-cau").get(controller.showCreateRequest).post(upload.single("image"), controller.postCreateRequest);

export default router;

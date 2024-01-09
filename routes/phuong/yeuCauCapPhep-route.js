import express from "express";
import controller from "../../controllers/phuong/yeuCauCapPhep-controller.js";
import multer from "multer";
import { storage } from "../../cloudinary/index.js";

const upload = multer({ storage });
const router = express.Router();

router.get("/:yeuCauID?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.yeuCauID ? controller.showDetail(req, res) : controller.show(req, res);
});

router.delete("/:yeuCauID/huy-yeu-cau", controller.cancelRequest);

export default router;

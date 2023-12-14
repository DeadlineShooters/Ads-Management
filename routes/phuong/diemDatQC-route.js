import express from "express";
import controller from "../../controllers/phuong/diemDatQC-controller.js";

const router = express.Router();

router.get("/:diemId?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.diemId ? controller.showDetail(req, res) : controller.show(req, res);
});

router.route("/:diemId/chinh-sua").get(controller.showEdit).post(controller.processEdit);
router.route("/:diemId/tao-yeu-cau").get(controller.showCreateRequest).post(controller.postCreateRequest);

export default router;

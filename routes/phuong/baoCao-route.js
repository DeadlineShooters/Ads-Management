import express from "express";
import controller from "../../controllers/phuong/baoCao-controller.js";
import catchAsync from "../../utils/catchAsync.js";

const router = express.Router();

router.get("/:baoCaoId?", (req, res) => {
  res.locals.currentPage = "bao-cao";
  return req.params.baoCaoId ? controller.showDetail(req, res) : controller.show(req, res);
});

router.post("/:baoCaoId/update-report-status", catchAsync(controller.postReportStatus));

export default router;

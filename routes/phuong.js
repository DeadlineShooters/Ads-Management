import express from "express";
import {
  chiTietDiem,
  chiTietBang,
  diemDatQuangCao,
  bangQuangCao,
  baoCao,
  chiTietBaoCao,
  taoYeuCauCapPhep,
  errorPage,
  xemYeuCauCapPhep,
  updateReportStatus,
  taoYeuCauCapPhepPost,
} from "../controllers/phuong.js";

const router = express.Router();

router.get("/cac-diem-dat-quang-cao/:diemId?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.diemId ? chiTietDiem(req, res) : diemDatQuangCao(req, res);
});

// router.get("/cac-diem-dat-quang-cao", diemDatQuangCao);
// router.get("/cac-diem-dat-quang-cao/:diemId", chiTietDiem);
router.get("/cac-bang-quang-cao/:bangId?", (req, res) => {
  res.locals.currentPage = "quang-cao";
  return req.params.bangId ? chiTietBang(req, res) : bangQuangCao(req, res);
});

// router.get("/cac-bang-quang-cao", bangQuangCao);
// router.get("/cac-bang-quang-cao/:bangId", chiTietBang);

router.get("/cac-bao-cao/:baoCaoId?", (req, res) => {
  res.locals.currentPage = "bao-cao";
  return req.params.baoCaoId ? chiTietBaoCao(req, res) : baoCao(req, res);
});

// router.get("/cac-bao-cao", baoCao);
// router.get("/cac-bao-cao/:baoCaoId", chiTietBaoCao);

router
  .route("/cac-diem-dat-quang-cao/:diemId/tao-yeu-cau")
  .get(taoYeuCauCapPhep)
  .post(taoYeuCauCapPhepPost);
router.get("/cac-bang-quang-cao/:bangId/xem-yeu-cau", xemYeuCauCapPhep);

router.get("/error", errorPage);

router.post("/update-report-status/:baoCaoId", updateReportStatus);

export default router;

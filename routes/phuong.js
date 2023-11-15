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
  updateReportStatus,
} from "../controllers/phuong.js";

const router = express.Router();

router.get("/cac-diem-dat-quang-cao", diemDatQuangCao);
router.get("/cac-diem-dat-quang-cao/:diemId", chiTietDiem);

router.get("/cac-bang-quang-cao", bangQuangCao);
router.get("/cac-bang-quang-cao/:bangId", chiTietBang);

router.get("/cac-bao-cao", baoCao);

router.get("/cac-bao-cao/:baoCaoId", chiTietBaoCao);

router.get("/tao-yeu-cau-cap-phep", taoYeuCauCapPhep);

router.get("/error", errorPage);

router.post("/update-report-status/:baoCaoId", updateReportStatus);

router.post("/tao-yeu-cau-cap-phep", taoYeuCauCapPhep);

export default router;

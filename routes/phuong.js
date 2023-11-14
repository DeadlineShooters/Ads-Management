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

router.get("/chi_tiet_diem", chiTietDiem);

router.get("/chi_tiet_bang", chiTietBang);

router.get("/diem-dat-quang-cao", diemDatQuangCao);

router.get("/bang-quang-cao", bangQuangCao);

router.get("/bao-cao", baoCao);

router.get("/chi-tiet-bao-cao", chiTietBaoCao);

router.get("/tao-yeu-cau-cap-phep", taoYeuCauCapPhep);

router.get("/error", errorPage);

router.post("/update-report-status", updateReportStatus);

router.post("/tao-yeu-cau-cap-phep", taoYeuCauCapPhep);

export default router;

import express from "express";
const router = express.Router();
import * as hanhChinh from '../../controllers/so/hanhChinh/hanhChinhControllers.js';

router.get('/cap-phep-qc', hanhChinh.dsCapPhepQC);
router.get('/cap-phep-qc/chi-tiet-yeu-cau', hanhChinh.chiTietYeuCauCapPhep);
router.get('/chinh-diem-qc', hanhChinh.dsChinhDiemQC);
router.get('/chinh-diem-qc/chi-tiet-yeu-cau', hanhChinh.chiTietChinhDiemQC);
router.get('/chinh-bang-qc', hanhChinh.dsChinhBangQC);
router.get('/chinh-bang-qc/chi-tiet-yeu-cau', hanhChinh.chiTietChinhBangQC);
router.get('/thong-ke-qc', hanhChinh.tkBaoCaoXuLy);

export default router;
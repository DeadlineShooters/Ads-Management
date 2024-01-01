import express from "express";
const router = express.Router();
import * as capPhepQC from '../../controllers/so/hanhChinh/capPhepQC.js';
import * as chinhDiemQC from '../../controllers/so/hanhChinh/chinhDiemQC.js';
import * as chinhBangQC from '../../controllers/so/hanhChinh/chinhBangQC.js';
import * as thongKeBaoCao from '../../controllers/so/hanhChinh/thongKeBaoCao.js';

router.get('/cap-phep-qc', capPhepQC.dsCapPhepQC);
router.get('/cap-phep-qc/chi-tiet-yeu-cau/:id', capPhepQC.chiTietYeuCauCapPhep);
router.put('/cap-phep-qc/chi-tiet-yeu-cau/:id/update-status', capPhepQC.capNhatYeuCauCapPhep);
router.get('/chinh-diem-qc', chinhDiemQC.dsChinhDiemQC);
router.get('/chinh-diem-qc/chi-tiet-yeu-cau/:id', chinhDiemQC.chiTietChinhDiemQC);
router.put('/chinh-diem-qc/chi-tiet-yeu-cau/:id/update-status', chinhDiemQC.capNhatChinhDiemQC);
router.get('/chinh-bang-qc', chinhBangQC.dsChinhBangQC);
router.get('/chinh-bang-qc/chi-tiet-yeu-cau/:id', chinhBangQC.chiTietChinhBangQC);
router.put('/chinh-bang-qc/chi-tiet-yeu-cau/:id/update-status', chinhBangQC.capNhatChinhBangQC);
router.get('/thong-ke-qc', thongKeBaoCao.tkBaoCaoXuLy);

export default router;
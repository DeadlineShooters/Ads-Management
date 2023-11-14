import express from "express";
const router = express.Router();

router.get('/cap-phep-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs');
})

router.get('/cap-phep-qc/chi-tiet-yeu-cau', (req, res) => {
    res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs');
})

router.get('/chinh-diem-qc/chi-tiet-yeu-cau', (req, res) => {
  res.render('so/hanhChinh/chiTiet/ndChinhDiemQC.ejs');
})

router.get('/chinh-bang-qc/chi-tiet-yeu-cau', (req, res) => {
  res.render('so/hanhChinh/chiTiet/ndChinhBangQC.ejs');
})

router.get('/chinh-diem-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs');
})

router.get('/chinh-bang-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs');
})

router.get('/thong-ke-qc', (req, res) => {
    res.render('so/hanhChinh/dsThongKeBaoCao.ejs');
})


export default router;
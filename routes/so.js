import express from "express";
const router = express.Router();

router.get('/qlQuan', (req, res) => {
    res.render('so/qlqp/qlQuan.ejs');
})

router.get('/hanhchinh/cap-phep-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs');
})

router.get('/hanhchinh/cap-phep-qc/chi-tiet-yeu-cau', (req, res) => {
    res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs');
})

router.get('/hanhchinh/chinh-diem-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs');
})

router.get('/hanhchinh/chinh-bang-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs');
})

router.get('/hanhchinh/thong-ke-qc', (req, res) => {
    res.render('so/hanhChinh/dsThongKeBaoCao.ejs');
})

router.get('/canbo/tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dsTaiKhoanCanBo.ejs');
})

router.get('/canbo/dang-ky-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dkTaiKhoanCanBo.ejs');
})

router.get('/canbo/chinh-sua-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/chinhSuaTaiKhoan.ejs');
})

export default router;
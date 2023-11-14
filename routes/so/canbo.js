import express from "express";
const router = express.Router();


router.get('/tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dsTaiKhoanCanBo.ejs');
})

router.get('/dang-ky-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dkTaiKhoanCanBo.ejs');
})

router.get('/chinh-sua-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/chinhSuaTaiKhoan.ejs');
})

export default router;
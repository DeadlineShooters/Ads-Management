import express from "express";
const router = express.Router();
import * as canBo from "../../controllers/so/canBo/canBoControllers.js";

router.get('/tai-khoan-cb', canBo.danhSachCanBo);
router.get('/dang-ky-tai-khoan-cb', canBo.dkTaiKhoanCanBo);
router.post('/dang-ky-tai-khoan-cb', canBo.guiInfoTaiKhoanCanBo);
router.get('/chinh-sua-tai-khoan-cb/:id', canBo.suaTaiKhoanCanBo);
router.put('/chinh-sua-tai-khoan-cb/:id', canBo.capNhatTaiKhoanCanBo);
router.delete('/chinh-sua-tai-khoan-cb/:id', canBo.xoaTaiKhoanCanBo);
export default router;
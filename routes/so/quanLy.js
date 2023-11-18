import express from "express";
// import * as quan_phuong from '@controllers/so/quanLy/quan-phuong.js';
import * as quan_phuong from '../../controllers/so/quanLy/quan-phuong.js';
import * as loaiHinhqc from '../../controllers/so/quanLy/loaiHinhqc.js';
import * as loaiBangqc from '../../controllers/so/quanLy/loaiBangqc.js';
import * as hinhThucbc from '../../controllers/so/quanLy/hinhThucbc.js';
import * as diemDatqc from '../../controllers/so/quanLy/diemDatqc.js';
import * as bangqc from '../../controllers/so/quanLy/bangqc.js';
const router = express.Router();


// Quản lý quận và phường trong mỗi quận
router.get("/quan", quan_phuong.index);
router.get("/quan/add", quan_phuong.renderAddForm);
router.get("/quan/:quanId/edit", quan_phuong.renderEditForm);
router.get("/quan/:quanId/phuong", quan_phuong.phuongIndex);
router.get("/quan/:quanId/phuong/add", quan_phuong.renderPhuongAddForm);
router.get("/quan/:quanId/phuong/:phuongID/edit", quan_phuong.renderPhuongEditForm);


// Quản lý loại hình quảng cáo
router.get("/loai-hinh-quang-cao", loaiHinhqc.index);
router.get("/loai-hinh-quang-cao/:id/edit", loaiHinhqc.renderEditForm);
router.get("/loai-hinh-quang-cao/add", loaiHinhqc.renderAddForm);

// Quản lý loại bảng quảng cáo
router.get("/loai-bang-quang-cao", loaiBangqc.index);
router.get("/loai-bang-quang-cao/:id/edit", loaiBangqc.renderEditForm);
router.get("/loai-bang-quang-cao/add", loaiBangqc.renderAddForm);

// Quản lý hình thức báo cáo
router.get("/hinh-thuc-bao-cao", hinhThucbc.index);
router.get("/hinh-thuc-bao-cao/:id/edit", hinhThucbc.renderEditForm);
router.get("/hinh-thuc-bao-cao/add", hinhThucbc.renderAddForm);

// Quản lý điểm đặt
router.get("/diem-dat-quang-cao", diemDatqc.index);
router.get("/diem-dat-quang-cao/add", diemDatqc.renderAddForm);
router.get("/diem-dat-quang-cao/:id", diemDatqc.showDetails);
router.get("/diem-dat-quang-cao/:id/edit", diemDatqc.renderEditForm);

// Quản lý bảng quảng cáo
router.get("/bang-quang-cao", bangqc.index);
router.get("/bang-quang-cao/add", bangqc.renderAddForm);
router.get("/bang-quang-cao/:id", bangqc.showDetails);
router.get("/bang-quang-cao/:id/edit", bangqc.renderEditForm);

export default router;
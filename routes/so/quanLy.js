import express from "express";
// import * as quan_phuong from '@controllers/so/quanLy/quan-phuong.js';
import * as quan from '../../controllers/so/quanLy/quan.js';
import * as phuong from '../../controllers/so/quanLy/phuong.js';
import * as loaiHinhqc from '../../controllers/so/quanLy/loaiHinhqc.js';
import * as loaiBangqc from '../../controllers/so/quanLy/loaiBangqc.js';
import * as loaiViTri from '../../controllers/so/quanLy/loaiViTri.js';
import * as hinhThucbc from '../../controllers/so/quanLy/hinhThucbc.js';
import * as diemDatqc from '../../controllers/so/quanLy/diemDatqc.js';
import * as bangqc from '../../controllers/so/quanLy/bangqc.js';
const router = express.Router();


// Quản lý quận
router.get("/quan", quan.index);
router.get("/quan/add", quan.renderAddForm);
router.get("/quan/:quanId/edit", quan.renderEditForm);
router.post("/quan", quan.add);
router.put("/quan/:quanId", quan.update);
router.delete("/quan/:quanId", quan.remove);

// Quản lý phường trong mỗi quận
router.get("/quan/:quanId/phuong", phuong.index);
router.get("/quan/:quanId/phuong/add", phuong.renderAddForm);
router.get("/quan/:quanId/phuong/:phuongId/edit", phuong.renderEditForm);
router.post("/quan/:quanId/phuong", phuong.add);
router.delete("/quan/:quanId/phuong/:phuongId", phuong.remove);
router.put("/quan/:quanId/phuong/:phuongId", phuong.update);


// Quản lý loại hình quảng cáo
router.get("/loai-hinh-quang-cao", loaiHinhqc.index);
router.get("/loai-hinh-quang-cao/:id/edit", loaiHinhqc.renderEditForm);
router.get("/loai-hinh-quang-cao/add", loaiHinhqc.renderAddForm);
router.post("/loai-hinh-quang-cao", loaiHinhqc.add);
router.put("/loai-hinh-quang-cao/:id", loaiHinhqc.update);
router.delete("/loai-hinh-quang-cao/:id", loaiHinhqc.remove);

// Quản lý loại bảng quảng cáo
router.get("/loai-bang-quang-cao", loaiBangqc.index);
router.get("/loai-bang-quang-cao/:id/edit", loaiBangqc.renderEditForm);
router.get("/loai-bang-quang-cao/add", loaiBangqc.renderAddForm);
router.post("/loai-bang-quang-cao", loaiBangqc.add);
router.put("/loai-bang-quang-cao/:id", loaiBangqc.update);
router.delete("/loai-bang-quang-cao/:id", loaiBangqc.remove);

// Quản lý loại vị trí
router.get("/loai-vi-tri", loaiViTri.index);
router.get("/loai-vi-tri/:id/edit", loaiViTri.renderEditForm);
router.get("/loai-vi-tri/add", loaiViTri.renderAddForm);
router.post("/loai-vi-tri", loaiViTri.add);
router.put("/loai-vi-tri/:id", loaiViTri.update);
router.delete("/loai-vi-tri/:id", loaiViTri.remove);

// Quản lý hình thức báo cáo
router.get("/hinh-thuc-bao-cao", hinhThucbc.index);
router.get("/hinh-thuc-bao-cao/:id/edit", hinhThucbc.renderEditForm);
router.get("/hinh-thuc-bao-cao/add", hinhThucbc.renderAddForm);
router.post("/hinh-thuc-bao-cao", hinhThucbc.add);
router.put("/hinh-thuc-bao-cao/:id", hinhThucbc.update);
router.delete("/hinh-thuc-bao-cao/:id", hinhThucbc.remove);

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
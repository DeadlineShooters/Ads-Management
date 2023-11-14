import express from "express";
// import * as quan_phuong from '@controllers/so/quanLy/quan-phuong.js';
import * as quan_phuong from '../../controllers/so/quanLy/quan-phuong.js';
import * as lhqc_htbc from '../../controllers/so/quanLy/lhqc-htbc.js';
const router = express.Router();


// Quản lý quận và phường trong mỗi quận
router.get("/quan", quan_phuong.index);
router.get("/quan/add", quan_phuong.renderAddForm);
router.get("/quan/:quanId/edit", quan_phuong.renderEditForm);
router.get("/quan/:quanId/phuong", quan_phuong.phuongIndex);
router.get("/quan/:quanId/phuong/add", quan_phuong.renderPhuongAddForm);
router.get("/quan/:quanId/phuong/:phuongID/edit", quan_phuong.renderPhuongEditForm);


// Quản lý loại hình quảng cáo
router.get("/loaihinhqc", lhqc_htbc.index);
router.get("/loaihinhqc/21127089/edit", (req, res) => {
  res.render("so/qlLoaiHinhqc/edit");
});
router.get("/loaihinhqc/new", (req, res) => {
  res.render("so/qlLoaiHinhqc/new");
});

// Quản lý hình thức báo cáo
router.get("/hinhthucbc", (req, res) => {
  res.render("so/qlHinhthucbc/ql");
});
router.get("/hinhthucbc/21127089/edit", (req, res) => {
  res.render("so/qlHinhthucbc/edit");
});
router.get("/hinhthucbc/new", (req, res) => {
  res.render("so/qlHinhthucbc/new");
});

// Quản lý điểm đặt
router.get("/diemdatqc", (req, res) => {
  res.render("so/qlDiemDatqc/ql");
});
router.get("/diemdatqc/21127089", (req, res) => {
  const bangqc = {
    title: "điểm đặt",
    addr: "157 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận",
    adType: "Quảng cáo thương mại",
    locationType: "Đất công / Công viên / Hành lang an toàn giao thông",
    status: "ĐÃ QUY HOẠCH",
    b1text: "Tạo yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
  };
  res.render("so/qlDiemDatqc/details", { details: bangqc });
});
router.get("/diemdatqc/21127089/edit", (req, res) => {
  res.render("so/qlDiemDatqc/edit");
});
router.get("/diemdatqc/new", (req, res) => {
  res.render("so/qlDiemDatqc/new");
});

// Quản lý bảng quảng cáo
router.get("/bangqc", (req, res) => {
  res.render("so/qlBangqc/ql");
});
router.get("/bangqc/21127089", (req, res) => {
  const diemQC = {
    title: "bảng",
    boardType: "Trụ màn hình điện tử LED",
    addr: "157 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận",
    adType: "Quảng cáo thương mại",
    locationType: "Đất công / Công viên / Hành lang an toàn giao thông",
    size: { w: 2.5, h: 10 },
    quantity: 2,
    expireDate: { d: 15, m: 5, y: 24 },
    b1text: "Xem yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
  };
  res.render("so/qlBangqc/details", { details: diemQC });
});
router.get("/bangqc/21127089/edit", (req, res) => {
  res.render("so/qlBangqc/edit");
});
router.get("/bangqc/new", (req, res) => {
  res.render("so/qlBangqc/new");
});

export default router;
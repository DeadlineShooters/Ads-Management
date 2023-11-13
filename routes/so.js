import express from "express";
const router = express.Router();

router.get("/qlquan", (req, res) => {
  // Tìm lấy tất cả quận trong db
  // const dsQuan = await Quan.find({})
  const dsQuan = null;
  res.render("so/qlqp/qlQuan", {dsQuan});
});

router.get("/qlquan/new", (req, res) => {
  res.render("so/qlqp/newQuan");
});

router.get("/qlquan/:quanId/edit", (req, res) => {
  res.render("so/qlqp/editQuan");
});

router.get("/qlquan/:quanId/qlphuong", (req, res) => {
  // dựa vào id tìm quận tương ứng
  // const quan = await Quan.findById(req.params.id);
  const quan = null;
  res.render("so/qlqp/qlPhuong", { quan });
});

router.get("/qlquan/:quanId/qlphuong/new", (req, res) => {
  res.render("so/qlqp/newPhuong");
});

router.get("/qlquan/:quanId/qlphuong/:phuongID/edit", (req, res) => {
  res.render("so/qlqp/editPhuong");
});

router.get("/qlloaihinhqc", (req, res) => {
  res.render("so/qlLoaiHinhqc/ql");
});
router.get("/qlloaihinhqc/21127089/edit", (req, res) => {
  res.render("so/qlLoaiHinhqc/edit");
});
router.get("/qlloaihinhqc/new", (req, res) => {
  res.render("so/qlLoaiHinhqc/new");
});

router.get("/qlloaihinhthucbc", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/ql");
});
router.get("/qlloaihinhthucbc/21127089/edit", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/edit");
});
router.get("/qlloaihinhthucbc/new", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/new");
});

router.get("/qldiemdatqc", (req, res) => {
  res.render("so/qlDiemDatqc/ql");
});
router.get("/qldiemdatqc/21127089", (req, res) => {
  res.render("so/qlDiemDatqc/details");
});
router.get("/qldiemdatqc/21127089/edit", (req, res) => {
  res.render("so/qlDiemDatqc/edit");
});
router.get("/qldiemdatqc/new", (req, res) => {
  res.render("so/qlDiemDatqc/new");
});

router.get("/qlbangqc", (req, res) => {
  res.render("so/qlBangqc/ql");
});
router.get("/qlbangqc/21127089", (req, res) => {
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
  res.render("phuong/QC-details.ejs", { details: diemQC });
});
router.get("/qlbangqc/21127089/edit", (req, res) => {
  res.render("so/qlBangqc/edit");
});
router.get("/qlbangqc/new", (req, res) => {
  res.render("so/qlBangqc/new");
});

export default router;

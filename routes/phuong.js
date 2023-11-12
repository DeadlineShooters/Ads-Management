import express from "express";
const router = express.Router();

router.get("/chi_tiet_diem_quang_cao", (req, res) => {
  // res.render("phuong/diemQC-details.ejs", { cssfile: "/phuong/style.css" });
  const diemQC = {
    title: "điểm đặt",
    addr: "157 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận",
    adType: "Quảng cáo thương mại",
    locationType: "Đất công / Công viên / Hành lang an toàn giao thông",
    status: "ĐÃ QUY HOẠCH",
    b1text: "Tạo yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
  };
  res.render("phuong/QC-details.ejs", {
    details: diemQC,
    cssfile: "/style.css",
  });
});

router.get("/chi_tiet_bang_quang_cao", (req, res) => {
  // res.render("phuong/diemQC-details.ejs", { cssfile: "/phuong/style.css" });
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

export default router;

import express from "express";
const router = express.Router();

// địa chỉ cac diem quang cao
const registeredAddresses = [
  "157 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận",
];

router.get("/chi_tiet_diem", (req, res) => {
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
    user: req.user,
  });
});

router.get("/chi_tiet_bang", (req, res) => {
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
  res.render("phuong/QC-details.ejs", { details: diemQC, user: req.user });
});

router.get("/diem-dat-quang-cao", (req, res) => {
  res.render("phuong/diemDatList", { user: req.user });
});

router.get("/bang-quang-cao", (req, res) => {
  res.render("phuong/bangList", { user: req.user });
});

router.get("/bao-cao", (req, res) => {
  res.render("phuong/reportList", { user: req.user });
});

router.get("/chi-tiet-bao-cao", (req, res) => {
  res.render("phuong/reportDetails", { user: req.user });
});

router.get("/tao-yeu-cau-cap-phep", (req, res) => {
  const fullAddr = req.query.addr;

  const foundAddr = registeredAddresses.find((address) => address === fullAddr);

  if (!foundAddr) {
    res.render("error", { error: "404 Not Found" });
    return;
  }
  const parts = foundAddr.split(",");
  res.render("phuong/taoYeuCauCapPhep", {
    addr: parts[0],
    ward: parts[1],
    district: parts[2],
    cssfile: "/phuong/css/taoYeuCauCapPhep-style.css",
  });
});

router.get("/error", (req, res) => {
  res.render("error");
});
router.post("/update-report-status", (req, res) => {
  const status = req.body.status;
  const method = req.body.method;
  console.log(`Status: ${status}, Method: ${method}`);
  res.redirect("/chi-tiet-bao-cao");
});

router.post("/tao-yeu-cau-cap-phep", (req, res) => {
  const data = req.body;
  console.log(data);
  // route tới danh sách bảng quảng cáo
  res.redirect("/bang-quang-cao");
});

/*------------ Quan ------------- */

export default router;

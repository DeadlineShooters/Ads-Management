import { registeredAddresses } from "../models/advertisingModels.js";

function chiTietDiem(req, res) {
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
}

function chiTietBang(req, res) {
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
}

function diemDatQuangCao(req, res) {
  res.render("phuong/diemDatList", { user: req.user });
}

function bangQuangCao(req, res) {
  res.render("phuong/bangList", { user: req.user });
}

function baoCao(req, res) {
  res.render("phuong/reportList", { user: req.user });
}

function chiTietBaoCao(req, res) {
  res.render("phuong/reportDetails", { user: req.user });
}

function taoYeuCauCapPhep(req, res) {
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
}

function errorPage(req, res) {
  res.render("error");
}

function updateReportStatus(req, res) {
  const status = req.body.status;
  const method = req.body.method;
  console.log(`Status: ${status}, Method: ${method}`);
  res.redirect("/chi-tiet-bao-cao");
}

function taoYeuCauCapPhepPost(req, res) {
  const data = req.body;
  console.log(data);
  res.redirect("/bang-quang-cao");
}

export {
  chiTietDiem,
  chiTietBang,
  diemDatQuangCao,
  bangQuangCao,
  baoCao,
  chiTietBaoCao,
  taoYeuCauCapPhep,
  errorPage,
  updateReportStatus,
  taoYeuCauCapPhepPost,
};

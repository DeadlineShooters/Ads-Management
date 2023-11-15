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

  const { diemId } = req.params;
  console.log(diemId);
  res.render("phuong/QC-details.ejs", {
    details: diemQC,
    cssfile: "/style.css",
    user: req.user,
    diemId,
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

  const { bangId } = req.params;

  res.render("phuong/QC-details.ejs", {
    details: diemQC,
    user: req.user,
    bangId,
  });
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
  const { baoCaoId } = req.params;
  const props = {
    baoCaoId,
  };
  res.render("phuong/reportDetails", props);
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
  const { baoCaoId } = req.params;
  console.log(`Status: ${status}, Method: ${method}`);
  res.redirect(`/cac-bao-cao/${baoCaoId}`);
}

function taoYeuCauCapPhepPost(req, res) {
  const data = req.body;
  console.log(data);
  res.redirect("/cac-bang-quang-cao");
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

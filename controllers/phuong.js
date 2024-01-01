function chiTietDiem(req, res) {
  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt quảng cáo", link: "" },
  ];
  const diemQC = {
    title: "điểm đặt",
    addr: "157 Nguyễn Đình Chính, Phường 11, Quận Phú Nhuận",
    adType: "Quảng cáo thương mại",
    locationType: "Đất công / Công viên / Hành lang an toàn giao thông",
    status: "ĐÃ QUY HOẠCH",
    b1text: "Tạo yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
    b1Url: `/cac-diem-dat-quang-cao/${diemId}/tao-yeu-cau`,
  };

  // console.log(diemId);
  res.render("phuong/QC-details.ejs", {
    details: diemQC,
    cssfile: "/style.css",
    user: req.user,
    diemId,
    breadcrumbs,
  });
}

function chiTietBang(req, res) {
  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: "" },
  ];

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
    b1Url: `/cac-bang-quang-cao/${bangId}/xem-yeu-cau`,
  };

  res.render("phuong/QC-details.ejs", {
    details: diemQC,
    user: req.user,
    bangId,
    breadcrumbs,
  });
}

function diemDatQuangCao(req, res) {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các điểm đặt quảng cáo", link: "" },
  ];

  res.render("phuong/diemDatList", { breadcrumbs });
}

function bangQuangCao(req, res) {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các bảng quảng cáo", link: "" },
  ];
  res.render("phuong/bangList", { breadcrumbs });
}

function baoCao(req, res) {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các báo cáo", link: "" },
  ];

  res.render("phuong/reportList", { breadcrumbs });
}

function chiTietBaoCao(req, res) {
  const { baoCaoId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Danh sách báo cáo", link: "/cac-bao-cao" },
    { name: "Chi tiết báo cáo", link: "" },
  ];
  const props = {
    baoCaoId,
    breadcrumbs,
  };

  res.render("phuong/reportDetails", props);
}

function taoYeuCauCapPhep(req, res) {
  res.locals.currentPage = "quang-cao";

  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Tạo yêu cầu cấp phép", link: "" },
  ];
  res.render("phuong/taoYeuCauCapPhep", {
    cssfile: "/phuong/css/taoYeuCauCapPhep-style.css",
    diemId,
    breadcrumbs,
  });
}

function errorPage(req, res) {
  res.render("error");
}

function updateReportStatus(req, res) {
  res.locals.currentPage = "bao-cao";

  const status = req.body.status;
  const method = req.body.method;
  const { baoCaoId } = req.params;
  console.log(`Status: ${status}, Method: ${method}`);
  res.redirect(`/cac-bao-cao/${baoCaoId}`);
}

function taoYeuCauCapPhepPost(req, res) {
  const data = req.body;
  // console.log(data);
  res.redirect("/cac-bang-quang-cao");
}

function xemYeuCauCapPhep(req, res) {
  res.locals.currentPage = "bao-cao";

  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Xem yêu cầu cấp phép", link: "" },
  ];
  res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs });
}

export {
  xemYeuCauCapPhep,
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

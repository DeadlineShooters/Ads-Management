const controller = {};

controller.show = (req, res) => {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các điểm đặt quảng cáo", link: "" },
  ];

  res.render("phuong/diemDatList", { breadcrumbs });
};

controller.showDetail = (req, res) => {
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
};

controller.showCreateRequest = (req, res) => {
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
};

controller.postCreateRequest = (req, res) => {
  const data = req.body;
  // console.log(data);
  res.redirect("/cac-bang-quang-cao");
};
export default controller;

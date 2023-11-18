const controller = {};

controller.show = (req, res) => {
  const breadcrumbs = [{ name: "Các điểm đặt quảng cáo", link: "" }];

  res.render("phuong/diemDatList", { breadcrumbs });
};

controller.showDetail = (req, res) => {
  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: "" },
  ];

  const adLocation = {
    id: `${diemId}`,
    longLat: "10.752334, 106.643366",
    address: "157 Nguyễn Đình Chính",
    district: "Phú Nhuận",
    ward: "11",
    type: "Đất công/Công viên/Hành lang an toàn giao thông",
    adType: "Quảng cáo thương mại",
    status: "Đã quy hoạch",
  };

  const props = {
    title: "điểm đặt",
    b1text: "Tạo yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
    b1url: `/cac-diem-dat-quang-cao/${diemId}/tao-yeu-cau`,
    b2url: `/cac-diem-dat-quang-cao/${diemId}/chinh-sua`,

    b1color: "secondary",
    b2color: "success",
  };

  // console.log(diemId);
  res.render("phuong/QC-details.ejs", {
    details: adLocation,
    props,
    cssfile: "/style.css",
    diemId,
    breadcrumbs,
  });
};

controller.showCreateRequest = (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Tạo yêu cầu cấp phép", link: "" },
  ];
  res.render("phuong/taoYeuCauCapPhep", {
    cssfile: "/phuong/css/taoYeuCauCapPhep-style.css",
    diemId,
    breadcrumbs,
  });
};

controller.showEdit = (req, res) => {
  res.locals.currentPage = "quang-cao";
  const { diemId } = req.params;

  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: `/cac-diem-dat-quang-cao/${diemId}` },
    { name: "Chỉnh sửa", link: "" },
  ];

  const adLocation = {
    id: `${diemId}`,
    longLat: "10.752334, 106.643366",
    address: "157 Nguyễn Đình Chính",
    district: "Phú Nhuận",
    ward: "11",
    type: "Đất công/Công viên/Hành lang an toàn giao thông",
    adType: "Quảng cáo thương mại",
    status: "Đã quy hoạch",
  };
  res.render("so/quanly/diemDatqc/edit", {
    adLocation,
    breadcrumbs,
  });
};

controller.postCreateRequest = (req, res) => {
  const data = req.body;
  // console.log(data);
  res.redirect("/cac-bang-quang-cao");
};
export default controller;

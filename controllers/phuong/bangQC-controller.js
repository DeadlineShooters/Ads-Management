const controller = {};

controller.show = (req, res) => {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các bảng quảng cáo", link: "" },
  ];
  res.render("phuong/bangList", { breadcrumbs });
};

controller.showDetail = (req, res) => {
  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: "" },
  ];

  const bangQC = {
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
    details: bangQC,
    user: req.user,
    bangId,
    breadcrumbs,
  });
};

controller.showYeuCauCapPhep = (req, res) => {
    res.locals.currentPage = "quang-cao";

    const { bangId } = req.params;
    const breadcrumbs = [
      { name: "Home", link: "/" },
      { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
      { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
      { name: "Xem yêu cầu cấp phép", link: "" },
    ];
    res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs });
};
export default controller;

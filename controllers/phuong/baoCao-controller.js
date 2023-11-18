const controller = {};

controller.show = (req, res) => {
  const breadcrumbs = [
    { name: "Home", link: "/" },
    { name: "Các báo cáo", link: "" },
  ];

  res.render("phuong/reportList", { breadcrumbs });
};

controller.showDetail = (req, res) => {
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
};

controller.postReportStatus = (req, res) => {
  res.locals.currentPage = "bao-cao";

  const status = req.body.status;
  const method = req.body.method;
  const { baoCaoId } = req.params;
  console.log(`Status: ${status}, Method: ${method}`);
  res.redirect(`/cac-bao-cao/${baoCaoId}`);
};

export default controller;

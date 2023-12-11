import { getWardsForUser } from "../../utils/WardUtils.js";

const controller = {};

const adLocation = {
  id: "001",
  longLat: "10.752334, 106.643366",
  address: "157 Nguyễn Đình Chính",
  district: "Phú Nhuận",
  ward: "11",
  type: "Đất công/Công viên/Hành lang an toàn giao thông",
  adType: "Quảng cáo thương mại",
  status: "Đã quy hoạch",
};

controller.show = async (req, res) => {
  const breadcrumbs = [];
  const wards = await getWardsForUser(req.user);

  res.render("phuong/bangList", { breadcrumbs, wards });
};

controller.showDetail = (req, res) => {
  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: "" },
  ];

  const adBoard = {
    id: `${bangId}`,

    boardType: "Trụ màn hình điện tử LED",
    size: { w: 2.5, h: 10 },

    quantity: 2,
    startDate: { d: 15, m: 5, y: 23 },
    expireDate: { d: 15, m: 5, y: 24 },
    status: "Đã duyệt",
    adLocation: adLocation,
  };

  const props = {
    title: "bảng",
    b1text: "Xem yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
    b1url: `/cac-bang-quang-cao/${bangId}/xem-yeu-cau`,

    b2url: `/cac-bang-quang-cao/${bangId}/chinh-sua`,

    b1color: "secondary",
    b2color: "success",
  };

  res.render("phuong/QC-details.ejs", {
    details: adBoard,
    props,
    user: req.user,
    bangId,
    breadcrumbs,
  });
};

controller.showYeuCauCapPhep = (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Xem yêu cầu cấp phép", link: "" },
  ];
  res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs });
};

controller.showEdit = (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;

  const adBoard = {
    id: `${bangId}`,

    boardType: "Trụ màn hình điện tử LED",
    size: { w: 2.5, h: 10 },

    quantity: 2,
    startDate: { d: 15, m: 5, y: 23 },
    expireDate: { d: 15, m: 5, y: 24 },
    status: "Đã duyệt",
    adLocation: adLocation,
  };

  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Chỉnh sửa", link: "" },
  ];
  const boardTypes = [
    { name: "Trụ bảng hiflex" },
    { name: "Trụ màn hình điện tử LED" },
    { name: "Trụ hộp đèn" },
    { name: "Bảng hiflex ốp tường" },
    { name: "Màn hình điện tử ốp tường" },
    { name: "Trụ treo băng rôn dọc" },
    { name: "Trụ treo băng rôn ngang" },
    { name: "Trụ/Cụm pano" },
    { name: "Cổng chào" },
    { name: "Trung tâm thương mại" },
  ];

  res.render("so/quanLy/bangqc/edit", { adBoard, breadcrumbs, boardTypes });
};
export default controller;

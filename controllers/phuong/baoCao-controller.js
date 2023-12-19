import Ward from "../../models/ward.js";
import { getWardsForUser } from "../../utils/WardUtils.js";
import Report from "../../models/report.js";

const controller = {};

controller.show = async (req, res) => {
  const breadcrumbs = [];
  const wards = await getWardsForUser(req.user);
  const reports = await Report.find({})
    .populate(["reportType", "adBoard"])
    .populate({ path: "randomLocation", populate: ["district", "ward"] });

  if (req.user.role === "quan") {
    // console.log("District: " + foundDistrict._id);
    reports = reports.filter((report) => {
      if (report.randomLocation) {
        return report.randomLocation.district._id === req.user.district._id;
      }
    });
  } else {
    // phuong
    console.log("District: " + req.user.district + "\nward: " + req.user.ward);

    const foundWard = await Ward.findOne({
      name: req.user.ward,
      district: foundDistrict._id,
    });

    adBoards = adBoards.filter(
      (adBoard) =>
        adBoard.adLocation.district._id.toString() === foundDistrict._id.toString() && adBoard.adLocation.ward._id.toString() === foundWard._id.toString()
    );
  }

  res.render("phuong/reportList", { breadcrumbs, wards });
};

controller.showDetail = (req, res) => {
  const { baoCaoId } = req.params;
  const breadcrumbs = [
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

import Ward from "../../models/ward.js";
import { getWardsForUser } from "../../utils/WardUtils.js";
import Report from "../../models/report.js";
import nodemailer from "nodemailer";
import "../../loadEnv.js";

const controller = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

controller.show = async (req, res) => {
  const breadcrumbs = [];
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;

  const wards = await getWardsForUser(req.user);
  let reports = await Report.find({})
    .populate(["reportType"])
    .populate({ path: "randomPoint", populate: ["district", "ward"] })
    .populate({
      path: "adBoard",
      populate: {
        path: "adLocation",
        populate: ["ward", "district"],
      },
    });

  if (req.user.role === "quan") {
    // console.log("District: " + foundDistrict._id);
    reports = reports.filter((report) => {
      if (report.randomPoint) {
        return report.randomPoint.district._id == req.user.district._id;
      } else {
        // adBoard reported
        return report.adBoard.adLocation.district._id == req.user.district._id;
      }
    });
  } else {
    // phuong
    console.log("reports", reports);
    reports = reports.filter((report) => {
      console.log("@@ Report", report);
      if (report.randomPoint) {
        return report.randomPoint.district._id == req.user.district._id && report.randomPoint.ward._id == req.user.ward._id;
      } else {
        // adBoard reported
        console.log(report.adBoard.adLocation);
        return report.adBoard.adLocation.ward._id == req.user.ward._id && report.adBoard.adLocation.district._id == req.user.district._id;
      }
    });
  }

  let totalItems = reports.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };

  reports = reports.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  res.render("phuong/reportList", { reports: encodeURIComponent(JSON.stringify(reports)), breadcrumbs, wards, pagination });
};

controller.showDetail = async (req, res) => {
  // await Report.deleteMany({});
  const { baoCaoId } = req.params;
  const breadcrumbs = [
    { name: "Danh sách báo cáo", link: "/cac-bao-cao" },
    { name: "Chi tiết báo cáo", link: "" },
  ];

  const foundReport = await Report.findOne({ _id: baoCaoId })
    .populate(["reportType"])
    .populate({ path: "randomPoint", populate: ["district", "ward"] })
    .populate({
      path: "adBoard",
      populate: {
        path: "adLocation",
        populate: ["ward", "district"],
      },
    });
  const props = {
    baoCaoId,
    breadcrumbs,
    report: encodeURIComponent(JSON.stringify(foundReport)),
  };
  res.render("phuong/reportDetails", props);
};

controller.postReportStatus = async (req, res) => {
  res.locals.currentPage = "bao-cao";

  const status = req.body.status;
  const method = req.body.method;
  const { baoCaoId } = req.params;
  console.log(`Status: ${status}, Method: ${method}`);

  // send email to sender if both fields are filled and write to database
  let foundReport = await Report.findById(baoCaoId);

  foundReport.status = status;
  foundReport.handlingProcedure = method;
  console.log("Report updated successfully.", await foundReport.save());

  // send email:
  const emailOptions = await transporter.sendMail({
    from: "ngocphamanh2003@gmail.com", // Replace with your email
    to: foundReport.email, // Use the email from the foundReport
    subject: "Report Status Update",
    text: `Dear ${foundReport.fullName},\n\nYour report status has been updated to "${status}".\nHandling Procedure: ${method}\n\nBest regards,\nAds Management System`,
  });

  req.flash("success", "Bạn đã cập nhật thành công. Đã gửi mail tới " + foundReport.email);

  console.log("Message sent: %s", emailOptions.messageId);
  console.log("Receiver: ", foundReport.email);
  res.redirect(`/cac-bao-cao/${baoCaoId}`);
};

export default controller;

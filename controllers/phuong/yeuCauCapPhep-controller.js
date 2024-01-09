import { getWardsForUser } from "../../utils/WardUtils.js";
import AdBoard from "../../models/adBoard.js";
import District from "../../models/district.js";
import Ward from "../../models/ward.js";
import BoardType from "../../models/boardType.js";
import mongoose from "mongoose";
import AdBoardChangeRequest from "../../models/adBoardChangeRequest.js";
import AdBoardReq from "../../models/adBoardRequest.js";
import Report from "../../models/report.js";

const { Types } = mongoose;
const controller = {};

controller.show = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const breadcrumbs = [];

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;

  try {
    let adBoardReqs = [];
    adBoardReqs = await AdBoardReq.find({}).populate({
      path: "adBoard",
      populate: [
        {
          path: "adLocation",
          populate: [{ path: "district" }, { path: "ward" }],
        },
        "boardType",
      ],
    });

    if (req.user.role === "quan") {
      // console.log("District: " + foundDistrict._id);
      adBoardReqs = adBoardReqs.filter((adBoardReq) => {
        return adBoardReq.adBoard.adLocation.district._id == req.user.district._id;
      });
    } else {
      // phuong
      // console.log("District: " + req.user.district.name + "\nward: " + req.user.ward.name);

      adBoardReqs = adBoardReqs.filter((adBoardReq) => {
        return adBoardReq.adBoard.adLocation.district._id == req.user.district._id && adBoardReq.adBoard.adLocation.ward._id == req.user.ward._id;
      });
    }

    const totalItems = adBoardReqs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };

    adBoardReqs = adBoardReqs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const wards = await getWardsForUser(req.user);

    // console.log("@@ Wards ", wards);
    res.render("phuong/yeuCauCapPhepList", {
      breadcrumbs,
      wards,
      adBoardReqs: encodeURIComponent(JSON.stringify(adBoardReqs)),
      pagination,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

controller.cancelRequest = async (req, res) => {
  const { yeuCauID } = req.params;

  try {
    // Check if the board exists
    const boardToDelete = await AdBoard.findOne({ adBoardRequest: yeuCauID });
    console.log("Board to delete", boardToDelete);
    if (!boardToDelete) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Delete the adBoardRequest document
    await AdBoardReq.findByIdAndDelete(yeuCauID);

    // Delete the AdBoard document
    await AdBoard.findByIdAndDelete(boardToDelete._id);

    // delete all reports which has adBoard field (ObjectId) equal to this adBoard

    res.redirect("/cac-yeu-cau-cap-phep");
  } catch (error) {
    console.error("Error cancelling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.showDetail = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { yeuCauID } = req.params;
  const breadcrumbs = [
    { name: "Danh sách cấp phép quảng cáo", link: "/cac-yeu-cau-cap-phep" },
    // { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Xem yêu cầu cấp phép", link: "" },
  ];

  const adBoardReq = await AdBoardReq.findById(yeuCauID).populate(["sender"]);
  const adBoard = await AdBoard.findById(adBoardReq.adBoard)
    .populate({
      path: "adLocation",
      populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
    })
    .populate("boardType");

  res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs, adBoardReq, adBoard });
};

export default controller;

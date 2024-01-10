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

controller.showDetail = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;

  try {
    // Fetch adLocation details based on the diemId
    const adBoardDetails = await AdBoard.findById(bangId)
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
      })
      .populate(["boardType", "adBoardRequest"]);

    const breadcrumbs = [
      { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
      { name: "Chi tiết điểm đặt", link: `/cac-diem-dat-quang-cao/${adBoardDetails.adLocation._id}` },
      { name: "Chi tiết bảng quảng cáo", link: "" },
    ];

    res.render("so/quanLy/bangqc/details", {
      details: adBoardDetails,
      breadcrumbs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showEdit = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;
  const adBoard = await AdBoard.findById(bangId)
    .populate("boardType")
    .populate({ path: "adLocation", populate: ["district", "ward", "type", "adType"] });

  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: `/cac-diem-dat-quang-cao/${adBoard.adLocation._id}` },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Chỉnh sửa", link: "" },
  ];

  const boardTypes = await BoardType.find({});

  // console.log("ad board", adBoard);
  const edit_href = `/cac-bang-quang-cao/${bangId}/chinh-sua`;

  res.render("so/quanLy/bangqc/edit", { adBoard, breadcrumbs, boardTypes, adLocation: adBoard.adLocation, edit_href });
};

controller.processEdit = async (req, res) => {
  const { bangId } = req.params;
  const data = req.body.item;

  console.log("Board edit request", data, req.file);

  const editedBoard = await AdBoard.findById(bangId)
    .populate("boardType")
    .populate({ path: "adLocation", populate: ["district", "ward", "type", "adType"] });

  console.log("Dates", data.startDate, data.expireDate, data.size.h, data.size.w, data.boardType);
  const newAdBoard = new AdBoard({
    boardType: new Types.ObjectId(data.boardType),
    size: { h: data.size.h, w: data.size.w },
    quantity: data.quantity,
    startDate: data.startDate,
    expireDate: data.expireDate,
    adLocation: editedBoard.adLocation._id,
    adBoardRequest: editedBoard.adBoardRequest,
    reports: editedBoard.reports,
    status: editedBoard.status,
  });
  newAdBoard._id = bangId;

  if (req.file) {
    newAdBoard.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else {
    newAdBoard.image = {
      url: editedBoard.image.url,
      filename: editedBoard.image.filename,
    };
  }

  const newAdBoardEditReq = new AdBoardChangeRequest({
    adBoard: newAdBoard,
    reason: data.reason,
    sender: req.user._id,
    sendDate: new Date(),
    status: "Chưa duyệt",
  });

  console.log("New Ad Board Edit Request created!", await newAdBoardEditReq.save());
  res.redirect(`/cac-bang-quang-cao/${bangId}`);
};

export default controller;

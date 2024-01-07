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
  const breadcrumbs = [];

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;

  try {
    let adBoards = [];
    adBoards = await AdBoard.find({})
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }],
      })
      .populate(["boardType", "adBoardRequest"]);

    console.log("@@ adboards", adBoards);
    if (req.user.role === "quan") {
      // console.log("District: " + foundDistrict._id);
      adBoards = adBoards.filter((adBoard) => {
        return adBoard.adLocation.district._id == req.user.district._id;
      });
    } else {
      // phuong
      console.log("District: " + req.user.district.name + "\nward: " + req.user.ward.name);

      adBoards = adBoards.filter((adBoard) => {
        return adBoard.adLocation.district._id == req.user.district._id && adBoard.adLocation.ward._id == req.user.ward._id;
      });
    }

    const totalItems = adBoards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };

    adBoards = adBoards.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const wards = await getWardsForUser(req.user);

    // console.log("@@ Wards ", wards);
    res.render("phuong/bangList", {
      breadcrumbs,
      wards,
      adBoards: encodeURIComponent(JSON.stringify(adBoards)),
      pagination,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

controller.showDetail = async (req, res) => {
  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: "" },
  ];

  try {
    // Fetch adLocation details based on the diemId
    const adBoardDetails = await AdBoard.findById(bangId)
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
      })
      .populate(["boardType", "adBoardRequest"]);

    res.render("so/quanLy/bangqc/details", {
      details: adBoardDetails,
      breadcrumbs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showYeuCauCapPhep = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;
  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Xem yêu cầu cấp phép", link: "" },
  ];

  const adBoardReq = await AdBoardReq.findOne({ adBoard: new Types.ObjectId(bangId) }).populate(["sender"]);
  const adBoard = await AdBoard.findById(bangId)
    .populate({
      path: "adLocation",
      populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
    })
    .populate("boardType");

  res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs, adBoardReq, adBoard });
};

controller.showEdit = async (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { bangId } = req.params;

  const breadcrumbs = [
    { name: "Các bảng quảng cáo", link: "/cac-bang-quang-cao" },
    { name: "Chi tiết bảng quảng cáo", link: `/cac-bang-quang-cao/${bangId}` },
    { name: "Chỉnh sửa", link: "" },
  ];

  const boardTypes = await BoardType.find({});
  const adBoard = await AdBoard.findById(bangId)
    .populate("boardType")
    .populate({ path: "adLocation", populate: ["district", "ward", "type", "adType"] });

  console.log("ad board", adBoard);
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
    adBoard: newAdBoard._id,
    reason: data.reason,
    sender: req.user._id,
    sendDate: new Date(),
  });

  console.log("New Ad Board created!", await newAdBoard.save());
  console.log("New Ad Board Edit Request created!", await newAdBoardEditReq.save());
  res.redirect(`/cac-bang-quang-cao/${bangId}`);
};

controller.cancelRequest = async (req, res) => {
  const { bangId } = req.params;

  try {
    // Check if the board exists
    const boardToDelete = await AdBoard.findById(bangId);
    console.log("Board to delete", boardToDelete);
    if (!boardToDelete) {
      return res.status(404).json({ error: "Board not found" });
    }

    // Check if adBoardRequest exists
    const adBoardRequestId = boardToDelete.adBoardRequest;
    console.log("Ad board request", adBoardRequestId);
    if (!adBoardRequestId) {
      return res.status(400).json({ error: "Invalid adBoardRequest ID" });
    }

    // Delete the adBoardRequest document
    await AdBoardReq.findByIdAndDelete(adBoardRequestId);

    // Delete the AdBoard document
    await AdBoard.findByIdAndDelete(bangId);

    // delete all reports which has adBoard field (ObjectId) equal to this adBoard

    res.redirect("/cac-bang-quang-cao");
  } catch (error) {
    console.error("Error cancelling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default controller;

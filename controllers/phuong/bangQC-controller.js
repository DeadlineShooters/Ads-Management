import { getWardsForUser } from "../../utils/WardUtils.js";
import AdBoard from "../../models/adBoard.js";
import District from "../../models/district.js";
import Ward from "../../models/ward.js";
import BoardType from "../../models/boardType.js";
import mongoose from "mongoose";
import AdBoardChangeRequest from "../../models/adBoardChangeRequest.js";
import AdBoardReq from "../../models/adBoardRequest.js";

const { Types } = mongoose;
const controller = {};

const adLocation = {
  id: "001",
  latlng: "10.752334, 106.643366",
  address: "157 Nguyễn Đình Chính",
  district: "Phú Nhuận",
  ward: "11",
  type: "Đất công/Công viên/Hành lang an toàn giao thông",
  adType: "Quảng cáo thương mại",
  status: "Đã quy hoạch",
};

controller.show = async (req, res) => {
  const breadcrumbs = [];
  try {
    let adBoards = [];
    const foundDistrict = await District.findById(req.user.district._id);
    adBoards = await AdBoard.find({})
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }],
      })
      .populate(["boardType", "adBoardRequest"]);
    if (req.user.role === "quan") {
      // console.log("District: " + foundDistrict._id);
      adBoards = adBoards.filter((adBoard) => {
        return adBoard.adLocation.district._id.toString() === foundDistrict._id.toString();
      });
    } else {
      // phuong
      console.log("District: " + req.user.district.name + "\nward: " + req.user.ward.name);

      const foundWard = await Ward.findOne({
        name: req.user.ward.name,
        district: foundDistrict._id,
      });

      console.log(adBoards);
      adBoards = adBoards.filter((adBoard) => adBoard.adLocation.district._id == foundDistrict._id && adBoard.adLocation.ward._id == foundWard._id);
    }

    const wards = await getWardsForUser(req.user);
    res.render("phuong/bangList", {
      breadcrumbs,
      wards,
      adBoards: encodeURIComponent(JSON.stringify(adBoards)),
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

  // const adBoard = {
  //   id: `${bangId}`,

  //   boardType: "Trụ màn hình điện tử LED",
  //   size: { w: 2.5, h: 10 },

  //   quantity: 2,
  //   startDate: { d: 15, m: 5, y: 23 },
  //   expireDate: { d: 15, m: 5, y: 24 },
  //   status: "Đã duyệt",
  //   adLocation: adLocation,
  // };

  // const props = {
  //   title: "bảng",
  //   b1text: "Xem yêu cầu cấp phép",
  //   b2text: "Chỉnh sửa",
  //   b1url: `/cac-bang-quang-cao/${bangId}/xem-yeu-cau`,

  //   b2url: `/cac-bang-quang-cao/${bangId}/chinh-sua`,

  //   b1color: "secondary",
  //   b2color: "success",
  // };

  try {
    // Fetch adLocation details based on the diemId
    const adBoardDetails = await AdBoard.findById(bangId)
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
      })
      .populate("boardType");

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

  // format date YYYY-MM-DD
  let year = adBoard.startDate.y;
  let month = ("0" + adBoard.startDate.m).slice(-2); // adds leading zero if necessary
  let day = ("0" + adBoard.startDate.d).slice(-2); // adds leading zero if necessary

  let yearE = adBoard.expireDate.y;
  let monthE = ("0" + adBoard.expireDate.m).slice(-2); // adds leading zero if necessary
  let dayE = ("0" + adBoard.expireDate.d).slice(-2); // adds leading zero if necessary

  let formattedStartDate = `${year}-${month}-${day}`;
  let formattedEndDate = `${yearE}-${monthE}-${dayE}`;

  res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", { breadcrumbs, adBoardReq, adBoard, formattedStartDate, formattedEndDate });
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

  // format date YYYY-MM-DD
  let year = adBoard.startDate.y;
  let month = ("0" + adBoard.startDate.m).slice(-2); // adds leading zero if necessary
  let day = ("0" + adBoard.startDate.d).slice(-2); // adds leading zero if necessary

  let yearE = adBoard.expireDate.y;
  let monthE = ("0" + adBoard.expireDate.m).slice(-2); // adds leading zero if necessary
  let dayE = ("0" + adBoard.expireDate.d).slice(-2); // adds leading zero if necessary

  let formattedStartDate = `${year}-${month}-${day}`;
  let formattedEndDate = `${yearE}-${monthE}-${dayE}`;

  res.render("so/quanLy/bangqc/edit", { adBoard, breadcrumbs, boardTypes, formattedStartDate, formattedEndDate });
};

controller.processEdit = async (req, res) => {
  const { bangId } = req.params;
  const data = req.body;

  console.log(req.body, req.file);

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const editedBoard = await AdBoard.findById(bangId)
    .populate("boardType")
    .populate({ path: "adLocation", populate: ["district", "ward", "type", "adType"] });
  const newAdBoard = new AdBoard({
    boardType: new Types.ObjectId(data.boardType),
    size: { h: data.height, w: data.width },
    quantity: data.amount,
    startDate: {
      d: startDate.getUTCDate(),
      m: startDate.getUTCMonth() + 1,
      y: startDate.getUTCFullYear(),
    },
    expireDate: {
      d: endDate.getUTCDate(),
      m: endDate.getUTCMonth() + 1,
      y: endDate.getUTCFullYear(),
    },
    adLocation: editedBoard.adLocation._id,
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
export default controller;

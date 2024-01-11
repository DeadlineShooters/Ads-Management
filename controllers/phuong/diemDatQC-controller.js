import AdLocation from "../../models/adLocation.js";
import LocationType from "../../models/locationType.js";
import District from "../../models/district.js";
import AdType from "../../models/adType.js";
import AdBoard from "../../models/adBoard.js";
import AdBoardReq from "../../models/adBoardRequest.js";
import AdLocationChangeRequest from "../../models/adLocationChangeRequest.js";
import BoardType from "../../models/boardType.js";
import Ward from "../../models/ward.js";
import { getWardsForUser } from "../../utils/WardUtils.js";
import mongoose from "mongoose";

const { Types } = mongoose;
const controller = {};

controller.show = async (req, res) => {
  const breadcrumbs = [];
  const { wardId = null } = req.query;

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;

  let adLocations = [];
  console.log("user : " + req.user._id);
  if (req.user.role === "quan") {
    adLocations = await AdLocation.find({ district: req.user.district._id }); // Fetch all ad locations from the database'

    if (wardId) {
      adLocations = adLocations.filter((adLocation) => adLocation.ward._id == wardId);
    }
  } else {
    // phuong

    adLocations = await AdLocation.find({
      district: req.user.district._id,
      ward: req.user.ward._id,
    });
  }

  adLocations = await AdLocation.populate(adLocations, ["ward", "district", "type", "adType"]);

  const totalItems = adLocations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };

  adLocations = adLocations.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const wards = await getWardsForUser(req.user);

  res.render("phuong/diemDatList", {
    adLocations,
    breadcrumbs,
    pagination,
    wards,
    wardId,
  });
};

controller.showDetail = async (req, res) => {
  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: "" },
  ];

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;

  const adBoards = await AdBoard.find({ status: "Đã duyệt", adLocation: diemId })
    .populate("boardType")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

  const totalItems = adBoards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };
  const wards = await getWardsForUser(req.user);

  try {
    // Fetch adLocation details based on the diemId
    const adLocationDetails = await AdLocation.findById(diemId).populate(["ward", "district", "type", "adType"]);

    res.render("so/quanLy/diemDatqc/details", {
      details: adLocationDetails,
      adBoards,
      breadcrumbs,
      pagination,
      wards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showCreateRequest = async (req, res) => {
  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Tạo yêu cầu cấp phép", link: "" },
  ];

  const adLocation = await AdLocation.findById(diemId).populate(["district", "ward"]);

  if (adLocation.status === "Chưa quy hoạch") {
    req.flash("error", "Không tạo yêu cầu được do điểm quảng cáo chưa được quy hoạch");

    return res.redirect(`/cac-diem-dat-quang-cao/${diemId}`);
  }
  res.locals.currentPage = "quang-cao";

  res.render("phuong/taoYeuCauCapPhep", {
    diemId,
    breadcrumbs,
    adLocation,
  });
};

controller.showEdit = async (req, res) => {
  res.locals.currentPage = "quang-cao";
  const { diemId } = req.params;

  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: `/cac-diem-dat-quang-cao/${diemId}` },
    { name: "Chỉnh sửa", link: "" },
  ];

  // const adLocation = {
  //   id: `${diemId}`,
  //   longLat: "10.752334, 106.643366",
  //   address: "157 Nguyễn Đình Chính",
  //   district: "Phú Nhuận",
  //   ward: "11",
  //   type: "Đất công/Công viên/Hành lang an toàn giao thông",
  //   adType: "Quảng cáo thương mại",
  //   status: "Đã quy hoạch",
  // };
  const locationTypes = await LocationType.find({});
  const adTypes = await AdType.find({});
  const adLocation = await AdLocation.findById(diemId).populate(["district", "ward", "type", "adType"]);
  if (!adLocation) {
    throw new ExpressError(501, "Không tìm thấy điểm đặt quảng cáo");
  }
  console.log("POST edit request to: " + req.baseUrl + req.path);
  res.render("so/quanLy/diemDatqc/edit", {
    breadcrumbs,
    locationTypes,
    adTypes,
    postDest: req.baseUrl + req.path,
    adLocation,
  });
};

controller.processEdit = async (req, res) => {
  const { diemId } = req.params;
  console.log("@@ process edit", req.body, req.file);
  const editedLocation = await AdLocation.findById(diemId).populate(["district", "ward", "type", "adType"]);
  const newAdLocation = new AdLocation({
    latlng: editedLocation.latlng,
    address: editedLocation.address,
    district: editedLocation.district._id,
    ward: editedLocation.ward._id,
    type: new Types.ObjectId(req.body.item.type),
    adType: new Types.ObjectId(req.body.item.adType),
    status: req.body.item.status,
  });

  newAdLocation._id = diemId;

  if (req.file) {
    newAdLocation.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else {
    newAdLocation.image = editedLocation.image;
  }

  const newAdLocationEditReq = new AdLocationChangeRequest({
    adLocation: newAdLocation,
    reason: req.body.reason,
    sender: req.user._id,
    sendDate: new Date(),
  });

  console.log("New Ad Location Edit Request saved to database:", await newAdLocationEditReq.save());
  req.flash("success", "Yêu cầu chỉnh sửa điểm đặt đã được gửi thành công");

  res.redirect(`/cac-diem-dat-quang-cao/${diemId}`);
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

controller.postCreateRequest = async (req, res) => {
  try {
    const data = req.body;
    console.log("@@ req body: ", data, req.file);

    const adPointID = req.path.split("/")[1];
    console.log("adPointID: " + adPointID);

    const foundBoardType = await BoardType.findOne({ name: data.boardType });
    console.log("@@ start date: " + data["start-date"] + ", end date: " + data["end-date"]);

    const startDate = data["start-date"];
    const endDate = data["end-date"];

    // create new adBoard
    const newAdBoard = new AdBoard({
      image: {
        url: req.file.path,
        filename: req.file.filename,
      },
      boardType: foundBoardType._id,
      size: { h: data.height, w: data.width },
      quantity: data.amount,
      startDate: startDate, // Convert to string using toISOString()
      expireDate: endDate,
      adLocation: new Types.ObjectId(adPointID),
      status: "Chưa duyệt",
    });

    // Create a new instance of the AdBoardReq model
    const newAdBoardReq = new AdBoardReq({
      adBoard: newAdBoard._id,
      adContent: data["ad-content"],
      companyName: data["company-name"],
      contactInfo: {
        email: data.email,
        phone: data["phone-number"],
        address: data["company-location"],
      },
      sender: req.user._id,
      sendDate: new Date(),
    });

    newAdBoard.adBoardRequest = newAdBoardReq._id;

    const savedAdBoardReq = await newAdBoardReq.save();
    console.log("AdBoardReq saved to database:", savedAdBoardReq);

    console.log("AdBoard saved to database: ", await newAdBoard.save());

    // Redirect to the desired page after successful submission
    res.redirect("/cac-yeu-cau-cap-phep");
  } catch (error) {
    console.error("Error saving AdBoardReq to database:", error);
    // Handle the error appropriately (e.g., send an error response to the client)
    res.status(500).send("Internal Server Error");
  }
};
export default controller;

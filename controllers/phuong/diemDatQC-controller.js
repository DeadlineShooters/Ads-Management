import AdLocation from "../../models/adLocation.js";
import District from "../../models/district.js";
import AdBoardReq from "../../models/adBoardRequest.js";
import Ward from "../../models/ward.js";
import { getWardsForUser } from "../../utils/WardUtils.js";
import mongoose from "mongoose";

const controller = {};

controller.show = async (req, res) => {
  const breadcrumbs = [];
  try {
    let adLocations = [];
    const foundDistrict = await District.findOne({ name: req.user.district });
    if (req.user.role === "quan") {
      adLocations = await AdLocation.find({ district: foundDistrict._id }); // Fetch all ad locations from the database'
    } else {
      // phuong
      console.log(req.user.ward + " " + req.user.district);
      const foundWard = await Ward.findOne({
        name: req.user.ward,
        district: foundDistrict._id,
      });
      adLocations = await AdLocation.find({
        district: foundDistrict._id,
        ward: foundWard._id,
      });
    }

    adLocations = await AdLocation.populate(adLocations, ["ward", "district", "type", "adType"]);

    const wards = await getWardsForUser(req.user);

    console.log(adLocations);
    res.render("phuong/diemDatList", {
      adLocations: encodeURIComponent(JSON.stringify(adLocations)),
      breadcrumbs,
      wards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showDetail = async (req, res) => {
  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: "" },
  ];

  const props = {
    title: "điểm đặt",
    b1text: "Tạo yêu cầu cấp phép",
    b2text: "Chỉnh sửa",
    b1url: `/cac-diem-dat-quang-cao/${diemId}/tao-yeu-cau`,
    b2url: `/cac-diem-dat-quang-cao/${diemId}/chinh-sua`,

    b1color: "secondary",
    b2color: "success",
  };

  try {
    // Fetch adLocation details based on the diemId
    const adLocationDetails = await AdLocation.findById(diemId).populate(["ward", "district", "type", "adType"]);

    res.render("phuong/QC-details.ejs", {
      details: adLocationDetails,
      props,
      cssfile: "/style.css",
      diemId,
      breadcrumbs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

controller.showCreateRequest = (req, res) => {
  res.locals.currentPage = "quang-cao";

  const { diemId } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Tạo yêu cầu cấp phép", link: "" },
  ];
  res.render("phuong/taoYeuCauCapPhep", {
    cssfile: "/phuong/css/taoYeuCauCapPhep-style.css",
    diemId,
    breadcrumbs,
  });
};

controller.showEdit = (req, res) => {
  res.locals.currentPage = "quang-cao";
  const { diemId } = req.params;

  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/cac-diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt", link: `/cac-diem-dat-quang-cao/${diemId}` },
    { name: "Chỉnh sửa", link: "" },
  ];

  const adLocation = {
    id: `${diemId}`,
    longLat: "10.752334, 106.643366",
    address: "157 Nguyễn Đình Chính",
    district: "Phú Nhuận",
    ward: "11",
    type: "Đất công/Công viên/Hành lang an toàn giao thông",
    adType: "Quảng cáo thương mại",
    status: "Đã quy hoạch",
  };
  const locationTypes = [
    { name: "Đất công/Công viên/Hành lang an toàn giao thông" },
    { name: "Đất tư nhân/Nhà ở riêng lẻ" },
    { name: "Trung tâm thương mại" },
    { name: "Chợ" },
    { name: "Cây xăng" },
    { name: "Nhà chờ xe buýt" },
  ];
  const adTypes = [{ name: "Cổ động chính trị" }, { name: "Quảng cáo thương mại" }, { name: "Xã hội hoá" }];

  res.render("so/quanLy/diemDatqc/edit", {
    adLocation,
    breadcrumbs,
    locationTypes,
    adTypes,
    postDest: req.baseUrl + req.path,
  });
};

controller.processEdit = (req, res) => {
  console.dir("Post to: " + req.originalUrl);
  console.log(JSON.stringify(req.body, null, 2));
};

// controller.postCreateRequest = (req, res) => {
//   const data = req.body;
//   console.log("[Ad board request body:]");
//   console.log(data);
//   res.redirect("/cac-bang-quang-cao");
// };

const { Types } = mongoose;

controller.postCreateRequest = async (req, res) => {
  try {
    const data = req.body;

    console.log("adBoardID: " + req.path);
    // Create a new instance of the AdBoardReq model
    const newAdBoardReq = new AdBoardReq({
      adBoard: Types.ObjectId(req.path),
      adContent: data["ad-content"],
      companyName: data["company-name"],
      contactInfo: {
        email: data.email,
        phone: data["phone-number"],
        address: data["company-location"],
      },
    });

    // Save the new AdBoardReq instance to the database
    const savedAdBoardReq = await newAdBoardReq.save();

    console.log("AdBoardReq saved to database:", savedAdBoardReq);

    // Redirect to the desired page after successful submission
    res.redirect("/cac-bang-quang-cao");
  } catch (error) {
    console.error("Error saving AdBoardReq to database:", error);
    // Handle the error appropriately (e.g., send an error response to the client)
    res.status(500).send("Internal Server Error");
  }
};
export default controller;

import AdBoardRequest from "../../../models/adBoardRequest.js";
import AdBoard from "../../../models/adBoard.js";
import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import mongoose from "mongoose";
import AdLocation from "../../../models/adLocation.js";

export const dsCapPhepQC = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
  const totalItems = await AdBoardRequest.countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };
  const breadcrumbs = [];
  try {
    const CapPhepQC = await AdBoardRequest.find({})
      .populate({
        path: "adBoard",
        populate: [
          { path: "boardType", model: "BoardType" },
          {
            path: "adLocation",
            model: "AdLocation",
            populate: [
              { path: "ward", model: "Ward" },
              { path: "district", model: "District" },
            ],
          },
        ],
      })
      .populate("sender")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const wardList = await Ward.find({}).populate({
        path: "district", model: 'District'
    });
    const districtList = await District.find({});
    res.render("so/hanhChinh/dsYeuCauCapPhepQC.ejs", {
      CapPhepQC,
      pagination,
      breadcrumbs,
      wardList,
      districtList,
      inform: req.flash("info"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const chiTietYeuCauCapPhep = async (req, res) => {
  const { id } = req.params;
  const breadcrumbs = [
    { name: "Danh sách yêu cầu cấp phép quảng cáo", link: "/so/hanhchinh/cap-phep-qc" },
    { name: "Chi tiết yêu cầu", link: "" },
  ];

  try {
    const adBoardReq = await AdBoardRequest.findById(id)
      .populate({
        path: "adBoard",
        populate: [
          { path: "boardType", model: "BoardType" },
          {
            path: "adLocation",
            model: "AdLocation",
            populate: [
              { path: "ward", model: "Ward" },
              { path: "district", model: "District" },
            ],
          },
        ],
      })
      .populate("sender");
    console.log("@@ cap phep: ", adBoardReq);

    const adBoard = await AdBoard.findOne({ adBoardRequest: new mongoose.Types.ObjectId(id) })
      .populate({
        path: "adLocation",
        populate: [{ path: "district" }, { path: "ward" }, "type", "adType"],
      })
      .populate("boardType");
    console.log("@@  adBoard: ", adBoard);

    res.render("so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs", {
      adBoardReq,
      adBoard,
      breadcrumbs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const capNhatYeuCauCapPhep = async (req, res) => {
  const id = req.body.adBoardRequestId;
  try {
    await AdBoardRequest.findByIdAndUpdate(id, {
      status: req.body.newStatus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Assuming you have defined your schemas and models
// Function to find adBoardRequest using districtId and wardId
async function findAdBoardRequest(districtId, wardId) {
  try {
    // Find the ward document to get the district reference
    const ward = await Ward.findById(wardId);
    
    // Find the adLocation document using district reference
    const adLocation = await AdLocation.findOne({ district: ward.district });

    // Find the adBoard document using adLocation reference
    const adBoard = await AdBoard.findOne({ adLocation: adLocation._id });

    // Find the adBoardRequest document using adBoard reference
    const adBoardRequest = await AdBoardRequest.find({ adBoard: adBoard._id });

    return adBoardRequest;
  } catch (error) {
    console.error('Error finding adBoardRequest:', error);
    throw error;
  }
}

// Example usage
// const districtId = '657654fc897c69de7cc49224'; // Replace with the actual district ID
// const wardId = '657654fd897c69de7cc4922a'; // Replace with the actual ward ID

// findAdBoardRequest(districtId, wardId)
//   .then(adBoardRequest => {
//     if (adBoardRequest) {
//       console.log('Found adBoardRequest:', adBoardRequest);
//     } else {
//       console.log('AdBoardRequest not found.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
// });

export const timKiemPhuongQuan = async (req, res) => {
  console.log(req.body);
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
  const totalItems = await AdBoardRequest.countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };
  const breadcrumbs = [];
  try {
    const ward = await Ward.findById(req.body.item.phuongId);
    const adLocation = await AdLocation.findOne({ district: ward.district });
    const adBoard = await AdBoard.findOne({ adLocation: adLocation._id });
    const CapPhepQC = await AdBoardRequest.find({ adBoard: adBoard._id }).populate({
        path: "adBoard",
        populate: [
          { path: "boardType", model: "BoardType" },
          {
            path: "adLocation",
            model: "AdLocation",
            populate: [
              { path: "ward", model: "Ward"},
              { path: "district", model: "District"},
            ],
          },
        ],
      })
      .populate("sender")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const wardList = await Ward.find({}).populate({
        path: "district", model: 'District'
    });
    const districtList = await District.find({});
    res.render("so/hanhChinh/dsYeuCauCapPhepQC.ejs", {
      CapPhepQC,
      pagination,
      breadcrumbs,
      wardList,
      districtList,
      inform: req.flash("info"),
    });
  } catch (error) {
    const wardList = await Ward.find({}).populate({
      path: "district", model: 'District'
    });
    const districtList = await District.find({});
    res.render("so/hanhChinh/trangBaoLoiCapPhepQC.ejs", {
      pagination,
      breadcrumbs,
      wardList,
      districtList
    });
  }
}
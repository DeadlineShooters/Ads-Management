import AdBoardRequest from "../../../models/adBoardRequest.js";
import AdBoard from "../../../models/adBoard.js";
import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import mongoose from "mongoose";
import AdLocation from "../../../models/adLocation.js";

export const dsCapPhepQC = async (req, res) => {
  const { districtId = null, wardId = null } = req.query;
  console.log(districtId+"   "+wardId);

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
    let CapPhepQC = null;
    if (districtId) {
      if (wardId) {
        const ward = await Ward.findById(wardId);
        const district = await District.findById(districtId);
        const adLocation = await AdLocation.find({ district: district._id , ward: ward._id });
        const adBoard = await AdBoard.find({ adLocation: { $in: adLocation }});
        CapPhepQC = await AdBoardRequest.find({adBoard: { $in: adBoard }})
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
      } else {
        const adLocation = await AdLocation.find({district: districtId});
        const adBoard = await AdBoard.find({ adLocation: { $in: adLocation } });
        CapPhepQC = await AdBoardRequest.find({adBoard:  { $in: adBoard }})
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
      }
    } else {
      CapPhepQC = await AdBoardRequest.find({})
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
    }
    const wardList = await Ward.find({}).populate({
        path: "district", model: 'District'
    });
    const districtList = await District.find({});
    
    console.log("@@: ", CapPhepQC);
    res.render("so/hanhChinh/dsYeuCauCapPhepQC.ejs", {
      CapPhepQC,
      pagination,
      breadcrumbs,
      wardList,
      districtList,
      districtId
    });
  } catch (err) {
    const wardList = await Ward.find({}).populate({
      path: "district", model: 'District'
    });
    const districtList = await District.find({});
    res.render("so/hanhChinh/trangBaoLoiCapPhepQC.ejs", {
      pagination,
      breadcrumbs,
      wardList,
      districtList,
      districtId
    });
  }
};

export const chiTietYeuCauCapPhep = async (req, res) => {
  const { districtId = null, wardId = null } = req.query;
  console.log(districtId+"   "+wardId);
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
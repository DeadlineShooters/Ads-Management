import AdLocation from "../../../models/adLocation.js";
import LocationType from "../../../models/locationType.js";
import AdType from "../../../models/adType.js";
import District from "../../../models/district.js";
import Ward from "../../../models/ward.js";
import ExpressError from "../../../utils/ExpressError.js";
import { cloudinary } from "../../../cloudinary/index.js";
import AdBoard from "../../../models/adBoard.js";
import AdBoardChangeReq from "../../../models/adBoardChangeRequest.js";
import AdBoardRequest from "../../../models/adBoardRequest.js";
import Report from "../../../models/report.js";

const defaultAdLocationImg = "delnafx999tunfa8nsmw";
const defaultAdBoardImg = 'bang-quang-cao-3_zr4oyk';

export const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
  const totalItems = await AdLocation.countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };

  const adLocations = await AdLocation.find({})
    .populate(["district", "ward", "type", "adType"])
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);
  res.render("so/quanLy/diemDatqc/index", { adLocations, pagination });
};
export const showDetails = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
  const totalItems = await AdBoard.countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = {
    page,
    totalPages,
    itemsPerPage,
  };

  const { id } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/so/quanly/diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt quảng cáo", link: "" },
  ];
  const adLocation = await AdLocation.findById(id).populate(["district", "ward", "type", "adType"]);
  const adBoards = await AdBoard.find({ adLocation: id })
    .populate("boardType")
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);
  if (!adLocation) {
    throw new ExpressError(501, "Không tìm thấy điểm đặt quảng cáo");
  }

  res.render("so/quanLy/diemDatqc/details", { details: adLocation, adBoards, breadcrumbs, pagination });
};
export const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/so/quanly/diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${req.params.id}` },
    { name: "Chỉnh sửa điểm đặt quảng cáo", link: "" },
  ];
  const adLocation = await AdLocation.findById(id).populate(["district", "ward", "type", "adType"]);
  if (!adLocation) {
    throw new ExpressError(501, "Không tìm thấy điểm đặt quảng cáo");
  }
  const locationTypes = await LocationType.find({});
  const adTypes = await AdType.find({});
  const districts = await District.find({});
  const wards = await Ward.find({}).populate("district");
  res.render("so/quanLy/diemDatqc/edit", { adLocation, locationTypes, adTypes, breadcrumbs, districts, wards });
};
export const renderAddForm = async (req, res) => {
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/so/quanly/diem-dat-quang-cao" },
    { name: "Thêm điểm đặt quảng cáo", link: "" },
  ];
  const locationTypes = await LocationType.find({});
  const adTypes = await AdType.find({});
  const districts = await District.find({});
  const wards = await Ward.find({}).populate("district");
  res.render("so/quanLy/diemDatqc/add", { locationTypes, adTypes, breadcrumbs, districts, wards });
};
export const add = async (req, res) => {
  const adLocation = new AdLocation(req.body.item);

  if (req.file) {
    adLocation.image = { url: req.file.path, filename: req.file.filename };
  } else {
    adLocation.image = {
      url: `https://res.cloudinary.com/dk6q93ryt/image/upload/v1702823976/AdsManagement/${defaultAdLocationImg}.png`,
      filename: defaultAdLocationImg,
    };
  }

  await adLocation.save();

  req.flash("success", "Điểm đặt mới đã được tạo thành công");
  return res.redirect("/so/quanly/diem-dat-quang-cao");
};
export const update = async (req, res) => {
  const { id } = req.params;
  const item = req.body.item;
  console.log(item);

  if (req.file) {
    const adLocation = await AdLocation.findById(id);
    await cloudinary.uploader.destroy(adLocation.image.filename);
    item.image = { url: req.file.path, filename: req.file.filename };
  }
  await AdLocation.findByIdAndUpdate(id, { $set: { ...item } });

  req.flash("success", "Điểm đặt đã được cập thành công");
  return res.redirect("/so/quanly/diem-dat-quang-cao/"+id);
};
export const remove = async (req, res) => {
  const { id } = req.params;
  // const isInUse = await AdBoard.findOne({ adLocation: id });
  // if (isInUse) {
  //   req.flash("error", "Điểm đặt đang được sử dụng! Không thể xoá");
  //   return res.redirect("/so/quanly/diem-dat-quang-cao");
  // }

  const adBoards = await AdBoard.find({ adLocation: id });
  for (let adBoard of adBoards) {
    const adBoardId = adBoard._id;
    // delete adboard request
    await AdBoardRequest.findOneAndDelete({ adBoard: adBoardId });
    // delete adboard change request
    await AdBoardChangeReq.findOneAndDelete({ adBoard: adBoardId })
    // delete all reports await Ward.deleteMany({_id: {$in: wards} })
    // Delete images from Cloudinary
    const reportsToDelete = await Report.find({ adBoard: adBoardId });
    if (reportsToDelete.length) {
        for (const report of reportsToDelete) {
            for (const image of report.uploadedImages) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }
        await Report.deleteMany({ adBoard: adBoardId });
    }
    if (adBoard.image.filename !== defaultAdBoardImg) {
        await cloudinary.uploader.destroy(adBoard.image.filename);
    }
    await AdBoard.findByIdAndDelete(adBoardId);
  }




  const adLocation = await AdLocation.findById(id);
  if (adLocation.image.filename !== defaultAdLocationImg) {
    await cloudinary.uploader.destroy(adLocation.image.filename);
  }
  await AdLocation.findByIdAndDelete(id);
  req.flash("success", "Điểm đặt đã được xoá thành công");
  return res.redirect("/so/quanly/diem-dat-quang-cao");
};

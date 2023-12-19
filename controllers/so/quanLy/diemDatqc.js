import AdLocation from "../../../models/adLocation.js";
import LocationType from "../../../models/locationType.js";
import AdType from "../../../models/adType.js";
import District from "../../../models/district.js";
import Ward from "../../../models/ward.js";
import ExpressError from "../../../utils/ExpressError.js";
import { cloudinary } from "../../../cloudinary/index.js";
import AdBoard from "../../../models/adBoard.js";

const defaultImageName = "logo_jur19a";

export const index = async (req, res) => {
  const adLocations = await AdLocation.find({}).populate(["district", "ward", "type", "adType"]);
  res.render("so/quanLy/diemDatqc/index", { adLocations });
};
export const showDetails = async (req, res) => {
  const { id } = req.params;
  const breadcrumbs = [
    { name: "Các điểm đặt quảng cáo", link: "/so/quanly/diem-dat-quang-cao" },
    { name: "Chi tiết điểm đặt quảng cáo", link: "" },
  ];
  const adLocation = await AdLocation.findById(id).populate(["district", "ward", "type", "adType"]);
  const adBoards = await AdBoard.find({ adLocation: id }).populate("boardType");
  if (!adLocation) {
    throw new ExpressError(501, "Không tìm thấy điểm đặt quảng cáo");
  }
  const props = {
    title: "điểm đặt",
    b1text: "Chỉnh sửa",
    b2text: "Xoá",
    b1url: `/so/quanly/diem-dat-quang-cao/${adLocation.id}/edit`,
    b2url: `#`,
    b1color: "secondary",
    b2color: "danger",
  };
  res.render("so/quanLy/diemDatqc/details", { details: adLocation, adBoards, props, breadcrumbs });
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
      url: `https://res.cloudinary.com/dk6q93ryt/image/upload/v1702823976/AdsManagement/${defaultImageName}.png`,
      filename: defaultImageName,
    };
  }

  console.log(await adLocation.save());

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
  return res.redirect("/so/quanly/diem-dat-quang-cao");
};
export const remove = async (req, res) => {
  const { id } = req.params;
  const isInUse = await AdBoard.findOne({ adLocation: id });
  if (isInUse) {
    req.flash("error", "Điểm đặt đang được sử dụng! Không thể xoá");
    return res.redirect("/so/quanly/diem-dat-quang-cao");
  }
  const adLocation = await AdLocation.findById(id);
  if (adLocation.image.filename !== defaultImageName) {
    await cloudinary.uploader.destroy(adLocation.image.filename);
  }
  await AdLocation.findByIdAndDelete(id);
  req.flash("success", "Điểm đặt đã được xoá thành công");
  return res.redirect("/so/quanly/diem-dat-quang-cao");
};

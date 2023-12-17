import AdLocation from "../../../models/adLocation.js";
import LocationType from "../../../models/locationType.js";
import AdType from "../../../models/adType.js";
import District from "../../../models/district.js";
import Ward from "../../../models/ward.js";
import ExpressError from '../../../utils/ExpressError.js';

export const index = async (req, res) => {
  const adLocations = await AdLocation.find({}).populate(['district', 'ward', 'type', 'adType']);
  res.render("so/quanLy/diemDatqc/index", {adLocations, breadcrumbs:[]});
};
export const showDetails = async (req, res) => {
  const { id } = req.params;
  const breadcrumbs = [
    { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
    { name: "Chi tiết điểm đặt quảng cáo", link: '' },
  ]
  const adLocation = await AdLocation.findById(id).populate(['district', 'ward', 'type', 'adType']);
  console.log(adLocation);
  if (!adLocation) {
    return new ExpressError(501, "Không tìm thấy điểm đặt quảng cáo");
  }
  const props = {
    title: "điểm đặt",
    b1text: "Chỉnh sửa",
    b2text: "Xoá",
    b1url: `/so/quanly/diem-dat-quang-cao/${adLocation.id}/edit`,
    b2url: `#`,
    b1color: 'secondary',
    b2color: 'danger',
  }
  res.render("so/quanLy/diemDatqc/details", { details: adLocation, props, breadcrumbs });
};
export const renderEditForm = (req, res) => {
  const breadcrumbs = [
    { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
    { name: "Chi tiết điểm đặt quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${req.params.id}` },
    { name: "Chỉnh sửa điểm đặt quảng cáo", link: '' },
  ]
  const locationTypes = [
    { name: 'Đất công/Công viên/Hành lang an toàn giao thông' }, { name: 'Đất tư nhân/Nhà ở riêng lẻ' }, { name: 'Trung tâm thương mại' }, { name: 'Chợ' }, { name: 'Cây xăng' }, { name: 'Nhà chờ xe buýt' }]
  const adTypes = [
    { name: 'Cổ động chính trị' }, { name: 'Quảng cáo thương mại' }, { name: 'Xã hội hoá' }]
  
  res.render('so/quanLy/diemDatqc/edit', {adLocation, locationTypes, adTypes, breadcrumbs})
};
export const renderAddForm = async (req, res) => {
  const breadcrumbs = [
    { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
    { name: "Thêm điểm đặt quảng cáo", link: '' },
  ]
  const locationTypes = await LocationType.find({});
  const adTypes = await AdType.find({});
  const districts = await District.find({});
  const wards = await Ward.find({}).populate('district');
  res.render('so/quanLy/diemDatqc/add', {locationTypes, adTypes, breadcrumbs, districts, wards})
};
export const add = async (req, res) => {
  const adLocation = new AdLocation(req.body.item);

  adLocation.image = { url: req.file.path, filename: req.file.filename };

  await adLocation.save();

  req.flash('success', 'Điểm đặt mới đã được tạo thành công');
  return res.redirect('/so/quanly/diem-dat-quang-cao');

}
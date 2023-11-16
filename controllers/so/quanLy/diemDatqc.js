const adLocation = {
  id: '001',
  longLat: '10.752334, 106.643366',
  address: "157 Nguyễn Đình Chính",
  district: 'Phú Nhuận',
  ward: '11',
  type: "Đất công/Công viên/Hành lang an toàn giao thông",
  adType: "Quảng cáo thương mại",
  status: 'Đã quy hoạch',
}

export const index = async (req, res) => {
  const adLocations = [
    adLocation,
  ]
  res.render("so/quanly/diemDatqc/index", {adLocations});
};
export const showDetails = async (req, res) => {
  const props = {
    title: "điểm đặt",
    b1text: "Chỉnh sửa",
    b2text: "Xoá",
    b1url: `/so/quanly/diem-dat-quang-cao/${adLocation.id}/edit`,
    b2url: `#`,
    b1color: 'secondary',
    b2color: 'danger',
}
  res.render("phuong/QC-details", { details: adLocation, props });
};
export const renderEditForm = (req, res) => {
  const locationTypes = [
    { name: 'Đất công/Công viên/Hành lang an toàn giao thông' }, { name: 'Đất tư nhân/Nhà ở riêng lẻ' }, { name: 'Trung tâm thương mại' }, { name: 'Chợ' }, { name: 'Cây xăng' }, { name: 'Nhà chờ xe buýt' }]
  const adTypes = [
    { name: 'Cổ động chính trị' }, { name: 'Quảng cáo thương mại' }, { name: 'Xã hội hoá' }]
  res.render('so/quanly/diemDatqc/edit', {adLocation, locationTypes, adTypes})
};
export const renderAddForm = (req, res) => {
  const locationTypes = [
    { name: 'Đất công/Công viên/Hành lang an toàn giao thông' }, { name: 'Đất tư nhân/Nhà ở riêng lẻ' }, { name: 'Trung tâm thương mại' }, { name: 'Chợ' }, { name: 'Cây xăng' }, { name: 'Nhà chờ xe buýt' }]
  const adTypes = [
    { name: 'Cổ động chính trị' }, { name: 'Quảng cáo thương mại' }, { name: 'Xã hội hoá' }]
  res.render('so/quanly/diemDatqc/add', {adLocation, locationTypes, adTypes})
};
import mongoose from "mongoose";

export const locationTypes = [
  {
    name: "Đất công/Công viên/Hành lang an toàn giao thông",
    description: "Mô tả",
    note: "Chú thích",
  },
  {
    name: "Đất tư nhân/Nhà ở riêng lẻ",
    description: "Mô tả",
    note: "Chú thích",
  },
  { name: "Trung tâm thương mại", description: "Mô tả", note: "Chú thích" },
  { name: "Chợ", description: "Mô tả", note: "Chú thích" },
  { name: "Cây xăng", description: "Mô tả", note: "Chú thích" },
  { name: "Nhà chờ xe buýt", description: "Mô tả", note: "Chú thích" },
];
export const adTypes = [
  { name: "Cổ động chính trị", description: "Mô tả", note: "Chú thích" },
  { name: "Quảng cáo thương mại", description: "Mô tả", note: "Chú thích" },
  { name: "Xã hội hoá", description: "Mô tả", note: "Chú thích" },
];
export const boardTypes = [
  { name: "Trụ bảng hiflex", description: "Mô tả", note: "Chú thích" },
  { name: "Trụ màn hình điện tử LED", description: "Mô tả", note: "Chú thích" },
  { name: "Trụ hộp đèn", description: "Mô tả", note: "Chú thích" },
  { name: "Bảng hiflex ốp tường", description: "Mô tả", note: "Chú thích" },
  {
    name: "Màn hình điện tử ốp tường",
    description: "Mô tả",
    note: "Chú thích",
  },
  { name: "Trụ treo băng rôn dọc", description: "Mô tả", note: "Chú thích" },
  { name: "Trụ treo băng rôn ngang", description: "Mô tả", note: "Chú thích" },
  { name: "Trụ/Cụm pano", description: "Mô tả", note: "Chú thích" },
  { name: "Cổng chào", description: "Mô tả", note: "Chú thích" },
  { name: "Trung tâm thương mại", description: "Mô tả", note: "Chú thích" },
];
export const reportTypes = [
  { name: "Tố giác sai phạm", description: "1", note: "red" },
  { name: "Đăng ký nội dung", description: "2", note: "blue" },
  { name: "Đóng góp ý kiến", description: "3", note: "green" },
  { name: "Giải đáp thắc mắc", description: "4", note: "yellow" },
];
export const districts = [
  { name: "1", description: "Mô tả", note: "Chú thích" },
  { name: "Bình Thạnh", description: "Mô tả", note: "Chú thích" },
];
export const wards = [
  {
    name: "Nguyễn Cư Trinh",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
  {
    name: "Phạm Ngũ Lão",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
  {
    name: "Bến Thành",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
  {
    name: "1",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
  {
    name: "2",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
  {
    name: "3",
    description: "Mô tả",
    note: "Chú thích",
    district: new mongoose.Types.ObjectId("657653b764c797f60cdf6014"),
  },
];

const images = [
  {
    url: "https://cdn.discordapp.com/attachments/987699517497438218/1176447490921332747/nike.png?ex=65815c1b&is=656ee71b&hm=f6886bfbb66d012970f44e014f213ab1dbcbebfc3bf6899041b8ff31069c469d&",
    filename: "shoe",
  },
];

export const canBo = [
  {
    email: "phuong@gmail.com",
    daycreated: "2023-11-19T02:35:34.230Z",
    district: "1",
    hashed_password: "$2b$10$ofjFY6KDErYSd9yyNp8QYulbbrAe/V8b1nX0ETTmh5CJSgeyawp4i",
    role: "phuong",
    salt: "$2b$10$ofjFY6KDErYSd9yyNp8QYu",
    ward: "Phạm Ngũ Lão",
  },
  {
    email: "so@gmail.com",
    daycreated: "2023-11-19T02:35:34.230Z",
    hashed_password: "$2b$10$O6ZN5c5IQBzdgOpHvCi28.XUeeWt2ZsLcAn8cvgvLZuiLX3qepYVS",
    role: "so",
    salt: "$2b$10$O6ZN5c5IQBzdgOpHvCi28.",
  },
  {
    email: "quan@gmail.com",
    daycreated: "2023-11-19T02:35:34.230Z",
    district: "1",
    hashed_password: "$2b$10$hFKsMW5/QDFSlCpn1Jj0rOC7XIz1NrRzOz3BR3/OEfxaxEwaK91NS",
    role: "quan",
    salt: "$2b$10$hFKsMW5/QDFSlCpn1Jj0rO",
  },
];

export const adLocations = [
  {
    image: images[0],
    latlng: "10.752334, 106.643366", // longlat để đại vd thôi
    address: "168/25 đường Nguyễn Cư Trinh",
    district: new mongoose.Types.ObjectId("657654fc897c69de7cc49224"),
    ward: new mongoose.Types.ObjectId("657654fd897c69de7cc49228"),
    type: new mongoose.Types.ObjectId("657654fa897c69de7cc49202"),
    adType: new mongoose.Types.ObjectId("657654fa897c69de7cc49202"),
    status: "Đã quy hoạch",
  },
  // {
  //     image: images[0],
  //     longLat: "10.752334, 106.643366",
  //     address: "",
  //     district: districts[0],
  //     ward: wards[1],
  //     type: locationTypes[0],
  //     adType: adTypes[0],
  //     status: "Đã quy hoạch"
  // },
  // {
  //     image: images[0],
  //     longLat: "10.752334, 106.643366",
  //     address: "",
  //     district: districts[1],
  //     ward: wards[0],
  //     type: locationTypes[0],
  //     adType: adTypes[0],
  //     status: "Đã quy hoạch"
  // },
  // {
  //     image: images[0],
  //     longLat: "10.752334, 106.643366",
  //     address: "",
  //     district: districts[1],
  //     ward: wards[1],
  //     type: locationTypes[0],
  //     adType: adTypes[0],
  //     status: "Chưa quy hoạch"
  // },
];
// export const adBoards = [
//     {
//         image: images[0],
//         boardType: boardTypes[0],
//         size: { h: 2.5, w: 10 },
//         quantity: 2,
//         startDate: { d: 15, m: 5, y: 23 },
//         expireDate: { d: 15, m: 5, y: 24 },
//         status: 'Đã duyệt',
//         adLocation: adLocations[0],
//     },
//     {
//         image: images[1],
//         boardType: boardTypes[0],
//         size: { h: 2.5, w: 10 },
//         quantity: 2,
//         startDate: { d: 15, m: 5, y: 23 },
//         expireDate: { d: 15, m: 5, y: 24 },
//         status: 'Chưa duyệt',
//         adLocation: adLocations[0],
//     }
// ]

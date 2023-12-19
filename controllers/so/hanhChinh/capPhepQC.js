import AdBoardReq from "../../../models/adBoardRequest.js"

// export const dsCapPhepQC = async (req, res) => {
//     const yeuCau = [
//         {
//             diaChi: "157 Nguyễn Đình Chính",
//             khuVuc: "Phường 11, Quận Phú Nhuận",
//             loaiBang: "Trụ màn hình điện tử",
//             kichThuoc: "2.5m x 10m",
//             soLuong: "2 trụ/bảng",
//             thoiGianGui: "13/10/2023",
//             tinhTrang: "Duyet",
//         },
//         {
//             diaChi: "158 Nguyễn Đình Chính",
//             khuVuc: "Phường 12, Quận Phú Nhuận",
//             loaiBang: "Trụ màn hình điện tử",
//             kichThuoc: "1.5m x 8m",
//             soLuong: "1 trụ/bảng",
//             thoiGianGui: "14/10/2023",
//             tinhTrang: "khongDuyet",
//         },
//         {
//             diaChi: "159 Nguyễn Đình Chính",
//             khuVuc: "Phường 13, Quận Phú Nhuận",
//             loaiBang: "Trụ màn hình điện tử",
//             kichThuoc: "3m x 12m",
//             soLuong: "3 trụ/bảng",
//             thoiGianGui: "15/10/2023",
//             tinhTrang: "chuaDuyet",
//         },
//         {
//             diaChi: "158 Nguyễn Đình Chính",
//             khuVuc: "Phường 12, Quận Phú Nhuận",
//             loaiBang: "Trụ màn hình điện tử",
//             kichThuoc: "1.5m x 8m",
//             soLuong: "1 trụ/bảng",
//             thoiGianGui: "14/10/2023",
//             tinhTrang: "khongDuyet",
//         }
//     ]
//     const breadcrumbs = [];

//     res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs', {objects: yeuCau, breadcrumbs});
// }

export const dsCapPhepQC = async (req, res) => {
    let perPage = 12; //moi trang co 12 tai khoan can bo
    let page = req.query.page || 1;
    const breadcrumbs = [];
    try {
        const CapPhepQC = await AdBoardReq.find({}).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender')
        const count = await AdBoardReq.countDocuments({});
        res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs',  { 
            CapPhepQC,
            current: page,
            pages: Math.ceil(count / perPage),
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

export const chiTietYeuCauCapPhep = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [];
    try {
        const chiTietCapPhepQC = await AdBoardReq.findById(id).populate({
            path: 'adBoard',
            populate: [
                { path: 'boardType', model: 'BoardType' },
                { path: 'adLocation', model: 'AdLocation', populate: [
                    { path: 'ward', model: 'Ward' },
                    { path: 'district', model: 'District' }
                ]}
            ]
        }).populate('sender')
        console.log(chiTietCapPhepQC);
        res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs',  { 
            chiTietCapPhepQC,
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}

export const capNhatYeuCauCapPhep = async (req, res) => {
    const { id } = req.body.adBoardRequestId;
    try {
        await AdBoardReq.findByIdAndUpdate(id, {
            status: req.body.newStatus
        })
        console.log(chiTietCapPhepQC);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
}
import AdBoardReq from "../../../models/adBoardRequest.js"
import AdBoard from "../../../models/adBoard.js";

// export const dsChinhBangQC = async (req, res) => {
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
//             tinhTrang: "Duyet",
//         },
//         {
//             diaChi: "159 Nguyễn Đình Chính",
//             khuVuc: "Phường 13, Quận Phú Nhuận",
//             loaiBang: "Trụ màn hình điện tử",
//             kichThuoc: "3m x 12m",
//             soLuong: "3 trụ/bảng",
//             thoiGianGui: "15/10/2023",
//             tinhTrang: "khongDuyet",
//         },
//     ]
//     const breadcrumbs = [];
//     res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs', {objects: yeuCau, breadcrumbs});
// }

// export const dsChinhBangQC = async (req, res) => {
//     let perPage = 12; //moi trang co 12 tai khoan can bo
//     let page = req.query.page || 1;
//     const breadcrumbs = [];
//     try {
//         const BaoCaoQC = await AdBoardReq.find({});
//         const count = await AdBoardReq.countDocuments({});
//         res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs',  { 
//             messageAdd: req.flash('info'),
//             messageEdit: req.flash('edit'),
//             messageDel: req.flash('del'),
//             BaoCaoQC,
//             current: page,
//             pages: Math.ceil(count / perPage),
//             breadcrumbs,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

export const dsChinhBangQC = async (req, res) => {
    let perPage = 12; //moi trang co 12 tai khoan can bo
    let page = req.query.page || 1;
    const breadcrumbs = [];
    try {
        const BaoCaoQC = await AdBoardReq.find({}).populate({
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
        res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs',  { 
            BaoCaoQC,
            current: page,
            pages: Math.ceil(count / perPage),
            breadcrumbs,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};

export const chiTietChinhBangQC = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // const breadcrumbs = [];
    // try {
    //     const chiTietBaoCaoQC = await AdBoardReq.findById(id).populate({
    //         path: 'adBoard',
    //         populate: [
    //             { path: 'boardType', model: 'BoardType' },
    //             { path: 'adLocation', model: 'AdLocation', populate: [
    //                 { path: 'ward', model: 'Ward' },
    //                 { path: 'district', model: 'District' }
    //             ]}
    //         ]
    //     }).populate('sender')
    //     console.log(chiTietBaoCaoQC);
    //     res.render('so/hanhChinh/chiTiet/ndChinhBangQC.ejs',  { 
    //         chiTietBaoCaoQC,
    //         breadcrumbs,
    //     });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ error: 'Server error' });
    // }
}
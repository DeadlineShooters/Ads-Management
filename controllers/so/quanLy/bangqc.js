import AdBoard from "../../../models/adBoard.js";

export const index = async (req, res) => {
    // boardtype: Trụ bảng hiflex, Trụ màn hình điện tử LED, Trụ hộp đèn, Bảng hiflex ốp tường, Màn hình điện tử ốp tường, Trụ treo băng rôn dọc, Trụ treo băng rôn ngang, Trụ/Cụm pano, Cổng chào, Trung tâm thương mại
    // adType: Cổ động chính trị, Quảng cáo thương mại, Xã hội hoá
    // locationType: Đất công/Công viên/Hành lang an toàn giao thông, Đất tư nhân/Nhà ở riêng lẻ, Trung tâm thương mại, Chợ, Cây xăng, Nhà chờ xe buýt
    const adBoards = await AdBoard.find({}).populate(['boardType', 'adLocation']);
    res.render("so/quanLy/bangqc/index", {adBoards});
};
export const showDetails = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Chi tiết bảng quảng cáo", link: '' },
    ]
    
    const adBoard = await AdBoard.findById(id).populate('boardType')
        .populate({path: 'adLocation', populate: ['district', 'ward', 'type', 'adType']});
    res.render("so/quanLy/bangqc/details", { details: adBoard, breadcrumbs });
};
export const renderEditForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Chi tiết bảng quảng cáo", link: `/so/quanly/bang-quang-cao/${req.params.id}` },
        { name: "Chỉnh sửa bảng quảng cáo", link: '' },
    ]
    // res.render('so/quanLy/bangqc/edit', {adBoard, boardTypes, breadcrumbs})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Thêm bảng quảng cáo", link: '' },
    ]
    // res.render('so/quanLy/bangqc/add', {adBoard, boardTypes, breadcrumbs})
};
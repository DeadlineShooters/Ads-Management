import AdBoard from "../../../models/adBoard.js";
import BoardType from "../../../models/boardType.js";

export const index = async (req, res) => {
    const adBoards = await AdBoard.find({}).populate('boardType')
    .populate({path: 'adLocation', populate: ['district', 'ward', 'type', 'adType']});
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
export const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Chi tiết bảng quảng cáo", link: `/so/quanly/bang-quang-cao/${req.params.id}` },
        { name: "Chỉnh sửa bảng quảng cáo", link: '' },
    ]
    const boardTypes = await boardTypes.find({});
    const adBoard = await AdBoard.findById(id).populate('boardType')
    .populate({path: 'adLocation', populate: ['district', 'ward', 'type', 'adType']});
    res.render('so/quanLy/bangqc/edit', {adBoard, boardTypes, breadcrumbs})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Thêm bảng quảng cáo", link: '' },
    ]
    res.render('so/quanLy/bangqc/add', {adBoard, boardTypes, breadcrumbs})
};
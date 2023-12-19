import AdBoard from "../../../models/adBoard.js";
import AdLocation from "../../../models/adLocation.js";
import BoardType from "../../../models/boardType.js";
import Report from "../../../models/report.js";
import { cloudinary } from "../../../cloudinary/index.js";

const defaultImageName = 'bang-quang-cao-3_zr4oyk';
export const showDetails = async (req, res) => {
    const { adLocationId,adBoardId } = req.params;
    const breadcrumbs = [
        { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
        { name: "Chi tiết điểm đặt quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${adLocationId}` },
        { name: "Chi tiết bảng quảng cáo", link: '' },
    ]
    const adBoard = await AdBoard.findById(adBoardId).populate('boardType')
        .populate({path: 'adLocation', populate: ['district', 'ward', 'type', 'adType']});
    res.render("so/quanLy/bangqc/details", { details: adBoard, breadcrumbs });
};
export const renderEditForm = async (req, res) => {
    const { adLocationId, adBoardId } = req.params;
    const breadcrumbs = [
        { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
        { name: "Chi tiết điểm đặt quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${adLocationId}` },
        { name: "Chi tiết bảng quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${adLocationId}/bang-quang-cao/${adBoardId}` },
        { name: "Chỉnh sửa bảng quảng cáo", link: '' },
    ]
    const boardTypes = await BoardType.find({});
    const adLocation = await AdLocation.findById(adLocationId).populate(['district', 'ward', 'type', 'adType']);
    const adBoard = await AdBoard.findById(adBoardId).populate('boardType')
        .populate({ path: 'adLocation', populate: ['district', 'ward', 'type', 'adType'] });
    res.render('so/quanLy/bangqc/edit', {adBoard, adLocation, boardTypes, breadcrumbs})
};
export const renderAddForm = async (req, res) => {
    const { adLocationId } = req.params;
    const breadcrumbs = [
        { name: 'Các điểm đặt quảng cáo', link: '/so/quanly/diem-dat-quang-cao'},
        { name: "Chi tiết điểm đặt quảng cáo", link: `/so/quanly/diem-dat-quang-cao/${adLocationId}` },
        { name: "Thêm bảng quảng cáo", link: '' },
    ]
    const boardTypes = await BoardType.find({});
    const adLocation = await AdLocation.findById(adLocationId).populate(['district', 'ward', 'type', 'adType']);
    res.render('so/quanLy/bangqc/add', {adLocation, boardTypes, breadcrumbs})
};
export const add = async (req, res) => {
    const { adLocationId } = req.params;
    const item = req.body.item;

    const adBoard = new AdBoard(item);

    adBoard.adLocation = adLocationId;
    if (req.file) {
        adBoard.image = { url: req.file.path, filename: req.file.filename };
    } else {
        adBoard.image = {
            url: `https://res.cloudinary.com/dk6q93ryt/image/upload/v1702823976/AdsManagement/${defaultImageName}.png`,
            filename: defaultImageName
        };
    }
    await adBoard.save();

    req.flash('success', 'Bảng quảng cáo mới đã được tạo thành công');
    return res.redirect(`/so/quanly/diem-dat-quang-cao/${adLocationId}`);
}
export const update = async (req, res) => {
    const { adLocationId, adBoardId } = req.params;
    const item = req.body.item;


    if (req.file) {
        const oldAdBoard = await AdBoard.findById(adBoardId);
        await cloudinary.uploader.destroy(oldAdBoard.image.filename);
        item.image = { url: req.file.path, filename: req.file.filename };
    }
    await AdBoard.findByIdAndUpdate(adBoardId, { $set: { ...item } });

    req.flash('success', 'Bảng quảng đã được cập nhật thành công');
    return res.redirect(`/so/quanly/diem-dat-quang-cao/${adLocationId}/bang-quang-cao/${adBoardId}`);
}
export const remove = async (req, res) => {
    const { adLocationId, adBoardId } = req.params;
    const isInUse = await Report.findOne({ adBoard: adBoardId })
    // console.log(isInUse);
    if (isInUse) {
      req.flash('error', 'Bảng quảng cáo đang được sử dụng! Không thể xoá');
      return res.redirect(`/so/quanly/diem-dat-quang-cao/${adLocationId}`);
    }
    const adBoard = await AdBoard.findById(adBoardId);
    if (adBoard.image.filename !== defaultImageName) {
        await cloudinary.uploader.destroy(adBoard.image.filename);
    }
    await AdBoard.findByIdAndDelete(adBoardId);
    req.flash('success', 'Bảng quảng cáo đã được xoá thành công');
    return res.redirect(`/so/quanly/diem-dat-quang-cao/${adLocationId}`);
}
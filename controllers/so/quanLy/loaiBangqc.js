import BoardType from "../../../models/boardType.js";
import AdBoard from "../../../models/adBoard.js"

export const index = async (req, res) => {
    const loaibangqcs = await BoardType.find({});
    const props = {
        type: 'loại bảng quảng cáo',
        pathName: 'loai-bang-quang-cao'
    }
    const breadcrumbs = [];
    res.render('so/quanLy/lhqc-htbc/index', {items: loaibangqcs, props, breadcrumbs})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Loại bảng quảng cáo', link: '/so/quanly/loai-bang-quang-cao'},
        { name: "Thêm loại bảng quảng cáo", link: '' },
    ]
    // dành cho place holders
    const props = {
        type: 'loại bảng quảng cáo',
        name: 'Trụ hộp đèn...',
        description: 'Mô tả về loại bảng này...',
        note: 'Có kích thước linh hoạt...',
        addPath: '/so/quanly/loai-bang-quang-cao',
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Loại bảng quảng cáo', link: '/so/quanly/loai-bang-quang-cao'},
        { name: "Chỉnh sửa loại bảng quảng cáo", link: '' },
    ]
    const loaibangqc = await BoardType.findById(id);
    const props = {
        type: 'loại bảng quảng cáo',
        updatePath: `/so/quanly/loai-bang-quang-cao/${id}`,
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: loaibangqc, props, breadcrumbs })
};
export const add = async (req, res) => {
    const boardType = new BoardType(req.body.item);
    await boardType.save();
    req.flash('success', 'Thêm loại bảng thành công');
    res.redirect('/so/quanly/loai-bang-quang-cao');
}
export const update = async (req, res) => {
    const { id } = req.params;
    await BoardType.findByIdAndUpdate(id, { ...req.body.item });
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/so/quanly/loai-bang-quang-cao');
}
export const remove = async (req, res) => {
    const { id } = req.params;
    const isInUse = await AdBoard.findOne({ boardType: id });
    if (isInUse) {
        req.flash('error', `${boardType.name} đang được sử dụng!`);
        return res.redirect('/so/quanly/loai-bang-quang-cao');
    }
    const boardType = await BoardType.findByIdAndDelete(id);
    req.flash('success', `${boardType.name} được xoá thành công`);
    res.redirect('/so/quanly/loai-bang-quang-cao');
}
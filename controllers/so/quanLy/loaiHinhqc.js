import AdType from "../../../models/adType.js";
import AdLocation from "../../../models/adLocation.js";

export const index = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await AdType.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
        page,
        totalPages,
        itemsPerPage,
    };

    const loaihinhqcs = await AdType.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
    const props = {
        type: 'loại hình quảng cáo',
        pathName: 'loai-hinh-quang-cao'
    }

    res.render('so/quanLy/lhqc-htbc/index', {items: loaihinhqcs, props, pagination})
};
export const renderAddForm = (req, res) => {
    // dành cho place holders
    const breadcrumbs = [
        { name: 'Loại hình quảng cáo', link: '/so/quanly/loai-hinh-quang-cao'},
        { name: "Thêm loại hình quảng cáo", link: '' },
    ]
    const props = {
        type: 'loại hình quảng cáo',
        name: 'Cổ động chính trị...',
        description: 'loại hình này có mục tiêu cổ động các mục tiêu chính trị...',
        note: 'loại hình này được ưu tiên...',
        addPath: '/so/quanly/loai-hinh-quang-cao',
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Loại hình quảng cáo', link: '/so/quanly/loai-hinh-quang-cao'},
        { name: "Chỉnh sửa loại hình quảng cáo", link: '' },
    ]
    const loaihinhqc = await AdType.findById(id);
    const props = {
        type: 'loại hình quảng cáo',
        updatePath: `/so/quanly/loai-hinh-quang-cao/${id}`,
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: loaihinhqc, props, breadcrumbs })
};
export const add = async (req, res) => {
    const adType = new AdType(req.body.item);
    await adType.save();
    req.flash('success', 'Loại hình quảng cáo mới được tạo thành công');
    res.redirect('/so/quanly/loai-hinh-quang-cao');
}
export const update = async (req, res) => {
    const { id } = req.params;
    await AdType.findByIdAndUpdate(id, { ...req.body.item });
    req.flash('success', 'Loại hình quảng cáo được cập nhật thành công');
    res.redirect('/so/quanly/loai-hinh-quang-cao');
}
export const remove = async (req, res) => {
    const { id } = req.params;
    const isInUse = await AdLocation.findOne({ adType: id });
    if (isInUse) {
        req.flash('error', `Loại hình quảng cáo ${adtype.name} đang được sử dụng!`);
        return res.redirect('/so/quanly/loai-hinh-quang-cao');
    }
    const adtype = await AdType.findByIdAndDelete(id);
    req.flash('success', `Loại hình quảng cáo ${adtype.name} được xoá thành công`);
    res.redirect('/so/quanly/loai-hinh-quang-cao');
}
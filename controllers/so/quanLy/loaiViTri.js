import LocationType from "../../../models/locationType.js";
import AdLocation from "../../../models/adLocation.js";

export const index = async (req, res) => {
    const locationTypes = await LocationType.find({});
    const props = {
        type: 'loại vị trí',
        pathName: 'loai-vi-tri'
    }
    const breadcrumbs = [];
    res.render('so/quanLy/lhqc-htbc/index', {items: locationTypes, props, breadcrumbs})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Loại vị trí', link: '/so/quanly/loai-vi-tri'},
        { name: "Thêm loại vị trí", link: '' },
    ]
    // dành cho place holders
    const props = {
        type: 'loại vị trí',
        name: 'Trụ hộp đèn...',
        description: 'Mô tả về loại bảng này...',
        note: 'Có kích thước linh hoạt...',
        addPath: '/so/quanly/loai-vi-tri',
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Loại vị trí', link: '/so/quanly/loai-vi-tri'},
        { name: "Chỉnh sửa loại vị trí", link: '' },
    ]
    const locationType = await LocationType.findById(id);
    const props = {
        type: 'loại vị trí',
        updatePath: `/so/quanly/loai-vi-tri/${id}`,
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: locationType, props, breadcrumbs })
};
export const add = async (req, res) => {
    const locationType = new LocationType(req.body.item);
    await locationType.save();
    req.flash('success', 'Thêm loại vị trí thành công');
    res.redirect('/so/quanly/loai-vi-tri');
}
export const update = async (req, res) => {
    const { id } = req.params;
    await LocationType.findByIdAndUpdate(id, { ...req.body.item });
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/so/quanly/loai-vi-tri');
}
export const remove = async (req, res) => {
    const { id } = req.params;
    const isInUse = await AdLocation.findOne({ locationType: id });
    if (isInUse) {
        req.flash('error', `${locationType.name} đang được sử dụng!`);
        return res.redirect('/so/quanly/loai-vi-tri');
    }
    const locationType = await LocationType.findByIdAndDelete(id);
    req.flash('success', `${locationType.name} được xoá thành công`);
    res.redirect('/so/quanly/loai-vi-tri');
}
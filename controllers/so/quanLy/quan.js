import District from "../../../models/district.js";

export const index = async (req, res) => {
    const quans = await District.find({});
    const props = {
        type: 'Quận',
    }
    res.render('so/quanLy/quan-phuong/index', { items: quans, props})
};
export const renderAddForm = (req, res) => {
    const props = {
        type: 'Quận',
        addPath: `/so/quanly/quan`
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Thêm Quận", link: '' },
    ]
        
    res.render('so/quanLy/quan-phuong/add', {props, breadcrumbs});
};
export const renderEditForm = async (req, res) => {
    const { quanId } = req.params;
    const quan = await District.findById(quanId);
    const props = {
        type: 'Quận',
        updatePath: `/so/quanly/quan/${quanId}`
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Chỉnh sửa Quận", link: '' },
    ]

    res.render('so/quanLy/quan-phuong/edit', {item: quan, props, breadcrumbs});
}
export const add = async (req, res) => {
    const district = new District(req.body.item);
    await district.save();
    req.flash('success', 'Quận được tạo thành công');
    res.redirect(`/so/quanly/quan`);
}
export const update = async (req, res) => {
    const { quanId } = req.params;
    await District.findByIdAndUpdate(quanId, { ...req.body.item });
    req.flash('success', 'Quận được cập nhật thành công');
    res.redirect(`/so/quanly/quan`);
}
export const remove = async (req, res) => {
    await District.findByIdAndDelete(req.params.quanId);
    req.flash('success', 'Quận được xoá thành công');
    res.redirect(`/so/quanly/quan`);
}
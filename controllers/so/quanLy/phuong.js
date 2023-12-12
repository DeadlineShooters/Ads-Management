import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";

export const index = async (req, res) => {
    const quanId = req.params.quanId;
    const phuongs = await Ward.find({ district: { _id: quanId } });
    if (req.query.json && req.query.json == 'true') {
        return res.json(phuongs);
    }
    const quan = await District.findById(quanId);
    const props = {
        type: 'Phường',
        quanId: quanId,
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: `Danh sách Phường của Quận ${quan.name}`, link: '' },
    ]
    res.render('so/quanLy/quan-phuong/index', { items: phuongs, props, breadcrumbs })
}
export const renderAddForm = (req, res) => {
    const quanId = req.params.quanId;
    const props = {
        type: 'Phường',
        schema: 'ward',
        quanId: quanId,
        addPath: `/so/quanly/quan/${quanId}/phuong`
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Danh sách Phường", link: `/so/quanly/quan/${quanId}/phuong/` },
        { name: 'Thêm Phường', link: ''},
    ]
    res.render('so/quanLy/quan-phuong/add', {props, breadcrumbs});
};
export const renderEditForm = async (req, res) => {
    const { quanId, phuongId } = req.params;
    const phuong = await Ward.findById(phuongId);
    const props = {
        type: 'Phường',
        quanId: quanId,
        updatePath: `/so/quanly/quan/${quanId}/phuong/${phuongId}`
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Danh sách Phường", link: `/so/quanly/quan/${req.params.id}/phuong/` },
        { name: 'Chỉnh sửa Phường', link: ''},
    ]
    res.render('so/quanLy/quan-phuong/edit', {item: phuong, props, breadcrumbs});
}
export const add = async (req, res) => {
    const quanId = req.params.quanId;
    // console.log("ayyy" + req.body.item)
    const ward = new Ward(req.body.item);
    ward.district = quanId;
    await ward.save();
    req.flash('success', 'Phường được tạo thành công');
    res.redirect(`/so/quanly/quan/${quanId}/phuong`);
};
export const update = async (req, res) => {
    const { quanId, phuongId } = req.params;
    await Ward.findByIdAndUpdate(phuongId, { ...req.body.item });
    req.flash('success', 'Phường được cập nhật thành công');
    res.redirect(`/so/quanly/quan/${quanId}/phuong`);
};
export const remove = async (req, res) => {
    const { quanId, phuongId } = req.params;
    await Ward.findByIdAndDelete(phuongId);
    req.flash('success', 'Phường được xoá thành công');
    res.redirect(`/so/quanly/quan/${quanId}/phuong`);

};

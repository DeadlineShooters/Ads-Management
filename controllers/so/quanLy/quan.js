import District from "../../../models/district.js";
import AdLocation from "../../../models/adLocation.js";
import Ward from "../../../models/ward.js";
import User from "../../../models/user.js";
import ViolatedPoint from "../../../models/violatedPoint.js";

export const index = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await District.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
        page,
        totalPages,
        itemsPerPage,
    };

    const quans = await District.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
    
    if (req.query.json && req.query.json == 'true') {
        return res.json(quans);
    }
    const props = {
        type: 'Quận',
    }
    res.render('so/quanLy/quan-phuong/index', { items: quans, props, pagination})
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
    const { quanId } = req.params;

    const wards = await Ward.find({ district: quanId });
    let isInUse = null;
    for (let ward of wards) {
        isInUse = await AdLocation.findOne({ ward: ward._id }) || isInUse;
        isInUse = await User.findOne({ ward: ward._id }) || isInUse;
        isInUse = await ViolatedPoint.findOne({ ward: ward._id }) || isInUse;
        console.log("ayy"+isInUse)
        if (isInUse) {
            break;
        }
    }
    // let isInUse = await AdLocation.findOne({ district: quanId });
    // isInUse = await Ward.findOne({ district: quanId });
    // phải thêm dòng dưới
    // isInUse = await ViolatedPoint.findOne({district: quanId})
    if (isInUse) {
        req.flash('error', 'Quận đang được sử dụng! Không thể xoá');
        return res.redirect('/so/quanly/quan');
    }
    await Ward.deleteMany({_id: {$in: wards} })
    await District.findByIdAndDelete(quanId);
    req.flash('success', 'Quận được xoá thành công');
    res.redirect('/so/quanly/quan');
}
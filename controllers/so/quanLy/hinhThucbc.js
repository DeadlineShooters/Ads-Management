import ReportType from "../../../models/reportType.js";
import Report from "../../../models/report.js";

export const index = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await ReportType.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
        page,
        totalPages,
        itemsPerPage,
    };
    
    const hinhThucbcs = await ReportType.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
    
    const props = {
        type: 'hình thức báo cáo',
        pathName: 'hinh-thuc-bao-cao'
    }

    res.render('so/quanLy/lhqc-htbc/index', {items: hinhThucbcs, props, pagination})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các hình thức báo cáo', link: '/so/quanly/hinh-thuc-bao-cao'},
        { name: "Thêm hình thức báo cáo", link: '' },
    ]
    // dành cho place holders
    const props = {
        type: 'hình thức báo cáo',
        name: 'Đóng góp ý kiến...',
        description: 'Cho phép mọi người dân đóng góp ý kiến của mình...',
        note: 'Hình thức này...',
        addPath: '/so/quanly/hinh-thuc-bao-cao',
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const breadcrumbs = [
        { name: 'Các hình thức báo cáo', link: '/so/quanly/hinh-thuc-bao-cao'},
        { name: "Chỉnh sửa hình thức báo cáo", link: '' },
    ]
    const hinhthucbc = await ReportType.findById(id);
    const props = {
        type: 'hình thức báo cáo',
        updatePath: `/so/quanly/hinh-thuc-bao-cao/${id}`,
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: hinhthucbc, props, breadcrumbs })
};
export const add = async (req, res) => {
    const reportType = new ReportType(req.body.item);
    await reportType.save();
    req.flash('success', 'Thêm hình thức báo cáo thành công');
    res.redirect('/so/quanly/hinh-thuc-bao-cao');
}
export const update = async (req, res) => {
    const { id } = req.params;
    await ReportType.findByIdAndUpdate(id, { ...req.body.item });
    req.flash('success', 'Cập nhật thành công');
    res.redirect('/so/quanly/hinh-thuc-bao-cao');
}
export const remove = async (req, res) => {
    const { id } = req.params;
    const isInUse = await Report.findOne({ reportType: id });
    if (isInUse) {
        req.flash('error', `Hình thức báo cáo này đang được sử dụng!`);
        return res.redirect('/so/quanly/hinh-thuc-bao-cao');
    }
    const reportType = await ReportType.findByIdAndDelete(id);
    req.flash('success', `${reportType.name} được xoá thành công`);
    res.redirect('/so/quanly/hinh-thuc-bao-cao');
}
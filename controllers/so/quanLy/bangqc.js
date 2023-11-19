
const adLocation = {
    id: '001',
    longLat: '10.752334, 106.643366',
    address: "157 Nguyễn Đình Chính",
    district: 'Phú Nhuận',
    ward: '11',
    type: "Đất công/Công viên/Hành lang an toàn giao thông",
    adType: "Quảng cáo thương mại",
    status: 'Đã quy hoạch',
}
const adBoard = {
    id: '001',
    boardType: "Trụ màn hình điện tử LED",
    size: { h: 2.5, w: 10 },
    quantity: 2,
    startDate: { d: 15, m: 5, y: 23 },
    expireDate: { d: 15, m: 5, y: 24 },
    status: 'Đã duyệt',
    adLocation: adLocation,
};

const boardTypes = [
    { name: 'Trụ bảng hiflex' }, { name: 'Trụ màn hình điện tử LED' }, { name: 'Trụ hộp đèn' }, { name: 'Bảng hiflex ốp tường' }, { name: 'Màn hình điện tử ốp tường' }, { name: 'Trụ treo băng rôn dọc' }, { name: 'Trụ treo băng rôn ngang' }, { name: 'Trụ/Cụm pano' }, { name: 'Cổng chào' }, { name: 'Trung tâm thương mại' }
]

export const index = async (req, res) => {
    // boardtype: Trụ bảng hiflex, Trụ màn hình điện tử LED, Trụ hộp đèn, Bảng hiflex ốp tường, Màn hình điện tử ốp tường, Trụ treo băng rôn dọc, Trụ treo băng rôn ngang, Trụ/Cụm pano, Cổng chào, Trung tâm thương mại
    // adType: Cổ động chính trị, Quảng cáo thương mại, Xã hội hoá
    // locationType: Đất công/Công viên/Hành lang an toàn giao thông, Đất tư nhân/Nhà ở riêng lẻ, Trung tâm thương mại, Chợ, Cây xăng, Nhà chờ xe buýt
    const adBoards = [
        adBoard,
    ]
    const breadcrumbs = [];
    res.render("so/quanLy/bangqc/index", {adBoards, breadcrumbs});
};
export const showDetails = async (req, res) => {

    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Chi tiết bảng quảng cáo", link: '' },
    ]
    
    const props = {
        title: "bảng",
        b1text: "Chỉnh sửa",
        b2text: "Xoá",
        b1url: `/so/quanly/bang-quang-cao/${adBoard.id}/edit`,
        b2url: `#`,
        b1color: 'secondary',
        b2color: 'danger',
    }
    res.render("phuong/QC-details", { details: adBoard, props, breadcrumbs });
};
export const renderEditForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Chi tiết bảng quảng cáo", link: `/so/quanly/bang-quang-cao/${req.params.id}` },
        { name: "Chỉnh sửa bảng quảng cáo", link: '' },
    ]
    res.render('so/quanLy/bangqc/edit', {adBoard, boardTypes, breadcrumbs})
};
export const renderAddForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Các bảng quảng cáo', link: '/so/quanly/bang-quang-cao'},
        { name: "Thêm bảng quảng cáo", link: '' },
    ]
    res.render('so/quanLy/bangqc/add', {adBoard, boardTypes, breadcrumbs})
};
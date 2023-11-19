
export const index = async (req, res) => {
    const loaihinhqcs = [
        {
            id: '001',
            name: 'Cổ động chính trị',
            description: 'loại hình này có mục tiêu cổ động các mục tiêu chính trị',
            note: 'loại hình này được ưu tiên'
        },
        {
            id: '002',
            name: 'Quảng cáo thương mại',
            description: 'loại hình này có mục tiêu tăng doanh số của mặt hàng',
            note: 'Không có'
        },
    ]
    const props = {
        type: 'loại hình quảng cáo',
    }
    const breadcrumbs = [];
    res.render('so/quanLy/lhqc-htbc/index', {items: loaihinhqcs, props, breadcrumbs})
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
        note: 'loại hình này được ưu tiên...'
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Loại hình quảng cáo', link: '/so/quanly/loai-hinh-quang-cao'},
        { name: "Chỉnh sửa loại hình quảng cáo", link: '' },
    ]
    const loaihinhqc = {
        id: '001',
        name: 'Cổ động chính trị',
        description: 'loại hình này có mục tiêu cổ động các mục tiêu chính trị',
        note: 'loại hình này được ưu tiên'
    }
    const props = {
        type: 'loại hình quảng cáo',
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: loaihinhqc, props, breadcrumbs })
};
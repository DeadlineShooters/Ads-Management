// const boardTypes = [
//     { name: 'Trụ bảng hiflex' }, { name: 'Trụ màn hình điện tử LED' }, { name: 'Trụ hộp đèn' }, { name: 'Bảng hiflex ốp tường' }, { name: 'Màn hình điện tử ốp tường' }, { name: 'Trụ treo băng rôn dọc' }, { name: 'Trụ treo băng rôn ngang' }, { name: 'Trụ/Cụm pano' }, { name: 'Cổng chào' }, { name: 'Trung tâm thương mại' }
// ]
export const index = async (req, res) => {
    const loaibangqcs = [
        {
            id: '001',
            name: 'Trụ bảng hiflex',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
        {
            id: '002',
            name: 'Trụ màn hình điện tử LED',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
    ]
    const props = {
        type: 'loại bảng quảng cáo',
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
        note: 'Có kích thước linh hoạt...'
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Loại bảng quảng cáo', link: '/so/quanly/loai-bang-quang-cao'},
        { name: "Chỉnh sửa loại bảng quảng cáo", link: '' },
    ]
    const loaibangqc = {
        id: '001',
        name: 'Trụ bảng hiflex',
        description: 'Đây là mô tả',
        note: 'Đây là chú thích'
    }
    const props = {
        type: 'loại bảng quảng cáo',
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: loaibangqc, props, breadcrumbs })
};
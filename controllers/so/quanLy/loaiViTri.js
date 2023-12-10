// const boardTypes = [
//     { name: 'Trụ bảng hiflex' }, { name: 'Trụ màn hình điện tử LED' }, { name: 'Trụ hộp đèn' }, { name: 'Bảng hiflex ốp tường' }, { name: 'Màn hình điện tử ốp tường' }, { name: 'Trụ treo băng rôn dọc' }, { name: 'Trụ treo băng rôn ngang' }, { name: 'Trụ/Cụm pano' }, { name: 'Cổng chào' }, { name: 'Trung tâm thương mại' }
// ]
const locationTypes = [
    { name: 'Đất công/Công viên/Hành lang an toàn giao thông' }, { name: 'Đất tư nhân/Nhà ở riêng lẻ' }, { name: 'Trung tâm thương mại' }, { name: 'Chợ' }, { name: 'Cây xăng' }, { name: 'Nhà chờ xe buýt' }]
  
export const index = async (req, res) => {
    const locationTypes = [
        {
            id: '001',
            name: 'Đất công/Công viên/Hành lang an toàn giao thông',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
        {
            id: '002',
            name: 'Đất tư nhân/Nhà ở riêng lẻ',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
    ]
    const props = {
        type: 'loại vị trí',
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
        note: 'Có kích thước linh hoạt...'
    }
    res.render('so/quanLy/lhqc-htbc/add', { props, breadcrumbs })
};
export const renderEditForm = (req, res) => {
    const breadcrumbs = [
        { name: 'Loại vị trí', link: '/so/quanly/loai-vi-tri'},
        { name: "Chỉnh sửa loại vị trí", link: '' },
    ]
    const locationType = {
        id: '001',
        name: 'Trụ bảng hiflex',
        description: 'Đây là mô tả',
        note: 'Đây là chú thích'
    }
    const props = {
        type: 'loại vị trí',
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: locationType, props, breadcrumbs })
};
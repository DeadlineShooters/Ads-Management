
export const index = async (req, res) => {
    // Tố giác sai phạm, Đăng ký nội dung, Đóng góp ý kiến, Giải đáp thắc mắc
    const hinhThucbcs = [
        {
            id: '001',
            name: 'Tố giác sai phạm',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
        {
            id: '002',
            name: 'Đóng góp ý kiến',
            description: 'Đây là mô tả',
            note: 'Đây là chú thích'
        },
    ]
    const props = {
        type: 'hình thức báo cáo',
    }
    res.render('so/quanLy/lhqc-htbc/index', {items: hinhThucbcs, props})
};
export const renderAddForm = (req, res) => {
    // dành cho place holders
    const props = {
        type: 'hình thức báo cáo',
        name: 'Đóng góp ý kiến...',
        description: 'Cho phép mọi người dân đóng góp ý kiến của mình...',
        note: 'Hình thức này...'
    }
    res.render('so/quanLy/lhqc-htbc/add', { props })
};
export const renderEditForm = (req, res) => {
    const hinhthucbc = {
        id: '001',
        name: 'Cổ động chính trị',
        description: 'Đây là mô tả',
        note: 'Đây là chú thích'
    }
    const props = {
        type: 'hình thức báo cáo',
    }
    res.render('so/quanLy/lhqc-htbc/edit', { item: hinhthucbc, props })
};
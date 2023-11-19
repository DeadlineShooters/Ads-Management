
export const index = async (req, res) => {
    const quans = [
        {
            id: '001',
            name: "Bình Tân",
            description: "Đây là mô tả",
            note: "Đây là chú thích"
        },
        {
            id: '002',
            name: "6",
            description: "Đây là mô tả",
            note: "Đây là chú thích"
        },
    ];
    const props = {
        type: 'Quận',
    }
    const breadcrumbs = [];
    res.render('so/quanLy/quan-phuong/index', { items: quans, props, breadcrumbs })
};
export const renderAddForm = (req, res) => {
    const props = {
        type: 'Quận',
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Thêm Quận", link: '' },
    ]
        
    res.render('so/quanLy/quan-phuong/add', {props, breadcrumbs});
};
export const renderEditForm = (req, res) => {
    const quan = {
        id: '001',
        name: "Bình Tân",
        description: "Đây là mô tả",
        note: "Đây là chú thích"
    };
    const props = {
        type: 'Quận',
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Chỉnh sửa Quận", link: '' },
    ]

    res.render('so/quanLy/quan-phuong/edit', {item: quan, props, breadcrumbs});
}
export const phuongIndex = async (req, res) => {
    const phuongs = [
        {
            id: '001',
            name: "Phường 5",
            description: "Đây là mô tả",
            note: "Đây là chú thích"
        },
        {
            id: '002',
            name: "Phường 6",
            description: "Đây là mô tả",
            note: "Đây là chú thích"
        },
    ];
    const props = {
        type: 'Phường',
        quanId: req.params.quanId,
    }
    res.render('so/quanLy/quan-phuong/index', { items: phuongs, props })
}
export const renderPhuongAddForm = (req, res) => {
    const props = {
        type: 'Phường',
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Danh sách Phường", link: `/so/quanly/quan/${req.params.id}/phuong/` },
        { name: 'Thêm Phường', link: ''},
    ]
    res.render('so/quanLy/quan-phuong/add', {props, breadcrumbs});
};
export const renderPhuongEditForm = (req, res) => {
    const phuong = {
        id: '001',
        name: "Phường 5",
        description: "Đây là mô tả",
        note: "Đây là chú thích"
    };
    const props = {
        type: 'Phường',
    }
    const breadcrumbs = [
        { name: 'Danh sách Quận', link: '/so/quanly/quan'},
        { name: "Danh sách Phường", link: `/so/quanly/quan/${req.params.id}/phuong/` },
        { name: 'Chỉnh sửa Phường', link: ''},
    ]
    res.render('so/quanLy/quan-phuong/edit', {item: phuong, props, breadcrumbs});
}
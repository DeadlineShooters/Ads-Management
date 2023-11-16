
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
    res.render('so/quanLy/quan-phuong/index', { items: quans, props })
};
export const renderAddForm = (req, res) => {
    const props = {
        type: 'Quận',
    }
    res.render('so/quanLy/quan-phuong/add', {props});
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
    res.render('so/quanLy/quan-phuong/edit', {item: quan, props});
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
    res.render('so/quanLy/quan-phuong/add', {props});
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
    res.render('so/quanLy/quan-phuong/edit', {item: phuong, props});
}
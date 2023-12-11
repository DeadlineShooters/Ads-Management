export const tkBaoCaoXuLy = async (req, res) => {
    const thongKe = [
        {
            quan: "Tân Bình",
            phuong: "Phường 13",
            soLuongBaoCao: 7,
            dangXuLy: 4,
            xuLyXong: 3,
            danhGia: "43%",
        }
    ]
    const breadcrumbs = [];
    res.render('so/hanhChinh/dsThongKeBaoCao.ejs', {object: thongKe, breadcrumbs});
}
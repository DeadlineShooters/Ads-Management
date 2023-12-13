import AdBoardReq from "../../../models/adBoardRequest.js"

export const dsChinhBangQC = async (req, res) => {
    const yeuCau = [
        {
            diaChi: "157 Nguyễn Đình Chính",
            khuVuc: "Phường 11, Quận Phú Nhuận",
            loaiBang: "Trụ màn hình điện tử",
            kichThuoc: "2.5m x 10m",
            soLuong: "2 trụ/bảng",
            thoiGianGui: "13/10/2023",
            tinhTrang: "Duyet",
        },
        {
            diaChi: "158 Nguyễn Đình Chính",
            khuVuc: "Phường 12, Quận Phú Nhuận",
            loaiBang: "Trụ màn hình điện tử",
            kichThuoc: "1.5m x 8m",
            soLuong: "1 trụ/bảng",
            thoiGianGui: "14/10/2023",
            tinhTrang: "khongDuyet",
        },
        {
            diaChi: "159 Nguyễn Đình Chính",
            khuVuc: "Phường 13, Quận Phú Nhuận",
            loaiBang: "Trụ màn hình điện tử",
            kichThuoc: "3m x 12m",
            soLuong: "3 trụ/bảng",
            thoiGianGui: "15/10/2023",
            tinhTrang: "chuaDuyet",
        },
        {
            diaChi: "158 Nguyễn Đình Chính",
            khuVuc: "Phường 12, Quận Phú Nhuận",
            loaiBang: "Trụ màn hình điện tử",
            kichThuoc: "1.5m x 8m",
            soLuong: "1 trụ/bảng",
            thoiGianGui: "14/10/2023",
            tinhTrang: "Duyet",
        },
        {
            diaChi: "159 Nguyễn Đình Chính",
            khuVuc: "Phường 13, Quận Phú Nhuận",
            loaiBang: "Trụ màn hình điện tử",
            kichThuoc: "3m x 12m",
            soLuong: "3 trụ/bảng",
            thoiGianGui: "15/10/2023",
            tinhTrang: "khongDuyet",
        },
    ]
    const breadcrumbs = [];
    res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs', {objects: yeuCau, breadcrumbs});
}

export const chiTietChinhBangQC = async (req, res) => {
    const chiTiet = [
        {
            nguoiGui: "Minh Thông",
            thoiDiemGui: "01/10/2023 - 17:04",
            lyDoChinhSua: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ad sed hic qui nam sit, reiciendis enim provident quidem similique ipsum? Facere magni expedita fugit repellendus, velit pariatur, accusantium fuga veritatis provident deleniti molestiae in quisquam aspernatur perspiciatis eos. Provident est facere suscipit quisquam voluptates odit, tempora placeat laborum aliquid quo voluptatibus ea quasi aut, tenetur, ex itaque ut atque! Recusandae repellendus incidunt nemo? Laboriosam, cumque!",
            hinhMinhHoa: "",
            diemDat: "446 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh",
            khuVuc: {q: "Tân Bình", p: "Phường 15"},
            phanLoai : {loaiBang: "Trụ màn hình điện tử LED", soLuong: "01", kichThuoc: "2.5 x 10"},
            hopDong: {ngayBatDau: "01/10/2023", ngayKetThuc: "31/10/2023"},
        }
    ]
    const breadcrumbs = [];
    res.render('so/hanhChinh/chiTiet/ndChinhBangQC.ejs', {object: chiTiet, breadcrumbs});
}
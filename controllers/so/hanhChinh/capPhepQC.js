export const dsCapPhepQC = async (req, res) => {
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
            tinhTrang: "khongDuyet",
        }
    ]
    const breadcrumbs = [];

    res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs', {objects: yeuCau, breadcrumbs});
}

export const chiTietYeuCauCapPhep = async (req, res) => {
    const chiTiet = [
        {
            nguoiGui: "Minh Thông",
            thoiDiemGui: "01/10/2023 - 17:04",
            noiDung: "Quảng cáo thức uống Wakeup 247 của công ty VinCafé . Phong cách thiết kế 3D kết hợp Die-cut làm cho các  chi tiết trên bảng Wake Up 247 - Nước tăng lực vị cà phê trở nên nổi bật. Không những vậy, việc sáng tạo bằng cách cho tia sét phát ra từ hạt cà phê, “truyền” vào chai Wakeup 247 đã thể hiện rất sống động thông điệp của nhãn hàng.",
            hinhMinhHoa: "",
            diemDat: "446 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh",
            khuVuc: {q: "Tân Bình", p: "Phường 15"},
            phanLoai : {loaiBang: "Trụ màn hình điện tử LED", soLuong: "01", kichThuoc: "2.5 x 10"},
            tenCongTy: "Công ty cổ phần Vincafé Biên Hòa",
            lienLac: {mail: "ads.argency.vincafecompany@gmail.com", dienThoai: "03672727272"},
            hopDong: {ngayBatDau: "01/10/2023", ngayKetThuc: "31/10/2023"},
            tinhTrang: "",
        }
    ]
    const breadcrumbs = [];
    res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs', {object: chiTiet, breadcrumbs});
}

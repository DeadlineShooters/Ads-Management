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
    res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs', {objects: yeuCau});
}

export const dsChinhDiemQC = async (req, res) => {
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
    ]
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs', {objects: yeuCau});
}

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
    res.render('so/hanhChinh/dsYeuCauChinhBangQC.ejs', {objects: yeuCau});
}

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
    res.render('so/hanhChinh/dsThongKeBaoCao.ejs', {object: thongKe});
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
    res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs', {object: chiTiet});
}

export const chiTietChinhDiemQC = async (req, res) => {
    const chiTiet = [
        {
            nguoiGui: "Minh Thông",
            thoiDiemGui: "01/10/2023 - 17:04",
            lyDoChinhSua: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ad sed hic qui nam sit, reiciendis enim provident quidem similique ipsum? Facere magni expedita fugit repellendus, velit pariatur, accusantium fuga veritatis provident deleniti molestiae in quisquam aspernatur perspiciatis eos. Provident est facere suscipit quisquam voluptates odit, tempora placeat laborum aliquid quo voluptatibus ea quasi aut, tenetur, ex itaque ut atque! Recusandae repellendus incidunt nemo? Laboriosam, cumque!",
            hinhMinhHoa: "",
            diemDat: "446 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh",
            khuVuc: {q: "Tân Bình", p: "Phường 15"},
            loaiViTri : "Nhà đất/tư nhân riêng lẻ",
            hinhThuc: "Quảng cáo thương mại",
            quyHoach: "Đã quy hoạch",
        }
    ]
    res.render('so/hanhChinh/chiTiet/ndChinhDiemQC.ejs', {object: chiTiet});
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
    res.render('so/hanhChinh/chiTiet/ndChinhBangQC.ejs', {object: chiTiet});
}
import express from "express";
const router = express.Router();

router.get("/qlquan", (req, res) => {
  // Tìm lấy tất cả quận trong db
  // const dsQuan = await Quan.find({})
  const dsQuan = null;
  res.render("so/qlqp/qlQuan", {dsQuan});
});

router.get("/qlquan/new", (req, res) => {
  res.render("so/qlqp/newQuan");
});

router.get("/qlquan/:quanId/edit", (req, res) => {
  res.render("so/qlqp/editQuan");
});

router.get("/qlquan/:quanId/qlphuong", (req, res) => {
  // dựa vào id tìm quận tương ứng
  // const quan = await Quan.findById(req.params.id);
  const quan = null;
  res.render("so/qlqp/qlPhuong", { quan });
});

router.get("/qlquan/:quanId/qlphuong/new", (req, res) => {
  res.render("so/qlqp/newPhuong");
});

router.get("/qlquan/:quanId/qlphuong/:phuongID/edit", (req, res) => {
  res.render("so/qlqp/editPhuong");
});

router.get("/qlloaihinhqc", (req, res) => {
  res.render("so/qlLoaiHinhqc/ql");
});
router.get("/qlloaihinhqc/21127089/edit", (req, res) => {
  res.render("so/qlLoaiHinhqc/edit");
});
router.get("/qlloaihinhqc/new", (req, res) => {
  res.render("so/qlLoaiHinhqc/new");
});

router.get("/qlloaihinhthucbc", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/ql");
});
router.get("/qlloaihinhthucbc/21127089/edit", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/edit");
});
router.get("/qlloaihinhthucbc/new", (req, res) => {
  res.render("so/qlLoaiHinhthucbc/new");
});

router.get("/qldiemdatqc", (req, res) => {
  res.render("so/qlDiemDatqc/ql");
});
router.get("/qldiemdatqc/21127089", (req, res) => {
  res.render("so/qlDiemDatqc/details");
});
router.get("/qldiemdatqc/21127089/edit", (req, res) => {
  res.render("so/qlDiemDatqc/edit");
});
router.get("/qldiemdatqc/new", (req, res) => {
  res.render("so/qlDiemDatqc/new");
});
router.get('/qlQuan', (req, res) => {
    res.render('so/qlqp/qlQuan.ejs');
})

router.get('/hanhchinh/cap-phep-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauCapPhepQC.ejs');
})

router.get('/hanhchinh/cap-phep-qc/chi-tiet-yeu-cau', (req, res) => {
    res.render('so/hanhChinh/chiTiet/ndYeuCauCapPhep.ejs');
})

router.get('/hanhchinh/chinh-diem-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs');
})

router.get('/hanhchinh/chinh-bang-qc', (req, res) => {
    res.render('so/hanhChinh/dsYeuCauChinhDiemQC.ejs');
})

router.get('/hanhchinh/thong-ke-qc', (req, res) => {
    res.render('so/hanhChinh/dsThongKeBaoCao.ejs');
})

router.get('/canbo/tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dsTaiKhoanCanBo.ejs');
})

router.get('/canbo/dang-ky-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/dkTaiKhoanCanBo.ejs');
})

router.get('/canbo/chinh-sua-tai-khoan-cb', (req, res) => {
    res.render('so/canbo/chinhSuaTaiKhoan.ejs');
})

export default router;
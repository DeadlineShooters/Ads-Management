import express from "express";
const router = express.Router();

router.get("/qlquan", (req, res) => {
  // Tìm lấy tất cả quận trong db
  // const dsQuan = await Quan.find({})
  const dsQuan = null;
  res.render("so/qlqp/qlQuan", {dsQuan});
});

router.get("/qlquan/new", (req, res) => {
  res.render("so/qlqp/newQuan")
})

router.get("/qlquan/:quanId/edit", (req, res) => {
  res.render("so/qlqp/editQuan")
})

router.get("/qlquan/:quanId/qlphuong", (req, res) => {
  // dựa vào id tìm quận tương ứng
  // const quan = await Quan.findById(req.params.id);
  const quan = null
  res.render("so/qlqp/qlPhuong", {quan})
})

router.get("/qlquan/:quanId/qlphuong/new", (req, res) => {
  res.render("so/qlqp/newPhuong")
})

router.get("/qlquan/:quanId/qlphuong/:phuongID/edit", (req, res) => {
  res.render("so/qlqp/editPhuong")
})

export default router;

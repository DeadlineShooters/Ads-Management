import express from "express";
const router = express.Router();

router.get("/qlQuan", (req, res) => {
  res.render("so/qlqp/qlQuan.ejs");
});

export default router;

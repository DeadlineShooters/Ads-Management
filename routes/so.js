import express from "express";
const router = express.Router();


router.get('/qlquan', (req, res) => {
    res.render('so/qlqp/qlQuan.ejs');
})


export default router;
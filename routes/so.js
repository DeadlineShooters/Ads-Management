import express from "express";
const router = express.Router();


router.get('/quan', (req, res) => {
    res.render('so/qlqp/dsQuan.ejs');
})


export default router;
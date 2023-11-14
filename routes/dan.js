import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Đây là dân');
    res.render('dan/home/index.ejs')
})

export default router;
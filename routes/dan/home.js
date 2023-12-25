import express from 'express';
import controller from '../../controllers/dan.js';
import User from '../../models/user.js';
const router = express.Router();
import catchAsync from "../../utils/catchAsync.js";
import bcrypt from "bcrypt";

router.get('/', controller.home);
router.get('/adboards/:id', controller.getAdBoard);
router.get('/violatedpoint/:id', controller.getViolatedPoint);
router.get('/ward', controller.getWard)

router.get("/edit-profile/:canBoId", async (req, res) => {
    const { canBoId } = req.params;
    const canbo = await User.findById(canBoId);
    res.render('editProfile', { canbo });
});
router.get('/group-info', (req, res) => {
    res.render('info')
});
router.patch('/edit-profile/:canBoId', catchAsync(async (req, res) => {
    const { canBoId } = req.params;
    // console.log(canBoId)

    await User.findByIdAndUpdate(canBoId, { $set: { ...req.body } });

    req.flash('success', 'Thông tin tài khoản cập nhật thành công');
    res.redirect(`/edit-profile/${canBoId}`)

}));
router.patch('/change-password/:canBoId', catchAsync(async (req, res) => {
    const { canBoId } = req.params;
    // console.log(req.body);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed_password = bcrypt.hashSync(req.body.password, salt);
    await User.findByIdAndUpdate(canBoId, { $set: {hashed_password} });
    req.flash('success', 'Thông tin tài khoản cập nhật thành công');
    res.redirect(`/edit-profile/${canBoId}`)
}));


export default router;

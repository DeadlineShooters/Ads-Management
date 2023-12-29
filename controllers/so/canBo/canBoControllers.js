import User from "../../../models/user.js";
import Ward from "../../../models/ward.js";
import District from "../../../models/district.js";
import bcrypt from "bcrypt";

export const danhSachCanBo =  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.items) || res.locals.defaultItemsPerPage;
    const totalItems = await User.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      page,
      totalPages,
      itemsPerPage,
    };
    const breadcrumbs = [];
    try {
        const canBo = await User.find({role:{$ne:"so"}}).populate([
            {path: 'ward', populate: {
                path: 'district', model: 'District',
            }},
            {path: 'district', model: 'District'}])
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec();
        console.log(canBo);
        res.render('so/canBo/dsTaiKhoanCanBo.ejs',  { 
            messageAdd: req.flash('info'),
            messageEdit: req.flash('edit'),
            messageDel: req.flash('del'),
            canBo,
            pagination,
            breadcrumbs,
        });
    } catch (error) {
        console.log(error);
    }
}

//GET can bo
export const dkTaiKhoanCanBo = async (req, res) => {
    try {
        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
        });
        const districtList = await District.find({});
        const locals = {
            title: 'add new account',
            description: 'this function creates new account'
        }
        const breadcrumbs = [];
        res.render('so/canBo/dkTaiKhoanCanBo.ejs', {locals, breadcrumbs, wardList, districtList});
    } catch (error) {
        console.log(error);
    }
}

//POST can bo
export const guiInfoTaiKhoanCanBo = async (req, res) => {
    console.log(req.body);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newCanBo = new User({
        username : req.body.username,
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone,
        ward: req.body.item.phuongId,
        district: req.body.item.districtId,
        birthday: req.body.birthday,
        salt: salt,
        hashed_password: hashedPassword,
    });
    try {
        await User.create(newCanBo);
        await req.flash('info', 'Tạo tài khoản cán bộ thành công')
        res.redirect('/so/canbo/tai-khoan-cb');
    } catch(error) {
        console.log(error);
    }
}
/* EDIT tai khoan can bo*/
export const suaTaiKhoanCanBo = async (req, res) => {
    try {
        const wardList = await Ward.find({}).populate({
            path: "district", model: 'District'
        });
        const districtList = await District.find({});
        const canBo = await User.findOne({ _id: req.params.id });
        const breadcrumbs = [];
        res.render('so/canBo/chinhSuaTaiKhoan.ejs', {canBo, breadcrumbs, wardList, districtList});
    } catch (error) {
        console.log(error);
    }
}
/* UPDATE tai khoan can bo*/
export const capNhatTaiKhoanCanBo = async (req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    try {
        await User.findByIdAndUpdate(req.params.id, {
            username : req.body.username,
            email: req.body.email,
            role: req.body.role,
            phone: req.body.phone,
            ward: req.body.ward,
            district: req.body.district,
            birthday: req.body.birthday,
            salt: salt,
            hashed_password: hashedPassword,
        });
        await req.flash('edit', 'Cập nhật tài khoản cán bộ thành công')
        res.redirect('/so/canbo/tai-khoan-cb');
    } catch (error) {
        console.log(error);
    }
}

export const xoaTaiKhoanCanBo = async (req, res) => {
    try {
        await User.deleteOne({_id: req.params.id});
        await req.flash('del', 'Xóa tài khoản cán bộ thành công')
        res.redirect('/so/canbo/tai-khoan-cb');
    } catch (error) {
        console.log(error);
    }
}

/* GET tìm tài khoản cán bộ*/
export const timTaiKhoanCanBo = async (req, res) => {
    try {
        let searchItem = req.body.searchItem;
        const searchNoSpecialChar = searchItem.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
        const canBo = await User.find({
            $or: [
                { username: {$regex: new RegExp(searchNoSpecialChar, "i")} },
                { phone: {$regex: new RegExp(searchNoSpecialChar, "i")} },
                { email: {$regex: new RegExp(searchNoSpecialChar, "i")} },
            ]
        })
        const breadcrumbs = [];
        res.render('so/canBo/timTaiKhoanCanBo.ejs', {canBo, breadcrumbs});
    } catch (error) {
        console.log(error);
    }
}
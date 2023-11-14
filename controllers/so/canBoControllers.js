export const danhSachCanBo =  async (req, res) => {
    res.render('so/canbo/dsTaiKhoanCanBo.ejs');
}

export const dkTaiKhoanCanBo = async (req, res) => {
    const locals = {
        title: 'add new account',
        description: 'this function creates new account'
    }
    res.render('so/canbo/dkTaiKhoanCanBo.ejs', locals);
}

export const guiInfoTaiKhoanCanBo = async (req, res) => {
    console.log(req.body);
    const locals = {
        title: 'new account added',
        description: 'this function creates new account'
    }
    res.render('so/canbo/dkTaiKhoanCanBo.ejs', locals);
}

export const suaTaiKhoanCanBo = async (req, res) => {
    res.render('so/canbo/chinhSuaTaiKhoan.ejs');
}
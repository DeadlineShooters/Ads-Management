const controller = {};

controller.home = (req, res) => {
    res.render('dan/home');
}

controller.report = (req, res) => {
    res.render('dan/report');
}

export default controller;
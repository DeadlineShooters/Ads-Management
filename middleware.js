export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // const parsedUrl = new URL(req.originalUrl, `http://${req.headers.host}`);
        // req.session.returnTo = parsedUrl.pathname;
        // req.session.returnTo = req.headers.referer;
        // console.log("dfjaslfkjas: " + req.method);
        // req.session.returnTo = req.originalUrl;
        // req.session.method = req.method;

        // console.log("store path into returnTo"+req.session.returnTo);
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    console.log("already loggedin")
    next();
}
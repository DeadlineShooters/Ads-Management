// contain authentication-related routes
import express from 'express';
import passport from 'passport';
import User from '../models/user.js';
import LocalStrategy from 'passport-local';
import controller from '../controllers/auth.js';
import bcrypt from 'bcrypt';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async function (email, password, cb) {
			try {
				const user = await User.findOne({ email }).populate(['ward', 'district']);

				if (!user) {
					console.log('No such user with that email found.');
					return cb(null, false, {
						message: 'Email hoặc mật khẩu đăng nhập chưa đúng',
					});
				}

				const passwordMatch = await bcrypt.compare(password, user.hashed_password);

				if (!passwordMatch) {
					console.log('Incorrect email or password.');
					return cb(null, false, { message: 'Email hoặc mật khẩu đăng nhập chưa đúng' });
				}

				console.log('Validation passed');
				return cb(null, user);
			} catch (err) {
				console.error(err);
				return cb(err);
			}
		}
	)
);

/* See: https://www.passportjs.org/concepts/authentication/password/
Note: cb(error, user, message) - message describes why authentication failed.
 */

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, user);
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

var router = express.Router();

router.get('/login', function (req, res, next) {
	res.render('login');
});

router.post(
	'/login/password',
	passport.authenticate('local', {
		failureFlash: true,
		successReturnToOrRedirect: '/',
		failureRedirect: '/login',
		// failureMessage: true,
	})
);

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}

		res.redirect('/');
	});
});

router.post('/forgot-password', controller.forgotPassword);

router.post('/input-code', (req, res) => {
	console.log(req.body);
	res.render('inputCode');
});

router.post('/reset-password', controller.resetPassword);
router.post('/reset-password-db', controller.resetPasswordDB);

export default router;
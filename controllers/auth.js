import mongoose from 'mongoose';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'

const controller = {};

controller.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		let user = await User.findOne({ email });
		console.log(user);
		if (!user) {
			res.render('inputCode', { success: false });
		} else {
			const otp = Math.floor(100000 + Math.random() * 899999);
			console.log(otp);
			const otpExpire = new Date();
			otpExpire.setMinutes(otpExpire.getMinutes() + 5);

			const transporter = nodemailer.createTransport({
				service: process.env.MAILER_SERVICE,
				auth: {
					user: process.env.MAILER_USER,
					pass: process.env.MAILER_PASS,
				},
			});

			const mailOptions = {
				from: 'ngocphamanh2003@gmail.com',
				to: email,
				subject: 'Request for Password Reset',
				html: `
					<html>
					<body>
						<h1>Request for Password Reset</h1>
						<p>Dear ${user.username},</p>
						<p>We received a request for a password reset for your account. Please use the One-Time Password (OTP) provided below to proceed with this process. Please note that this OTP will expire in 5 minutes.</p>
						<p><b>OTP:</b> ${otp}</p>
						<p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
						<p>Best Regards,<br>Your Name<br>Your Company Name</p>
					</body>
					</html>
				`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				res.render('inputCode', { success: true, otp, otpExpire, email });
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

controller.resetPassword = (req, res) => {
	console.log(req.body);
	const { password, otp, otpExpire, email } = req.body;
	if (password == otp && Date.now() <= new Date(otpExpire).getTime()) {
		res.render('resetPassword', { success: true, email });
	} else if (password != otp) {
		res.render('resetPassword', { success: false, message: 'Mã xác thực không chính xác!' });
	} else {
		res.render('resetPassword', { success: false, message: 'Mã xác thực đã hết hạn!' });
	}
};

controller.resetPasswordDB = async (req, res) => {
	console.log(req.body);
	const { password, email } = req.body;
	const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
	await User.findOneAndUpdate({ email }, { $set: { hashed_password: hashedPassword } }, { new: true });
	res.json({ success: true });
};

export default controller;

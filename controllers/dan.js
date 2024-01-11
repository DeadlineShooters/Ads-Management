import mongoose from 'mongoose';
import request from 'request';
import AdLocation from '../models/adLocation.js';
import ViolatedPoint from '../models/violatedPoint.js';
import AdBoard from '../models/adBoard.js';
import ReportType from '../models/reportType.js';
import Report from '../models/report.js';
import fs from 'fs';
import Ward from '../models/ward.js';
import { escape } from 'querystring';

const controller = {};

controller.home = async (req, res) => {
	try {
		res.locals.currentPage = 'trang-chu';
		const { lat = '10.795788', lng = '106.703497' } = req.query;
		let adLocations = await AdLocation.find({}).populate('adType').populate('type').populate('image');
		const violatedPoints = await ViolatedPoint.find({});

		// Fetch all adBoards
		const adBoards = await AdBoard.find({});

		// Attach flag to adLocations
		adLocations = adLocations.map((adLocation) => {
			const hasAdBoard = adBoards.some(
				(adBoard) =>
					adBoard.adLocation.toString() === adLocation._id.toString() && !adBoard.status.localeCompare('Đã duyệt') && new Date(adBoard.expireDate) >= new Date()
			);
			return { ...adLocation._doc, adBoard: hasAdBoard };
		});

		res.render('dan/home', { adLocations: adLocations, violatedPoints: violatedPoints, user: req.user ? req.user : null, lat, lng });
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

controller.getAdBoard = async (req, res) => {
	try {
		const id = new mongoose.Types.ObjectId(req.params.id);
		const adBoards = await AdBoard.find({ adLocation: id })
			.populate({
				path: 'adLocation',
				populate: [{ path: 'adType' }, { path: 'type' }],
			})
			.populate('boardType')
			.populate({
				path: 'reports',
				populate: [{ path: 'reportType' }],
			});
		res.json(adBoards);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

controller.getWard = async (req, res) => {
	try {
		const wards = await Ward.find({}).populate('district');
		res.json(wards);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

controller.getViolatedPoint = async (req, res) => {
	try {
		const id = new mongoose.Types.ObjectId(req.params.id);
		const violatedPoint = await ViolatedPoint.find({ _id: id }).populate({
			path: 'reports',
			populate: [{ path: 'reportType' }],
		});
		res.json(violatedPoint);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

controller.reportForm = (req, res) => {
	res.render('dan/report');
};

controller.getReport = (req, res) => {
	let { type, name, email, phoneNumber, content, location, board, id, lat, lng, district, ward, address } = req.body;
	console.log(content);
	const captcha = req.body['g-recaptcha-response'];
	if (!captcha) {
		return res.json({ success: false, msg: 'Captcha token is undefined!' });
	}
	// const secretKey = '6Lc97TUpAAAAAOVeTP6qbaKyA0Pl0YqwhSoMlift';
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${res.locals.captchaSecretKey}&response=${captcha}`;
	request(verifyUrl, async (err, response, body) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				msg: 'Internal Server Error',
			});
		}

		body = JSON.parse(body);
		console.log(body);

		if (!body.success) {
			return res.json({
				success: false,
				msg: 'Failed captcha verification!',
			});
		} else {
			let reportType = await ReportType.find({ description: type });

			try {
				const uploadedImages = req.files.map((f) => ({ url: f.path, filename: f.filename }));
				const report = new Report({ reportType: reportType[0]._id, fullName: name, email, phone: phoneNumber, content, uploadedImages, sendDate: Date.now() });
				await report.save();
				if (location && board) {
					await AdLocation.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(location) }, { $set: { isViolated: true } }, { new: true });
					await AdBoard.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(board) }, { $push: { reports: report._id } }, { new: true });
					report.adBoard = new mongoose.Types.ObjectId(board);
					await report.save();
				} else if (id) {
					await ViolatedPoint.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $push: { reports: report._id } }, { new: true });
					report.randomPoint = new mongoose.Types.ObjectId(id);
					await report.save();
				} else {
					
					const violatedPoint = new ViolatedPoint({ latlng: lat + ', ' + lng, reports: [report._id], district, ward, address });
					await violatedPoint.save();
					report.randomPoint = violatedPoint._id;
					await report.save();
				}
				res.json({ success: true });
			} catch (error) {
				console.error('Error saving to database:', error);
				res.json({ success: false });
			}
		}
	});
};

export default controller;

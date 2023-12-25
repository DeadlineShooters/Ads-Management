import mongoose from 'mongoose';
import request from 'request';
import AdLocation from '../models/adLocation.js';
import ViolatedPoint from '../models/violatedPoint.js';
import AdBoard from '../models/adBoard.js';
import ReportType from '../models/reportType.js';
import Report from '../models/report.js';
import fs from 'fs';
import Ward from '../models/ward.js';

const controller = {};

controller.home = async (req, res) => {
	try {
		// const lat = parseFloat(req.params.lat) || 10.762860099114166;
		// const lng = parseFloat(req.params.lng) || 106.68247164106691;
		const { lat = '10.762860099114166', lng = '106.68247164106691' } = req.query;
		const fliedIn = lat == '10.762860099114166';
		const adLocations = await AdLocation.find({}).populate('adType').populate('type').populate('image');
		const violatedPoints = await ViolatedPoint.find({});
		res.render('dan/home', { adLocations: adLocations, violatedPoints: violatedPoints, user: req.user ? req.user : null, lat, lng, fliedIn });
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
	let { type, name, email, phoneNumber, content, location, board, id, lat, lng, district, ward } = req.body;
	console.log(content)
	const captcha = req.body['g-recaptcha-response'];
	if (!captcha) {
		return res.json({ success: false, msg: 'Captcha token is undefined!' });
	}
	const secretKey = '6Lc97TUpAAAAAOVeTP6qbaKyA0Pl0YqwhSoMlift';
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
	request(verifyUrl, async (err, response, body) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				msg: 'Internal Server Error',
			});
		}

		body = JSON.parse(body);
		console.log(body)

		if (!body.success) {
			return res.json({
				success: false,
				msg: 'Failed captcha verification!',
			});
		}
		else {
			let reportType = await ReportType.find({ description: type });

			let uploadedImages = [];
			for (let file of req.files) {
				var img = fs.readFileSync(file.path);
				var encode_image = img.toString('base64');
		
				var finalImg = {
					contentType: file.mimetype,
					image: new Buffer.from(encode_image, 'base64'),
				};
				uploadedImages.push(finalImg);
			}
			try {
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
					const violatedPoint = new ViolatedPoint({ latlng: lat + ', ' + lng, reports: [report._id], district, ward})
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

import mongoose from 'mongoose';
import UploadedImage from '../models/uploadedImage.js';
import AdLocation from '../models/adLocation.js';
import ViolatedPoint from '../models/violatedPoint.js';
import AdBoard from '../models/adBoard.js';
import ReportType from '../models/reportType.js';
import Report from '../models/report.js';
import fs from 'fs';

const controller = {};

controller.home = async (req, res) => {
    try {
        const adLocations = await AdLocation.find({}).populate('adType').populate('type').populate('image');
        const violatedPoints = await ViolatedPoint.find({});
        res.render('dan/home', { adLocations: adLocations, violatedPoints: violatedPoints });
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

controller.getReport = async (req, res) => {
    let { type, name, email, phoneNumber, content } = req.body;
    let reportType = await ReportType.find({ description: type });
    console.log(reportType[0]._id);

    let uploadedImages = [];
    for (let file of req.files) {
        console.log(file);
        var img = fs.readFileSync(file.path);
        var encode_image = img.toString('base64');

        var finalImg = {
            contentType: file.mimetype,
            image: new Buffer.from(encode_image, 'base64'),
        };
        uploadedImages.push(finalImg);
    }
    try {
        const report = new Report({ reportType: reportType[0]._id, fullName: name, email, phone: phoneNumber, content, uploadedImages });
        await report.save();
        res.json({message: 'success'})
    } catch (error) {
        console.error('Error saving to database:', error);
        res.json({message: 'failure'})
    }
};

export default controller;

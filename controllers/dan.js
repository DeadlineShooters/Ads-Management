import UploadedImage from '../models/uploadedImage.js';
import AdLocation from '../models/adLocation.js';
import fs from 'fs';

const controller = {};

controller.home = async (req, res) => {
    try {
        const adLocations = await AdLocation.find({}).populate('adType').populate('type').populate('image');
        res.render('dan/home', { adLocations: adLocations });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

controller.reportForm = (req, res) => {
    res.render('dan/report');
};

controller.getReport = async (req, res) => {
    for (let file of req.files) {
        console.log(file);
        var img = fs.readFileSync(file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database

        var finalImg = {
            contentType: file.mimetype,
            image: new Buffer.from(encode_image, 'base64'),
        };
        const uploadedImage = new UploadedImage(finalImg);
        try {
            await uploadedImage.save();
            console.log('Upload success!');
        } catch (error) {
            console.error('Error saving to database:', error);
        }
    }
};

export default controller;

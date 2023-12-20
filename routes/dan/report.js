import express from 'express';
import controller from '../../controllers/dan.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, 'uploads');

const router = express.Router(); //server.js

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
    },
});

var upload = multer({ storage: storage });

router.get('/', controller.reportForm);
router.post('/', upload.array('uploadedImages', 2), controller.getReport);

export default router;

import express from 'express';
import multer from 'multer';
import controller from '../../controllers/dan.js';
const router = express.Router(); //server.js

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

var upload = multer({ storage: storage });

router.get('/', controller.reportForm);
router.post('/', upload.array('files', 2), controller.getReport);

export default router;

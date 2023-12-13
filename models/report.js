import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import ReportType from './reportType.js';
import UploadedImage from './uploadedImage.js';

const reportSchema = Schema({
    reportType: { type: Schema.Types.ObjectId, ref: 'ReportType' },
    fullName: String,
    email: String,
    phone: String,
    content: String,
    uploadedImages: [Object],
});

const Report = mongoose.model('Report', reportSchema);
export default Report;

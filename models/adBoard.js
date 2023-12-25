import mongoose from 'mongoose';
import BoardType from './boardType.js';
import AdLocation from './adLocation.js';
import AdBoardRequest from './adBoardRequest.js';
import Report from './report.js';
const Schema = mongoose.Schema;

const adBoardSchema = new Schema({
    image: imageSchema,
    boardType: { type: Schema.Types.ObjectId, ref: "BoardType" },
    size: { h: String, w: String },
    quantity: Number,
    startDate: String,
    expireDate: String,
    adLocation: { type: Schema.Types.ObjectId, ref: "AdLocation" },
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
})

const AdBoard = mongoose.model('AdBoard', adBoardSchema);
export default AdBoard;

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AdLocation from "./adLocation.js";
import BoardType from "./boardType.js";

const adBoardSchema = new Schema({
    image: String,
    boardType: { type: Schema.Types.ObjectId, ref: "BoardType" },
    size: { h: String, w: String },
    quantity: Number,
    startDate: { d: Number, m: Number, y: Number },
    expireDate: { d: Number, m: Number, y: Number },
    status: String,
    adLocation: { type: Schema.Types.ObjectId, ref: "AdLocation" },
})

const AdBoard = mongoose.model("AdBoard", adBoardSchema);
export default AdBoard;
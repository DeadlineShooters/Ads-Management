import mongoose from "mongoose";
import AdLocation from "./adLocation";
import BoardType from "./boardType";

const adBoardSchema = new mongoose.Schema({
    boardType: { type: Schema.Types.ObjectId, ref: BoardType },
    size: { h: String, w: String },
    quantity: Number,
    startDate: { d: Number, m: Number, y: Number },
    expireDate: { d: Number, m: Number, y: Number },
    status: String,
    adLocation: { type: Schema.Types.ObjectId, ref: AdLocation },
})

const AdBoard = mongoose.model("AdBoard", adBoardSchema);
export default AdBoard;
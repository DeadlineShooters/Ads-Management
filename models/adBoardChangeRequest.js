import mongoose from "mongoose";
const Schema = mongoose.Schema;
import adBoard from "./adBoard.js";
import User from "./user.js";

const adBoardChangeRequestSchema = new Schema({
    adBoard: {type: Schema.Types.ObjectId, ref: "adBoard"},
    reason: String,
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    sendDate: {type: Date},
    status: String,
})

const AdBoardChangeReq = mongoose.model("AdBoardChangeRequest", adBoardChangeRequestSchema);
export default AdBoardChangeReq;
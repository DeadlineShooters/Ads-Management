import mongoose from "mongoose";
const Schema = mongoose.Schema;
import adBoard from "./adBoard.js";
import User from "./user.js";

const adBoardRequestSchema = new Schema({
    adBoard: {type: Schema.Types.ObjectId, ref: "adBoard"},
    adContent: String,
    adImage: {
        url: String,
        filename: String,
    },
    companyName: String,
    contactInfo:{
        email: String,
        phone: String,
        address: String,
    },
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    sendDate: {type: Date},
    status: String,
})

const AdBoardReq = mongoose.model("AdBoardRequest", adBoardRequestSchema);
export default AdBoardReq;
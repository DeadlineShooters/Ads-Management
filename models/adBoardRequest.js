import mongoose from "mongoose";
const Schema = mongoose.Schema;
import imageSchema from "./image.js";
import AdBoard from "./adBoard.js";
import User from "./user.js";

const adBoardRequestSchema = new Schema({
    adBoard: {type: Schema.Types.ObjectId, ref: "AdBoard"},
    adContent: String,
    companyName: String,
    contactInfo:{
        email: String,
        phone: String,
        address: String,
    },
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    sendDate: {type: Date},
})

const AdBoardRequest = mongoose.model("AdBoardRequest", adBoardRequestSchema);
export default AdBoardRequest;
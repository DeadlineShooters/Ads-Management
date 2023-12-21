import mongoose from "mongoose";
const Schema = mongoose.Schema;
import adBoard from "./adBoard.js";
import User from "./user.js";

const adBoardRequestSchema = new Schema({
    adBoard: {type: Schema.Types.ObjectId, ref: "adBoard"},
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date},
})

const AdBoardRequest = mongoose.model("AdBoardRequest", adBoardRequestSchema);
export default AdBoardRequest;
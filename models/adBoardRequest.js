import mongoose from "mongoose";
const Schema = mongoose.Schema;
import imageSchema from "./image.js";

const adBoardRequestSchema = new Schema({
  adBoard: { type: Schema.Types.ObjectId, ref: "adBoard" },
  adContent: String,
  adImage: imageSchema,
  companyName: String,
  contactInfo: { email: String, phone: String, address: String },
  sender: String,
  sendDate: Date,
  status: String,
});

const AdBoardReq = mongoose.model("AdBoardRequest", adBoardRequestSchema);
export default AdBoardReq;

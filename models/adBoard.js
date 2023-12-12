import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AdLocation from "./adLocation.js";
import BoardType from "./boardType.js";
import imageSchema from "./image.js";
import AdBoardReq from "./adBoardRequest.js";

const adBoardSchema = new Schema({
  image: imageSchema,
  boardType: { type: Schema.Types.ObjectId, ref: "BoardType" },
  size: { h: String, w: String },
  quantity: Number,
  startDate: { d: Number, m: Number, y: Number },
  expireDate: { d: Number, m: Number, y: Number },
  adLocation: { type: Schema.Types.ObjectId, ref: "AdLocation" },
  adBoardRequest: { type: Schema.Types.ObjectId, ref: "AdBoardRequest" },
});

const AdBoard = mongoose.model("AdBoard", adBoardSchema);
export default AdBoard;

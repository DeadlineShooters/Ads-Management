import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AdLocation from "./adLocation.js";
import BoardType from "./boardType.js";
import imageSchema from "./image.js";
import Report from "./report.js";
import AdBoardReq from "./adBoardRequest.js";

const adBoardSchema = new Schema({
  image: imageSchema,
  boardType: { type: Schema.Types.ObjectId, ref: "BoardType" },
  size: { h: String, w: String },
  quantity: Number,
  startDate: String,
  expireDate: String,
  adLocation: { type: Schema.Types.ObjectId, ref: "AdLocation" },
  adBoardRequest: { type: Schema.Types.ObjectId, ref: "AdBoardRequest" },
  reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  status: {
    type: Boolean,
    default: false,
  },
});

const AdBoard = mongoose.model("AdBoard", adBoardSchema);
export default AdBoard;

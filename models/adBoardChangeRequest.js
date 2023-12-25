import mongoose from "mongoose";
import User from "./user.js";
import AdBoard from "./adBoard.js";

const Schema = mongoose.Schema;

const adBoardChangeRequestSchema = new Schema({
  adBoard: { type: Schema.Types.ObjectId, ref: "AdBoard" },
  reason: String,
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  sendDate: Date,
});

const AdBoardChangeRequest = mongoose.model("AdBoardChangeRequest", adBoardChangeRequestSchema);
export default AdBoardChangeRequest;

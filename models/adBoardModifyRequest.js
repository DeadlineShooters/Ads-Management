import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adBoardModifyRequest = new Schema({
  adBoard: { type: Schema.Types.ObjectId, ref: "adBoard" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date },
  status: String,
});

const AdBoardReq = mongoose.model("AdBoardRequest", adBoardRequestSchema);
export default AdBoardReq;

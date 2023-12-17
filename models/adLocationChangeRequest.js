import mongoose from "mongoose";
import AdLocation from "./adLocation";
import User from "./user";

const Schema = mongoose.Schema;

const adLocationChangeRequestSchema = new Schema({
  adLocation: { type: Schema.Types.ObjectId, ref: "AdLocation" },
  reason: String,
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  sendDate: Date,
});

const AdLocationChangeRequest = mongoose.model("AdLocationChangeRequest", adLocationChangeRequestSchema);
export default AdLocationChangeRequest;

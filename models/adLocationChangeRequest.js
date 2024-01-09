import mongoose from "mongoose";
const Schema = mongoose.Schema;
import adLocation from "./adLocation.js";
import User from "./user.js";
import { adLocationSchema } from "./adLocation.js";

const adLocationChangeRequestSchema = new Schema({
  reason: String,
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  sendDate: { type: Date },
  status: String,
  adLocation: adLocationSchema,
});

const AdLocationChangeRequest = mongoose.model("AdLocationChangeRequest", adLocationChangeRequestSchema);
export default AdLocationChangeRequest;
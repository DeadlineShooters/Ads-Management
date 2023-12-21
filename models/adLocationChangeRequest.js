import mongoose from "mongoose";
const Schema = mongoose.Schema;
import adLocation from "./adLocation.js";
import User from "./user.js";

const adLocationChangeRequestSchema = new Schema({
    adLocation: {type: Schema.Types.ObjectId, ref: "AdLocation"},
    reason: String,
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    sendDate: {type: Date},
    status: String,
})

const AdLocationChangeReq = mongoose.model("AdLocationChangeRequest", adLocationChangeRequestSchema);
export default AdLocationChangeReq;
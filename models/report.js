import mongoose from "mongoose";
const Schema = mongoose.Schema;
import ReportType from "./reportType.js";
import imageSchema from "./image.js";
import AdBoard from "./adBoard.js";
import Ward from "./ward.js";
import District from "./district.js";

const reportSchema = Schema({
  reportType: { type: Schema.Types.ObjectId, ref: "ReportType" },
  fullname: String,
  email: String,
  phone: String,
  content: String,
  images: [imageSchema],
  adBoard: { type: Schema.Types.ObjectId, ref: "AdBoard" },
  randomLocation: {
    longLat: String,
    address: String,
    ward: { type: Schema.Types.ObjectId, ref: "Ward" },
    district: { type: Schema.Types.ObjectId, ref: "District" },
  },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;

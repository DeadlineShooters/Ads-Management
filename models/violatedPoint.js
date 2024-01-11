import mongoose from "mongoose";
import Report from "./report.js";
import Ward from "./ward.js";
import District from "./district.js";
const Schema = mongoose.Schema;

const violatedPointSchema = new Schema({
  latlng: String,
  reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  address: String,
  ward: { type: Schema.Types.ObjectId, ref: "Ward" },
  district: { type: Schema.Types.ObjectId, ref: "District" },
});

const ViolatedPoint = mongoose.model("ViolatedPoint", violatedPointSchema);
export default ViolatedPoint;

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import ReportType from "./reportType.js";
import AdBoard from "./adBoard.js";
import ViolatedPoint from "./violatedPoint.js";
import imageSchema from "./image.js";

const reportSchema = Schema({
  reportType: { type: Schema.Types.ObjectId, ref: "ReportType" },
  fullName: String,
  email: String,
  phone: String,
  content: String,
  uploadedImages: [imageSchema],
  adBoard: { type: Schema.Types.ObjectId, ref: "AdBoard" },
  randomPoint: { type: Schema.Types.ObjectId, ref: "ViolatedPoint" },
  sendDate: Date,
  handlingProcedure: String,
  status: {
    type: String,
    enum: ["Đang xử lý", "Đã xử lý xong"],
    default: "Đang xử lý",
  },
});

const Report = mongoose.model('Report', reportSchema);
export default Report;

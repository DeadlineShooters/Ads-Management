import mongoose from "mongoose";
const Schema = mongoose.Schema;
import ReportType from "./reportType.js";
import imageSchema from "./image.js";

const reportSchema = Schema({
    reportType: { type: Schema.Types.ObjectId, ref: "ReportType" },
    fullname: String,
    email: String,
    phone: String,
    content: String,
    Image: [imageSchema]
})

const Report = mongoose.model("Report", reportSchema);
export default Report;
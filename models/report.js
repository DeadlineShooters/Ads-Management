import mongoose from "mongoose";
const Schema = mongoose.Schema;
import ReportType from "./reportType.js";
import Image from "./image.js";

const reportSchema = Schema({
    reportType: { type: Schema.Types.ObjectId, ref: "ReportType" },
    fullname: String,
    email: String,
    phone: String,
    content: String,
    Image: [{ type: Schema.Types.ObjectId, ref: "Image" }]
})

const Report = mongoose.model("AdBoard", reportSchema);
export default Report;
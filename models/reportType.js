import mongoose from "mongoose";

const reportTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
})

const ReportType = mongoose.model("ReportType", reportTypeSchema);
export default ReportType;
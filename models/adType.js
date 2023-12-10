import mongoose from "mongoose";

const adTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
})

const AdType = mongoose.model("AdType", adTypeSchema);
export default AdType;
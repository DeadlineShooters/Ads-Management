import mongoose from "mongoose";
import District from "./district";

const wardSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
    district: { type: Schema.Types.ObjectId, ref: District }
})

const Ward = mongoose.model("Ward", wardSchema);
export default Ward;
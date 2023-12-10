import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
})

const District = mongoose.model("District", districtSchema);
export default District;
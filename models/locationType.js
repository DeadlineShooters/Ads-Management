import mongoose from "mongoose";

const locationTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
})

const LocationType = mongoose.model("LocationType", locationTypeSchema);
export default LocationType;
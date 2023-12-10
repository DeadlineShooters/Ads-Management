import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AdType from "./adType.js";
import District from "./district.js";
import Ward from "./ward.js";
import LocationType from "./locationType.js";
import imageSchema from "./image.js";

const adLocationSchema = new Schema({
    image: imageSchema,
    longLat: String,
    address: String,
    district: { type: Schema.Types.ObjectId, ref: "District" },
    ward: { type: Schema.Types.ObjectId, ref: "Ward" },
    type: { type: Schema.Types.ObjectId, ref: "LocationType" },
    adType: { type: Schema.Types.ObjectId, ref: "AdType" },
    status: String,
})

const AdLocation = mongoose.model("AdLocation", adLocationSchema);
export default AdLocation;
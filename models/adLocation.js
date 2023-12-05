import mongoose from "mongoose";
import AdType from "./adType";
import District from "./district";
import Ward from "./ward";
import LocationType from "./locationType";

const adLocationSchema = new mongoose.Schema({
    longLat: String,
    address: String,
    district: { type: Schema.Types.ObjectId, ref: District },
    ward: { type: Schema.Types.ObjectId, ref: Ward },
    type: { type: Schema.Types.ObjectId, ref: LocationType },
    adType: { type: Schema.Types.ObjectId, ref: AdType },
    status: String,
})

const AdLocation = mongoose.model("AdLocation", adLocationSchema);
export default AdLocation;
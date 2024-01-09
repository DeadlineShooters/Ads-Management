import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AdType from "./adType.js";
import District from "./district.js";
import Ward from "./ward.js";
import LocationType from "./locationType.js";
import imageSchema from "./image.js";

export const adLocationSchema = new Schema({
  image: imageSchema,
  latlng: String,
  address: String,
  district: { type: Schema.Types.ObjectId, ref: "District" },
  ward: { type: Schema.Types.ObjectId, ref: "Ward" },
  type: { type: Schema.Types.ObjectId, ref: "LocationType" },
  adType: { type: Schema.Types.ObjectId, ref: "AdType" },
  status: String,
  isViolated: Boolean,
});

const AdLocation = mongoose.model("AdLocation", adLocationSchema);
export default AdLocation;
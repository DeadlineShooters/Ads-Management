import mongoose from "mongoose";
const Schema = mongoose.Schema;

const wardSchema = new Schema({
  name: String,
  description: String,
  note: String,
  district: { type: Schema.Types.ObjectId, ref: "District" },
});

const Ward = mongoose.model("Ward", wardSchema);
export default Ward;
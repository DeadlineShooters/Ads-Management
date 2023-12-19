import mongoose from "mongoose";
import Ward from "./ward.js";
import District from "./district.js";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true }, //so/phuong/quan
  ward: { type: Schema.Types.ObjectId, ref: "Ward" },
  district: { type: Schema.Types.ObjectId, ref: "District" },
  phone: { type: String },
  birthday: { type: Date },
  daycreated: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;

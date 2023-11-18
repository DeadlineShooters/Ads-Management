import mongoose from "mongoose";
mongoose.connect("mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true }, //so/phuong/quan
  ward: { type: String },
  district: { type: String },
  phone: { type: String },
  birthday: { type: Date },
  daycreated: { type: Date, default: Date.now()}
});

const User = mongoose.model("User", userSchema);
export default User;
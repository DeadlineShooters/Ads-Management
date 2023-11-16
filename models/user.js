import mongoose from "mongoose";
await mongoose.connect(
  "mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/"
);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true }, //so/phuong/quan
  ward: { type: String },
  district: { type: String },
  phoneNumber: { type: String },
  birthDate: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;

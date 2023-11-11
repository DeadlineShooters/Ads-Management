import mongoose from "mongoose";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://127.0.0.1:27017/adsManagement");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true },
  ward: { type: Number },
  district: { type: Number },
  phoneNumber: { type: String },
  birthDate: { type: Date },
});

const User = mongoose.model("User", userSchema);

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync("letmein", salt);
console.log("in db");

// create an initial user (email: alice@gmail.com, password: letmein)
const filter = { email: "alice@gmail.com" };
const update = {
  email: "alice@gmail.com",
  hashed_password: hashedPassword,
  role: "phuong",

  salt: salt,
};
//  If no document is found, it can create a new document based on the update criteria.
const user = await User.findOneAndUpdate(filter, update, {
  new: true,
  upsert: true,
});

export default User;

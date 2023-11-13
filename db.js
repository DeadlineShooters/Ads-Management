import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from './models/user.js'
mongoose.connect("mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync("letmein", salt);

// create an initial user (email: alice@gmail.com, password: letmein)
let filter = { email: "alice@gmail.com" };
let update = {
  email: "alice@gmail.com",
  hashed_password: hashedPassword,
  role: "phuong",
  ward: "11",
  district: "Phú Nhuận",
  salt: salt,
};

//  If no document is found, it can create a new document based on the update criteria.
await User.findOneAndUpdate(filter, update, {
  new: true,
  upsert: true,
});

// Second User
const salt2 = bcrypt.genSaltSync(saltRounds);
const hashedPassword2 = bcrypt.hashSync("letmein", salt2);

let filter2 = { email: "ngoc@gmail.com" };
let update2 = {
  email: "ngoc@gmail.com",
  hashed_password: hashedPassword2,
  role: "so",
  salt: salt2,
};

await User.findOneAndUpdate(filter2, update2, {
  new: true,
  upsert: true,
});
export default User;

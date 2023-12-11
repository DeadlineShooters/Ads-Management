import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/user.js";
await mongoose.connect(
  "mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync("letmein", salt);

// create an initial user (email: phuong@gmail.com, password: letmein)
let filter = { email: "phuong@gmail.com" };
let update = {
  email: "phuong@gmail.com",
  hashed_password: hashedPassword,
  role: "phuong",
  ward: "11",
  district: "1",
  salt: salt,
};

//  If no document is found, it can create a new document based on the update criteria.
await User.findOneAndUpdate(filter, update, {
  new: true,
  upsert: true,
});

// Second User: (email: so@gmail.com, password: letmein)
const salt2 = bcrypt.genSaltSync(saltRounds);
const hashedPassword2 = bcrypt.hashSync("letmein", salt2);

let filter2 = { email: "so@gmail.com" };
let update2 = {
  email: "so@gmail.com",
  hashed_password: hashedPassword2,
  role: "so",
  salt: salt2,
};

await User.findOneAndUpdate(filter2, update2, {
  new: true,
  upsert: true,
});

// Third User: (email: quan@gmail.com, password: letmein)
const salt3 = bcrypt.genSaltSync(saltRounds);
const hashedPassword3 = bcrypt.hashSync("letmein", salt3);

let filter3 = { email: "quan@gmail.com" };
let update3 = {
  email: "quan@gmail.com",
  hashed_password: hashedPassword3,
  role: "quan",
  district: "Phú Nhuận",
  salt: salt3,
};

await User.findOneAndUpdate(filter3, update3, {
  new: true,
  upsert: true,
});
export default User;

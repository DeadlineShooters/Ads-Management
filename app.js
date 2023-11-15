import express from "express";
import path, { delimiter } from "path";
import { fileURLToPath } from "url";
import danRoutes from "./routes/dan.js";
import phuongQuanRoutes from "./routes/phuong.js";
import soQuanLyRoutes from "./routes/so/quanLy.js";
import soHanhChinhRoutes from "./routes/so/hanhChinh.js";
import soCanBoRoutes from "./routes/so/canbo.js";
import ejsMate from "ejs-mate";
import authRouter from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const mongoURI = "mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/";

try {
  await mongoose.connect(mongoURI);
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database", error);
}

const danApp = express();
const canBoApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
canBoApp.engine("ejs", ejsMate);
canBoApp.set("view engine", "ejs");
canBoApp.set("views", path.join(__dirname, "/views"));
// console.log(__dirname);

canBoApp.use(express.json());
canBoApp.use(express.urlencoded({ extended: false }));
canBoApp.use(passport.initialize());

canBoApp.use(express.static("public"));
canBoApp.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: mongoURI,
    }),
  })
);

canBoApp.use(passport.authenticate("session"));

canBoApp.use((req, res, next) => {
  res.locals.user = req.user;
  // res.locals.ayo = asfkdjsdfk;
  next();
});
// Initialize Passport

// routes
danApp.use("/", danRoutes);
danApp.use("/public", express.static("public"));

canBoApp.get("/", (req, res) => {
  // console.log("user:", req.user);

  if (req.user) {
    return res.render("index.ejs", {
      user: req.user,
      cssfile: "/canbo-home-style.css",
    });
  } else return res.redirect("/login");
});

canBoApp.use("/", authRouter);
canBoApp.use("/", phuongQuanRoutes);
canBoApp.use("/so/quanly", soQuanLyRoutes);
canBoApp.use("/so/hanhchinh", soHanhChinhRoutes);
canBoApp.use("/so/canbo", soCanBoRoutes);

danApp.listen(3000, () => {
  console.log("Serving on port 3000");
});
canBoApp.listen(9000, () => {
  console.log("Serving on port 9000");
});

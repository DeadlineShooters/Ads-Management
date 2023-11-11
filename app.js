import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import danRoutes from "./routes/dan.js";
import phuongRoutes from "./routes/phuong.js";
import quanRoutes from "./routes/quan.js";
import soRoutes from "./routes/so.js";
import ejsMate from "ejs-mate";
import authRouter from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

const danApp = express();
const canBoApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
canBoApp.engine("ejs", ejsMate);
canBoApp.set("view engine", "ejs");
canBoApp.set("views", path.join(__dirname, "/views"));
console.log(__dirname);
canBoApp.use(passport.initialize());

canBoApp.use(express.static("public"));
canBoApp.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/adsManagement",
    }),
  })
);
canBoApp.use(passport.authenticate("session"));

// Initialize Passport

// routes
danApp.use("/", danRoutes);
danApp.use("/public", express.static("public"));

// Apply the isAuthenticated middleware to the root route
canBoApp.get("/", (req, res) => {
  res.render("dan/index.ejs");
});

canBoApp.use("/phuong", phuongRoutes);
canBoApp.use("/quan", quanRoutes);
canBoApp.use("/so", soRoutes);
canBoApp.use("/", authRouter);

danApp.listen(3000, () => {
  console.log("Serving on port 3000");
});
canBoApp.listen(9000, () => {
  console.log("Serving on port 9000");
});

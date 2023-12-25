import express from "express";
import path, { delimiter } from "path";
import { fileURLToPath } from "url";
import { config } from 'dotenv';
config();
// import danRoutes from "./routes/dan.js";
import trangChuDan from './routes/dan/home.js';
import baoCaoDan from './routes/dan/report.js';

// phuong
import diemDatQCPhuong from "./routes/phuong/diemDatQC-route.js";
import bangQCPhuong from "./routes/phuong/bangQC-route.js";
import baoCaoPhuong from "./routes/phuong/baoCao-route.js";

// import phuongQuanRoutes from "./routes/phuong.js";
import soQuanLyRoutes from "./routes/so/quanLy.js";
import soHanhChinhRoutes from "./routes/so/hanhChinh.js";
import soCanBoRoutes from "./routes/so/canbo.js";
import ejsMate from "ejs-mate";
import authRouter from "./routes/auth.js";
import passport from "passport";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ExpressError from "./utils/ExpressError.js";
import { isLoggedIn } from "./middleware.js";

const mongoURI = process.env.MONGO_URI;

try {
  await mongoose.connect(mongoURI);
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database", error);
}

const canBoApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
canBoApp.engine("ejs", ejsMate);
canBoApp.set("view engine", "ejs");
canBoApp.set("views", path.join(__dirname, "/views"));


canBoApp.use(express.json());
canBoApp.use(express.urlencoded({ extended: true }));
canBoApp.use(methodOverride("_method"));
canBoApp.use("/", express.static(path.join(__dirname, "public")));

canBoApp.use(
  session({
    secret: "keyboard cat",
    resave: false, //don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: mongoURI,
    }),
    cookie: {
      // maxAge: 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60,
    },
  }),
  cookieParser("keyboard cat"),
  flash(),
  passport.initialize(),
  passport.session(),
);

// canBoApp.use(passport.authenticate("session"));

canBoApp.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.currentPage = req.currentPage;
  res.locals.defaultItemsPerPage = 20;
  // console.log("user" + JSON.stringify(req.user))

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  res.locals.googleMapKey = process.env.GOOGLE_MAP_KEY;
  res.locals.mapId = process.env.MAP_ID;
  next();
});



canBoApp.use("/", authRouter);

// TỪ DÂN QUA NÈ ADKFJA;KDLFJA;SLFJ;SL
canBoApp.use('/', isLoggedIn, trangChuDan);
canBoApp.use('/report', isLoggedIn, baoCaoDan);

canBoApp.use("/cac-diem-dat-quang-cao/", isLoggedIn, diemDatQCPhuong);
canBoApp.use("/cac-bang-quang-cao/", isLoggedIn, bangQCPhuong);
canBoApp.use("/cac-bao-cao/", isLoggedIn, baoCaoPhuong);
canBoApp.use("/so/quanly", isLoggedIn, soQuanLyRoutes);
canBoApp.use("/so/hanhchinh", isLoggedIn, soHanhChinhRoutes);
canBoApp.use("/so/canbo", isLoggedIn, soCanBoRoutes);


canBoApp.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page not found'));
})

canBoApp.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Đã xảy ra lỗi, vui lòng thử lại.';
  console.log("Error log from middleware: "+err.message);
  res.status(statusCode).render('error', {err});
});


const port = process.env.CANBO_PORT || 9000;
canBoApp.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
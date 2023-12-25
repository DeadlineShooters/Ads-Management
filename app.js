import express from 'express';
import path, { delimiter } from 'path';
import { fileURLToPath } from 'url';
import trangChuDan from './routes/dan/home.js';
import baoCaoDan from './routes/dan/report.js';
import bodyParser from 'body-parser';
import ejsMate from 'ejs-mate';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const mongoURI = 'mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/Cluster0?retryWrites=true&w=majority';

try {
	await mongoose.connect(mongoURI);
	console.log('Connected to the database');
} catch (error) {
	console.log('Could not connect to the database', error);
}
const danApp = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// canBoApp.engine("ejs", ejsMate);
// canBoApp.set("view engine", "ejs");
// canBoApp.set("views", path.join(__dirname, "/views"));
// // console.log(__dirname);

// canBoApp.use(express.json());
// canBoApp.use(express.urlencoded({ extended: false }));
// canBoApp.use(passport.initialize());
// canBoApp.use(methodOverride("_method"));
// canBoApp.use("/", express.static(path.join(__dirname, "public")));
// canBoApp.use(
//   session({
//     secret: "keyboard cat",
//     resave: false, //don't save session if unmodified
//     saveUninitialized: true, // don't create session until something stored
//     store: MongoStore.create({
//       mongoUrl: mongoURI,
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
//   }),
//   cookieParser("keyboard cat"),
//   flash()
// );

// canBoApp.use(passport.authenticate("session"));

// canBoApp.use((req, res, next) => {
//   res.locals.user = req.user;
//   res.locals.currentPage = req.currentPage;

//   // res.locals.ayo = asfkdjsdfk;
//   next();
// });

danApp.engine("ejs", ejsMate);
danApp.set("view engine", "ejs");
danApp.set("views", path.join(__dirname, "/views"));

// danApp.use(express.static("public"));
danApp.use("/", express.static(path.join(__dirname, "public")));

danApp.use(bodyParser.json({ limit: "50mb" }));
danApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


danApp.use((req, res, next) => {
	res.locals.googleMapKey = process.env.GOOGLE_MAP_KEY;
	res.locals.mapId = process.env.MAP_ID;
	next();
});


danApp.use((req, res, next) => {
	res.locals.googleMapKey = process.env.GOOGLE_MAP_KEY;
	res.locals.mapId = process.env.MAP_ID;
	next();
});
danApp.use(bodyParser.json({ limit: "50mb" }));
danApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

danApp.use("/", trangChuDan);
danApp.use("/report", baoCaoDan);

const port = process.env.DAN_PORT || 3000
danApp.listen(port, () => {
	console.log(`Serving on port ${port}`);
});

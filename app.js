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

danApp.engine("ejs", ejsMate);
danApp.set("view engine", "ejs");
danApp.set("views", path.join(__dirname, "/views"));

danApp.use("/", express.static(path.join(__dirname, "public")));

danApp.use(bodyParser.json({ limit: "50mb" }));
danApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


danApp.use((req, res, next) => {
	res.locals.googleMapKey = process.env.GOOGLE_MAP_KEY;
	res.locals.mapId = process.env.MAP_ID;

	res.locals.captchaSiteKey = process.env.CAPTCHA_SITE_KEY;
	res.locals.captchaSecretKey = process.env.CAPTCHA_SECRET_KEY;
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

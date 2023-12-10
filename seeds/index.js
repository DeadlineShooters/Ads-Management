import mongoose from "mongoose";

import LocationType from "../models/locationType.js";
import AdType from "../models/adType.js";
import BoardType from "../models/boardType.js";
import ReportType from "../models/reportType.js";
import District from "../models/district.js";


import { locationTypes, adTypes, boardTypes, reportTypes, districts } from "../seeds/data.js";

const mongoURI =
    "mongodb+srv://nhom09:atlas123@cluster0.hntnfkf.mongodb.net/Cluster0?retryWrites=true&w=majority";

try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database");
} catch (error) {
    console.log("Could not connect to the database", error);
}


const seedDB = async () => {
    await LocationType.deleteMany({});
    await AdType.deleteMany({});
    await BoardType.deleteMany({});
    await ReportType.deleteMany({});
    await District.deleteMany({});
	
	for (let i of locationTypes) {
		const locationType = new LocationType(i);
		await locationType.save();
	}
	for (let i of adTypes) {
		const adType = new AdType(i);
		await adType.save();
	}
	for (let i of boardTypes) {
		const boardType = new BoardType(i);
		await boardType.save();
	}
	for (let i of reportTypes) {
		const reportType = new ReportType(i);
		await reportType.save();
	}
	for (let i of districts) {
		const district = new District(i);
		await district.save();
	}

};
seedDB().then(() => {
	mongoose.connection.close();
	console.log("Seed data created");
});

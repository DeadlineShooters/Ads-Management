import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reportSchema = Schema({
	reportType: { type: Schema.Types.ObjectId, ref: 'ReportType' },
	fullName: String,
	email: String,
	phone: String,
	content: String,
	uploadedImages: [Object],
	adBoard: { type: Schema.Types.ObjectId, ref: 'AdBoard' },
	randomPoint: { type: Schema.Types.ObjectId, ref: 'ViolatedPoint' },
	sendDate: Date,
	handlingProcedure: String,
	status: String,
});

const Report = mongoose.model('Report', reportSchema);
export default Report;

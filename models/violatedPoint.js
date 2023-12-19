import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const violatedPointSchema = new Schema({
    latlng: Object,
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
});

const ViolatedPoint = mongoose.model('ViolatedPoint', violatedPointSchema);
export default ViolatedPoint;

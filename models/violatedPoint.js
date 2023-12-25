import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const violatedPointSchema = new Schema({
    latlng: Object,
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
    district: { type: Schema.Types.ObjectId, ref: 'District' },
    ward: { type: Schema.Types.ObjectId, ref: 'Ward' }
});

const ViolatedPoint = mongoose.model('ViolatedPoint', violatedPointSchema);
export default ViolatedPoint;

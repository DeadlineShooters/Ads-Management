import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uploadedImageSchema = Schema({
    contentType: String,
    image: Buffer,
});

const UploadedImage = mongoose.model('UploadedImage', uploadedImageSchema);
export default UploadedImage;

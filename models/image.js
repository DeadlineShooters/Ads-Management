import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String

})

const Image = mongoose.model("Image", imageSchema);
export default Image;

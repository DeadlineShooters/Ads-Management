import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
})

export default imageSchema;

import mongoose from "mongoose"

export const imageSchema = new mongoose.Schema({
    url: String,
    filename: String

})

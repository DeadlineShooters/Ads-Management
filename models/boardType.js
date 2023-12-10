import mongoose from "mongoose";

const boardTypeSchema = new mongoose.Schema({
    name: String,
    description: String,
    note: String,
})

const BoardType = mongoose.model("BoardType", boardTypeSchema);
export default BoardType;
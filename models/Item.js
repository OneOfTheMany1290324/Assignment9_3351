// This is the file that allows Mongoose to work

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true}
});

export const Item = mongoose.model("Item", itemSchema);
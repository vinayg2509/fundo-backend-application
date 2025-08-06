import mongoose, { Schema } from "mongoose";

const note = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdby: { type: String, required: true, unique: true },
  isArchived: { type: Boolean, default: false },
  isTrash: { type: Boolean, default: false }
});

export default mongoose.model("Note", note);

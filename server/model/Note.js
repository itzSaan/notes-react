import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  desc: {
    type: String,
    required: true,
  },
  isStared: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
});

const Note = mongoose.model("Note", NoteSchema);
export default Note;

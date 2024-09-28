import express from "express";
import Note from "../model/Note.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const notes = await Note.find(); // Search all notes
  res.status(200).json(notes); // send all notes to response
});

router.post("/", async (req, res) => {
  const newNote = new Note(req.body); // craete a new note from request body
  await newNote.save(); // save the new note to db
  res.status(200).json(newNote); // return the new note as json with status 200 (OK)
});

router.put("/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedNote);
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get Note ${req.params.id}` });
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not Found" });
    res
      .status(200)
      .json({ message: `Note Deleted Successfully"`, deletedNote });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server Error ", error})
  }
});

export default router;

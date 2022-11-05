/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../model/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Add a new Note user: GET '/api/auth/fetchallnotes'. dose'nt require Auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

// ROUTE 2: Add a new Note user: GET '/api/auth/addnote'. dose'nt require Auth
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter Title is minimum 3 character").isLength({ min: 3 }),
    body("description", "Enter description is minimum 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are error, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred ");
    }
  }
);

// ROUTE 3: Add a new Note user: PUT '/api/notes/updatenote'. dose'nt require Auth
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create a newNote objet
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internet Server Error ");
  }
});

// ROUTE 4: Add a new Note user: DELETE '/api/notes/deletenote'. dose'nt require Auth
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {

    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id );
    res.json({ "Success": "Note has been deleted", note });

  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internet Server Error ");
  }
});
module.exports = router;

const express = require("express");
const { authenticateToken } = require("../utilities");
const {
  createNote,
  getNotesByUser,
  editNoteById,
  deleteNoteById,
  updateNotePinnedById,
  searchNote,
} = require("../controllers/noteController");

const router = express.Router(); //initialize the router

//routes
// handle routes path for the /api/note/
router
  .route("/")
  .post(authenticateToken, createNote) //post method
  .get(authenticateToken, getNotesByUser); // get method

// handle routes path for the /api/note/:noteId
router
  .route("/:noteId")
  .put(authenticateToken, editNoteById) //put method
  .delete(authenticateToken, deleteNoteById); //delete method

// handle routes path for the /api/note/update-note-pinned/:noteId
router.put(
  "/update-note-pinned/:noteId",
  authenticateToken,
  updateNotePinnedById
);

// handle routes path for the /api/note/search-note
router.post("/search-notes", authenticateToken, searchNote);

// export routes
module.exports = router;

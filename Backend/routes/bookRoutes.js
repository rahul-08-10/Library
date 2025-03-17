const express = require("express");
const { addBook, updateBook, deleteBook, getBooks } = require("../controllers/bookController");
const { returnBook } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure only logged-in users can return books

const router = express.Router();

router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/list", getBooks);
router.post("/return",authMiddleware , returnBook);
module.exports = router;

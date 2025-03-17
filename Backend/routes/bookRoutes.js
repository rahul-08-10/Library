const express = require("express");
const { addBook, updateBook, deleteBook, getBooks } = require("../controllers/bookController");
const { returnBook } = require("../controllers/bookController");

const router = express.Router();

router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/list", getBooks);
router.post("/return", returnBook);
module.exports = router;

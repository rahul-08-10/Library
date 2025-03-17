const express = require("express");
const { addBook, updateBook, deleteBook, getBooks , issueBook } = require("../controllers/bookController");
const { returnBook } = require("../controllers/bookController");
const {authMiddleware , isAdmin} = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/list", getBooks);
router.post("/issue", isAdmin, issueBook);
router.post("/return", authMiddleware, returnBook);
module.exports = router;

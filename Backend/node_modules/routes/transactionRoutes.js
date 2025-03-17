const express = require("express");
const { authMiddleware} = require("../middleware/authMiddleware");
const { issueBook, returnBook } = require("../controllers/transactionController");

const router = express.Router();

router.post("/issue", authMiddleware , issueBook);
router.post("/return", authMiddleware , returnBook);

module.exports = router;
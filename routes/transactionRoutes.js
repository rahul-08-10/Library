const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { issueBook, returnBook } = require("../controllers/transactionController");

const router = express.Router();

router.post("/issue", verifyToken, issueBook);
router.post("/return", verifyToken, returnBook);

module.exports = router;
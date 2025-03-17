const express = require("express");
const { getIssuedBooksReport, getReturnedBooksReport, getPendingFinesReport } = require("../controllers/reportController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get issued books report
router.get("/issued-books", verifyToken, isAdmin, getIssuedBooksReport);

// Route to get returned books report
router.get("/returned-books", verifyToken, isAdmin, getReturnedBooksReport);

// Route to get pending fines report
router.get("/pending-fines", verifyToken, isAdmin, getPendingFinesReport);

module.exports = router;

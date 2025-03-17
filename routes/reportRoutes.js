const express = require("express");
const { getIssuedBooksReport, getReturnedBooksReport, getPendingFinesReport } = require("../controllers/reportController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/issued-books", authMiddleware, isAdmin, getIssuedBooksReport);

router.get("/returned-books", authMiddleware, isAdmin, getReturnedBooksReport);


router.get("/pending-fines", authMiddleware , isAdmin, getPendingFinesReport);

module.exports = router;

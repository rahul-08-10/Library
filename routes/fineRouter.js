const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { calculateFine, payFine } = require("../controllers/fineController");

const router = express.Router();

router.get("/calculate/:userId", verifyToken, calculateFine);
router.post("/pay", verifyToken, payFine);

module.exports = router;
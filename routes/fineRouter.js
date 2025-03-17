const express = require("express");
const { authMiddleware} = require("../middleware/authMiddleware");
const { calculateFine, payFine } = require("../controllers/fineController");

const router = express.Router();

router.get("/calculate/:userId", authMiddleware , calculateFine);
router.post("/pay", authMiddleware , payFine);

module.exports = router;
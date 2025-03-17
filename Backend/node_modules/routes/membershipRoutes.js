const express = require("express");
const {addMembership , updateMembership} = require("../controllers/membershipController");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.post('/addMember' , isAdmin , addMembership);
router.post("/upgrade", isAdmin, updateMembership );

module.exports = router;

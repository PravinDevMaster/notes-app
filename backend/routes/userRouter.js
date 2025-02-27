const express = require("express");
const { authenticateToken } = require("../utilities");
const { getUser } = require("../controllers/userController");

const router = express.Router();

// routes
// handle routes path for the /api/user/get-user
router.get("/get-user", authenticateToken, getUser);

// exports routes
module.exports = router;

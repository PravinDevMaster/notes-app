const express = require("express");
const User = require("../models/user.model");
const {
  registerNewUser,
  loginExistingUser,
} = require("../controllers/authController");

const router = express.Router();

//routes
// handle routes path for the /api/auth/register
router.post("/register", registerNewUser);

// handle routes path for the /api/auth/login
router.post("/login", loginExistingUser);
// export routers
module.exports = router;

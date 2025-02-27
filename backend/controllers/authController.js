const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// register new user
const registerNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({ error: true, message: "User already exist" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
};

// login user
const loginExistingUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Validate password
  const isMatch = await userInfo.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  if (userInfo.email === email) {
    const user = { user: userInfo };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
};
module.exports = { registerNewUser, loginExistingUser };

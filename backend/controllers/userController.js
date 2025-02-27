const User = require("../models/user.model");

// get the login user details
const getUser = async (req, res) => {
  const { user } = req.user;
  try {
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
      return res.sendStatus(401);
    }

    const { password, ...rest } = isUser._doc;
    return res.json({
      user: rest,
      message: "",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getUser };

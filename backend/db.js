require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;

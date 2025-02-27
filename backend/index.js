require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Note = require("./models/note.model");
const app = express(); //Initialize the express

// connect db
connectDB();
app.use(express.json()); //Parse JSON request bodies

app.use(cors({ origin: "*" })); //Enable Cross-Origin resource sharing

// Routes
app.use("/api/auth", require("./routes/authRouter")); // manage the auth routes
app.use("/api/user", require("./routes/userRouter")); // manage the user routes
app.use("/api/note", require("./routes/noteRouter")); //manager the note routes

app.listen(5000);

module.exports = app;

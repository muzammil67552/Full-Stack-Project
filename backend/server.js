const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRouter"); // Import userRouter

dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Use userRouter for API routes
app.use("/api/users", userRouter); // Prefix all user routes with /api/users

// Export the app as a function for Vercel
module.exports = app;

// Create a serverless function handler
module.exports.handler = (req, res) => {
    app(req, res); // Call the Express app with the request and response objects
};

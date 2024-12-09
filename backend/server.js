const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRouter = require("./routes/userRouter");
const cors = require("cors")



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
app.use(userRouter);

// Middleware to ignore favicon requests
app.use((req, res, next) => {
    if (req.originalUrl === "/favicon.ico") {
      return res.status(204).end(); // Send a "No Content" response for favicon requests
    }
    next();
  });

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});

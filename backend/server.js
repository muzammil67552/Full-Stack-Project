const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRouter = require("./routes/userRouter");


app.use(express.json());



// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
app.use(userRouter);

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});

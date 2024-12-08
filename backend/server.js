const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("./models/userModel");
const app = express();

app.use(express.json());



// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

    //Create Operation 
app.post('/', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }
        // Create a new user
        const userAdded = await userModel.create({
            name: name,
            email: email,
            age: age,
        });
        
        res.status(201).json(userAdded); 

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});
app.get('/',  async (req, res) => {
    try {
       const showAllData = await userModel.find();
       res.status(200).json(showAllData)
    } catch (error) {
        console.log(error)
        res.send(400).json({error:error.message})
    }
    
});

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});

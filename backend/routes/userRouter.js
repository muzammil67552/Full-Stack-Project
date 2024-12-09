const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userModel = require("../models/userModel");

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    next();
};

// Create User
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }

        const userAdded = await userModel.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get All Users
router.get("/", async (req, res) => {
    try {
        const showAllData = await userModel.find();
        res.status(200).json(showAllData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get Single User
router.get("/:id", validateObjectId, async (req, res) => {
    try {
        const showSingle = await userModel.findById(req.params.id);
        if (!showSingle) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(showSingle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete User
router.delete("/:id", validateObjectId, async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted", data: deletedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Update User
router.patch("/:id", validateObjectId, async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

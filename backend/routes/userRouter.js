const express = require("express");
const router = express.Router(); // Use "Router" with an uppercase "R"
const userModel = require("../models/userModel");

// Create Operation
router.post('/', async (req, res) => {
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

// Read Operation
router.get('/', async (req, res) => {
    try {
        const showAllData = await userModel.find();
        res.status(200).json(showAllData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});
//get single User
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const showSingle = await userModel.findById({_id: id});
        res.status(200).json(showSingle);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});
//delete user
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const showSingle = await userModel.findByIdAndDelete({_id: id});
        res.status(200).json(showSingle);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});
//patch Updated Single USer
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const  {name, email, age } = req.body;
    try {
        const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
            new:true,
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;

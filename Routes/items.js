// this is the items.js file

import express from "express";
import { Item } from "../models/Item.js";

const router = express.Router();


// The in-memory record storage array
let mockDatabase = [];

// Reads all the reosource records.
router.get("/", async (req, res) => {
    try { 
        const items = await Item.find();
        res.status(200).json({ data: items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dynamic GET route: extracts the route parameters via the req.params
router.get("/:id", (req, res) => {

    const targetID = req.params.id;
    const match = mockDatabase.find(item => item.id === targetID);

    if (!match){
        return res.status(404).json({ error: `Resource item with ID: ${targetID} does not exist.`});
    }
    res.status(200).json({ data: match });
});

// Post route with validation handshakes
router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Validation Fault: Object attribute 'title' is missing or blank." });
        }

        const newItem = new Item({ title: title.trim() });
        const savedItem = await newItem.save();
        res.status(201).json({ data: savedItem });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

   const newItem = {id: Date.now().toString(), title: title.trim()};
   mockDatabase.push(newItem);
   res.status(201).json({ data: newItem });
});


// overwrite field properties for matching target IDs.
router.put("/:id", async (req, res) => {
    try {
        const targetID = req.params.id;
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Validation Fault: Object attribute 'title' is missing or blank." });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            targetID,
            { title: title.trim() },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: `Resource item with ID: ${targetID} does not exist.` });
        }

        res.status(200).json({ data: updatedItem });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format or validation error." });
    }
});

// Target and splice out the matching object form the tracking matrix.

router.delete("/:id", async (req, res) => {
    try {
        const targetID = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(targetID);

        if (!deletedItem) {
            return res.status(404).json({ error: `Resource item with ID: ${targetID} does not exist.` });
        }

        res.status(200).json({ message: "Successfully deleted resource", data: deletedItem });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID format." });
    }
});

export default router;
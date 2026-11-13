
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./Middleware/logger.js";
import itemsRouter from "./Routes/items.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/assignment9_db";


app.use(express.json());
app.use(logger); 

app.use("/api/resources", itemsRouter);

// Global fallthrough route: Catches invalid paths.
app.use((req, res) => {
    res.status(404).json({ error: "Resource Route Path requested could not be resolved." });

});

// app.listen(3000, () => {
 
//     console.log("Server is running on http://localhost:3000");
    
// });


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
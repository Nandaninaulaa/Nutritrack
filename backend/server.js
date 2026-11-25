const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Use the local database by default, or a deployment-specific URI when provided.
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nutritrack";

// ✅ IMPORT ROUTES
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ USE ROUTES
app.use("/api/food", foodRoutes);
app.use("/api/auth", authRoutes);

async function startServer() {
    try {
        await mongoose.connect(mongoUri);
        app.listen(5000, () => console.log("Server running on port 5000"));
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
}

startServer();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB connection
mongoose.connect("mongodb://127.0.0.1:27017/nutritrack");

// ✅ IMPORT ROUTES
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ USE ROUTES
app.use("/api/food", foodRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
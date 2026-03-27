// imports
const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const auth = require("../middleware/auth");

// ✅ PROTECTED ROUTE
router.post("/", auth, async (req, res) => {
    const food = new Food(req.body);
    await food.save();
    res.json(food);
});

// ✅ GET ALL FOOD
router.get("/", async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

module.exports = router;
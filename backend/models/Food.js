const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    mealType: String,
    date: String
});

module.exports = mongoose.model("Food", foodSchema);
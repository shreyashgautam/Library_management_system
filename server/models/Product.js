const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    totalStock: Number,
    link: String, // ✅ Ensure this field exists
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

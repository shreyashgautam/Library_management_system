const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    requestedBy: {
      type: String,
      required: true,
      trim: true,
    },
    bookLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Suggestion", SuggestionSchema);

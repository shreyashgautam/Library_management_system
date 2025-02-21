const express = require("express");
const {
  addNewSuggestion,
  fetchNewSuggestion,
  deleteSuggestion,
} = require("../../controllers/shop/suggestion-controller");

const router = express.Router();

router.post("/", addNewSuggestion);
router.get("/get", fetchNewSuggestion); // ✅ Fetch all suggestions
router.delete("/delete/:suggestionId", deleteSuggestion); // ✅ Delete a specific suggestion

module.exports = router;

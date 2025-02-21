const Suggestion = require("../../models/Suggestion");

const addNewSuggestion = async (req, res) => {
  try {
    const { bookName, author, category, requestedBy, bookLink } = req.body;

    if (!bookName || !author || !category || !requestedBy) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!",
      });
    }

    const newSuggestion = new Suggestion({
      bookName,
      author,
      category,
      requestedBy,
      bookLink,
    });

    await newSuggestion.save();

    res.status(201).json({
      success: true,
      data: newSuggestion,
      message: "Suggestion added successfully!",
    });
  } catch (error) {
    console.error("Error adding suggestion:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const fetchNewSuggestion = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteSuggestion = async (req, res) => {
  try {
    const { suggestionId } = req.params;

    if (!suggestionId) {
      return res.status(400).json({
        success: false,
        message: "Suggestion ID is required!",
      });
    }

    const deletedSuggestion = await Suggestion.findByIdAndDelete(suggestionId);

    if (!deletedSuggestion) {
      return res.status(404).json({
        success: false,
        message: "Suggestion not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Suggestion deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addNewSuggestion,
  fetchNewSuggestion,
  deleteSuggestion,
};

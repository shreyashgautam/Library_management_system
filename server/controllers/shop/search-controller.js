const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query; // ✅ Use query params instead of params
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false, // ✅ Fixed typo ("succes" -> "success")
        message: "Keyword is required and must be a string",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery).limit(20); // ✅ Limit results to avoid overload

    res.status(200).json({
      success: true,
      data: searchResults.length ? searchResults : [], // ✅ Return empty array if no results
    });
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { searchProducts };

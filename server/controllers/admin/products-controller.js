const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Handle image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during image upload",
    });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, totalStock, link } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      totalStock,
      link, // Saving the link
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding the product",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};

// Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, totalStock, link } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.image = image || product.image;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.totalStock = totalStock || product.totalStock;
    product.link = link || product.link; // Updating the link

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Edit product error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing the product",
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};

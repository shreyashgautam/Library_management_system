const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    
    phone: String,
    Duration: String,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
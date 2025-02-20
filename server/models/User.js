const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { // ✅ This should match the `registerUser` field
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

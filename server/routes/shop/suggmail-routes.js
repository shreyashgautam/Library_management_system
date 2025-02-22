const express = require("express");
const { sendSuggestionEmail } = require("../../controllers/shop/suggesstion-mail");
const router = express.Router();

router.post("/send-confirmation", sendSuggestionEmail);

module.exports = router;

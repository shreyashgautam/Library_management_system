const nodemailer = require("nodemailer");
const Suggestion = require("../../models/Suggestion");
const User = require("../../models/User"); // ✅ Import User model

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shreyashgautam2007@gmail.com",
        pass: "dwks jvvl vbfd qgev", // Use App Password from Google
    },
});

/**
 * @desc Send Book Suggestion Confirmation Email
 * @route POST /api/suggestions/send-confirmation
 * @access Public
 */
exports.sendSuggestionEmail = async (req, res) => {
    const { username, bookName, author, category, bookLink } = req.body;

    // Validate input
    if (!username || !bookName || !author || !category) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        // ✅ Fetch user email from User model using username
        

        // ✅ Construct email with all details
        const mailOptions = {
            from: "shreyashgautam2007@gmail.com",
            to: "dipsita.rout2023@gmail.com",
            subject: "Book Suggestion Submitted Successfully!",
            html: `<h2>Thank You for Your Suggestion!</h2>
                   <p>Your book suggestion has been successfully recorded. Here are the details you submitted:</p>
                   <ul>
                       <li><strong>📖 Book Name:</strong> ${bookName}</li>
                       <li><strong>✍️ Author:</strong> ${author}</li>
                       <li><strong>📚 Category:</strong> ${category}</li>
                       ${bookLink ? `<li><strong>🔗 Book Link:</strong> <a href="${bookLink}" target="_blank">${bookLink}</a></li>` : ""}
                   </ul>
                   <p>We appreciate your contribution to our book collection!</p>
                   <p>Once the book Would be Available we would be contacting you!</p>
                   `,
        };

        // ✅ Send email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Book suggestion confirmation email sent!" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
};

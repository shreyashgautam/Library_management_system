const nodemailer = require("nodemailer");

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shreyashgautam2007@gmail.com",
        pass: "your-app-password", // Use App Password from Google
    },
});

/**
 * @desc Send Order Confirmation Email
 * @route POST /api/shop/send-order-confirmation
 * @access Public
 */
exports.sendOrderEmail = async (req, res) => {
    const { email, orderDetails } = req.body;

    if (!email || !orderDetails) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const mailOptions = {
        from: "shreyashgautam2007@gmail.com",
        to: email,
        subject: "Order Confirmation - Your Borrowed Books",
        html: `<h2>Order Confirmed</h2>
               <p>Thank you for borrowing books from our store. Below are your order details:</p>
               <ul>
                   ${orderDetails.map(
                       (item) =>
                           `<li><strong>${item.title}</strong> - ${item.quantity} copies</li>`
                   ).join("")}
               </ul>
               <p><strong>Total Amount:</strong> ₹${orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
               <p>Please collect your books soon!</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Order confirmation email sent!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
};

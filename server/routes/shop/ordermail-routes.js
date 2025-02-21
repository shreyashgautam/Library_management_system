const express = require("express");
const nodemailer = require("nodemailer");
const Order = require("../../models/order");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const router = express.Router();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shreyashgautam2007@gmail.com",
    pass: "dwks jvvl vbfd qgev",
  },
});

// Function to generate HTML for PDF
const generateHTML = (order) => {
  const orderDate = new Date(order.orderDate).toLocaleString();

  return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h2 { text-align: center; color: #4CAF50; }
        .container { max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border-bottom: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>📚 Library Borrow Receipt</h2>
        <p>Thank you for borrowing from our library! Here are your details:</p>
        <hr>
        <p><strong>Borrow ID:</strong> ${order._id}</p>
        <p><strong>Borrow Date:</strong> ${orderDate}</p>
        <hr>

        <h3>📦 Borrowed Books:</h3>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${order.cartItems
              .map(
                (item) => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.quantity}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>

        <hr>
        <h3>📍 Pickup Information:</h3>
        <p><strong>Phone:</strong> ${order.addressInfo.phone}</p>
        <p><strong>Pickup Location:</strong> Library - Section A</p>

        <p style="text-align: center; margin-top: 20px;">✅ Please visit the library today to collect your books.</p>
        <hr>
        <p style="text-align: center; color: #777;">Need help? Contact us at library@vit.ac.in</p>
      </div>
    </body>
    </html>
  `;
};

// Function to create PDF
const generatePDF = async (order) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(generateHTML(order), { waitUntil: "domcontentloaded" });
  
  const pdfPath = path.join(__dirname, `receipt_${order._id}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
};

// Function to send confirmation email with PDF
const sendOrderConfirmationEmail = async (order, userEmail) => {
  const pdfPath = await generatePDF(order);

  const mailOptions = {
    from: "shreyashgautam2007@gmail.com",
    to: userEmail,
    subject: "📚 Borrow Confirmation - Your Receipt",
    text: "Please find attached your borrow receipt.",
    attachments: [
      {
        filename: `BorrowReceipt_${order._id}.pdf`,
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  await fs.remove(pdfPath); // Delete the PDF after sending email
};

// Place Order API
router.post("/place-order", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Send Confirmation Email with PDF
    await sendOrderConfirmationEmail(newOrder, orderData.userEmail);

    res.status(201).json({ success: true, message: "Order placed successfully, receipt sent via email!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

module.exports = router;

require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const authRouter = require("./routes/auth/auth-routes");
const adminProducts = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const orderRouter = require("./routes/shop/ordermail-routes");
const ShopProductsRouter = require("./routes/shop/product-routes");
const ShopCartRouter = require("./routes/shop/cart-routes");
const ShopOrderRouter = require("./routes/shop/ordermail-routes");
const suggestionRoutes = require("./routes/shop/suggestion-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const suggmail = require("./routes/shop/suggmail-routes");

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB connection error:", error));

app.use(
    cors({
        origin: "https://library-management-system-git-main-shreyashgautams-projects.vercel.app",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProducts);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop", orderRouter);
app.use("/api/shop/products", ShopProductsRouter);
app.use("/api/shop/cart", ShopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", ShopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/suggestions", suggestionRoutes);
app.use("/api/suggestions", suggmail);

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ Send Email Function
function sendMail(to, sub, msg) {
    transporter.sendMail(
        {
            from: process.env.EMAIL_USER,
            to: to,
            subject: sub,
            html: msg,
        },
        (err, info) => {
            if (err) {
                console.error("Error sending mail:", err);
            } else {
                console.log("Email sent successfully:", info.response);
            }
        }
    );
}

// ✅ Room Schema
const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["free", "occupied"], default: "free" },
    floor: { type: String, required: true },
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;

// ✅ Initialize Rooms
const initializeRooms = async () => {
    const rooms = await Room.find();
    if (rooms.length === 0) {
        await Room.insertMany([
            { name: "Room A", status: "free", floor: "1st" },
            { name: "Room B", status: "occupied", floor: "1st" },
            { name: "Room C", status: "free", floor: "2nd" },
            { name: "Room D", status: "occupied", floor: "2nd" },
        ]);
    }
};

// ✅ Get All Rooms
app.get("/api/shop/rooms", async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

// ✅ Generate PDF Using Puppeteer
async function generatePDF(roomName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #345777; }
                p { font-size: 14px; }
            </style>
        </head>
        <body>
            <h1>📌 Room Booking Confirmation</h1>
            <p>Your booking for <strong>Room ${roomName}</strong> has been confirmed.</p>
        </body>
        </html>
    `;

    await page.setContent(content);
    const pdfPath = path.join(__dirname, "bookings", `${roomName}_booking.pdf`);
    await fs.ensureDir("bookings");
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();
    return pdfPath;
}

// ✅ Send Email with PDF
async function sendMailWithPDF(email, roomName) {
    const pdfPath = await generatePDF(roomName);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Room Booking Confirmation",
        text: `Your booking for Room "${roomName}" is confirmed.`,
        attachments: [{ filename: `${roomName}_booking.pdf`, path: pdfPath }],
    };

    return transporter.sendMail(mailOptions);
}

// ✅ Book a Room
app.post("/api/shop/book", async (req, res) => {
    try {
        const { roomName, email } = req.body;
        const room = await Room.findOne({ name: roomName });

        if (!room) return res.status(404).json({ message: "Room not found" });
        if (room.status === "occupied") return res.status(400).json({ message: "Room already booked" });

        room.status = "occupied";
        await room.save();

        await sendMailWithPDF(email, roomName);

        res.json({ message: `Room "${roomName}" booked successfully. Confirmation email sent.` });
    } catch (error) {
        res.status(500).json({ message: "Error booking room", error });
    }
});

// ✅ Release a Room
app.post("/api/shop/release", async (req, res) => {
    const { roomName } = req.body;
    const room = await Room.findOne({ name: roomName });

    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = "free";
    await room.save();
    res.json({ message: `Room "${roomName}" released successfully` });
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

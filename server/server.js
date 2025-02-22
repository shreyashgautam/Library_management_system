const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProducts=require('./routes/admin/products-routes');
const adminOrderRouter = require("./routes/admin/order-routes");

const shopSearchRouter = require("./routes/shop/search-routes");
const nodemailer=require('nodemailer')
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");

const orderRouter = require("./routes/shop/ordermail-routes");
const app = express();
const PORT = process.env.PORT || 5001;
const ShopProductsRouter=require('./routes/shop/product-routes')
const ShopCartRouter=require('./routes/shop/cart-routes')
const ShopOrderRouter=require('./routes/shop/ordermail-routes')

const suggestionRoutes = require("./routes/shop/suggestion-routes");
const shopAddressRouter=require('./routes/shop/address-routes')

const suggmail = require("./routes/shop/suggmail-routes");



// ✅ Correct MongoDB connection with error handling
mongoose
mongoose.connect('mongodb+srv://shreyashgautam2007:shreyash@cluster0.sltva.mongodb.net/')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => console.error("❌ MongoDB connection error:", error));


app.use(
    cors({
        origin: "http://localhost:5173",
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

app.use("/api/auth", authRouter);
app.use('/api/admin/products',adminProducts);
app.use('/api/admin/orders',adminOrderRouter);


app.use("/api/shop", orderRouter);

app.use("/api/shop/products", ShopProductsRouter);
app.use("/api/shop/cart",ShopCartRouter);

app.use("/api/shop/address",shopAddressRouter);

app.use("/api/shop/order",ShopOrderRouter);

app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/suggestions", suggestionRoutes);
app.use("/api/suggestions", suggmail);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const transporter=nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user:'shreyashgautam2007@gmail.com',
            pass:'dwks jvvl vbfd qgev'
        }

    }
)

function sendMail(to, sub, msg) {
    transporter.sendMail({
        from: "shreyashgautam2007@gmail.com",
        to: to,
        subject: sub,
        html: msg,
    }, (err, info) => {
        if (err) {
            console.error("Error sending mail:", err);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}




const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, enum: ["free", "occupied"], default: "free" },
  floor: { type: String, required: true }, // Added floor field
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
const rooms = [
    { name: "Room A", status: "free", floor: "1st" },
    { name: "Room B", status: "occupied", floor: "1st" },
    { name: "Room C", status: "free", floor: "2nd" },
    { name: "Room D", status: "occupied", floor: "2nd" },
    { name: "Room E", status: "free", floor: "3rd" },
    { name: "Room F", status: "occupied", floor: "3rd" }
  ];
  

const initializeRooms = async () => {
    const rooms = await Room.find();
    if (rooms.length === 0) {
        await Room.insertMany([
            { name: "Room A" },
            { name: "Room B" },
            { name: "Room C" },
            { name: "Room D" },
        ]);
    }
};


// ✅ Fetch all rooms
app.get("/api/shop/rooms", async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

// ✅ Book a room
const User = require("./models/User"); // Import User model


// ✅ Generate PDF using Puppeteer
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
            <p>Dear User,</p>
            <p>Your booking for <strong>Room ${roomName}</strong> has been confirmed.</p>
            <h2>📋 Room Details:</h2>
            <ul>
                <li><strong>🏠 Room Number:</strong> ${roomName}</li>
                <li><strong>📜 Rules:</strong> No food, Maintain silence, Max 2 people</li>
                <li><strong>🕐 Timing:</strong> 9 AM - 6 PM</li>
                <li><strong>📧 Library Contact:</strong> library@vit.ac.in</li>
            </ul>
            <p>Thank you for using our service!</p>
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
        from: "shreyashgautam2007@gmail.com",
        to: email,
        subject: "Room Booking Confirmation",
        text: `Your booking for Room "${roomName}" is confirmed.`,
        attachments: [{ filename: `${roomName}_booking.pdf`, path: pdfPath }],
    };

    return transporter.sendMail(mailOptions);
}

// ✅ Book a Room API
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

// ✅ Release a room
app.post("/api/shop/release", async (req, res) => {
    const { roomName } = req.body;
    const room = await Room.findOne({ name: roomName });

    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = "free";
    await room.save();
    res.json({ message: `Room "${roomName}" released successfully` });
});



const Product = require("./models/Product"); // Ensure correct path

app.post("/admin/add-book", async (req, res) => {
    try {
      const { image, title, description, category, brand, totalStock, link } = req.body;
  
      // If fields are missing, default to "NaN" or 0
      const newProduct = new Product({
        image: image || "NaN",
        title: title || "NaN",
        description: description || "NaN",
        category: category || "NaN",
        brand: brand || "NaN",
        totalStock: totalStock !== undefined ? totalStock : 1,
        link: link || "NaN",
      });
  
      await newProduct.save();
      res.status(201).json({ message: "✅ Book added successfully!", product: newProduct });
  
    } catch (error) {
      console.error("❌ Error adding book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProducts=require('./routes/admin/products-routes');
const adminOrderRouter = require("./routes/admin/order-routes");

const shopSearchRouter = require("./routes/shop/search-routes");
const nodemailer=require('nodemailer')


const orderRouter = require("./routes/shop/ordermail-routes");
const app = express();
const PORT = process.env.PORT || 5001;
const ShopProductsRouter=require('./routes/shop/product-routes')
const ShopCartRouter=require('./routes/shop/cart-routes')
const ShopOrderRouter=require('./routes/shop/ordermail-routes')

const suggestionRoutes = require("./routes/shop/suggestion-routes");
const shopAddressRouter=require('./routes/shop/address-routes')



// ✅ Correct MongoDB connection with error handling

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





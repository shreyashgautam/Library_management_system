const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProducts=require('./routes/admin/products-routes');
const adminOrderRouter = require("./routes/admin/order-routes");



const app = express();
const PORT = process.env.PORT || 5001;
const ShopProductsRouter=require('./routes/shop/product-routes')
const ShopCartRouter=require('./routes/shop/cart-routes')
const ShopOrderRouter=require('./routes/shop/order-routes')


const shopAddressRouter=require('./routes/shop/address-routes')
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



app.use("/api/shop/products", ShopProductsRouter);
app.use("/api/shop/cart",ShopCartRouter);

app.use("/api/shop/address",shopAddressRouter);

app.use("/api/shop/order",ShopOrderRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

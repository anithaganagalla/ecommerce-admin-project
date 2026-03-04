const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/orders", require("./routes/orderRoutes"));

// 🔥 STATIC FOLDER FOR IMAGES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Optional Debug (you can remove later)
console.log("Uploads path:", path.join(__dirname, "uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
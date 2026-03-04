const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ================== MIDDLEWARE ==================
app.use(express.json());

// Allow frontend access
app.use(
  cors({
    origin: "*", // You can replace "*" with your frontend URL later
    credentials: true,
  })
);

// ================== API ROUTES ==================
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/orders", require("./routes/orderRoutes"));

// ================== STATIC FILES (IMAGES) ==================
// This allows access like:
// https://your-backend-url.onrender.com/uploads/image.jpg

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================== ROOT ROUTE (Optional but Good) ==================
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
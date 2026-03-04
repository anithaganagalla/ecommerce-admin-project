const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getLatestProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// 🔥 ORDER MATTERS
router.get("/latest", getLatestProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Only
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
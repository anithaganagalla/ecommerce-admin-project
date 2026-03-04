const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

// Register
router.post("/register", createUser);

// Login
router.post("/login", loginUser);

// Get all users (Admin only)
router.get("/", protect, admin, getAllUsers);

module.exports = router;

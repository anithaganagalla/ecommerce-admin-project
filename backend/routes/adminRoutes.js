const express = require('express')
const router = express.Router()
const User = require("../models/User");

const { protect, admin } = require('../middleware/authMiddleware')

// Example admin test route
router.get('/dashboard', protect, admin, (req, res) => {
  res.json({ message: "Admin dashboard access granted" })
})


router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router

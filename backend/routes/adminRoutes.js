const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { protect, admin } = require("../middleware/authMiddleware");

/*
  ✅ Admin Test Route
*/
router.get("/dashboard", protect, admin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin dashboard access granted",
  });
});


/*
  ✅ Delete User (Admin Only)
*/
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deleting himself (IMPORTANT SAFETY)
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


module.exports = router;
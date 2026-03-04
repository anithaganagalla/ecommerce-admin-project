const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

const {
  createOrder,
  getMyOrders,
  getAdminStats
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// ✅ CREATE ORDER
router.post("/", protect, createOrder);

// ✅ GET MY ORDERS
router.get("/myorders", protect, getMyOrders);

// ✅ ADMIN STATS (MUST BE BEFORE /:id)
router.get("/admin/stats", protect, admin, getAdminStats);

// ✅ GET ALL ORDERS (ADMIN)
router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});

// ✅ GET ORDER BY ID
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// ✅ PAY ORDER
router.put("/:id/pay", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// ✅ DELIVER ORDER
router.put("/:id/deliver", protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = router;
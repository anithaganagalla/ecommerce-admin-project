const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },

    // ✅ Add them INSIDE here
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date
    },
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
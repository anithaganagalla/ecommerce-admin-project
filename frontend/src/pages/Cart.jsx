import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQty } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    taxPrice -
    discount
  ).toFixed(2);

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(itemsPrice * 0.1);
      alert("Coupon Applied! 10% discount");
    } else {
      alert("Invalid Coupon");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 0",
                borderBottom: "1px solid #ddd",
                alignItems: "center"
              }}
            >
              <div style={{ flex: 2 }}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <input
                type="number"
                min="1"
                max={item.countInStock}
                value={item.qty}
                onChange={(e) =>
                  updateQty(item._id, Number(e.target.value))
                }
                style={{ width: "60px", padding: "5px" }}
              />

              <div>₹{item.price * item.qty}</div>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* SUMMARY */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px"
            }}
          >
            <h3>Order Summary</h3>
            <p>Items: ₹{itemsPrice.toFixed(2)}</p>
            <p>Shipping: ₹{shippingPrice}</p>
            <p>Tax (18%): ₹{taxPrice}</p>
            <p>Discount: -₹{discount.toFixed(2)}</p>

            <h2>Total: ₹{totalPrice}</h2>

            {/* COUPON */}
            <div style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="Enter Coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                style={{ padding: "8px", marginRight: "10px" }}
              />
              <button onClick={applyCoupon}>
                Apply
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={clearCart}
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  background: "#111",
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                style={{
                  padding: "10px 20px",
                  background: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
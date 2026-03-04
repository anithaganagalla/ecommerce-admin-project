import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ✅ USE YOUR DEPLOYED BACKEND */
const API_URL = "https://ecommerce-admin-project-2.onrender.com/api";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  /* ================= CREATE ORDER ================= */
  const createOrderHandler = async () => {
    console.log("CREATE ORDER CLICKED");

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      console.log("Sending order to backend...");

      const { data } = await axios.post(
        `${API_URL}/orders`,
        {
          orderItems: cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER CREATED:", data);

      setOrderId(data._id);
      alert("Order Created ✅ Now complete payment.");
      setError("");
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err.message);
      setError("Order creation failed ❌");
    }
  };

  /* ================= PAYMENT ================= */
  const handleFakePayment = async () => {
    if (!orderId) {
      alert("Create order first");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      console.log("PAYMENT UPDATE CALL...");

      await axios.put(
        `${API_URL}/orders/${orderId}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PAYMENT SUCCESS");

      clearCart();
      alert("Payment Successful 🎉");
      navigate("/success");
    } catch (err) {
      console.error("PAYMENT ERROR:", err.response?.data || err.message);
      alert("Payment update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            {cartItems.map((item) => (
              <div key={item._id}>
                {item.name} - ₹{item.price} × {item.qty}
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: "20px" }}>
            Total: ₹{total}
          </h2>

          {!orderId ? (
            <button onClick={createOrderHandler} style={buttonStyle}>
              Create Order
            </button>
          ) : (
            <button
              onClick={handleFakePayment}
              style={{ ...buttonStyle, background: "green" }}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#111",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Checkout;
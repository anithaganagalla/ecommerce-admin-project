import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const createOrderHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
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

      setOrderId(data._id);
      alert("Order Created! Now complete payment.");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Order creation failed");
    }
  };

  const handleFakePayment = async () => {
    if (!orderId) {
      alert("Create order first");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/orders/${orderId}/pay`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        clearCart();
        navigate("/success");
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Payment update failed");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            {cartItems.map((item) => (
              <div key={item._id}>
                {item.name} - ₹{item.price} x {item.qty}
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
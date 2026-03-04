import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );

      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Order Details</h1>

      <h3>Order ID: {order._id}</h3>
      <p>Date: {order.createdAt.substring(0, 10)}</p>

      <h3>
        Payment Status:{" "}
        {order.isPaid ? (
          <span style={{ color: "green" }}>Paid</span>
        ) : (
          <span style={{ color: "red" }}>Not Paid</span>
        )}
      </h3>

      {order.isPaid && (
        <p>Paid At: {order.paidAt.substring(0, 10)}</p>
      )}

      <hr />

      <h2>Items</h2>

      {order.orderItems.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          {item.name} — ₹{item.price} x {item.qty}
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>
        Total: ₹{order.totalPrice}
      </h2>
    </div>
  );
};

export default OrderDetails;
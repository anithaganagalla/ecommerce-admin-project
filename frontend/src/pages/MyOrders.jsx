import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ GET TOKEN DIRECTLY
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders found</h3>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
  <tr>
    <th>ID</th>
    <th>Date</th>
    <th>Total</th>
    <th>Payment</th>
    <th>Delivery</th> {/* ✅ NEW COLUMN */}
  </tr>
</thead>
<tbody>
  {orders.map((order) => (
    <tr key={order._id}>
      <td>
        <a
          href={`/order/${order._id}`}
          style={{ color: "blue" }}
        >
          {order._id.substring(0, 8)}...
        </a>
      </td>

      <td>{order.createdAt.substring(0, 10)}</td>

      <td>₹{order.totalPrice}</td>

      {/* Payment Status */}
      <td>
        {order.isPaid ? (
          <span
            style={{
              background: "green",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Paid
          </span>
        ) : (
          <span
            style={{
              background: "red",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Not Paid
          </span>
        )}
      </td>

      {/* ✅ Delivered Status */}
      <td>
        {order.isDelivered ? (
          <span
            style={{
              background: "blue",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Delivered
          </span>
        ) : (
          <span
            style={{
              background: "orange",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Not Delivered
          </span>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
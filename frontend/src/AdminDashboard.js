import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from "react";
import API from "./services/api.js";
import { getAllUsers, deleteUser } from "./services/adminService";
import { getAdminStats } from "./services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [stats, setStats] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: ""
  });

  // ================= CHART DATA =================
  const chartData = orders.map((order, index) => ({
    name: `Order ${index + 1}`,
    revenue: order.totalPrice,
  }));

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
    fetchStats();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // ================= ADD / UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProductId) {
        await API.put(`/products/${editingProductId}`, {
          ...product,
          price: Number(product.price),
          countInStock: Number(product.countInStock)
        });

        alert("Product updated successfully!");
        setEditingProductId(null);
      } else {
        await API.post("/products", {
          ...product,
          price: Number(product.price),
          countInStock: Number(product.countInStock)
        });

        alert("Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Operation failed");
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      countInStock: ""
    });
  };

  // ================= DELETE USER =================
  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= MARK ORDER DELIVERED =================
  const handleDeliverOrder = async (id) => {
    try {
      await API.put(`/orders/${id}/deliver`);
      alert("Order marked as delivered!");
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update order");
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cardStyle = {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <hr />

      <h3>Dashboard Overview</h3>

      {stats && (
        <div style={{ display: "flex", gap: "20px", margin: "20px 0 30px 0" }}>
          <div style={cardStyle}>
            <h4>Total Users</h4>
            <p>{stats.totalUsers}</p>
          </div>

          <div style={cardStyle}>
            <h4>Total Products</h4>
            <p>{stats.totalProducts}</p>
          </div>

          <div style={cardStyle}>
            <h4>Total Orders</h4>
            <p>{stats.totalOrders}</p>
          </div>

          <div style={cardStyle}>
            <h4>Total Revenue</h4>
            <p>₹{stats.totalRevenue}</p>
          </div>
        </div>
      )}

      <hr />
      <h3>Revenue Chart</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <hr />
      <h3>All Orders</h3>

      {orders.map((order) => (
        <div key={order._id} style={{ marginBottom: "10px" }}>
          Order: {order._id.substring(0, 8)} |
          User: {order.user?.name} |
          Total: ₹{order.totalPrice} |
          Paid: {order.isPaid ? "Yes" : "No"} |
          Delivered: {order.isDelivered ? "Yes" : "No"}

          {!order.isDelivered && (
            <button
              onClick={() => handleDeliverOrder(order._id)}
              style={{ marginLeft: "10px" }}
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}

      <hr />
      <h3>All Users</h3>

      {users.map((user) => (
        <div key={user._id}>
          {user.name} - {user.email}

          <button
            onClick={() => handleDeleteUser(user._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}

      <hr />
      <h3>{editingProductId ? "Edit Product" : "Add Product"}</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <br /><br />

        <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
        <br /><br />

        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <br /><br />

        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
        <br /><br />

        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <br /><br />

        <input name="countInStock" type="number" placeholder="Stock" value={product.countInStock} onChange={handleChange} required />
        <br /><br />

        <button type="submit">
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />
      <h3>All Products</h3>

      {products.map((p) => (
        <div key={p._id}>
          {p.name} - ₹{p.price}

          <button
            onClick={() => {
              setEditingProductId(p._id);
              setProduct(p);
            }}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteProduct(p._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
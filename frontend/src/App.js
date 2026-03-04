import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Login from "./Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import SuccessPage from "./pages/SuccessPage";
import AdminDashboard from "./AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        {/* Protected User Route */}
        <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* 🔥 Catch All Route (IMPORTANT FOR RENDER) */}
        <Route path="*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
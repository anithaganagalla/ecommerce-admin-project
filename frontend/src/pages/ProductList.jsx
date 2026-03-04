import React, { useEffect, useState } from "react";
import API from "../axiosconfig"; // ✅ Use your axios config
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products"); // ✅ No localhost
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h3>Loading products...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>

          {/* ✅ FIX IMAGE PATH HERE IF YOU SHOW IMAGE LATER */}
          {product.image && (
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `https://ecommerce-admin-project-2.onrender.com${product.image}`
              }
              alt={product.name}
              style={{ width: "150px", borderRadius: "6px" }}
            />
          )}

          <br />

          <Link to={`/product/${product._id}`}>
            <button style={{ marginTop: "10px" }}>View</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
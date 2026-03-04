import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        // Safety check in case API returns undefined
        if (response && response.data) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Products fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  if (error) {
    return (
      <h2 style={{ padding: "40px", color: "red" }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Latest Products
      </h1>

      {products.length === 0 && (
        <h3>No Products Found</h3>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <Link to={`/product/${product._id}`}>
              {product.image && (
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `https://ecommerce-admin-project-2.onrender.com${product.image}`
                  }
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Link>

            <h3 style={{ marginTop: "15px" }}>
              {product.name}
            </h3>

            <p style={{ fontWeight: "bold" }}>
              ₹{product.price}
            </p>

            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
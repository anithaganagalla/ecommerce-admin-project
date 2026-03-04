import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(`/api/products/${id}`);

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message || "Failed to load product"
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  if (error) {
    return <h2 style={{ padding: "20px", color: "red" }}>{error}</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          width="300"
          style={{ marginBottom: "20px" }}
        />
      )}

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Stock:</strong>{" "}
        {product.countInStock > 0
          ? `${product.countInStock} available`
          : "Out of stock"}
      </p>

      <button
  onClick={() => addToCart(product)}
  disabled={product.countInStock <= 0}
  style={{
    padding: "10px 20px",
    marginTop: "10px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }}
>
  Add to Cart
</button>
    </div>
  );
};

export default ProductDetails;
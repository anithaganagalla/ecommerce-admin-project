import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await API.get(`/products/${id}`);

        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.log("Product fetch error:", err);
        setError(
          err.response?.data?.message ||
          "Product not found"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      {product.image && (
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `https://ecommerce-admin-project-2.onrender.com${product.image}`
          }
          alt={product.name}
          width="300"
        />
      )}

      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>

      <p>
        Stock:
        {product.countInStock > 0
          ? `${product.countInStock} available`
          : "Out of stock"}
      </p>

      <button
        onClick={() => addToCart(product)}
        disabled={product.countInStock <= 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>

      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>

          <Link to={`/product/${product._id}`}>
            <button>View</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      alert("Please fill required fields");
      return;
    }

    const productData = {
      name,
      price,
      description,
      image,
      category,
      stock,
    };

    try {
      setLoading(true);

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        alert("Product updated successfully");
        setEditingProduct(null);
      } else {
        await addProduct(productData);
        alert("Product added successfully");
      }

      // RESET FORM
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
      setStock("");

      fetchProducts();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const editProductHandler = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || "");
    setImage(product.image || "");
    setCategory(product.category || "");
    setStock(product.stock || "");
  };

  // DELETE
  const deleteProductHandler = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteProduct(id);
      alert("Deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Error deleting product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />

        {image && (
          <div style={{ marginTop: "10px" }}>
            <img src={image} alt="Preview" width="100" />
          </div>
        )}

        <br /><br />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      <hr />

      <h3>All Products</h3>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>

          {product.image && (
            <img src={product.image} alt={product.name} width="100" />
          )}

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => editProductHandler(product)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button onClick={() => deleteProductHandler(product._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
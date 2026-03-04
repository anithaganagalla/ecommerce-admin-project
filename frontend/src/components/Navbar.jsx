import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();

  // ✅ Correct key
  let user = null;

const storedUser = localStorage.getItem("user");

if (storedUser && storedUser !== "undefined") {
  try {
    user = JSON.parse(storedUser);
  } catch (err) {
    console.log("User parse error:", err);
  }
}

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // refresh UI properly
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>MyShop</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/cart" style={styles.link}>
          Cart ({cartItems.length})
        </Link>

        {/* NOT LOGGED IN */}
        {!user && (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            {/* Show Admin only if role is admin */}
            {user.role === "admin" && (
              <Link to="/admin" style={styles.link}>
                Admin
              </Link>
            )}

            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  button: {
    padding: "6px 12px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
  logo: {
    margin: 0,
  },
};

export default Navbar;
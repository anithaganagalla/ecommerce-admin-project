import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      localStorage.clear();

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      const token = res.data.token;
      const userData = res.data.user || res.data;

      if (!token) {
        throw new Error("No token received");
      }

      // Save token
      localStorage.setItem("token", token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
      );

      console.log("Logged in user:", userData);

      // Role-based redirect
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
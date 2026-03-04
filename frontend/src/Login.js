import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./services/api.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await API.post("/users/login", {
      email,
      password,
    });

    console.log("Login response:", response.data);

    const token = response.data.token;
    const user = response.data.user || response.data.data || response.data;

    if (!token) {
      throw new Error("Token not received");
    }

    if (!user) {
      throw new Error("User not received from backend");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed");
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
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
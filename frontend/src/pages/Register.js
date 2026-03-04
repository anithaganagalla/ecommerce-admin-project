import React, { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        /><br/>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br/>

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        /><br/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

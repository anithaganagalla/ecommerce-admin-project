import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "https://ecommerce-admin-project-2.onrender.com/api",
});

// Add token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
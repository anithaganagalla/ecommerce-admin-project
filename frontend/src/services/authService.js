import axios from "axios";

/*
  ✅ Use your centralized API config
  (axiosconfig.js OR services/api.js)
*/

const API = axios.create({
  baseURL: "https://ecommerce-admin-project-2.onrender.com/api",
});

/*
  ✅ Attach token automatically
*/
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


/*
  =============================
  REGISTER
  =============================
*/
export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};


/*
  =============================
  LOGIN
  =============================
*/
export const loginUser = async (userData) => {
  const response = await API.post("/users/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  if (response.data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};


/*
  =============================
  GET USERS (Protected)
  =============================
*/
export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};
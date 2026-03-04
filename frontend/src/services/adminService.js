import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ GET ADMIN STATS
export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_URL}/orders/admin/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ✅ GET ALL USERS
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_URL}/admin/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ✅ DELETE USER
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${API_URL}/admin/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
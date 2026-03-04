import axios from "axios";
import { getToken } from "../auth";

const API_URL = "http://localhost:5000/api/products";

// GET ALL PRODUCTS (Public)
export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ADD PRODUCT (Admin)
export const addProduct = async (product) => {
  const token = getToken();

  const res = await axios.post(API_URL, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  const token = getToken();

  const res = await axios.put(`${API_URL}/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// GET LATEST PRODUCTS (Public)
export const getLatestProducts = async () => {
  const res = await axios.get(`${API_URL}/latest`);
  return res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const token = getToken();

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
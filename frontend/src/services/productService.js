import API from "./api"; // ✅ use centralized axios config
import { getToken } from "../auth";

// ✅ Base route (NO localhost)
const API_URL = "/products";

/*
=========================================
GET ALL PRODUCTS (Public)
=========================================
*/
export const getProducts = async () => {
  const res = await API.get(API_URL);
  return res.data;
};

/*
=========================================
GET LATEST PRODUCTS (Public)
=========================================
*/
export const getLatestProducts = async () => {
  const res = await API.get(`${API_URL}/latest`);
  return res.data;
};

/*
=========================================
GET PRODUCT BY ID (Public)
=========================================
*/
export const getProductById = async (id) => {
  const res = await API.get(`${API_URL}/${id}`);
  return res.data;
};

/*
=========================================
ADD PRODUCT (Admin Only)
=========================================
*/
export const addProduct = async (product) => {
  const token = getToken();

  const res = await API.post(API_URL, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/*
=========================================
UPDATE PRODUCT (Admin Only)
=========================================
*/
export const updateProduct = async (id, product) => {
  const token = getToken();

  const res = await API.put(`${API_URL}/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/*
=========================================
DELETE PRODUCT (Admin Only)
=========================================
*/
export const deleteProduct = async (id) => {
  const token = getToken();

  const res = await API.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
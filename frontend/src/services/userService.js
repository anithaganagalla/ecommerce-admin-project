import API from "./api";

export const loginUser = async (data) => {
  const response = await API.post("/users/login", data);
  return response.data;
};

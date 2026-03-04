// Save token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Save user
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check login
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

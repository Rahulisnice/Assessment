import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const registerUser = (data) => api.post("/api/auth/register", data);
const loginUser = (data) => api.post("/api/auth/login", data);

const AuthServices = { registerUser, loginUser };
export default AuthServices;

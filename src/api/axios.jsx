import axios from "axios";

const api = axios.create({
  baseURL: "https://farmdirect-backend-production-abee.up.railway.app/api",,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("kb_token");
      localStorage.removeItem("kb_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
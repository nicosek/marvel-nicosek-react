import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME } from "../constants/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

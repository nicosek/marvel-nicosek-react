import api from "./client";

export const signup = async (payload) => {
  const response = await api.post("/api/auth/signup", payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await api.post("/api/auth/login", payload);
  return response.data;
};

import axios from "axios";

export const API_ROOT = "http://localhost:5000/api";

export const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export const getJobs = () => api.get("/jobs");
export const addJob = (data) => api.post("/jobs", data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);

export const matchResume = (formData) =>
  api.post("/matcher/match", formData);

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
export const getCurrentUser = () => api.get("/auth/me");

import axios from "axios";

const API = "http://localhost:5000/api/jobs";

// ✅ IMPORTANT: named export
export const getJobs = () => axios.get(API);

export const addJob = (data) => axios.post(API, data);

export const deleteJob = (id) => axios.delete(`${API}/${id}`);

export const updateJob = (id, data) =>
  axios.put(`${API}/${id}`, data);
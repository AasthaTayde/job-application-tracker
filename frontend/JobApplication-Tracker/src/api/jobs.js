import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

// GET all jobs
export const getJobs = () => axios.get(API_URL);

// POST new job
export const createJob = (jobData) => axios.post(API_URL, jobData);

// (optional later)
// export const deleteJob = (id) => axios.delete(`${API_URL}/${id}`);
import { useState } from "react";
import { deleteJob } from "../api/jobs";
import JobCard from "../components/JobCard";

export default function Dashboard({ jobs, setJobs, loading }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // 🔥 DELETE using MongoDB id (NOT index)
  const handleDelete = async (id) => {
    try {
      // 🔥 Delete from backend (MongoDB)
      await deleteJob(id);
  
      // 🔥 Remove from frontend state
      setJobs((prev) => prev.filter((job) => job._id !== id));
  
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  };

  // 🔥 UPDATE status using id
  const handleStatusChange = (id, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job._id === id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };

  // 🔍 SEARCH
  const getSearchedJobs = () => {
    return jobs.filter((job) =>
      job.company.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 🎯 FILTER
  const getFilteredJobs = (jobList) => {
    return jobList.filter((job) => {
      return filter === "All" || job.status === filter;
    });
  };

  const processedJobs = getFilteredJobs(getSearchedJobs());

  const getJobsByStatus = (status) => {
    return processedJobs.filter((job) => job.status === status);
  };

  const renderSection = (title, status) => (
    <div style={{ marginBottom: "25px" }}>
      <h2>{title}</h2>

      {getJobsByStatus(status).map((job) => (
        <JobCard
          key={job._id}
          job={job}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h1>Job Dashboard</h1>

      {/* SEARCH + FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        <>
          {renderSection("🟡 Applied", "Applied")}
          {renderSection("🔵 Interview", "Interview")}
          {renderSection("🟢 Offer", "Offer")}
          {renderSection("🔴 Rejected", "Rejected")}
        </>
      )}
    </div>
  );
}
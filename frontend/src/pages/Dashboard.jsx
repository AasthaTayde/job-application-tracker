
import { useState } from "react";
import { deleteJob, updateJob } from "../api/jobs";
import JobCard from "../components/JobCard";

export default function Dashboard({ jobs, setJobs, loading }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateJob(id, {
        status: newStatus,
      });

      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? res.data : job
        )
      );
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const getSearchedJobs = () => {
    return jobs.filter((job) =>
      job.company
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const getFilteredJobs = (jobList) => {
    return jobList.filter((job) => {
      return filter === "All" || job.status === filter;
    });
  };

  const processedJobs = getFilteredJobs(getSearchedJobs());

  const getJobsByStatus = (status) => {
    return processedJobs.filter(
      (job) => job.status === status
    );
  };

  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerJobs = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const renderSection = (title, status) => {
    const sectionJobs = getJobsByStatus(status);

    if (sectionJobs.length === 0) {
      return null;
    }

    return (
      <section className="job-section">
        <div className="section-heading">
          <h2>{title}</h2>
          <span>{sectionJobs.length}</span>
        </div>

        <div className="job-list">
          {sectionJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="dashboard">
      <div className="page-header">
        <p className="eyebrow">APPLICATION TRACKER</p>

        <h1>Job Dashboard</h1>

        <p className="page-description">
          Track your applications and keep your job search organized.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Applications</span>
          <strong>{totalJobs}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Applied</span>
          <strong>{appliedJobs}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Interviews</span>
          <strong>{interviewJobs}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Offers</span>
          <strong>{offerJobs}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Rejected</span>
          <strong>{rejectedJobs}</strong>
        </div>
      </div>

      <div className="jobs-panel">
        <div className="panel-header">
          <h2>Your Applications</h2>

          <p>
            Search and filter your job applications.
          </p>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p>Loading your applications...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>

            <p>
              Add your first job application to start tracking
              your job search.
            </p>
          </div>
        ) : processedJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No matching applications</h3>

            <p>
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="job-sections">
            {renderSection("Applied", "Applied")}
            {renderSection("Interviews", "Interview")}
            {renderSection("Offers", "Offer")}
            {renderSection("Rejected", "Rejected")}
          </div>
        )}
      </div>
    </main>
  );
}


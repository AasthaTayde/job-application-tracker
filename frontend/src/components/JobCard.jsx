
export default function JobCard({
  job,
  handleDelete,
  handleStatusChange,
}) {
  return (
    <div className="job-card">
      <div className="job-card-main">
        <div>
          <h3>{job.company}</h3>
          <p className="job-role">{job.role}</p>
        </div>

        <span className={`status-badge status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      <div className="job-card-footer">
        <p className="job-date">Applied: {job.date}</p>

        <div className="job-actions">
          <select
            value={job.status}
            onChange={(e) =>
              handleStatusChange(job._id, e.target.value)
            }
            className="status-select"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <button
            className="delete-button"
            onClick={() => handleDelete(job._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


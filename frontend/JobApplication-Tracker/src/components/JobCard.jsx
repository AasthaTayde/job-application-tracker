export default function JobCard({ job, index, handleDelete, handleStatusChange }) {
    return (
      <div style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
        background: "#f9f9f9"
      }}>
        <h3>{job.company}</h3>
        <p>{job.role}</p>
  
        <select
          value={job.status}
          onChange={(e) => handleStatusChange(index, e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
  
        <p>{job.date}</p>
  
        <button onClick={() => handleDelete(index)}>
          Delete
        </button>
      </div>
    );
  }
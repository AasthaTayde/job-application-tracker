import JobCard from "../components/JobCard";

export default function Dashboard({ jobs, setJobs }) {

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].status = newStatus;
    setJobs(updatedJobs);
  };

  const getJobsByStatus = (status) => {//grouping function,status is dynamic here
    return jobs.filter(job => job.status === status);
  };

  const renderSection = (title, status) => (//creating template for one job section, so we can use it further
    <div style={{ marginBottom: "25px" }}>
      <h2>{title}</h2>

      {getJobsByStatus(status).map((job, index) => (
        <JobCard
          key={index}
          job={job}
          index={index}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h1>Job Pipeline</h1>

      {jobs.length === 0 ? (
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
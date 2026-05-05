import JobCard from "../components/JobCard";//Dashboard- logic only, JobCard- UI

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

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Dashboard</h1>

      {jobs.length === 0 ? (
        <p>No jobs added yet</p>
      ) : (
        jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            index={index}
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}
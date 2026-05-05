export default function Dashboard({ jobs }) {
  return (
    <div>
      <h1>Dashboard</h1>

      {jobs.length === 0 ? ( //conditional rendering
        <p>No jobs added yet</p>
      ) : (
        jobs.map((job, index) => (//loops through all jobs, jobs array, key- special prop to identify each item in a list uniquely, index is position in array
          <div key={index}>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
            <p>{job.status}</p>
            <p>{job.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
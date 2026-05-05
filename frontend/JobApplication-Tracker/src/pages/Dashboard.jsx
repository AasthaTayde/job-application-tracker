export default function Dashboard({ jobs,setJobs }) {//jobs->shows data, setJobs->upadates data
  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);//create new array and this keeps all items except the one we want to delete, filter() creates new array
    setJobs(updatedJobs);//replace old jobs with new array
  };          
    const handleStatusChange = (index, newStatus) => {
      const updatedJobs = [...jobs]; // copy array
      updatedJobs[index].status = newStatus; // update specific job
      setJobs(updatedJobs); // update state
  };

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
            <select
            value={job.status}
            onChange={(e) => handleStatusChange(index, e.target.value)}>
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
        ))
      )}
    </div>
  );
}
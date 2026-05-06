import { useState } from "react";
import JobCard from "../components/JobCard";

export default function Dashboard({ jobs, setJobs }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  //delete function
  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };


  //update status of the job
  const handleStatusChange = (index, newStatus) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].status = newStatus;
    setJobs(updatedJobs);
  };

  //to search job(matches text)
  const getSearchedJobs = () => {//() no input needed, function uses external data(uses global state directly)
    return jobs.filter((job) =>// .filter() used to loop through each item of array jobs[], job=current item from the array and then .filter() returns new array
      job.company.toLowerCase().includes(search.toLowerCase())//condition check and build new array (job) and return result of .filter
    );
  };

  //to filter jobs(matches category)
  const getFilteredJobs = (jobList) => {//(something), function needs input(takes i/p dynamically)
    return jobList.filter((job) => {
      return filter === "All" || job.status === filter;
    });
  };

  //get combined result after searching by company name then filter by status
  const processedJobs = getFilteredJobs(getSearchedJobs());

  const getJobsByStatus = (status) => { //grouping of jobs on the basis of status
    return processedJobs.filter(job => job.status === status);
  };

  //UI template so it can be reused again
  const renderSection = (title, status) => (
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
      <h1>Job Dashboard</h1>
       {/*Search+filter UI*/}
      <div style={{ marginBottom: "20px" }}>
          <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        {/*Filter*/}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>
      {/*Empty state*/}
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
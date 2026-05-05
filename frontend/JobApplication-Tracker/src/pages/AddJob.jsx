import { useState } from "react";
export default function AddJob({ setJobs }) {//setJobs is passed as a prop so that when the form is submitted, the new job is added to the jobs list.
  const [job, setJob] = useState({//Form state(single job)
    company: "",
    role: "",
    status: "Applied",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setJobs((prev) => [...prev, job]);

    // reset form
    setJob({
      company: "",
      role: "",
      status: "Applied",
      date: "",
    });
  };

  return (
    <div>
      <h1>Add Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) =>
            setJob({ ...job, company: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={job.role}
          onChange={(e) =>
            setJob({ ...job, role: e.target.value })
          }
        />

        <select
          value={job.status}
          onChange={(e) =>
            setJob({ ...job, status: e.target.value })
          }
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <input
          type="date"
          value={job.date}
          onChange={(e) =>
            setJob({ ...job, date: e.target.value })
          }
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
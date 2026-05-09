import { useState } from "react";
import { addJob } from "../api/jobs";

export default function AddJob({ setJobs }) {

  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 Send data to backend (MongoDB)
      const res = await addJob(job);

      // 🔥 Update frontend state with saved DB response
      setJobs((prev) => [...prev, res.data]);

      // reset form
      setJob({
        company: "",
        role: "",
        status: "Applied",
        date: "",
      });

    } catch (error) {
      console.log("Error adding job:", error);
    }
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
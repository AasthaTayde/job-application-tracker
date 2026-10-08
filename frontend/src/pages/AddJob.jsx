
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
      const res = await addJob(job);

      setJobs((prev) => [...prev, res.data]);

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
    <main className="add-job-page">
      <div className="add-job-header">
        <p className="eyebrow">APPLICATION TRACKER</p>
        <h1>Add a New Job</h1>
        <p>
          Keep your job search organized by adding a new application.
        </p>
      </div>

      <div className="add-job-layout">
        <div className="form-card">
          <div className="form-card-header">
            <h2>Job Details</h2>
            <p>Enter the details of the position you applied for.</p>
          </div>

          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="company">Company</label>

                <input
                  id="company"
                  type="text"
                  placeholder="e.g. Google"
                  value={job.company}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      company: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Job Role</label>

                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={job.role}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      role: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Application Status</label>

                <select
                  id="status"
                  value={job.status}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Application Date</label>

                <input
                  id="date"
                  type="date"
                  value={job.date}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Add Job Application
              </button>
            </div>
          </form>
        </div>

        <aside className="add-job-info">
          <div className="info-icon">✓</div>

          <h2>Stay organized</h2>

          <p>
            Track every application in one place and update its
            status as you move through the hiring process.
          </p>

          <div className="workflow">
            <div className="workflow-item">
              <span>1</span>
              <div>
                <strong>Apply</strong>
                <p>Add the job after applying.</p>
              </div>
            </div>

            <div className="workflow-item">
              <span>2</span>
              <div>
                <strong>Track</strong>
                <p>Update the status as things progress.</p>
              </div>
            </div>

            <div className="workflow-item">
              <span>3</span>
              <div>
                <strong>Manage</strong>
                <p>Keep your entire search organized.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

import { useState } from "react";
import { matchResume } from "../api/jobs";

export default function ResumeMatcher() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatch = async (e) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your PDF resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const res = await matchResume(formData);

      setResult(res.data);
    } catch (error) {
      console.log("Matcher error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while analyzing the resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="matcher-page">
      <div className="matcher-header">
        <div>
          <h1>Resume Matcher</h1>
          <p>
            Compare your resume with a job description using AI.
          </p>
        </div>
      </div>

      <form className="matcher-card" onSubmit={handleMatch}>
        <div className="matcher-columns">

          {/* Resume Upload */}
          <div className="matcher-box">
            <h2>1. Upload Resume</h2>
            <p className="box-description">
              Upload your resume in PDF format.
            </p>

            <label className="resume-upload">
              <span className="upload-icon">📄</span>

              <strong>
                {resume ? resume.name : "Choose your resume"}
              </strong>

              <span>
                {resume
                  ? "PDF selected"
                  : "Click here to upload a PDF"}
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  setResume(e.target.files[0]);
                  setError("");
                }}
              />
            </label>
          </div>

          {/* Job Description */}
          <div className="matcher-box">
            <h2>2. Job Description</h2>
            <p className="box-description">
              Paste the job description you want to compare against.
            </p>

            <textarea
              className="job-description-input"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setError("");
              }}
            />

            <div className="character-count">
              {jobDescription.length} characters
            </div>
          </div>
        </div>

        {error && (
          <div className="matcher-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="matcher-button"
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>
      </form>

      {/* Results */}
      {result && (
        <section className="matcher-results">

          <div className="score-card">
            <div>
              <p>Resume Match Score</p>
              <h2>{result.matchScore}%</h2>
              <span>
                Based on your resume and the job description
              </span>
            </div>
          </div>

          <div className="skills-grid">

            <div className="skills-card">
              <h2>Matching Skills</h2>

              {result.matchingSkills.length > 0 ? (
                <div className="skill-list">
                  {result.matchingSkills.map((skill, index) => (
                    <span
                      className="skill matching"
                      key={index}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No matching skills found.</p>
              )}
            </div>

            <div className="skills-card">
              <h2>Missing Skills</h2>

              {result.missingSkills.length > 0 ? (
                <div className="skill-list">
                  {result.missingSkills.map((skill, index) => (
                    <span
                      className="skill missing"
                      key={index}
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No major missing skills found.</p>
              )}
            </div>

          </div>
        </section>
      )}
    </main>
  );
}
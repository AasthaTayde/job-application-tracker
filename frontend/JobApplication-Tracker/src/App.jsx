import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import { getJobs } from "./api/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend on load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              jobs={jobs}
              setJobs={setJobs}
              loading={loading}
            />
          }
        />

        <Route
          path="/add"
          element={<AddJob setJobs={setJobs} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
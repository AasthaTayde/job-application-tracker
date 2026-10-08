import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ResumeMatcher from "./pages/ResumeMatcher";
import { getJobs } from "./api/jobs";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getJobs()
      .then((res) => setJobs(res.data))
      .catch((error) => console.log("Error fetching jobs:", error))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return <div className="auth-loading">Loading JobTrack...</div>;

  return <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard jobs={jobs} setJobs={setJobs} loading={loading} />} />
        <Route path="/add" element={<AddJob setJobs={setJobs} />} />
        <Route path="/matcher" element={<ResumeMatcher />} />
      </Route>
    </Routes>
  </>;
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

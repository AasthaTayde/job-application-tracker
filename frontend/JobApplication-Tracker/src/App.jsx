import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

function App() {
  const [jobs, setJobs] = useState([]);//Main State(Add jobs)

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard jobs={jobs} />} />
        <Route path="/add" element={<AddJob setJobs={setJobs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
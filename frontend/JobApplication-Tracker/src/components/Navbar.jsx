import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", display: "flex", gap: "20px",background: "beige",
    color: "black" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/add">Add Job</Link>
    </div>
  );
}
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-mark">J</span>
          JobTrack
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/add" className={`nav-link ${location.pathname === "/add" ? "active" : ""}`}>Add Job</Link>
          <Link to="/matcher" className={`nav-link ${location.pathname === "/matcher" ? "active" : ""}`}>AI Matcher</Link>
        </div>

        <div className="nav-user">
          <span className="nav-user-name">Hi, {user.name.split(" ")[0]}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

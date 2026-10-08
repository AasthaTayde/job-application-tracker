import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not log you in.");
    } finally {
      setSubmitting(false);
    }
  };

  return <AuthShell title="Welcome back" subtitle="Sign in and pick up where you left off.">
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required /></label>
      <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required /></label>
      {error && <p className="auth-error">{error}</p>}
      <button className="auth-submit" disabled={submitting}>{submitting ? "Signing in..." : "Sign in"}</button>
      <p className="auth-switch">New to JobTrack? <Link to="/register">Create an account</Link></p>
    </form>
  </AuthShell>;
}

function AuthShell({ title, subtitle, children }) {
  return <main className="auth-page"><div className="auth-brand"><Link to="/" className="navbar-brand"><span className="brand-mark">J</span>JobTrack</Link></div><div className="auth-layout"><div className="auth-pitch"><span>YOUR JOB SEARCH, ORGANIZED</span><h1>Make every application count.</h1><p>Track your progress and use AI to understand where your resume fits best.</p></div><section className="auth-card"><div className="auth-card-heading"><span>WELCOME TO JOBTRACK</span><h2>{title}</h2><p>{subtitle}</p></div>{children}</section></div></main>;
}

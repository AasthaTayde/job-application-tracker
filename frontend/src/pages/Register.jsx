import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="auth-page"><div className="auth-brand"><Link to="/" className="navbar-brand"><span className="brand-mark">J</span>JobTrack</Link></div><div className="auth-layout"><div className="auth-pitch"><span>START WITH A CLEAN SLATE</span><h1>A smarter workspace for your next opportunity.</h1><p>Create your private workspace, track your applications and unlock AI-powered matching.</p></div><section className="auth-card"><div className="auth-card-heading"><span>CREATE YOUR ACCOUNT</span><h2>Let's get started</h2><p>It takes less than a minute.</p></div><form className="auth-form" onSubmit={handleSubmit}><label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required /></label><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required /></label><label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" required /></label>{error && <p className="auth-error">{error}</p>}<button className="auth-submit" disabled={submitting}>{submitting ? "Creating account..." : "Create account"}</button><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></form></section></div></main>;
}

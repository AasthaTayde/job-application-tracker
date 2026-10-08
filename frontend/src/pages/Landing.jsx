import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="hero-copy">
          <span className="hero-pill">AI-powered job search companion</span>
          <h1>Turn your job search into a <span>strategy.</span></h1>
          <p>
            Track every application, stay on top of your progress, and use AI
            to see how closely your resume matches the jobs you want.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="hero-primary">Start tracking free</Link>
            <Link to="/login" className="hero-secondary">Sign in</Link>
          </div>
          <div className="hero-proof">
            <span>✓ Application tracking</span>
            <span>✓ Gemini-powered matching</span>
            <span>✓ Private user accounts</span>
          </div>
        </div>

        <div className="hero-product" aria-label="JobTrack dashboard preview">
          <div className="product-topbar">
            <div><span className="window-dot"/><span className="window-dot"/><span className="window-dot"/></div>
            <span>JobTrack</span>
          </div>
          <div className="product-body">
            <div className="mini-heading"><div><small>APPLICATION TRACKER</small><h3>Your job search</h3></div><span className="mini-button">+ Add job</span></div>
            <div className="mini-stats"><div><small>Total</small><strong>24</strong></div><div><small>Interviews</small><strong>6</strong></div><div><small>Offers</small><strong>2</strong></div></div>
            <div className="mini-jobs">
              <div><span className="company-logo">G</span><div><strong>Google</strong><small>Frontend Developer</small></div><b>Interview</b></div>
              <div><span className="company-logo purple">M</span><div><strong>Microsoft</strong><small>Software Engineer</small></div><b>Applied</b></div>
              <div><span className="company-logo orange">A</span><div><strong>Atlassian</strong><small>React Developer</small></div><b>Offer</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-intro"><span>ONE WORKSPACE</span><h2>Everything you need to move from application to offer.</h2></div>
        <div className="feature-grid">
          <article><div className="feature-icon">01</div><h3>Track every opportunity</h3><p>Keep applications, companies, roles, dates and hiring stages organized in one clean dashboard.</p></article>
          <article className="feature-highlight"><div className="feature-icon">AI</div><h3>Match your resume to the role</h3><p>Upload your PDF resume and paste a job description to get an AI-generated match score, matching skills and missing skills.</p></article>
          <article><div className="feature-icon">03</div><h3>Stay focused</h3><p>Search and filter your applications so you always know what needs attention next.</p></article>
        </div>
      </section>

      <section className="ai-banner">
        <div><span>POWERED BY GEMINI</span><h2>Apply smarter, not just more.</h2><p>Understand your fit before you spend time tailoring an application.</p></div>
        <Link to="/register" className="hero-primary">Try the AI matcher</Link>
      </section>

      <footer className="landing-footer"><strong>JobTrack</strong><span>Built to make your job search more intentional.</span></footer>
    </main>
  );
}

import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import "@/styles/homepage.css";

export default function NotFound() {
  return (
    <div className="ice-container">
      <Helmet>
        <title>Page Not Found — Sentinel Counsel</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="The page you're looking for doesn't exist. Browse our legal technology resources or return to the homepage." />
      </Helmet>

      <nav className="ice-nav" aria-label="Main navigation">
        <Link href="/" className="ice-logo">
          <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z"
              strokeWidth="1.5"
            />
          </svg>
          <span>Sentinel Counsel</span>
        </Link>
        <div className="ice-nav-links">
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
        </div>
      </nav>

      <main>
        <section className="ice-hero" style={{ minHeight: "60vh" }}>
          <div className="hero-content" style={{ textAlign: "center" }}>
            <div className="hero-badge">404 — Page Not Found</div>
            <h1>
              This Page Doesn't <em>Exist</em>
            </h1>
            <p className="hero-sub">
              The page you're looking for may have been moved or no longer exists.
              Head back to the homepage or browse our resources.
            </p>
            <div className="hero-actions">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <Link href="/resources" className="btn-ghost">
                Browse Resources
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="ice-footer">
        <div className="footer-left">
          <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z"
              strokeWidth="1.5"
            />
          </svg>
          <span>Sentinel Counsel</span>
        </div>
        <div className="footer-status">SYSTEM STATUS: OPERATIONAL</div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
          <a href="https://www.linkedin.com/company/sntlabs" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com/sntlabs" target="_blank" rel="noopener noreferrer">X / Twitter</a>
        </div>
      </footer>
    </div>
  );
}

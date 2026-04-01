import { useEffect, useState } from "react";
import { Link } from "wouter";
import "@/styles/homepage.css";
import "@/styles/overview.css";

export default function OverviewPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ice-container">
      <nav className={`ice-nav ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="ice-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </Link>
        <div className="ice-nav-links">
          <Link href="/">Home</Link>
          <Link href="/overview" className="ice-nav-active">Overview</Link>
          <a href="/#contact" className="ice-nav-cta">Request Demo</a>
        </div>
      </nav>

      <section className="ov-hero">
        <div className="hero-content">
          <div className="hero-badge">
            Platform Overview
          </div>
          <h1>Everything Sentinel Counsel<br />Delivers — <em>At a Glance</em></h1>
          <p className="hero-sub">
            One platform. Five pillars. Zero compromise on privilege.
          </p>
        </div>
      </section>

      <section className="ov-value">
        <div className="ov-value-inner">
          <span className="mono-label">The Problem</span>
          <h2>AI Is Transforming Law.<br />Privilege Is Being Left Behind.</h2>
          <p className="ov-value-desc">
            Consumer AI tools expose sensitive communications to third parties, waiving attorney-client privilege. After <em>United States v. Heppner</em> (S.D.N.Y. 2026), the risk is no longer theoretical — it's precedent. Sentinel Counsel gives your firm the full power of AI without sacrificing the protections your clients depend on.
          </p>
        </div>
      </section>

      <section className="ov-pillars">
        <span className="mono-label">Five Pillars of Privileged Intelligence</span>
        <h2>What You Get</h2>

        <div className="ov-pillar-grid">
          <div className="ov-pillar-card">
            <div className="ov-pillar-num">01</div>
            <div className="ov-pillar-content">
              <h3>Privileged AI Access</h3>
              <p>Clients use AI without waiving privilege. Every interaction is wrapped in attorney work-product protections with a full audit trail.</p>
            </div>
          </div>

          <div className="ov-pillar-card">
            <div className="ov-pillar-num">02</div>
            <div className="ov-pillar-content">
              <h3>Ambient Intelligence</h3>
              <p>Real-time AI for depositions, meetings, and interviews. Capture, summarize, and flag inconsistencies as testimony happens.</p>
            </div>
          </div>

          <div className="ov-pillar-card">
            <div className="ov-pillar-num">03</div>
            <div className="ov-pillar-content">
              <h3>Investigation Orchestration</h3>
              <p>Manage thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
            </div>
          </div>

          <div className="ov-pillar-card">
            <div className="ov-pillar-num">04</div>
            <div className="ov-pillar-content">
              <h3>Full E-Discovery</h3>
              <p>End-to-end electronic discovery with predictive coding, privilege logging, and production management — in a secure, defensible environment.</p>
            </div>
          </div>

          <div className="ov-pillar-card">
            <div className="ov-pillar-num">05</div>
            <div className="ov-pillar-content">
              <h3>Secure Client Portal</h3>
              <p>A protected gateway for clients to interact with AI under the umbrella of privilege. Full access controls and defensible data handling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ov-privilege">
        <div className="ov-priv-grid">
          <div className="ov-priv-left">
            <span className="mono-label">Privilege Protection</span>
            <h2>The Vault Around Your Practice</h2>
            <p>Built from the ground up to prevent privilege waiver — not retrofitted.</p>
          </div>
          <div className="ov-priv-right">
            <div className="ov-priv-item">
              <div className="ov-priv-dot"></div>
              <div>
                <h4>Zero Third-Party Exposure</h4>
                <p>Data never leaves the privilege boundary. No model training on your inputs.</p>
              </div>
            </div>
            <div className="ov-priv-item">
              <div className="ov-priv-dot"></div>
              <div>
                <h4>Defensible Audit Trail</h4>
                <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions.</p>
              </div>
            </div>
            <div className="ov-priv-item">
              <div className="ov-priv-dot"></div>
              <div>
                <h4>Work Product Compliant</h4>
                <p>Satisfies both attorney-client privilege and work product protection standards.</p>
              </div>
            </div>
            <div className="ov-priv-item">
              <div className="ov-priv-dot"></div>
              <div>
                <h4>Client-Facing AI Under Privilege</h4>
                <p>Clients use AI within a privileged communication framework directed by counsel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ov-security">
        <span className="mono-label">Security Posture</span>
        <h2>Enterprise-Grade by Default</h2>
        <div className="ov-sec-grid">
          <div className="ov-sec-item">
            <div className="ov-sec-num">256-bit</div>
            <h4>AES Encryption</h4>
            <p>Military-grade encryption for data at rest and in transit.</p>
          </div>
          <div className="ov-sec-item">
            <div className="ov-sec-num">Zero</div>
            <h4>Data Retention</h4>
            <p>Nothing is stored, cached, or used for model training. Period.</p>
          </div>
          <div className="ov-sec-item">
            <div className="ov-sec-num">24/7</div>
            <h4>Threat Monitoring</h4>
            <p>Continuous security monitoring and incident response.</p>
          </div>
        </div>
      </section>

      <section className="ov-team">
        <span className="mono-label">Leadership</span>
        <h2>Built by Experts Who've Stood in the Arena</h2>
        <p className="ov-team-desc">
          Former federal and state prosecutors, public company general counsels, and the author of several enterprise-level security treatises — our team has the litigation experience and security expertise to build what the legal industry needs.
        </p>
        <div className="ov-team-creds">
          <span className="ov-team-cred">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Former Federal & State Prosecutors
          </span>
          <span className="ov-team-cred">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Public Company GCs & AGCs
          </span>
          <span className="ov-team-cred">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Enterprise Security Author
          </span>
        </div>
      </section>

      <section className="ov-heppner">
        <div className="ov-heppner-inner">
          <span className="mono-label">The Precedent</span>
          <h2>Why This Matters Now</h2>
          <div className="ov-heppner-quote">
            <div className="case-cite">United States v. Heppner</div>
            <div className="case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026</div>
            <p>Judge Rakoff ruled that sharing privileged communications with a consumer AI platform waives attorney-client privilege. Sentinel Counsel is the answer — purpose-built so this never happens to your firm.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Protect<br />Your Practice?</h2>
        <p className="section-desc">Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
        <a href="/#contact" className="btn-primary">
          Request a Confidential Demo
        </a>
      </section>

      <footer className="ice-footer">
        <div className="footer-left">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </div>
        <div className="footer-status">SYSTEM STATUS: OPERATIONAL</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export function ParchmentNoir() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="parchment-container">
      <svg className="texture-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@400;500&display=swap');

        .texture-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.02;
        }

        .parchment-container {
          --bg-primary: #12110f;
          --bg-secondary: #171512;
          --bg-tertiary: #1c1917;
          --text-heading: #f5efe3;
          --text-heading-dim: #ebe4d4;
          --text-body: #a89f93;
          --text-muted: #9a9285;
          --accent-gold: #c4a265;
          --accent-gold-dim: #b8934a;
          --border: #2a2520;
          --border-dark: #231f1a;
          --danger: #b54444;
          --success: #6b9b6b;

          --font-head: 'Libre Baskerville', serif;
          --font-body: 'Lora', serif;
          --font-mono: 'Source Code Pro', monospace;

          font-family: var(--font-body);
          background-color: var(--bg-primary);
          color: var(--text-body);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          position: relative;
        }

        .parchment-container *, .parchment-container *::before, .parchment-container *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .parchment-container a {
          color: inherit;
          text-decoration: none;
        }

        .parchment-container section {
          padding: 8rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Typography */
        .parchment-container h1, .parchment-container h2, .parchment-container h3, .parchment-container h4 {
          font-family: var(--font-head);
          color: var(--text-heading);
          font-weight: 400;
          line-height: 1.3;
        }

        .parchment-container h1 {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          margin-bottom: 1.5rem;
        }

        .parchment-container h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-bottom: 1.5rem;
        }

        .parchment-container h3 {
          font-size: 1.25rem;
        }

        .parchment-container em {
          font-style: italic;
          font-weight: inherit;
        }

        .parchment-container .section-label {
          font-family: var(--font-head);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          display: block;
        }

        /* Nav */
        .parchment-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          transition: all 0.3s ease;
          background: transparent;
        }
        .parchment-nav.scrolled {
          background: rgba(18, 17, 15, 0.95);
          padding: 1.5rem 4rem;
          border-bottom: 1px solid var(--border);
        }

        .parchment-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-head);
          font-size: 1.25rem;
          color: var(--text-heading);
        }
        .parchment-logo svg {
          width: 24px;
          height: 24px;
          stroke: var(--accent-gold);
        }

        .parchment-nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
          font-family: var(--font-head);
        }
        .parchment-nav-links a {
          font-size: 0.9rem;
          color: var(--text-body);
          transition: color 0.2s ease;
        }
        .parchment-nav-links a:hover {
          color: var(--accent-gold);
        }
        .parchment-nav-cta {
          border: 1px solid var(--accent-gold-dim);
          padding: 0.5rem 1.25rem;
          color: var(--accent-gold) !important;
          transition: all 0.2s ease;
        }
        .parchment-nav-cta:hover {
          background: rgba(196, 162, 101, 0.05);
        }

        /* Hero */
        .parchment-hero {
          padding-top: 14rem;
          padding-bottom: 6rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-head);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .hero-badge::before, .hero-badge::after {
          content: '❧';
          margin: 0 0.5rem;
          color: var(--accent-gold-dim);
          font-size: 0.7rem;
          font-style: normal;
        }
        .hero-sub {
          font-size: 1.25rem;
          max-width: 600px;
          margin: 1.5rem 0 3rem;
          color: var(--text-body);
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2rem;
          background: transparent;
          border: 1px solid var(--accent-gold);
          color: var(--accent-gold);
          font-family: var(--font-head);
          font-size: 0.95rem;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: rgba(196, 162, 101, 0.08);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2rem;
          border: 1px solid var(--border);
          color: var(--text-heading-dim);
          font-family: var(--font-head);
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: var(--text-muted);
        }

        /* Trust Bar */
        .trust-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 2.5rem 4rem;
          background: var(--bg-secondary);
        }
        .trust-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-head);
          font-size: 0.9rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .trust-marker {
          color: var(--accent-gold-dim);
          font-size: 0.7rem;
          font-style: normal;
        }

        /* Courtroom */
        .courtroom-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: start;
        }
        .courtroom-text p {
          font-size: 1.1rem;
          margin-bottom: 3rem;
          max-width: 480px;
        }
        .voice-prompt {
          border-left: 2px solid var(--accent-gold-dim);
          padding-left: 2rem;
          margin-top: 2rem;
        }
        .voice-prompt span {
          font-family: var(--font-head);
          font-size: 1.25rem;
          font-style: italic;
          color: var(--text-heading);
          line-height: 1.6;
        }

        .demo-terminal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .demo-terminal::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 3rem;
          width: 1px;
          background: rgba(196, 162, 101, 0.15);
          z-index: 1;
        }
        .demo-header {
          display: flex;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-head);
          font-style: italic;
          font-size: 0.9rem;
          color: var(--text-muted);
          position: relative;
          z-index: 2;
        }
        .demo-status {
          color: var(--accent-gold);
        }
        .demo-body {
          padding: 1.5rem 2rem 1.5rem 4rem;
          position: relative;
          z-index: 2;
        }
        .demo-step {
          padding: 1.5rem 0;
          border-bottom: 1px dashed var(--border);
        }
        .demo-step:last-child {
          border-bottom: none;
        }
        
        .step-label {
          color: var(--text-heading);
          font-family: var(--font-head);
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
        }
        .step-desc {
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .step-result {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .result-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .result-tag::before {
          content: '›';
          margin-right: 0.4rem;
          color: var(--accent-gold-dim);
        }
        .result-tag.alert { color: var(--danger); }
        .result-tag.alert::before { color: var(--danger); }
        .result-tag.success, .result-tag.voice-tag { color: var(--success); }
        .result-tag.success::before, .result-tag.voice-tag::before { color: var(--success); }

        /* Capabilities */
        .cap-header {
          max-width: 600px;
          margin-bottom: 4rem;
        }
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .cap-card {
          padding: 3rem 2.5rem;
          background: var(--bg-secondary);
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }
        .cap-card:hover {
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--accent-gold);
        }
        .cap-card:hover h3 {
          color: var(--text-heading);
        }
        .cap-icon {
          color: var(--accent-gold);
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        .cap-icon svg { width: 24px; height: 24px; }
        .cap-card h3 { margin-bottom: 1rem; transition: color 0.3s ease; }
        .cap-card p { font-size: 0.95rem; }

        /* Privilege */
        .privilege-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .priv-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1;
          border: 4px double var(--border);
          padding: 1rem;
          max-width: 360px;
          margin: 0 auto;
          background: var(--bg-secondary);
        }
        .priv-inner-border {
          width: 100%;
          height: 100%;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .vault-center {
          width: 80px;
          height: 80px;
          border: 1px solid var(--accent-gold-dim);
          border-radius: 50% 50% 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }
        .vault-center svg { width: 32px; height: 32px; color: var(--accent-gold); }
        .priv-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 3rem;
        }
        .priv-feat {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .priv-feat-dot {
          color: var(--accent-gold-dim);
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
        .priv-feat-text h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--text-heading-dim);
        }
        .priv-feat-text p {
          font-size: 0.95rem;
        }

        /* Case Callout */
        .case-callout {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .case-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .case-ruling {
          margin-top: 4rem;
          position: relative;
        }
        .case-ruling::before {
          content: '“';
          position: absolute;
          top: -2rem;
          left: -4rem;
          font-family: var(--font-head);
          font-size: 8rem;
          color: var(--accent-gold);
          opacity: 0.1;
          line-height: 1;
        }
        .case-ruling::after {
          content: '”';
          position: absolute;
          bottom: 2rem;
          right: -2rem;
          font-family: var(--font-head);
          font-size: 8rem;
          color: var(--accent-gold);
          opacity: 0.1;
          line-height: 1;
        }
        .case-cite {
          font-family: var(--font-head);
          font-style: italic;
          color: var(--text-heading);
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .case-court {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }
        .case-quote {
          font-family: var(--font-head);
          font-size: 1.4rem;
          color: var(--text-heading);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }
        .case-explanation {
          font-size: 1rem;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }
        .case-answer {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-head);
          font-size: 0.95rem;
          color: var(--text-heading);
          padding: 1rem 1.5rem;
          border: 1px solid var(--border);
          background: var(--bg-primary);
        }
        .case-answer svg { width: 18px; height: 18px; stroke: var(--accent-gold); }

        /* Team */
        .team-new-inner {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 6rem;
        }
        .expertise-label {
          font-family: var(--font-head);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--text-heading-dim);
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
        }
        .expertise-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        .expertise-item {
          display: flex;
          gap: 1.5rem;
        }
        .expertise-marker {
          color: var(--accent-gold-dim);
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
        .expertise-content h4 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .expertise-content p {
          font-size: 0.95rem;
        }
        .expertise-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .expertise-cred {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-head);
          font-size: 0.85rem;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
        }
        .expertise-cred svg { width: 14px; height: 14px; stroke: var(--accent-gold-dim); }

        /* Security */
        .security-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .sec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem;
          margin-top: 4rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border);
        }
        .sec-number {
          font-family: var(--font-head);
          font-size: 3.5rem;
          color: var(--text-heading);
          margin-bottom: 1rem;
          line-height: 1;
        }
        .sec-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        .sec-item p {
          font-size: 0.95rem;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 8rem 4rem 10rem;
          border-top: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .cta-section h2 { margin-bottom: 1.5rem; }
        .cta-section .section-desc { margin: 0 auto 3rem; max-width: 600px; font-size: 1.1rem; }

        /* Footer */
        .parchment-footer {
          border-top: 1px solid var(--border);
          padding: 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .parchment-footer::before {
          content: '❧';
          position: absolute;
          top: -0.7rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--accent-gold-dim);
          background: var(--bg-primary);
          padding: 0 1rem;
          font-size: 1.2rem;
        }
        .footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-heading);
          font-family: var(--font-head);
          font-size: 1.1rem;
        }
        .footer-left svg { width: 20px; height: 20px; stroke: var(--accent-gold); }
        .footer-copy {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .footer-links a {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--accent-gold); }

        @media (max-width: 1024px) {
          .parchment-container section { padding: 6rem 2rem; }
          .parchment-nav { padding: 1.5rem 2rem; }
          .courtroom-grid, .team-new-inner, .privilege-inner { grid-template-columns: 1fr; gap: 4rem; }
          .trust-inner { flex-wrap: wrap; gap: 2rem; justify-content: center; }
          .sec-grid { grid-template-columns: 1fr; gap: 3rem; }
          .parchment-footer { flex-direction: column; gap: 2rem; text-align: center; }
          .demo-terminal::before { left: 1.5rem; }
          .demo-body { padding: 1.5rem 1.5rem 1.5rem 2.5rem; }
          .case-ruling::before { left: -1rem; top: -1rem; }
        }
      `}} />

      <nav className={`parchment-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="parchment-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </a>
        <div className="parchment-nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#privilege">Privilege</a>
          <a href="#team">Team</a>
          <a href="#security">Security</a>
          <a href="#contact" className="parchment-nav-cta">Request Demo</a>
        </div>
      </nav>

      <section className="parchment-hero">
        <div className="hero-badge">
          Privileged AI Infrastructure for Law
        </div>
        <h1>AI that <em>Protects</em><br/>Attorney-Client Privilege</h1>
        <p className="hero-sub">
          Sentinel Counsel empowers law firms with secure, privilege-preserving AI — purpose-built for investigations, depositions, and client communications.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Request a Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#capabilities" className="btn-ghost">
            Explore Platform
          </a>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            <span className="trust-marker">◆</span>
            End-to-End Encrypted
          </div>
          <div className="trust-item">
            <span className="trust-marker">◆</span>
            SOC 2 Type II
          </div>
          <div className="trust-item">
            <span className="trust-marker">◆</span>
            Zero Data Retention
          </div>
          <div className="trust-item">
            <span className="trust-marker">◆</span>
            Privilege Compliant
          </div>
        </div>
      </div>

      <section id="courtroom">
        <div className="courtroom-grid">
          <div className="courtroom-text">
            <span className="section-label">For the Courtroom Litigator</span>
            <h2>Your Second Chair<br/>is Now <em>AI</em></h2>
            <p>No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd speak to your best associate — and watch it work.</p>
            <div className="voice-prompt">
              <span>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</span>
            </div>
          </div>
          
          <div className="courtroom-demo">
            <div className="demo-terminal">
              <div className="demo-header">
                <div>Sentinel Counsel — Live Session</div>
                <div className="demo-status">Privileged</div>
              </div>
              <div className="demo-body">
                <div className="demo-step">
                  <div className="step-content">
                    <div className="step-label">Case Files On Demand</div>
                    <div className="step-desc">Your case files surface the moment you need them. Briefs, exhibits, prior testimony — retrieved by voice in seconds, not hours of searching.</div>
                    <div className="step-result">
                      <span className="result-tag">3 depositions</span>
                      <span className="result-tag">12 exhibits</span>
                      <span className="result-tag">2 expert reports</span>
                    </div>
                  </div>
                </div>
                
                <div className="demo-step">
                  <div className="step-content">
                    <div className="step-label">Deponent Lie Detection</div>
                    <div className="step-desc">Real-time cross-reference against prior statements, filings, and public records. Inconsistencies are flagged instantly during live depositions.</div>
                    <div className="step-result">
                      <span className="result-tag alert">3 contradictions found</span>
                      <span className="result-tag">vs. prior sworn statement</span>
                      <span className="result-tag">vs. deponent's emails and text messages</span>
                    </div>
                  </div>
                </div>
                
                <div className="demo-step">
                  <div className="step-content">
                    <div className="step-label">Auto-Built Case Checklist</div>
                    <div className="step-desc">Elements of every cause of action are mapped and tracked automatically. Your case checklist updates in real time as evidence comes in.</div>
                    <div className="step-result">
                      <span className="result-tag success">4 of 6 elements satisfied</span>
                      <span className="result-tag">2 need additional evidence</span>
                    </div>
                  </div>
                </div>
                
                <div className="demo-step">
                  <div className="step-content">
                    <div className="step-label">Instant Discovery Response</div>
                    <div className="step-desc">Respond to interrogatories and document requests in minutes instead of weeks. AI drafts responses, flags privilege issues, and generates privilege logs.</div>
                    <div className="step-result">
                      <span className="result-tag">47 RFPs drafted</span>
                      <span className="result-tag">privilege log generated</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities">
        <div className="cap-header">
          <span className="section-label">Platform</span>
          <h2>Five Pillars of<br/>Privileged Intelligence</h2>
          <p>Every capability engineered to keep your practice protected while unlocking the full power of AI.</p>
        </div>
        
        <div className="cap-grid">
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3>Privileged AI Access</h3>
            <p>Let your clients leverage AI without waiving privilege. Every interaction is wrapped in attorney work-product protections and audit-trailed for defensibility.</p>
          </div>
          
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 2h8"/></svg>
            </div>
            <h3>Ambient Intelligence</h3>
            <p>Real-time AI for meetings, depositions, and client interviews. Capture, summarize, and analyze spoken testimony with privilege-preserving architecture.</p>
          </div>
          
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>Investigation Orchestration</h3>
            <p>Manage large-scale investigations across thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
          </div>
          
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
            </div>
            <h3>Full E-Discovery</h3>
            <p>End-to-end electronic discovery with AI-assisted document review, predictive coding, privilege logging, and production management — all within a secure, defensible environment.</p>
          </div>
          
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <h3>Secure Client Portal</h3>
            <p>Give clients a protected gateway to interact with AI under the umbrella of privilege. Full audit trails, access controls, and defensible data handling.</p>
          </div>
        </div>
      </section>

      <section id="privilege">
        <div className="privilege-inner">
          <div className="priv-visual">
            <div className="priv-inner-border">
              <div className="vault-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
            </div>
          </div>
          
          <div className="priv-text">
            <span className="section-label">Privilege Protection</span>
            <h2>The Vault Around<br/>Your Practice</h2>
            <p>Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>
            
            <div className="priv-features">
              <div className="priv-feat">
                <div className="priv-feat-dot">◆</div>
                <div className="priv-feat-text">
                  <h4>Zero Third-Party Exposure</h4>
                  <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot">◆</div>
                <div className="priv-feat-text">
                  <h4>Defensible Audit Trail</h4>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot">◆</div>
                <div className="priv-feat-text">
                  <h4>Work Product Doctrine Compliant</h4>
                  <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot">◆</div>
                <div className="priv-feat-text">
                  <h4>Client-Facing AI Under Privilege</h4>
                  <p>Empower clients to use AI tools within a privileged communication framework directed by counsel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-callout" id="heppner">
        <div className="case-inner">
          <span className="section-label">The Precedent</span>
          <h2>The Court Has Spoken:<br/>AI Use Can Waive Privilege</h2>
          <p>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>
          
          <div className="case-ruling">
            <div className="case-cite">United States v. Heppner</div>
            <div className="case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026 &bull; Judge Jed S. Rakoff</div>
            
            <div className="case-quote">
              Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves.
            </div>
            
            <p className="case-explanation">
              Judge Rakoff ruled that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. The privilege was destroyed the moment the data was shared.
            </p>
            
            <div className="case-answer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Sentinel Counsel is the answer to Heppner
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="team-new-inner">
          <div className="team-left">
            <span className="section-label">Leadership</span>
            <h2>Built by Experts Who've<br/>Stood in the Arena</h2>
            <p>Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>
          
          <div className="team-right">
            <div className="expertise-label">Deep Experience In</div>
            
            <div className="expertise-list">
              <div className="expertise-item">
                <div className="expertise-marker">◆</div>
                <div className="expertise-content">
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker">◆</div>
                <div className="expertise-content">
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker">◆</div>
                <div className="expertise-content">
                  <h4>Public Company Litigation</h4>
                  <p>General counsels and associate general counsels from publicly traded companies. Deep fluency in SEC enforcement, securities litigation, shareholder disputes, and board-level governance.</p>
                </div>
              </div>
            </div>
            
            <div className="expertise-creds">
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Former Federal &amp; State Prosecutors
              </span>
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Public Company GCs &amp; AGCs
              </span>
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Enterprise Security Author
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="security">
        <div className="security-inner">
          <span className="section-label">Security Posture</span>
          <h2>Enterprise-Grade by Default</h2>
          <p>Built by the people who wrote the security playbook at the world's largest technology companies.</p>
          
          <div className="sec-grid">
            <div className="sec-item">
              <div className="sec-number">256</div>
              <h4>Bit AES Encryption</h4>
              <p>Military-grade encryption for data at rest and in transit. Your case files have never been safer.</p>
            </div>
            <div className="sec-item">
              <div className="sec-number">0</div>
              <h4>Data Retention</h4>
              <p>Prompts and outputs are ephemeral. Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="sec-item">
              <div className="sec-number">24/7</div>
              <h4>Threat Monitoring</h4>
              <p>Continuous security monitoring, intrusion detection, and incident response by a dedicated security team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <h2>Ready to Protect<br/>Your Practice?</h2>
        <p className="section-desc">Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
        <a href="#" className="btn-primary">
          Request a Confidential Demo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </section>

      <footer className="parchment-footer">
        <div className="footer-left">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </div>
        <div className="footer-copy">&copy; 2026 Sentinel Counsel. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from "react";

export function MidnightInk() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="midnight-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Inter:wght@300;400&family=Space+Grotesk:wght@300;400;600&display=swap');

        .midnight-container {
          --bg-primary: #0a0d1a;
          --bg-secondary: #0d1020;
          --bg-tertiary: #121628;
          --text-heading: #f8f9fc;
          --text-body: #8890a5;
          --accent-silver: #9ca3bf;
          --accent-silver-light: #9ca3bf;
          --interactive: #4a8eff;
          --interactive-dark: #3d7be5;
          --danger: #f59e0b;
          --success: #34d399;
          --border: #1a1f35;

          --font-sans: 'Inter', sans-serif;
          --font-heading: 'Space Grotesk', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          font-family: var(--font-sans);
          background-color: var(--bg-primary);
          color: var(--text-body);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
        }

        .midnight-container *, .midnight-container *::before, .midnight-container *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .midnight-container a {
          color: inherit;
          text-decoration: none;
        }

        .midnight-container section {
          padding: 8rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Typography */
        .midnight-container h1, .midnight-container h2, .midnight-container h3, .midnight-container h4 {
          font-family: var(--font-heading);
          color: var(--text-heading);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .midnight-container h1 {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          font-weight: 300;
        }

        .midnight-container h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          margin-bottom: 1.5rem;
        }

        .midnight-container h3 {
          font-size: 1.25rem;
          font-weight: 400;
        }

        .midnight-container em {
          font-style: normal;
          font-weight: 600;
        }

        .midnight-container .mono-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(74, 142, 255, 0.08);
          color: var(--interactive);
          border: 1px solid rgba(74, 142, 255, 0.15);
          margin-bottom: 1.5rem;
        }
        .midnight-container .mono-label::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--interactive);
        }

        /* Nav */
        .midnight-nav {
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
        .midnight-nav.scrolled {
          background: rgba(10, 13, 26, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.5rem 4rem;
          border-bottom: 1px solid var(--border);
        }

        .midnight-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-family: var(--font-heading);
          font-weight: 400;
          color: var(--text-heading);
        }
        .midnight-logo svg {
          width: 24px;
          height: 24px;
          stroke: var(--interactive);
        }

        .midnight-nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
        }
        .midnight-nav-links a {
          font-size: 0.85rem;
          color: var(--text-body);
          transition: color 0.2s ease;
        }
        .midnight-nav-links a:hover {
          color: var(--text-heading);
        }
        .midnight-nav-cta {
          border: 1px solid var(--interactive);
          padding: 0.5rem 1.25rem;
          color: var(--text-heading) !important;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .midnight-nav-cta:hover {
          background: rgba(74, 142, 255, 0.1);
        }

        /* Hero */
        .midnight-hero-wrapper {
          background: radial-gradient(circle at 50% 30%, var(--bg-tertiary) 0%, var(--bg-primary) 70%);
        }
        .midnight-hero {
          padding-top: 16rem;
          padding-bottom: 8rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-silver);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
        }
        .hero-sub {
          font-size: 1.15rem;
          max-width: 600px;
          margin: 1.5rem 0 3rem;
          font-weight: 300;
          color: var(--accent-silver);
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          background: linear-gradient(90deg, var(--interactive-dark), var(--interactive));
          color: #fff;
          font-size: 0.9rem;
          font-weight: 400;
          border-radius: 4px;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9;
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-heading);
          font-size: 0.9rem;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: var(--interactive);
          background: rgba(74, 142, 255, 0.05);
        }

        /* Trust Bar */
        .trust-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 2.5rem 4rem;
          background: var(--bg-secondary);
        }
        .trust-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-silver);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--interactive);
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
          border-left: 2px solid var(--border);
          padding-left: 2rem;
          margin-top: 2rem;
        }
        .voice-prompt span {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-heading);
          font-weight: 300;
        }

        .demo-terminal {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          box-shadow: inset 0 0 30px rgba(74, 142, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        .demo-header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-silver);
          letter-spacing: 0.05em;
          background: var(--bg-tertiary);
        }
        .demo-status {
          color: var(--interactive);
        }
        .demo-body {
          padding: 1.5rem;
        }
        .demo-step {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--border);
        }
        .demo-step:last-child {
          border-bottom: none;
        }
        .step-icon {
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-heading);
          background: var(--bg-primary);
        }
        .step-icon svg {
          width: 14px;
          height: 14px;
        }
        .step-icon.warn { color: var(--danger); border-color: var(--danger); }
        .step-icon.voice-icon { color: var(--interactive); border-color: var(--interactive); }
        
        .step-content {
          flex: 1;
        }
        .step-label {
          color: var(--text-heading);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }
        .step-desc {
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .step-result {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .result-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--border);
          color: var(--accent-silver);
          border-radius: 4px;
        }
        .result-tag.alert { color: var(--danger); border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.05); }
        .result-tag.success, .result-tag.voice-tag { color: var(--success); border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.05); }

        /* Capabilities */
        .cap-header {
          max-width: 600px;
          margin-bottom: 4rem;
        }
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .cap-card {
          padding: 3rem;
          background: var(--bg-primary);
          border-left: 3px solid transparent;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .cap-card:hover {
          background: var(--bg-secondary);
          border-left-color: var(--interactive);
        }
        .cap-card:hover h3 {
          color: var(--text-heading);
        }
        .cap-icon {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          color: var(--interactive);
          background: var(--bg-secondary);
        }
        .cap-icon svg { width: 18px; height: 18px; }
        .cap-card h3 { margin-bottom: 1rem; transition: color 0.3s ease; }
        .cap-card p { font-size: 0.9rem; }

        /* Privilege */
        .privilege-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .priv-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .vault-circle-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px dashed var(--border);
          animation: spin 60s linear infinite;
        }
        
        .vault-circle-inner {
          position: absolute;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          border: 1px dashed var(--accent-silver);
          opacity: 0.3;
          animation: spin-reverse 40s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .vault-center {
          position: relative;
          width: 80px;
          height: 80px;
          background: var(--bg-tertiary);
          border: 1px solid var(--interactive);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(74, 142, 255, 0.2);
          z-index: 2;
        }
        .vault-center svg { width: 28px; height: 28px; color: var(--interactive); }
        
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
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--interactive);
          margin-top: 0.5rem;
          box-shadow: 0 0 8px var(--interactive);
        }
        .priv-feat-text h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .priv-feat-text p {
          font-size: 0.9rem;
        }

        /* Case Callout */
        .case-callout {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .case-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .case-ruling {
          margin-top: 3rem;
          padding-left: 2rem;
          border-left: 2px solid var(--interactive);
        }
        .case-cite {
          font-family: var(--font-mono);
          color: var(--text-heading);
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .case-court {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-silver);
          margin-bottom: 2rem;
        }
        .case-quote {
          font-size: 1.15rem;
          color: var(--text-heading);
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-style: italic;
        }
        .case-explanation {
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .case-answer {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--interactive);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.75rem 1.25rem;
          border: 1px solid var(--interactive);
          border-radius: 4px;
          background: rgba(74, 142, 255, 0.05);
        }
        .case-answer svg { width: 16px; height: 16px; }

        /* Team */
        .team-new-inner {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 6rem;
        }
        .expertise-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-heading);
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
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid var(--interactive);
          margin-top: 0.5rem;
        }
        .expertise-content h4 {
          font-size: 1.1rem;
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
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent-silver);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          background: var(--bg-secondary);
        }
        .expertise-cred svg { width: 14px; height: 14px; color: var(--interactive); }

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
          font-family: var(--font-mono);
          font-size: 3rem;
          font-weight: 300;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }
        .sec-item h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--interactive);
        }
        .sec-item p {
          font-size: 0.9rem;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 8rem 4rem 10rem;
          border-top: 1px solid var(--border);
          background: radial-gradient(circle at 50% 100%, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
        }
        .cta-section h2 { margin-bottom: 1rem; }
        .cta-section .section-desc { margin: 0 auto 3rem; max-width: 600px; }

        /* Footer */
        .midnight-footer {
          border-top: 1px solid var(--border);
          padding: 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-primary);
        }
        .footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-heading);
          font-weight: 400;
          font-family: var(--font-heading);
        }
        .footer-left svg { width: 20px; height: 20px; stroke: var(--interactive); }
        .footer-copy {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-silver);
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .footer-links a {
          font-size: 0.85rem;
          color: var(--accent-silver);
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--text-heading); }

        @media (max-width: 1024px) {
          .midnight-container section { padding: 6rem 2rem; }
          .midnight-nav { padding: 1.5rem 2rem; }
          .courtroom-grid, .team-new-inner, .privilege-inner { grid-template-columns: 1fr; gap: 4rem; }
          .trust-inner { flex-wrap: wrap; gap: 2rem; justify-content: center; }
          .trust-divider { display: none; }
          .sec-grid { grid-template-columns: 1fr; gap: 3rem; }
          .midnight-footer { flex-direction: column; gap: 2rem; text-align: center; }
        }
      `}} />

      <nav className={`midnight-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="midnight-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </a>
        <div className="midnight-nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#privilege">Privilege</a>
          <a href="#team">Team</a>
          <a href="#security">Security</a>
          <a href="#contact" className="midnight-nav-cta">Request Demo</a>
        </div>
      </nav>

      <div className="midnight-hero-wrapper">
        <section className="midnight-hero">
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
      </div>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            <div className="trust-dot"></div>
            End-to-End Encrypted
          </div>
          <div className="trust-item">
            <div className="trust-dot"></div>
            SOC 2 Type II
          </div>
          <div className="trust-item">
            <div className="trust-dot"></div>
            Zero Data Retention
          </div>
          <div className="trust-item">
            <div className="trust-dot"></div>
            Privilege Compliant
          </div>
        </div>
      </div>

      <section id="courtroom">
        <div className="courtroom-grid">
          <div className="courtroom-text">
            <span className="mono-label">For the Courtroom Litigator</span>
            <h2>Your Second Chair<br/>is Now <em>AI</em></h2>
            <p>No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd speak to your best associate — and watch it work.</p>
            <div className="voice-prompt">
              <span>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</span>
            </div>
          </div>
          
          <div className="courtroom-demo">
            <div className="demo-terminal">
              <div className="demo-header">
                <div>SENTINEL COUNSEL — LIVE SESSION</div>
                <div className="demo-status">PRIVILEGED</div>
              </div>
              <div className="demo-body">
                <div className="demo-step">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
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
                  <div className="step-icon warn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
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
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Auto-Built Case Checklist</div>
                    <div className="step-desc">Elements of every cause of action are mapped and tracked automatically. Your case checklist updates in real time as evidence comes in.</div>
                    <div className="step-result">
                      <span className="result-tag success">4 of 6 elements satisfied</span>
                      <span className="result-tag">2 need additional evidence</span>
                      <span className="result-tag">2 elements from depositions</span>
                      <span className="result-tag">2 elements from emails</span>
                    </div>
                  </div>
                </div>
                
                <div className="demo-step">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Instant Discovery Response</div>
                    <div className="step-desc">Respond to interrogatories and document requests in minutes instead of weeks. AI drafts responses, flags privilege issues, and generates privilege logs.</div>
                    <div className="step-result">
                      <span className="result-tag">47 RFPs drafted</span>
                      <span className="result-tag">privilege log generated</span>
                    </div>
                  </div>
                </div>
                
                <div className="demo-step">
                  <div className="step-icon voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Zero Interface. Just Speak.</div>
                    <div className="step-desc">No software to learn. Speak naturally and Sentinel Counsel pulls documents, drafts motions, tags discovery, creates privilege logs — anything your case demands.</div>
                    <div className="step-result">
                      <span className="result-tag voice-tag">Voice-first AI</span>
                      <span className="result-tag">No training required</span>
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
          <span className="mono-label">Platform</span>
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
            <div className="vault-circle-outer"></div>
            <div className="vault-circle-inner"></div>
            <div className="vault-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          
          <div className="priv-text">
            <span className="mono-label">Privilege Protection</span>
            <h2>The Vault Around<br/>Your Practice</h2>
            <p>Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>
            
            <div className="priv-features">
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Zero Third-Party Exposure</h4>
                  <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Defensible Audit Trail</h4>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Work Product Doctrine Compliant</h4>
                  <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
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
          <span className="mono-label">The Precedent</span>
          <h2>The Court Has Spoken:<br/>AI Use Can Waive Privilege</h2>
          <p>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>
          
          <div className="case-ruling">
            <div className="case-cite">United States v. Heppner</div>
            <div className="case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026 &bull; Judge Jed S. Rakoff</div>
            
            <div className="case-quote">
              "Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves."
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
            <span className="mono-label">Leadership</span>
            <h2>Built by Experts Who've<br/>Stood in the Arena</h2>
            <p>Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>
          
          <div className="team-right">
            <div className="expertise-label">Deep Experience In</div>
            
            <div className="expertise-list">
              <div className="expertise-item">
                <div className="expertise-marker"></div>
                <div className="expertise-content">
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker"></div>
                <div className="expertise-content">
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker"></div>
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
          <span className="mono-label">Security Posture</span>
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

      <footer className="midnight-footer">
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

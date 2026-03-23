import React, { useEffect, useState } from "react";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" stroke="#d4b896" strokeWidth="1.5" fill="none"/>
      <path d="M17 8L10 11.5v5.5c0 4.6 3 8.8 7 9.9 4-1.1 7-5.3 7-9.9v-5.5L17 8z" stroke="#d4b896" strokeWidth="1" fill="rgba(212,184,150,0.06)"/>
      <circle cx="17" cy="17" r="2.5" fill="#d4b896"/>
    </svg>
  );
}

export function EditorialSophistication() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="editorial-theme">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Source+Serif+4:wght@300;400;500&family=Source+Code+Pro:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap');

        .editorial-theme {
          --bg-deep: #0a1a14;
          --bg-mid: #0d1f17;
          --bg-light: #12261e;
          --accent: #d4b896;
          --accent-dark: #c9a87c;
          --accent-dim: rgba(212, 184, 150, 0.1);
          --text-head: #f5efe6;
          --text-body: #8fa897;
          --danger: #9b3a3a;
          --danger-dim: rgba(155, 58, 58, 0.1);
          --success: #4a8a5a;
          --success-dim: rgba(74, 138, 90, 0.1);
          --border: #1a3028;
          
          --font-head: 'Cormorant Garamond', serif;
          --font-body: 'Source Serif 4', serif;
          --font-mono: 'Source Code Pro', monospace;
          --font-label: 'Space Grotesk', sans-serif;

          background-color: var(--bg-deep);
          color: var(--text-body);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .editorial-theme * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .editorial-theme::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: overlay;
        }

        /* Typography */
        .editorial-theme h1, .editorial-theme h2, .editorial-theme h3, .editorial-theme h4 {
          font-family: var(--font-head);
          color: var(--text-head);
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: 0.02em;
        }

        .section-label {
          font-family: var(--font-label);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--accent);
          margin-bottom: 1.5rem;
          display: inline-block;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 1.5rem;
        }

        .section-title em {
          font-style: italic;
          color: var(--accent);
        }

        .section-desc {
          font-size: 1.2rem;
          line-height: 1.7;
          max-width: 600px;
          color: var(--text-body);
        }

        /* Layout */
        .ed-section {
          padding: 8rem 3rem;
          position: relative;
        }

        .ed-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 6rem);
          max-width: 1200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
        }

        .ed-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Navigation */
        .ed-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-deep);
          border-bottom: 1px solid var(--border);
          transition: all 0.5s ease;
        }

        .ed-nav.scrolled {
          padding: 1rem 3rem;
          background: rgba(10, 26, 20, 0.95);
          backdrop-filter: blur(10px);
        }

        .ed-nav-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
        }

        .ed-nav-logo svg {
          width: 30px;
          height: 30px;
        }

        .ed-nav-logo span {
          font-family: var(--font-head);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-head);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .ed-nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
        }

        .ed-nav-links a {
          font-family: var(--font-label);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-body);
          text-decoration: none;
          transition: color 0.3s;
        }

        .ed-nav-links a:hover {
          color: var(--accent);
        }

        .ed-nav-cta {
          border: 1px solid var(--accent) !important;
          padding: 0.75rem 1.5rem;
          color: var(--accent) !important;
        }

        .ed-nav-cta:hover {
          background: var(--accent);
          color: var(--bg-deep) !important;
        }

        /* Hero */
        .ed-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 3rem 4rem;
          position: relative;
        }

        .ed-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, var(--bg-mid) 0%, var(--bg-deep) 100%);
          z-index: -1;
        }

        .ed-hero-content {
          max-width: 900px;
          position: relative;
          z-index: 1;
        }

        .ed-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--accent);
          font-family: var(--font-label);
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 3rem;
        }

        .ed-hero h1 {
          font-size: clamp(3rem, 6vw, 5.5rem);
          margin-bottom: 2rem;
          line-height: 1.1;
        }

        .ed-hero h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .ed-hero-sub {
          font-size: 1.3rem;
          color: var(--text-body);
          max-width: 680px;
          margin: 0 auto 3.5rem;
          line-height: 1.8;
        }

        .ed-hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .ed-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: var(--accent);
          color: var(--bg-deep);
          font-family: var(--font-label);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .ed-btn-primary:hover {
          background: var(--text-head);
        }

        .ed-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--text-head);
          border: 1px solid var(--border);
          font-family: var(--font-label);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .ed-btn-ghost:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* Trust Masthead */
        .ed-trust-bar {
          border-top: 2px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 3rem;
          background: var(--bg-mid);
        }

        .ed-trust-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-body);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ed-trust-item svg {
          width: 18px;
          height: 18px;
          color: var(--accent);
        }

        .ed-trust-divider {
          width: 1px;
          height: 20px;
          background: var(--border);
        }

        /* Courtroom Section */
        .ed-courtroom-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
        }

        .ed-voice-prompt {
          margin-top: 3rem;
          padding: 2rem;
          border-left: 2px solid var(--accent);
          background: linear-gradient(90deg, var(--accent-dim), transparent);
        }

        .ed-voice-prompt p {
          font-family: var(--font-head);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--text-head);
          line-height: 1.6;
        }

        /* Manuscript Demo */
        .ed-manuscript {
          background: var(--bg-light);
          border: 1px solid var(--border);
          padding: 3rem;
          position: relative;
        }

        .ed-manuscript::before {
          content: 'EXHIBIT A';
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--accent);
          letter-spacing: 0.2em;
        }

        .ed-manu-header {
          border-bottom: 2px solid var(--border);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .ed-manu-title {
          font-family: var(--font-head);
          font-size: 1.8rem;
          color: var(--text-head);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ed-manu-status {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--success);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ed-manu-step {
          margin-bottom: 2.5rem;
          position: relative;
          padding-left: 2rem;
        }

        .ed-manu-step::before {
          content: '§';
          position: absolute;
          left: 0;
          top: 0.2rem;
          font-family: var(--font-head);
          color: var(--accent);
          font-size: 1.2rem;
        }

        .ed-manu-step h4 {
          font-family: var(--font-head);
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }

        .ed-manu-step p {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .ed-manu-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .ed-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 0.3rem 0.75rem;
          border: 1px dashed var(--border);
          color: var(--text-body);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ed-tag.alert {
          color: var(--danger);
          border-color: var(--danger);
          background: var(--danger-dim);
        }

        .ed-tag.success {
          color: var(--success);
          border-color: var(--success);
          background: var(--success-dim);
        }

        /* Hexagon Icon */
        .ed-hex-icon {
          width: 48px;
          height: 48px;
          background: var(--bg-light);
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          margin-bottom: 1.5rem;
        }

        .ed-hex-icon svg { width: 20px; height: 20px; }

        /* Capabilities Columns */
        .ed-cap-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 3rem 0;
        }

        .ed-cap-card {
          position: relative;
        }

        .ed-cap-card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -1rem;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--border);
        }

        .ed-cap-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .ed-cap-card p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Privilege Vault */
        .ed-privilege-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .ed-vault-visual {
          position: relative;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ed-vault-ring {
          position: absolute;
          border: 1px solid var(--border);
          border-radius: 50%;
          animation: edRotate 45s linear infinite;
        }

        .ed-vault-ring:nth-child(1) { width: 100%; height: 100%; border-color: rgba(26, 48, 40, 0.4); }
        .ed-vault-ring:nth-child(2) { width: 75%; height: 75%; animation-direction: reverse; animation-duration: 35s; border-color: rgba(26, 48, 40, 0.6); }
        .ed-vault-ring:nth-child(3) { width: 50%; height: 50%; animation-duration: 25s; border-color: var(--accent-dim); }

        .ed-vault-ring::after {
          content: '◆';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--accent);
          font-size: 12px;
        }

        @keyframes edRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .ed-vault-center {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--accent);
          background: var(--bg-deep);
          color: var(--accent);
          z-index: 2;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .ed-vault-center svg { width: 32px; height: 32px; }

        .ed-priv-feat {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px dashed var(--border);
        }

        .ed-priv-feat:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .ed-priv-feat h4 {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: var(--text-head);
        }

        .ed-priv-feat p {
          font-size: 1.05rem;
        }

        /* Case Callout Pull Quote */
        .ed-case-callout {
          background: var(--bg-mid);
          text-align: center;
          padding: 8rem 3rem;
        }

        .ed-case-inner {
          max-width: 800px;
          margin: 0 auto;
        }

        .ed-pull-quote {
          margin: 4rem 0;
          position: relative;
          padding: 3rem 0;
        }

        .ed-pull-quote::before, .ed-pull-quote::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 1px;
          background: var(--accent);
        }

        .ed-pull-quote::before { top: 0; }
        .ed-pull-quote::after { bottom: 0; }

        .ed-quote-mark {
          font-family: var(--font-head);
          font-size: 6rem;
          color: var(--accent-dim);
          position: absolute;
          top: -2rem;
          left: 50%;
          transform: translateX(-50%);
          line-height: 1;
        }

        .ed-case-cite {
          font-family: var(--font-head);
          font-size: 1.8rem;
          color: var(--text-head);
          margin-bottom: 0.5rem;
        }

        .ed-case-meta {
          font-family: var(--font-label);
          font-size: 0.75rem;
          color: var(--danger);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .ed-quote-text {
          font-family: var(--font-head);
          font-size: 2.2rem;
          font-style: italic;
          color: var(--text-head);
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }

        .ed-case-exp {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-body);
          margin-bottom: 3rem;
        }

        .ed-case-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border: 1px solid var(--accent);
          font-family: var(--font-head);
          font-size: 1.2rem;
          color: var(--accent);
        }

        /* Team */
        .ed-team-inner {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
        }

        .ed-team-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .ed-team-item {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .ed-team-marker {
          font-family: var(--font-head);
          font-size: 1.5rem;
          color: var(--accent);
          line-height: 1;
          margin-top: 0.2rem;
        }

        .ed-team-item h4 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .ed-team-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .ed-cred-badge {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border);
          color: var(--text-body);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Security */
        .ed-sec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-top: 4rem;
        }

        .ed-sec-item {
          text-align: center;
          padding: 3rem;
          border: 1px solid var(--border);
          background: var(--bg-mid);
        }

        .ed-sec-num {
          font-family: var(--font-head);
          font-size: 4.5rem;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .ed-sec-item h4 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        /* CTA Subscription */
        .ed-cta-section {
          background: var(--bg-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          text-align: center;
          padding: 8rem 3rem;
        }

        .ed-cta-inner {
          max-width: 600px;
          margin: 0 auto;
          padding: 4rem;
          border: 1px solid var(--border);
          background: var(--bg-deep);
          position: relative;
        }

        .ed-cta-inner::before {
          content: '';
          position: absolute;
          inset: 0.5rem;
          border: 1px solid var(--accent-dim);
          pointer-events: none;
        }

        .ed-cta-section h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .ed-cta-section p {
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }

        /* Footer */
        .ed-footer {
          padding: 4rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          font-family: var(--font-label);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ed-footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-head);
        }

        .ed-footer-links {
          display: flex;
          gap: 2rem;
        }

        .ed-footer-links a {
          color: var(--text-body);
          text-decoration: none;
        }

        .ed-footer-links a:hover {
          color: var(--accent);
        }

        @media (max-width: 1024px) {
          .ed-cap-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
            border: none;
            padding: 0;
          }
          .ed-cap-card:not(:last-child)::after { display: none; }
          .ed-cap-card { border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
        }

        @media (max-width: 768px) {
          .ed-nav-links { display: none; }
          .ed-courtroom-inner, .ed-privilege-inner, .ed-team-inner {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .ed-sec-grid { grid-template-columns: 1fr; }
          .ed-footer { flex-direction: column; gap: 2rem; text-align: center; }
          .ed-cap-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <nav className={`ed-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="ed-nav-logo">
          <ShieldIcon />
          <span>Sentinel Counsel</span>
        </a>
        <ul className="ed-nav-links">
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#privilege">Privilege</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#security">Security</a></li>
          <li><a href="#contact" className="ed-nav-cta">Request Demo</a></li>
        </ul>
      </nav>

      <section className="ed-hero">
        <div className="ed-hero-content">
          <div className="ed-hero-badge">Privileged AI Infrastructure for Law</div>
          <h1>AI that <em>Protects</em><br/>Attorney-Client Privilege</h1>
          <p className="ed-hero-sub">
            Sentinel Counsel empowers law firms with secure, privilege-preserving AI — purpose-built for investigations, depositions, and client communications.
          </p>
          <div className="ed-hero-actions">
            <a href="#contact" className="ed-btn-primary">Request a Demo</a>
            <a href="#capabilities" className="ed-btn-ghost">Explore Platform</a>
          </div>
        </div>
      </section>

      <div className="ed-trust-bar">
        <div className="ed-trust-inner">
          <div className="ed-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            End-to-End Encrypted
          </div>
          <div className="ed-trust-divider"></div>
          <div className="ed-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            SOC 2 Type II
          </div>
          <div className="ed-trust-divider"></div>
          <div className="ed-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Zero Data Retention
          </div>
          <div className="ed-trust-divider"></div>
          <div className="ed-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Privilege Compliant
          </div>
        </div>
      </div>

      <section className="ed-section" id="courtroom">
        <div className="ed-container ed-courtroom-inner">
          <div>
            <div className="section-label">For the Courtroom Litigator</div>
            <h2 className="section-title">Your Second Chair<br/>is Now <em>AI</em></h2>
            <p className="section-desc">No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd speak to your best associate — and watch it work.</p>
            
            <div className="ed-voice-prompt">
              <p>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</p>
            </div>
          </div>
          
          <div className="ed-manuscript">
            <div className="ed-manu-header">
              <div className="ed-manu-title">Live Session</div>
              <div className="ed-manu-status">
                <span style={{color: "var(--success)"}}>●</span> Privileged
              </div>
            </div>

            <div className="ed-manu-step">
              <h4>Case Files On Demand</h4>
              <p>Your case files surface the moment you need them. Briefs, exhibits, prior testimony — retrieved by voice in seconds, not hours of searching.</p>
              <div className="ed-manu-tags">
                <span className="ed-tag">3 depositions</span>
                <span className="ed-tag">12 exhibits</span>
                <span className="ed-tag">2 expert reports</span>
              </div>
            </div>

            <div className="ed-manu-step">
              <h4 style={{color: "var(--danger)"}}>Deponent Lie Detection</h4>
              <p>Real-time cross-reference against prior statements, filings, and public records. Inconsistencies are flagged instantly during live depositions.</p>
              <div className="ed-manu-tags">
                <span className="ed-tag alert">3 contradictions found</span>
                <span className="ed-tag">vs. prior sworn statement</span>
                <span className="ed-tag">vs. emails</span>
              </div>
            </div>

            <div className="ed-manu-step">
              <h4>Auto-Built Case Checklist</h4>
              <p>Elements of every cause of action are mapped and tracked automatically. Your case checklist updates in real time as evidence comes in.</p>
              <div className="ed-manu-tags">
                <span className="ed-tag success">4 of 6 elements satisfied</span>
                <span className="ed-tag">2 elements from depositions</span>
              </div>
            </div>

            <div className="ed-manu-step">
              <h4>Instant Discovery Response</h4>
              <p>Respond to interrogatories and document requests in minutes instead of weeks. AI drafts responses, flags privilege issues, and generates privilege logs.</p>
              <div className="ed-manu-tags">
                <span className="ed-tag">47 RFPs drafted</span>
                <span className="ed-tag">privilege log generated</span>
              </div>
            </div>

            <div className="ed-manu-step">
              <h4>Zero Interface. Just Speak.</h4>
              <p>No software to learn. Speak naturally and Sentinel Counsel pulls documents, drafts motions, tags discovery, creates privilege logs — anything your case demands.</p>
              <div className="ed-manu-tags">
                <span className="ed-tag success">Voice-first AI</span>
                <span className="ed-tag">No training required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-section" id="capabilities">
        <div className="ed-container">
          <div className="section-label">Platform</div>
          <h2 className="section-title">Five Pillars of<br/>Privileged Intelligence</h2>
          <p className="section-desc">Every capability engineered to keep your practice protected while unlocking the full power of AI.</p>

          <div className="ed-cap-grid">
            <div className="ed-cap-card">
              <div className="ed-hex-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <h3>Privileged AI Access</h3>
              <p>Let your clients leverage AI without waiving privilege. Every interaction is wrapped in attorney work-product protections and audit-trailed for defensibility.</p>
            </div>
            <div className="ed-cap-card">
              <div className="ed-hex-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 2h8"/></svg>
              </div>
              <h3>Ambient Intelligence</h3>
              <p>Real-time AI for meetings, depositions, and client interviews. Capture, summarize, and analyze spoken testimony with privilege-preserving architecture.</p>
            </div>
            <div className="ed-cap-card">
              <div className="ed-hex-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3>Investigation Orchestration</h3>
              <p>Manage large-scale investigations across thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
            </div>
            <div className="ed-cap-card">
              <div className="ed-hex-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
              </div>
              <h3>Full E-Discovery</h3>
              <p>End-to-end electronic discovery with AI-assisted document review, predictive coding, privilege logging, and production management — all within a secure, defensible environment.</p>
            </div>
            <div className="ed-cap-card">
              <div className="ed-hex-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
              </div>
              <h3>Secure Client Portal</h3>
              <p>Give clients a protected gateway to interact with AI under the umbrella of privilege. Full audit trails, access controls, and defensible data handling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-section" id="privilege">
        <div className="ed-container ed-privilege-inner">
          <div className="ed-vault-visual">
            <div className="ed-vault-ring"></div>
            <div className="ed-vault-ring"></div>
            <div className="ed-vault-ring"></div>
            <div className="ed-vault-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          <div>
            <div className="section-label">Privilege Protection</div>
            <h2 className="section-title">The Vault Around<br/>Your Practice</h2>
            <p className="section-desc" style={{marginBottom: "3rem"}}>Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>

            <div className="ed-priv-feat">
              <h4>Zero Third-Party Exposure</h4>
              <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
            </div>
            <div className="ed-priv-feat">
              <h4>Defensible Audit Trail</h4>
              <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
            </div>
            <div className="ed-priv-feat">
              <h4>Work Product Doctrine Compliant</h4>
              <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
            </div>
            <div className="ed-priv-feat">
              <h4>Client-Facing AI Under Privilege</h4>
              <p>Empower clients to use AI tools within a privileged communication framework directed by counsel.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-case-callout" id="heppner">
        <div className="ed-case-inner">
          <div className="section-label">The Precedent</div>
          <h2 className="section-title">The Court Has Spoken:<br/>AI Use Can Waive Privilege</h2>
          <p className="section-desc" style={{margin: "0 auto"}}>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>

          <div className="ed-pull-quote">
            <div className="ed-quote-mark">"</div>
            <div className="ed-case-cite">United States v. Heppner</div>
            <div className="ed-case-meta">S.D.N.Y. • No. 25-cr-00503 • Feb. 2026 • Judge Jed S. Rakoff</div>
            <div className="ed-quote-text">
              Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves.
            </div>
          </div>

          <p className="ed-case-exp">
            Judge Rakoff ruled that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. The privilege was destroyed the moment the data was shared.
          </p>

          <div className="ed-case-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: "24px", height: "24px"}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Sentinel Counsel is the answer to Heppner
          </div>
        </div>
      </section>

      <section className="ed-section" id="team">
        <div className="ed-container ed-team-inner">
          <div>
            <div className="section-label">Leadership</div>
            <h2 className="section-title">Built by Experts Who've<br/>Stood in the Arena</h2>
            <p className="section-desc">Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>
          
          <div>
            <div className="ed-team-list">
              <div className="ed-team-item">
                <div className="ed-team-marker">§</div>
                <div>
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="ed-team-item">
                <div className="ed-team-marker">§</div>
                <div>
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="ed-team-item">
                <div className="ed-team-marker">§</div>
                <div>
                  <h4>Public Company Litigation</h4>
                  <p>General counsels and associate general counsels from publicly traded companies. Deep fluency in SEC enforcement, securities litigation, shareholder disputes, and board-level governance.</p>
                </div>
              </div>
            </div>

            <div className="ed-team-creds">
              <span className="ed-cred-badge">Former Federal &amp; State Prosecutors</span>
              <span className="ed-cred-badge">Public Company GCs &amp; AGCs</span>
              <span className="ed-cred-badge">Enterprise Security Author</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-section" id="security">
        <div className="ed-container">
          <div className="section-label">Security Posture</div>
          <h2 className="section-title">Enterprise-Grade by Default</h2>
          <p className="section-desc">Built by the people who wrote the security playbook at the world's largest technology companies.</p>

          <div className="ed-sec-grid">
            <div className="ed-sec-item">
              <div className="ed-sec-num">256</div>
              <h4>Bit AES Encryption</h4>
              <p>Military-grade encryption for data at rest and in transit. Your case files have never been safer.</p>
            </div>
            <div className="ed-sec-item">
              <div className="ed-sec-num">0</div>
              <h4>Data Retention</h4>
              <p>Prompts and outputs are ephemeral. Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="ed-sec-item">
              <div className="ed-sec-num">24/7</div>
              <h4>Threat Monitoring</h4>
              <p>Continuous security monitoring, intrusion detection, and incident response by a dedicated security team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ed-cta-section" id="contact">
        <div className="ed-cta-inner">
          <h2>Ready to Protect<br/>Your Practice?</h2>
          <p>Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
          <a href="#" className="ed-btn-primary">
            Request a Confidential Demo
          </a>
        </div>
      </section>

      <footer className="ed-footer">
        <div className="ed-footer-logo">
          <ShieldIcon className="shield-icon" />
          <span>Sentinel Counsel</span>
        </div>
        <div>&copy; 2026 Sentinel Counsel. All rights reserved.</div>
        <div className="ed-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}

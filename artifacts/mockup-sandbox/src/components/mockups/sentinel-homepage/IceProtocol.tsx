import React, { useState, useEffect } from "react";

export function IceProtocol() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ice-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Outfit:wght@200;300&family=Roboto+Mono:wght@400;500&display=swap');

        .ice-container {
          --bg-primary: #0b0d10;
          --bg-secondary: #0e1014;
          --bg-tertiary: #12151a;
          --text-heading: #f0f4f8;
          --text-body: #8892a0;
          --accent-primary: #00d4ff;
          --accent-secondary: #0bc5ea;
          --gray-light: #9ca3af;
          --gray-dark: #6b7280;
          --danger: #ef4444;
          --success: #22c55e;
          --border: #1e2430;

          --font-sans: 'Inter', sans-serif;
          --font-heading: 'Outfit', sans-serif;
          --font-mono: 'Roboto Mono', monospace;

          font-family: var(--font-sans);
          background-color: var(--bg-primary);
          color: var(--text-body);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          position: relative;
          overflow-x: hidden;
        }

        .ice-container *, .ice-container *::before, .ice-container *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .ice-container a {
          color: inherit;
          text-decoration: none;
        }

        .ice-container section {
          padding: 8rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Typography */
        .ice-container h1, .ice-container h2, .ice-container h3, .ice-container h4 {
          font-family: var(--font-heading);
          color: var(--text-heading);
          font-weight: 300;
          line-height: 1.1;
        }

        .ice-container h1 {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          font-weight: 200;
          letter-spacing: -0.02em;
        }

        .ice-container h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 1.5rem;
        }

        .ice-container h3 {
          font-size: 1.25rem;
          font-weight: 300;
        }

        .ice-container em {
          font-style: normal;
          color: var(--accent-primary);
        }

        .ice-container .mono-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gray-light);
          margin-bottom: 1rem;
          display: block;
        }

        /* Nav */
        .ice-nav {
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
        .ice-nav.scrolled {
          background: rgba(11, 13, 16, 0.9);
          backdrop-filter: blur(12px);
          padding: 1.5rem 4rem;
          border-bottom: 1px solid var(--border);
        }

        .ice-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 300;
          color: var(--text-heading);
          letter-spacing: 0.05em;
        }
        .ice-logo svg {
          width: 24px;
          height: 24px;
          stroke: var(--accent-primary);
        }

        .ice-nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ice-nav-links a {
          color: var(--gray-light);
          transition: color 0.2s ease;
        }
        .ice-nav-links a:hover {
          color: var(--accent-primary);
        }
        .ice-nav-cta {
          border: 1px solid var(--border);
          padding: 0.5rem 1.25rem;
          color: var(--accent-primary) !important;
          transition: all 0.2s ease;
        }
        .ice-nav-cta:hover {
          background: rgba(0, 212, 255, 0.1);
          border-color: var(--accent-primary);
        }

        /* Hero */
        .ice-hero {
          padding-top: 16rem;
          padding-bottom: 8rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }
        
        .hero-grid-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
          z-index: 0;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--gray-light);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border);
          background: rgba(11, 13, 16, 0.5);
        }
        .hero-badge::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--success);
        }

        .hero-sub {
          font-size: 1.15rem;
          max-width: 600px;
          margin: 1.5rem 0 3rem; /* Fixed crowding */
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
          padding: 0.875rem 2rem;
          background: transparent;
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: var(--accent-primary);
          color: var(--bg-primary);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 2rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-heading);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: var(--gray-dark);
          background: var(--bg-secondary);
        }

        /* Trust Bar */
        .trust-bar {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg-secondary);
          position: relative;
          z-index: 2;
        }
        .trust-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 4rem;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--gray-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .trust-item::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
        }

        /* Courtroom */
        .courtroom-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: center;
        }
        .courtroom-text p {
          font-size: 1.1rem;
          margin-bottom: 3rem;
          max-width: 480px;
        }
        .voice-prompt {
          border-left: 2px solid var(--accent-primary);
          padding-left: 2rem;
          margin-top: 2rem;
          background: linear-gradient(90deg, rgba(0,212,255,0.05), transparent);
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .voice-prompt span {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--text-heading);
          line-height: 1.6;
        }

        /* Terminal Demo */
        .demo-terminal {
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .demo-terminal::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 10;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--gray-light);
          letter-spacing: 0.1em;
          background: var(--bg-primary);
        }
        .demo-status {
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .demo-status::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .demo-body {
          padding: 1.5rem;
          font-family: var(--font-sans);
          position: relative;
          z-index: 5;
        }
        .demo-step {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px dashed var(--border);
        }
        .demo-step:last-child {
          border-bottom: none;
        }
        .step-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent-primary);
          margin-top: 0.25rem;
        }
        .step-icon svg { width: 18px; height: 18px; }
        .step-icon.warn { color: var(--danger); }
        .step-icon.voice-icon { color: var(--success); }
        
        .step-content { flex: 1; }
        .step-label {
          color: var(--text-heading);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        /* Flashing cursor on the first step */
        .demo-step:first-child .step-label::after {
          content: '█';
          color: var(--accent-primary);
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .step-desc {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: var(--text-body);
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
          background: rgba(107, 114, 128, 0.1);
          border: 1px solid var(--border);
          color: var(--gray-light);
        }
        .result-tag.alert { 
          color: var(--danger); 
          border-color: rgba(239, 68, 68, 0.3); 
          background: rgba(239, 68, 68, 0.05);
        }
        .result-tag.success, .result-tag.voice-tag { 
          color: var(--success); 
          border-color: rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.05);
        }

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
          padding: 3rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          position: relative;
        }
        
        /* Corner bracket indicator on hover */
        .cap-card::before {
          content: '';
          position: absolute;
          top: -1px;
          right: -1px;
          width: 15px;
          height: 15px;
          border-top: 2px solid var(--accent-primary);
          border-right: 2px solid var(--accent-primary);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .cap-card:hover {
          border-color: var(--accent-primary);
          background: var(--bg-tertiary);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.05);
          transform: translateY(-2px);
        }
        .cap-card:hover::before {
          opacity: 1;
        }
        .cap-card:hover h3 {
          color: var(--accent-primary);
        }

        .cap-icon {
          color: var(--gray-light);
          margin-bottom: 2rem;
          transition: color 0.3s ease;
        }
        .cap-card:hover .cap-icon {
          color: var(--accent-primary);
        }
        .cap-icon svg { width: 28px; height: 28px; }
        .cap-card h3 { margin-bottom: 1rem; transition: color 0.3s ease; font-size: 1.35rem; }
        .cap-card p { font-size: 0.95rem; }

        /* Privilege Vault */
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
          max-width: 450px;
          margin: 0 auto;
        }
        
        /* Concentric circles */
        .vault-ring-1, .vault-ring-2, .vault-ring-3 {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--border);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .vault-ring-1 { width: 100%; height: 100%; border: 1px dashed var(--border); }
        .vault-ring-2 { width: 70%; height: 70%; }
        .vault-ring-3 { width: 40%; height: 40%; background: var(--bg-secondary); }
        
        /* Tick marks */
        .vault-ticks {
          position: absolute;
          width: 100%; height: 100%;
          top: 0; left: 0;
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 9deg,
            var(--border) 9deg 10deg
          );
          border-radius: 50%;
          mask-image: radial-gradient(transparent 68%, black 70%);
          -webkit-mask-image: radial-gradient(transparent 68%, black 70%);
          animation: spin 60s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .vault-center {
          position: relative;
          z-index: 10;
          width: 80px;
          height: 80px;
          background: var(--bg-primary);
          border: 1px solid var(--accent-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
          animation: vault-pulse 3s ease-in-out infinite;
        }
        @keyframes vault-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 212, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.4); }
        }
        .vault-center svg { width: 32px; height: 32px; color: var(--accent-primary); }
        
        .priv-features {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-top: 3rem;
        }
        .priv-feat {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .priv-feat-dot {
          width: 8px;
          height: 8px;
          background: transparent;
          border: 1px solid var(--accent-primary);
          margin-top: 0.4rem;
          position: relative;
        }
        .priv-feat-dot::after {
          content: '';
          position: absolute;
          top: 2px; left: 2px; right: 2px; bottom: 2px;
          background: var(--accent-primary);
        }

        .priv-feat-text h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
          color: var(--text-heading);
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
        .case-callout::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: var(--accent-primary);
        }
        .case-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .case-ruling {
          margin-top: 3rem;
          padding: 2.5rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
        }
        .case-cite {
          font-family: var(--font-mono);
          color: var(--accent-primary);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        .case-court {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--gray-light);
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .case-quote {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--text-heading);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          padding-left: 1.5rem;
          border-left: 2px solid var(--border);
        }
        .case-explanation {
          font-size: 0.95rem;
          margin-bottom: 2.5rem;
        }
        .case-answer {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--success);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.8rem 1.5rem;
          border: 1px solid rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.05);
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
          letter-spacing: 0.2em;
          color: var(--gray-light);
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2.5rem;
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
          font-family: var(--font-mono);
          color: var(--accent-primary);
          font-size: 1rem;
          line-height: 1.5;
        }
        .expertise-marker::before { content: '>'; }
        
        .expertise-content h4 {
          font-size: 1.2rem;
          margin-bottom: 0.75rem;
        }
        .expertise-content p {
          font-size: 0.95rem;
        }
        .expertise-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .expertise-cred {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-heading);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
        }
        .expertise-cred svg { width: 14px; height: 14px; color: var(--accent-primary); }

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
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--text-heading);
          margin-bottom: 1rem;
          display: inline-block;
          border-bottom: 2px solid var(--accent-primary);
          padding-bottom: 0.25rem;
        }
        .sec-item h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        .sec-item h4::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          background: var(--success);
          border-radius: 50%;
        }
        .sec-item p {
          font-size: 0.95rem;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 8rem 4rem 10rem;
          border-top: 1px solid var(--border);
          background: radial-gradient(circle at center, rgba(0,212,255,0.03) 0%, transparent 60%);
        }
        .cta-section h2 { margin-bottom: 1.5rem; }
        .cta-section .section-desc { margin: 0 auto 3rem; max-width: 600px; }

        /* Footer */
        .ice-footer {
          border-top: 1px solid var(--border);
          padding: 3rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
        }
        .footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-heading);
          font-family: var(--font-heading);
        }
        .footer-left svg { width: 20px; height: 20px; stroke: var(--accent-primary); }
        .footer-status {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.1em;
        }
        .footer-status::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          background: var(--success);
          border-radius: 50%;
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .footer-links a {
          color: var(--gray-light);
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--accent-primary); }

        @media (max-width: 1024px) {
          .ice-container section { padding: 6rem 2rem; }
          .ice-nav { padding: 1.5rem 2rem; }
          .courtroom-grid, .team-new-inner, .privilege-inner { grid-template-columns: 1fr; gap: 4rem; }
          .trust-inner { flex-wrap: wrap; gap: 2rem; justify-content: center; }
          .sec-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ice-footer { flex-direction: column; gap: 2rem; text-align: center; }
          .hero-actions { flex-direction: column; width: 100%; max-width: 300px; }
        }
      `}} />

      <nav className={`ice-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="ice-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </a>
        <div className="ice-nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#privilege">Privilege</a>
          <a href="#team">Team</a>
          <a href="#security">Security</a>
          <a href="#contact" className="ice-nav-cta">Request Demo</a>
        </div>
      </nav>

      <section className="ice-hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">
            Privileged AI Infrastructure
          </div>
          <h1>AI that <em>Protects</em><br/>Attorney-Client Privilege</h1>
          <p className="hero-sub">
            Sentinel Counsel empowers law firms with secure, privilege-preserving AI — purpose-built for investigations, depositions, and client communications.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Request a Demo
            </a>
            <a href="#capabilities" className="btn-ghost">
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">
            End-to-End Encrypted
          </div>
          <div className="trust-item">
            SOC 2 Type II
          </div>
          <div className="trust-item">
            Zero Data Retention
          </div>
          <div className="trust-item">
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
                <div className="demo-status">SESSION ENCRYPTED</div>
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
            <div className="vault-ticks"></div>
            <div className="vault-ring-1"></div>
            <div className="vault-ring-2"></div>
            <div className="vault-ring-3"></div>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
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

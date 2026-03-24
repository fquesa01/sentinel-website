import React, { useState, useEffect } from "react";

export function Foundry() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="foundry-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .foundry-container {
          --bg-primary: #0B0B12;
          --bg-secondary: #12121C;
          --bg-tertiary: #1A1A28;
          --bg-nav: #08080E;

          --navy-deep: #1A2744;
          --navy-mid: #243356;
          --navy-light: #2E4068;

          --gold-primary: #C9A84C;
          --gold-light: #D4B85A;
          --gold-muted: #8B7A3C;
          --gold-glow: rgba(201, 168, 76, 0.15);

          --text-primary: #E8E6E1;
          --text-heading: #FFFFFF;
          --text-secondary: #9B98A0;
          --text-muted: #6B6876;
          --text-on-gold: #0B0B12;

          --status-positive: #4ECDC4;
          --status-warning: #E0A458;
          --status-danger: #D45555;
          --status-info: #5B8DEF;

          --border-subtle: rgba(255, 255, 255, 0.06);
          --border-medium: rgba(255, 255, 255, 0.12);
          --border-gold: rgba(201, 168, 76, 0.3);

          --font-display: 'DM Serif Display', Georgia, serif;
          --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

          --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
          --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
          --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
          --shadow-gold: 0 0 24px rgba(201, 168, 76, 0.15);

          font-family: var(--font-body);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
          position: relative;
          overflow-x: hidden;
        }

        .foundry-container *, .foundry-container *::before, .foundry-container *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .foundry-container a {
          color: inherit;
          text-decoration: none;
        }

        .foundry-container section {
          padding: 96px 48px;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .foundry-container h1, .foundry-container h2, .foundry-container h3, .foundry-container h4 {
          font-family: var(--font-display);
          color: var(--text-heading);
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .foundry-container h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          line-height: 1.2;
        }

        .foundry-container h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .foundry-container h3 {
          font-size: 1.25rem;
          line-height: 1.3;
        }

        .foundry-container h4 {
          font-size: 1.1rem;
          line-height: 1.3;
        }

        .foundry-container em {
          font-style: normal;
          color: var(--gold-primary);
        }

        .foundry-container p {
          line-height: 1.6;
          color: var(--text-primary);
        }

        .fo-section-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          display: block;
          font-weight: 500;
        }

        .fo-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          padding: 0 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          transition: all 0.2s ease;
          background: transparent;
        }
        .fo-nav.scrolled {
          background: rgba(8, 8, 14, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .fo-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--text-heading);
        }
        .fo-logo svg {
          width: 22px;
          height: 22px;
          stroke: var(--gold-primary);
        }

        .fo-nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .fo-nav-links a {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .fo-nav-links a:hover {
          color: var(--text-primary);
        }
        .fo-nav-cta {
          background: var(--gold-primary);
          color: var(--text-on-gold) !important;
          padding: 8px 20px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          box-shadow: 0 0 20px var(--gold-glow);
        }
        .fo-nav-cta:hover {
          background: var(--gold-light);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.25);
        }

        .fo-hero {
          padding-top: 180px;
          padding-bottom: 96px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        .fo-hero-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse 60% 40% at 20% 30%, rgba(201, 168, 76, 0.04) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .fo-hero-content {
          position: relative;
          z-index: 2;
        }

        .fo-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          padding: 8px 16px;
          border: 1px solid var(--border-medium);
          border-radius: 4px;
          background: var(--bg-secondary);
        }
        .fo-hero-badge::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--status-positive);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--status-positive);
        }

        .fo-hero-sub {
          font-size: 1.125rem;
          max-width: 600px;
          margin: 1.5rem 0 2.5rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .fo-hero-actions {
          display: flex;
          gap: 1rem;
        }

        .fo-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 12px 28px;
          background: var(--gold-primary);
          color: var(--text-on-gold);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 4px;
          transition: all 0.2s ease;
          cursor: pointer;
          box-shadow: 0 0 20px var(--gold-glow);
        }
        .fo-btn-primary:hover {
          background: var(--gold-light);
          box-shadow: 0 0 30px rgba(201, 168, 76, 0.25);
        }

        .fo-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 12px 28px;
          border: 1px solid var(--border-medium);
          background: transparent;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .fo-btn-secondary:hover {
          border-color: var(--gold-muted);
          color: var(--gold-primary);
        }

        .fo-trust-bar {
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          position: relative;
          z-index: 2;
        }
        .fo-trust-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 48px;
        }
        .fo-trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .fo-trust-item::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--status-positive);
          border-radius: 50%;
        }

        .fo-courtroom-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: center;
        }
        .fo-courtroom-text p {
          font-size: 1.05rem;
          margin-bottom: 2rem;
          max-width: 480px;
          color: var(--text-secondary);
        }
        .fo-voice-prompt {
          border-left: 3px solid var(--gold-primary);
          padding: 16px 0 16px 24px;
          margin-top: 24px;
          background: linear-gradient(90deg, rgba(201, 168, 76, 0.04), transparent);
          border-radius: 0 4px 4px 0;
        }
        .fo-voice-prompt span {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .fo-terminal {
          border: 1px solid var(--border-subtle);
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: var(--shadow-lg);
        }

        .fo-terminal-header {
          display: flex;
          justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: var(--bg-nav);
        }
        .fo-terminal-status {
          color: var(--status-positive);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .fo-terminal-status::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          background: var(--status-positive);
          border-radius: 50%;
          animation: fo-pulse 2s infinite;
        }

        @keyframes fo-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .fo-terminal-body {
          padding: 20px;
          font-family: var(--font-body);
        }
        .fo-demo-step {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .fo-demo-step:last-child {
          border-bottom: none;
        }
        .fo-step-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-shrink: 0;
          color: var(--gold-primary);
          margin-top: 2px;
        }
        .fo-step-icon svg { width: 18px; height: 18px; }
        .fo-step-icon.warn { color: var(--status-danger); }
        .fo-step-icon.voice-icon { color: var(--status-positive); }
        
        .fo-step-content { flex: 1; }
        .fo-step-label {
          color: var(--text-heading);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .fo-demo-step:first-child .fo-step-label::after {
          content: '\u2588';
          color: var(--gold-primary);
          animation: fo-blink 1s step-end infinite;
          font-size: 0.8em;
        }
        @keyframes fo-blink {
          50% { opacity: 0; }
        }

        .fo-step-desc {
          font-size: 0.875rem;
          margin-bottom: 10px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .fo-step-result {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .fo-result-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 3px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: 4px;
        }
        .fo-result-tag.alert { 
          color: var(--status-danger); 
          border-color: rgba(212, 85, 85, 0.3); 
          background: rgba(212, 85, 85, 0.06);
        }
        .fo-result-tag.success, .fo-result-tag.voice-tag { 
          color: var(--status-positive); 
          border-color: rgba(78, 205, 196, 0.3);
          background: rgba(78, 205, 196, 0.06);
        }

        .fo-cap-header {
          max-width: 600px;
          margin-bottom: 48px;
        }
        .fo-cap-header p {
          color: var(--text-secondary);
        }
        .fo-cap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 16px;
        }
        .fo-cap-card {
          padding: 24px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .fo-cap-card:hover {
          border-color: var(--border-gold);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
          transform: translateY(-1px);
        }
        .fo-cap-card:hover h3 {
          color: var(--gold-primary);
        }

        .fo-cap-icon {
          color: var(--text-secondary);
          margin-bottom: 20px;
          transition: color 0.2s ease;
        }
        .fo-cap-card:hover .fo-cap-icon {
          color: var(--gold-primary);
        }
        .fo-cap-icon svg { width: 24px; height: 24px; }
        .fo-cap-card h3 { margin-bottom: 12px; transition: color 0.2s ease; }
        .fo-cap-card p { font-size: 0.95rem; color: var(--text-secondary); }

        .fo-privilege-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .fo-priv-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .fo-vault-ring-1, .fo-vault-ring-2, .fo-vault-ring-3 {
          position: absolute;
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .fo-vault-ring-1 { width: 100%; height: 100%; border: 1px solid var(--border-subtle); }
        .fo-vault-ring-2 { width: 70%; height: 70%; border: 1px solid rgba(255,255,255,0.04); }
        .fo-vault-ring-3 { width: 40%; height: 40%; background: var(--bg-secondary); border: 1px solid var(--border-subtle); }
        
        .fo-vault-ticks {
          position: absolute;
          width: 100%; height: 100%;
          top: 0; left: 0;
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 9deg,
            rgba(255,255,255,0.04) 9deg 10deg
          );
          border-radius: 50%;
          mask-image: radial-gradient(transparent 68%, black 70%);
          -webkit-mask-image: radial-gradient(transparent 68%, black 70%);
          animation: fo-spin 60s linear infinite;
        }

        @keyframes fo-spin {
          100% { transform: rotate(360deg); }
        }

        .fo-vault-center {
          position: relative;
          z-index: 10;
          width: 72px;
          height: 72px;
          background: var(--bg-primary);
          border: 1px solid var(--gold-muted);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-gold);
          animation: fo-vault-pulse 3s ease-in-out infinite;
        }
        @keyframes fo-vault-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(201, 168, 76, 0.1); }
          50% { box-shadow: 0 0 30px rgba(201, 168, 76, 0.3); }
        }
        .fo-vault-center svg { width: 28px; height: 28px; color: var(--gold-primary); }
        
        .fo-priv-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
        }
        .fo-priv-feat {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .fo-priv-feat-marker {
          width: 3px;
          height: 100%;
          min-height: 48px;
          background: var(--navy-mid);
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .fo-priv-feat-text h4 {
          margin-bottom: 4px;
          color: var(--text-heading);
        }
        .fo-priv-feat-text p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .fo-case-callout {
          background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(26, 39, 68, 0.2) 100%);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }
        .fo-case-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .fo-case-ruling {
          margin-top: 32px;
          padding: 32px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
        }
        .fo-case-cite {
          font-family: var(--font-display);
          color: var(--gold-primary);
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .fo-case-court {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 24px;
          letter-spacing: 0.04em;
        }
        .fo-case-quote {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--text-heading);
          line-height: 1.6;
          margin-bottom: 24px;
          padding-left: 20px;
          border-left: 3px solid var(--navy-mid);
          font-style: italic;
        }
        .fo-case-explanation {
          font-size: 0.95rem;
          margin-bottom: 24px;
          color: var(--text-secondary);
        }
        .fo-case-answer {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--status-positive);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 20px;
          border: 1px solid rgba(78, 205, 196, 0.3);
          background: rgba(78, 205, 196, 0.06);
          border-radius: 4px;
        }
        .fo-case-answer svg { width: 16px; height: 16px; }

        .fo-team-inner {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 64px;
        }
        .fo-expertise-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 32px;
          font-weight: 500;
        }
        .fo-expertise-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .fo-expertise-item {
          display: flex;
          gap: 16px;
        }
        .fo-expertise-marker {
          width: 3px;
          background: var(--navy-mid);
          border-radius: 2px;
          flex-shrink: 0;
        }
        
        .fo-expertise-content h4 {
          margin-bottom: 8px;
        }
        .fo-expertise-content p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .fo-expertise-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
        }
        .fo-expertise-cred {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          padding: 8px 16px;
          border-radius: 4px;
        }
        .fo-expertise-cred svg { width: 14px; height: 14px; color: var(--gold-primary); }

        .fo-security-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .fo-security-inner > p {
          color: var(--text-secondary);
        }
        .fo-sec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
          padding-top: 48px;
          border-top: 1px solid var(--border-subtle);
        }
        .fo-sec-number {
          font-family: var(--font-mono);
          font-size: 3rem;
          font-weight: 400;
          color: var(--text-heading);
          margin-bottom: 8px;
          display: inline-block;
          border-bottom: 2px solid var(--gold-primary);
          padding-bottom: 4px;
        }
        .fo-sec-item h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .fo-sec-item h4::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          background: var(--status-positive);
          border-radius: 50%;
        }
        .fo-sec-item p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .fo-cta-section {
          text-align: center;
          padding: 96px 48px 120px;
          border-top: 1px solid var(--border-subtle);
          background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(26, 39, 68, 0.15) 50%, var(--bg-primary) 100%);
        }
        .fo-cta-section h2 { margin-bottom: 16px; }
        .fo-cta-section p { margin: 0 auto 32px; max-width: 600px; color: var(--text-secondary); }

        .fo-footer {
          border-top: 1px solid var(--border-subtle);
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-nav);
        }
        .fo-footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 0.95rem;
        }
        .fo-footer-left svg { width: 18px; height: 18px; stroke: var(--gold-primary); }
        .fo-footer-status {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--status-positive);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .fo-footer-status::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          background: var(--status-positive);
          border-radius: 50%;
        }
        .fo-footer-links {
          display: flex;
          gap: 24px;
          list-style: none;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .fo-footer-links a {
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .fo-footer-links a:hover { color: var(--gold-primary); }

        @media (max-width: 1024px) {
          .foundry-container section { padding: 64px 24px; }
          .fo-nav { padding: 0 24px; }
          .fo-courtroom-grid, .fo-team-inner, .fo-privilege-inner { grid-template-columns: 1fr; gap: 48px; }
          .fo-trust-inner { flex-wrap: wrap; gap: 16px; justify-content: center; padding: 24px; }
          .fo-sec-grid { grid-template-columns: 1fr; gap: 32px; }
          .fo-footer { flex-direction: column; gap: 16px; text-align: center; }
          .fo-hero-actions { flex-direction: column; width: 100%; max-width: 300px; }
        }
      `}} />

      <nav className={`fo-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="fo-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          Sentinel Counsel
        </a>
        <div className="fo-nav-links">
          <a href="#courtroom">Litigation</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#team">Team</a>
          <a href="#security">Security</a>
          <a href="#contact" className="fo-nav-cta">Request Demo</a>
        </div>
      </nav>

      <section className="fo-hero">
        <div className="fo-hero-glow"></div>
        <div className="fo-hero-content">
          <div className="fo-hero-badge">
            AI-Powered Litigation Platform
          </div>
          <h1>Your Unfair <em>Advantage</em><br/>in the Courtroom</h1>
          <p className="fo-hero-sub">
            Sentinel Counsel is the AI second chair that pulls case files by voice, flags deponent lies in real time, builds your case checklist automatically, and drafts discovery responses in minutes — all without ever compromising privilege.
          </p>
          <div className="fo-hero-actions">
            <a href="#contact" className="fo-btn-primary">
              Request a Demo
            </a>
            <a href="#courtroom" className="fo-btn-secondary">
              See It in Action
            </a>
          </div>
        </div>
      </section>

      <div className="fo-trust-bar">
        <div className="fo-trust-inner">
          <div className="fo-trust-item">Voice-First — No Training Required</div>
          <div className="fo-trust-item">Real-Time Deposition Support</div>
          <div className="fo-trust-item">Discovery in Minutes, Not Weeks</div>
          <div className="fo-trust-item">Privilege Protected</div>
        </div>
      </div>

      <section id="courtroom">
        <div className="fo-courtroom-grid">
          <div className="fo-courtroom-text">
            <span className="fo-section-label">Built for Trial Attorneys</span>
            <h2>Like Having Your Best Associate — <em>Always On</em></h2>
            <p>No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd talk to your sharpest associate — and get instant results that would take a junior days.</p>
            <div className="fo-voice-prompt">
              <span>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</span>
            </div>
          </div>
          
          <div>
            <div className="fo-terminal">
              <div className="fo-terminal-header">
                <div>Sentinel Counsel — Live Session</div>
                <div className="fo-terminal-status">Session Encrypted</div>
              </div>
              <div className="fo-terminal-body">
                <div className="fo-demo-step">
                  <div className="fo-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="fo-step-content">
                    <div className="fo-step-label">Case Files On Demand</div>
                    <div className="fo-step-desc">Your case files surface the moment you need them. Briefs, exhibits, prior testimony — retrieved by voice in seconds.</div>
                    <div className="fo-step-result">
                      <span className="fo-result-tag">3 depositions</span>
                      <span className="fo-result-tag">12 exhibits</span>
                      <span className="fo-result-tag">2 expert reports</span>
                    </div>
                  </div>
                </div>
                
                <div className="fo-demo-step">
                  <div className="fo-step-icon warn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div className="fo-step-content">
                    <div className="fo-step-label">Deponent Lie Detection</div>
                    <div className="fo-step-desc">Real-time cross-reference against prior statements, filings, and public records. Inconsistencies flagged instantly.</div>
                    <div className="fo-step-result">
                      <span className="fo-result-tag alert">3 contradictions found</span>
                      <span className="fo-result-tag">vs. prior sworn statement</span>
                      <span className="fo-result-tag">vs. emails and text messages</span>
                    </div>
                  </div>
                </div>
                
                <div className="fo-demo-step">
                  <div className="fo-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="fo-step-content">
                    <div className="fo-step-label">Auto-Built Case Checklist</div>
                    <div className="fo-step-desc">Elements of every cause of action mapped and tracked automatically. Updates in real time as evidence comes in.</div>
                    <div className="fo-step-result">
                      <span className="fo-result-tag success">4 of 6 elements satisfied</span>
                      <span className="fo-result-tag">2 need additional evidence</span>
                    </div>
                  </div>
                </div>
                
                <div className="fo-demo-step">
                  <div className="fo-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
                  </div>
                  <div className="fo-step-content">
                    <div className="fo-step-label">Instant Discovery Response</div>
                    <div className="fo-step-desc">Respond to interrogatories and document requests in minutes. AI drafts responses and generates privilege logs.</div>
                    <div className="fo-step-result">
                      <span className="fo-result-tag">47 RFPs drafted</span>
                      <span className="fo-result-tag">privilege log generated</span>
                    </div>
                  </div>
                </div>
                
                <div className="fo-demo-step">
                  <div className="fo-step-icon voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </div>
                  <div className="fo-step-content">
                    <div className="fo-step-label">Zero Interface. Just Speak.</div>
                    <div className="fo-step-desc">No software to learn. Speak naturally and Sentinel Counsel handles documents, motions, discovery, privilege logs.</div>
                    <div className="fo-step-result">
                      <span className="fo-result-tag voice-tag">Voice-first AI</span>
                      <span className="fo-result-tag">No training required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities">
        <div className="fo-cap-header">
          <span className="fo-section-label">Platform</span>
          <h2>Five Pillars of Privileged Intelligence</h2>
          <p>Every capability engineered to keep your practice protected while unlocking the full power of AI.</p>
        </div>
        
        <div className="fo-cap-grid">
          <div className="fo-cap-card">
            <div className="fo-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3>Privileged AI Access</h3>
            <p>Let your clients leverage AI without waiving privilege. Every interaction is wrapped in attorney work-product protections and audit-trailed for defensibility.</p>
          </div>
          
          <div className="fo-cap-card">
            <div className="fo-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 2h8"/></svg>
            </div>
            <h3>Ambient Intelligence</h3>
            <p>Real-time AI for meetings, depositions, and client interviews. Capture, summarize, and analyze spoken testimony with privilege-preserving architecture.</p>
          </div>
          
          <div className="fo-cap-card">
            <div className="fo-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>Investigation Orchestration</h3>
            <p>Manage large-scale investigations across thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
          </div>
          
          <div className="fo-cap-card">
            <div className="fo-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
            </div>
            <h3>Full E-Discovery</h3>
            <p>End-to-end electronic discovery with AI-assisted document review, predictive coding, privilege logging, and production management — all within a secure, defensible environment.</p>
          </div>
          
          <div className="fo-cap-card">
            <div className="fo-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <h3>Secure Client Portal</h3>
            <p>Give clients a protected gateway to interact with AI under the umbrella of privilege. Full audit trails, access controls, and defensible data handling.</p>
          </div>
        </div>
      </section>

      <section id="privilege">
        <div className="fo-privilege-inner">
          <div className="fo-priv-visual">
            <div className="fo-vault-ticks"></div>
            <div className="fo-vault-ring-1"></div>
            <div className="fo-vault-ring-2"></div>
            <div className="fo-vault-ring-3"></div>
            <div className="fo-vault-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          
          <div>
            <span className="fo-section-label">Privilege Protection</span>
            <h2>The Vault Around Your Practice</h2>
            <p style={{color: 'var(--text-secondary)'}}>Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>
            
            <div className="fo-priv-features">
              <div className="fo-priv-feat">
                <div className="fo-priv-feat-marker"></div>
                <div className="fo-priv-feat-text">
                  <h4>Zero Third-Party Exposure</h4>
                  <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
                </div>
              </div>
              <div className="fo-priv-feat">
                <div className="fo-priv-feat-marker"></div>
                <div className="fo-priv-feat-text">
                  <h4>Defensible Audit Trail</h4>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
                </div>
              </div>
              <div className="fo-priv-feat">
                <div className="fo-priv-feat-marker"></div>
                <div className="fo-priv-feat-text">
                  <h4>Work Product Doctrine Compliant</h4>
                  <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="fo-priv-feat">
                <div className="fo-priv-feat-marker"></div>
                <div className="fo-priv-feat-text">
                  <h4>Client-Facing AI Under Privilege</h4>
                  <p>Empower clients to use AI tools within a privileged communication framework directed by counsel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fo-case-callout" id="heppner">
        <div className="fo-case-inner">
          <span className="fo-section-label">The Precedent</span>
          <h2>The Court Has Spoken: AI Use Can Waive Privilege</h2>
          <p style={{color: 'var(--text-secondary)'}}>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>
          
          <div className="fo-case-ruling">
            <div className="fo-case-cite">United States v. Heppner</div>
            <div className="fo-case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026 &bull; Judge Jed S. Rakoff</div>
            
            <div className="fo-case-quote">
              "Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves."
            </div>
            
            <p className="fo-case-explanation">
              Judge Rakoff ruled that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. The privilege was destroyed the moment the data was shared.
            </p>
            
            <div className="fo-case-answer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Sentinel Counsel is the answer to Heppner
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="fo-team-inner">
          <div>
            <span className="fo-section-label">Leadership</span>
            <h2>Built by Experts Who've Stood in the Arena</h2>
            <p style={{color: 'var(--text-secondary)'}}>Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>
          
          <div>
            <div className="fo-expertise-label">Deep Experience In</div>
            
            <div className="fo-expertise-list">
              <div className="fo-expertise-item">
                <div className="fo-expertise-marker"></div>
                <div className="fo-expertise-content">
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="fo-expertise-item">
                <div className="fo-expertise-marker"></div>
                <div className="fo-expertise-content">
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="fo-expertise-item">
                <div className="fo-expertise-marker"></div>
                <div className="fo-expertise-content">
                  <h4>Public Company Litigation</h4>
                  <p>General counsels and associate general counsels from publicly traded companies. Deep fluency in SEC enforcement, securities litigation, shareholder disputes, and board-level governance.</p>
                </div>
              </div>
            </div>
            
            <div className="fo-expertise-creds">
              <span className="fo-expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Former Federal &amp; State Prosecutors
              </span>
              <span className="fo-expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Public Company GCs &amp; AGCs
              </span>
              <span className="fo-expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Enterprise Security Author
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="security">
        <div className="fo-security-inner">
          <span className="fo-section-label">Security Posture</span>
          <h2>Enterprise-Grade by Default</h2>
          <p>Built by the people who wrote the security playbook at the world's largest technology companies.</p>
          
          <div className="fo-sec-grid">
            <div className="fo-sec-item">
              <div className="fo-sec-number">256</div>
              <h4>Bit AES Encryption</h4>
              <p>Military-grade encryption for data at rest and in transit. Your case files have never been safer.</p>
            </div>
            <div className="fo-sec-item">
              <div className="fo-sec-number">0</div>
              <h4>Data Retention</h4>
              <p>Prompts and outputs are ephemeral. Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="fo-sec-item">
              <div className="fo-sec-number">24/7</div>
              <h4>Threat Monitoring</h4>
              <p>Continuous security monitoring, intrusion detection, and incident response by a dedicated security team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fo-cta-section" id="contact">
        <h2>Ready to Protect Your Practice?</h2>
        <p>Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
        <a href="#" className="fo-btn-primary">
          Schedule a Briefing
        </a>
      </section>

      <footer className="fo-footer">
        <div className="fo-footer-left">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          Sentinel Counsel
        </div>
        <div className="fo-footer-status">System Status: Operational</div>
        <div className="fo-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}

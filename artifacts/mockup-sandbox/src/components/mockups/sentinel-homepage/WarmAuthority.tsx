import React, { useEffect, useState } from "react";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" stroke="#d4a574" strokeWidth="1.5" fill="none"/>
      <path d="M17 8L10 11.5v5.5c0 4.6 3 8.8 7 9.9 4-1.1 7-5.3 7-9.9v-5.5L17 8z" stroke="#d4a574" strokeWidth="1" fill="rgba(212,165,116,0.08)"/>
      <circle cx="17" cy="17" r="2.5" fill="#d4a574"/>
    </svg>
  );
}

export function WarmAuthority() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="warm-authority-theme">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .warm-authority-theme {
          --bg-dark: #1a1613;
          --bg-panel: #211d19;
          --bg-card: #2a2520;
          --accent-amber: #d4a574;
          --accent-copper: #c49a6c;
          --amber-dim: rgba(212, 165, 116, 0.12);
          --text-heading: #f0e6d6;
          --text-body: #b5a89a;
          --text-muted: #8c8276;
          --danger-warm: #c45a4a;
          --success-warm: #7a9a5a;
          --border-subtle: rgba(212, 165, 116, 0.1);
          
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Plus Jakarta Sans', system-ui, sans-serif;
          --mono: 'Fira Code', monospace;

          font-family: var(--sans);
          background: var(--bg-dark);
          color: var(--text-body);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          position: relative;
        }

        .warm-authority-theme * {
          box-sizing: border-box;
        }

        .warm-authority-theme::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: overlay;
        }

        .wa-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(26, 22, 19, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          transition: all 0.5s ease;
        }

        .wa-nav.scrolled {
          padding: 0.85rem 3rem;
          background: rgba(26, 22, 19, 0.96);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .wa-nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .wa-nav-logo .shield-icon {
          width: 32px;
          height: 32px;
        }

        .wa-nav-logo span {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-heading);
          letter-spacing: 0.01em;
        }

        .wa-nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .wa-nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: color 0.3s;
          position: relative;
        }

        .wa-nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-amber);
          transition: width 0.3s;
        }

        .wa-nav-links a:hover { color: var(--accent-amber); }
        .wa-nav-links a:hover::after { width: 100%; }

        .wa-nav-cta {
          padding: 0.6rem 1.5rem;
          background: transparent;
          border: 1px solid var(--accent-amber);
          border-radius: 4px;
          color: var(--accent-amber) !important;
          font-family: var(--sans);
          font-size: 0.8rem !important;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
        }

        .wa-nav-cta:hover {
          background: var(--accent-amber);
          color: var(--bg-dark) !important;
          box-shadow: 0 0 15px var(--amber-dim);
        }
        .wa-nav-cta::after { display: none !important; }

        .wa-hero {
          position: relative;
          min-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 3rem 5rem;
          overflow: hidden;
        }

        .wa-hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212, 165, 116, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 90% 70% at 20% 80%, rgba(33, 29, 25, 0.8) 0%, transparent 60%),
            linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-panel) 100%);
        }

        .wa-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212, 165, 116, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 165, 116, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%);
          animation: waGridPulse 12s ease-in-out infinite;
        }

        @keyframes waGridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .wa-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212, 165, 116, 0.1), transparent);
          box-shadow: 0 0 20px rgba(212, 165, 116, 0.05);
          animation: waScan 10s linear infinite;
        }

        @keyframes waScan {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        .wa-hero-content {
          position: relative;
          max-width: 900px;
          text-align: center;
          z-index: 2;
        }

        .wa-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          background: rgba(33, 29, 25, 0.6);
          backdrop-filter: blur(4px);
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--accent-amber);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          animation: waFadeUp 1s ease both;
        }

        .wa-hero-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-amber);
          box-shadow: 0 0 8px var(--accent-amber);
          animation: waBlink 3s ease-in-out infinite;
        }

        @keyframes waBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .wa-hero h1 {
          font-family: var(--serif);
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 400;
          color: var(--text-heading);
          line-height: 1.15;
          margin-bottom: 1.75rem;
          animation: waFadeUp 1s ease 0.2s both;
        }

        .wa-hero h1 em {
          font-style: italic;
          color: var(--accent-amber);
          font-weight: 500;
        }

        .wa-hero-sub {
          font-size: 1.2rem;
          font-weight: 300;
          color: var(--text-body);
          line-height: 1.7;
          max-width: 680px;
          margin: 0 auto 3rem;
          animation: waFadeUp 1s ease 0.4s both;
        }

        @keyframes waFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wa-hero-actions {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: waFadeUp 1s ease 0.6s both;
        }

        .wa-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.25rem;
          background: linear-gradient(135deg, var(--accent-copper), var(--accent-amber));
          color: var(--bg-dark);
          border-radius: 6px;
          font-family: var(--sans);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(212, 165, 116, 0.15);
        }

        .wa-btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 25px rgba(212, 165, 116, 0.25); 
          filter: brightness(1.05);
        }

        .wa-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.25rem;
          background: rgba(33, 29, 25, 0.4);
          color: var(--text-heading);
          border-radius: 6px;
          font-family: var(--sans);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(212, 165, 116, 0.2);
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .wa-btn-ghost:hover { 
          border-color: var(--accent-amber); 
          background: rgba(212, 165, 116, 0.05);
        }

        /* Trust Bar - Embossed Leather Feel */
        .wa-trust-bar {
          padding: 3rem;
          border-top: 1px solid rgba(0,0,0,0.6);
          border-bottom: 1px solid rgba(255,255,255,0.03);
          background: linear-gradient(to bottom, #181411, #1c1815);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2);
        }

        .wa-trust-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .wa-trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-shadow: 0 -1px 0 rgba(0,0,0,0.8);
        }

        .wa-trust-item svg {
          width: 18px;
          height: 18px;
          color: var(--accent-copper);
          flex-shrink: 0;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
        }

        .wa-trust-divider {
          width: 2px;
          height: 24px;
          background: rgba(0,0,0,0.5);
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .wa-courtroom {
          background: var(--bg-dark);
          position: relative;
          padding: 8rem 3rem;
          overflow: hidden;
        }

        .wa-courtroom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }

        .wa-courtroom-text {
          position: sticky;
          top: 8rem;
        }

        .wa-section-label {
          font-family: var(--mono);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent-copper);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .wa-section-label::before {
          content: '';
          width: 20px;
          height: 1px;
          background: var(--accent-copper);
        }

        .wa-section-title {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          font-weight: 400;
          color: var(--text-heading);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .wa-section-desc {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--text-body);
          line-height: 1.7;
          max-width: 560px;
        }

        .wa-voice-prompt {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.75rem;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
          background: linear-gradient(145deg, rgba(33, 29, 25, 0.8), rgba(26, 22, 19, 0.4));
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          margin-top: 1rem;
        }

        .wa-voice-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--accent-copper);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: waVoicePulse 3s ease-in-out infinite;
          background: rgba(212, 165, 116, 0.05);
        }

        .wa-voice-ring-inner {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-amber);
          box-shadow: 0 0 10px var(--accent-amber);
          animation: waVoicePulse 3s ease-in-out infinite 0.5s;
        }

        @keyframes waVoicePulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .wa-voice-prompt span {
          font-family: var(--serif);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-heading);
          line-height: 1.6;
        }

        /* Demo Terminal - Warm Wood Frame Display */
        .wa-demo-terminal {
          border-radius: 12px;
          border: 1px solid #3d342b;
          background: var(--bg-panel);
          overflow: hidden;
          box-shadow: 
            0 20px 50px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 0 0 8px #2a231d, 
            0 0 0 9px #1a1613;
        }

        .wa-demo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #3d342b;
          background: linear-gradient(to right, #241f1a, #2a2520);
        }

        .wa-demo-dots {
          display: flex;
          gap: 8px;
        }

        .wa-demo-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
        }

        .wa-demo-dots span:first-child { background: #b05c50; }
        .wa-demo-dots span:nth-child(2) { background: #c49a6c; }
        .wa-demo-dots span:last-child { background: #68854e; }

        .wa-demo-title {
          font-family: var(--sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .wa-demo-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--success-warm);
          letter-spacing: 0.05em;
        }

        .wa-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success-warm);
          box-shadow: 0 0 8px var(--success-warm);
          animation: waBlink 3s ease-in-out infinite;
        }

        .wa-demo-body {
          padding: 0.5rem;
        }

        .wa-demo-step {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: all 0.5s ease;
          cursor: default;
          position: relative;
        }

        .wa-demo-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 2.6rem;
          bottom: -0.5rem;
          width: 2px;
          height: 1rem;
          background: var(--border-subtle);
        }

        .wa-demo-step:hover {
          border-color: var(--border-subtle);
          background: rgba(212, 165, 116, 0.03);
          box-shadow: inset 0 0 20px rgba(212, 165, 116, 0.02);
        }

        .wa-step-icon {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          border: 1px solid rgba(212, 165, 116, 0.2);
          background: linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(212, 165, 116, 0.02));
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent-amber);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .wa-step-icon svg { width: 20px; height: 20px; }

        .wa-step-icon.warn {
          border-color: rgba(196, 90, 74, 0.3);
          background: linear-gradient(135deg, rgba(196, 90, 74, 0.1), rgba(196, 90, 74, 0.02));
          color: var(--danger-warm);
        }

        .wa-step-icon.voice-icon {
          border-color: rgba(122, 154, 90, 0.3);
          background: linear-gradient(135deg, rgba(122, 154, 90, 0.1), rgba(122, 154, 90, 0.02));
          color: var(--success-warm);
        }

        .wa-step-label {
          font-family: var(--sans);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 0.4rem;
        }

        .wa-step-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .wa-step-result {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .wa-result-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.02em;
          color: var(--accent-copper);
          background: rgba(33, 29, 25, 0.8);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .wa-result-tag.alert {
          color: var(--danger-warm);
          border-color: rgba(196, 90, 74, 0.3);
          background: rgba(196, 90, 74, 0.05);
        }

        .wa-result-tag.success {
          color: var(--success-warm);
          border-color: rgba(122, 154, 90, 0.3);
          background: rgba(122, 154, 90, 0.05);
        }

        .wa-result-tag.voice-tag {
          color: var(--success-warm);
          border-color: rgba(122, 154, 90, 0.3);
          background: rgba(122, 154, 90, 0.05);
        }

        @media (max-width: 900px) {
          .wa-courtroom-inner { grid-template-columns: 1fr; gap: 3rem; }
          .wa-courtroom-text { position: static; }
        }

        .wa-capabilities {
          background: var(--bg-panel);
          position: relative;
          padding: 8rem 3rem;
          border-top: 1px solid var(--border-subtle);
        }

        .wa-cap-grid {
          max-width: 1200px;
          margin: 4rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .wa-cap-card {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 2.5rem;
          position: relative;
          border: 1px solid var(--border-subtle);
          transition: all 0.5s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .wa-cap-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.25), 0 0 20px rgba(212, 165, 116, 0.05);
          border-color: rgba(212, 165, 116, 0.3);
        }

        .wa-cap-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          border-radius: 12px;
          box-shadow: inset 0 0 0 1px rgba(212, 165, 116, 0);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        .wa-cap-card:hover::before { 
          box-shadow: inset 0 0 0 1px rgba(212, 165, 116, 0.1); 
          background: radial-gradient(circle at top right, rgba(212, 165, 116, 0.05), transparent 70%);
        }

        .wa-cap-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3d342b, #2a2520);
          border: 1px solid rgba(212, 165, 116, 0.15);
          margin-bottom: 1.75rem;
          color: var(--accent-amber);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .wa-cap-icon svg { width: 22px; height: 22px; }

        .wa-cap-card h3 {
          font-family: var(--serif);
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }

        .wa-cap-card p {
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--text-muted);
          line-height: 1.7;
        }

        .wa-privilege {
          position: relative;
          overflow: hidden;
          padding: 8rem 3rem;
          background: var(--bg-dark);
        }

        .wa-privilege-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .wa-priv-visual {
          position: relative;
          aspect-ratio: 1;
          max-width: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-vault-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(212, 165, 116, 0.08);
          animation: waRotate 40s linear infinite;
          box-shadow: 0 0 30px rgba(212, 165, 116, 0.02);
        }

        .wa-vault-ring:nth-child(1) { width: 100%; height: 100%; }
        .wa-vault-ring:nth-child(2) { width: 75%; height: 75%; animation-direction: reverse; animation-duration: 30s; border-color: rgba(212, 165, 116, 0.12); box-shadow: inset 0 0 20px rgba(212, 165, 116, 0.03); }
        .wa-vault-ring:nth-child(3) { width: 50%; height: 50%; animation-duration: 20s; border-color: rgba(212, 165, 116, 0.2); box-shadow: 0 0 40px rgba(212, 165, 116, 0.05); }

        .wa-vault-ring::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-copper);
          box-shadow: 0 0 12px var(--accent-amber);
        }

        @keyframes waRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .wa-vault-center {
          width: 90px;
          height: 90px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--accent-copper);
          background: linear-gradient(135deg, rgba(33, 29, 25, 0.9), rgba(26, 22, 19, 0.9));
          position: relative;
          z-index: 2;
          box-shadow: 0 0 40px rgba(212, 165, 116, 0.15), inset 0 0 20px rgba(212, 165, 116, 0.1);
          transform: rotate(45deg);
        }

        .wa-vault-center svg { 
          width: 36px; 
          height: 36px; 
          color: var(--accent-amber);
          transform: rotate(-45deg);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .wa-priv-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .wa-priv-feat {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .wa-priv-feat-dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          margin-top: 6px;
          background: var(--accent-copper);
          flex-shrink: 0;
          box-shadow: 0 2px 5px rgba(212, 165, 116, 0.3);
        }

        .wa-priv-feat-text h4 {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 0.4rem;
        }

        .wa-priv-feat-text p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .wa-case-callout {
          position: relative;
          padding: 8rem 3rem;
          background: var(--bg-panel);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .wa-case-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .wa-case-ruling {
          border-radius: 12px;
          border: 1px solid rgba(196, 90, 74, 0.2);
          background: linear-gradient(180deg, rgba(196, 90, 74, 0.03), transparent);
          padding: 4rem;
          position: relative;
          margin-top: 3.5rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .wa-case-ruling::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--danger-warm), transparent);
          opacity: 0.7;
        }

        .wa-case-ruling .gavel-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          margin: 0 auto 2rem;
          border: 1px solid rgba(196, 90, 74, 0.3);
          background: rgba(33, 29, 25, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--danger-warm);
          box-shadow: 0 8px 20px rgba(196, 90, 74, 0.1);
        }

        .wa-case-ruling .gavel-icon svg { width: 26px; height: 26px; }

        .wa-case-cite {
          font-family: var(--serif);
          font-size: 1.25rem;
          font-weight: 600;
          font-style: italic;
          color: var(--text-heading);
          margin-bottom: 0.5rem;
        }

        .wa-case-court {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--danger-warm);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .wa-case-quote {
          font-family: var(--serif);
          font-size: 1.5rem;
          font-weight: 400;
          font-style: italic;
          color: var(--text-heading);
          line-height: 1.6;
          max-width: 750px;
          margin: 0 auto 2rem;
          position: relative;
          padding: 0 2.5rem;
        }

        .wa-case-quote::before,
        .wa-case-quote::after {
          font-family: var(--serif);
          font-size: 3.5rem;
          color: rgba(212, 165, 116, 0.2);
          position: absolute;
          line-height: 1;
        }

        .wa-case-quote::before { content: '"'; top: -10px; left: 0; }
        .wa-case-quote::after { content: '"'; bottom: -30px; right: 0; }

        .wa-case-explanation {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .wa-case-answer {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          background: rgba(212, 165, 116, 0.1);
          border: 1px solid rgba(212, 165, 116, 0.2);
          color: var(--accent-amber);
          font-family: var(--sans);
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(212, 165, 116, 0.05);
        }

        .wa-case-answer svg { width: 18px; height: 18px; }

        .wa-team {
          background: var(--bg-dark);
          padding: 8rem 3rem;
        }

        .wa-team-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 5rem;
          align-items: start;
        }

        .wa-expertise-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .wa-expertise-item {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 1.5rem;
          border-radius: 8px;
          background: rgba(33, 29, 25, 0.4);
          border: 1px solid var(--border-subtle);
          transition: all 0.3s ease;
        }

        .wa-expertise-item:hover {
          background: rgba(33, 29, 25, 0.8);
          border-color: rgba(212, 165, 116, 0.2);
          transform: translateX(5px);
        }

        .wa-expertise-marker {
          width: 12px;
          height: 12px;
          margin-top: 5px;
          background: var(--accent-copper);
          flex-shrink: 0;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          box-shadow: 0 0 10px rgba(212, 165, 116, 0.4);
        }

        .wa-expertise-content h4 {
          font-family: var(--sans);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 0.5rem;
        }

        .wa-expertise-content p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        .wa-expertise-creds {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }

        .wa-expertise-cred {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid rgba(212, 165, 116, 0.2);
          background: rgba(33, 29, 25, 0.6);
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--accent-amber);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        @media (max-width: 900px) {
          .wa-team-inner { grid-template-columns: 1fr; gap: 3rem; }
        }

        .wa-security {
          padding: 8rem 3rem;
          background: var(--bg-panel);
          border-top: 1px solid var(--border-subtle);
          text-align: center;
        }

        .wa-security-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .wa-sec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .wa-sec-item {
          padding: 2.5rem;
          border-radius: 12px;
          background: var(--bg-dark);
          border: 1px solid var(--border-subtle);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.4s ease;
        }

        .wa-sec-item:hover {
          transform: translateY(-5px);
        }

        .wa-sec-number {
          font-family: var(--serif);
          font-size: 4.5rem;
          font-weight: 400;
          color: var(--accent-amber);
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(to bottom, var(--accent-amber), var(--accent-copper));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .wa-sec-item h4 {
          font-family: var(--sans);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-heading);
          margin-bottom: 0.75rem;
        }

        .wa-sec-item p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .wa-cta-section {
          padding: 10rem 3rem;
          text-align: center;
          background: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }

        .wa-cta-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .wa-cta-section .wa-section-title {
          font-size: clamp(2.5rem, 4vw, 4rem);
        }

        .wa-cta-section .wa-section-desc {
          margin: 0 auto 3rem;
          font-size: 1.2rem;
        }

        .wa-footer {
          padding: 3rem;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-panel);
        }

        .wa-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .wa-footer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .wa-footer-left svg { width: 24px; height: 24px; }
        
        .wa-footer-left span {
          font-family: var(--serif);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-heading);
        }

        .wa-footer-copy {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .wa-footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .wa-footer-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s;
        }

        .wa-footer-links a:hover { color: var(--accent-amber); }

        @media (max-width: 768px) {
          .wa-nav-links { display: none; }
          .wa-privilege-inner { grid-template-columns: 1fr; }
          .wa-footer-inner { flex-direction: column; text-align: center; }
        }
      `}} />

      <nav id="nav" className={`wa-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="wa-nav-logo">
          <ShieldIcon className="shield-icon" />
          <span>Sentinel Counsel</span>
        </a>
        <ul className="wa-nav-links">
          <li><a href="#capabilities">Capabilities</a></li>
          <li><a href="#privilege">Privilege</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#security">Security</a></li>
          <li><a href="#contact" className="wa-nav-cta">Request Demo</a></li>
        </ul>
      </nav>

      <section className="wa-hero">
        <div className="wa-hero-bg"></div>
        <div className="wa-hero-grid"></div>
        <div className="wa-scan-line"></div>
        <div className="wa-hero-content">
          <div className="wa-hero-badge">
            <span className="dot"></span>
            Privileged AI Infrastructure for Law
          </div>
          <h1>AI that <em>Protects</em><br/>Attorney-Client Privilege</h1>
          <p className="wa-hero-sub">
            Sentinel Counsel empowers law firms with secure, privilege-preserving AI — purpose-built for investigations, depositions, and client communications.
          </p>
          <div className="wa-hero-actions">
            <a href="#contact" className="wa-btn-primary">
              Request a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#capabilities" className="wa-btn-ghost">
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      <div className="wa-trust-bar">
        <div className="wa-trust-inner">
          <div className="wa-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            End-to-End Encrypted
          </div>
          <div className="wa-trust-divider"></div>
          <div className="wa-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            SOC 2 Type II
          </div>
          <div className="wa-trust-divider"></div>
          <div className="wa-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Zero Data Retention
          </div>
          <div className="wa-trust-divider"></div>
          <div className="wa-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Privilege Compliant
          </div>
        </div>
      </div>

      <section className="wa-courtroom" id="courtroom">
        <div className="wa-courtroom-inner">
          <div className="wa-courtroom-text">
            <div className="wa-section-label">For the Courtroom Litigator</div>
            <div className="wa-section-title">Your Second Chair<br/>is Now <em>AI</em></div>
            <p className="wa-section-desc" style={{ marginBottom: "2rem" }}>No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd speak to your best associate — and watch it work.</p>
            <div className="wa-voice-prompt">
              <div className="wa-voice-ring">
                <div className="wa-voice-ring-inner"></div>
              </div>
              <span>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</span>
            </div>
          </div>
          <div className="wa-courtroom-demo">
            <div className="wa-demo-terminal">
              <div className="wa-demo-header">
                <div className="wa-demo-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="wa-demo-title">SENTINEL COUNSEL — LIVE SESSION</div>
                <div className="wa-demo-status">
                  <span className="wa-status-dot"></span> PRIVILEGED
                </div>
              </div>
              <div className="wa-demo-body">
                <div className="wa-demo-step">
                  <div className="wa-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="wa-step-content">
                    <div className="wa-step-label">Case Files On Demand</div>
                    <div className="wa-step-desc">Your case files surface the moment you need them. Briefs, exhibits, prior testimony — retrieved by voice in seconds, not hours of searching.</div>
                    <div className="wa-step-result">
                      <span className="wa-result-tag">3 depositions</span>
                      <span className="wa-result-tag">12 exhibits</span>
                      <span className="wa-result-tag">2 expert reports</span>
                    </div>
                  </div>
                </div>
                <div className="wa-demo-step">
                  <div className="wa-step-icon warn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div className="wa-step-content">
                    <div className="wa-step-label">Deponent Lie Detection</div>
                    <div className="wa-step-desc">Real-time cross-reference against prior statements, filings, and public records. Inconsistencies are flagged instantly during live depositions.</div>
                    <div className="wa-step-result">
                      <span className="wa-result-tag alert">3 contradictions found</span>
                      <span className="wa-result-tag">vs. prior sworn statement</span>
                      <span className="wa-result-tag">vs. deponent's emails and text messages</span>
                    </div>
                  </div>
                </div>
                <div className="wa-demo-step">
                  <div className="wa-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="wa-step-content">
                    <div className="wa-step-label">Auto-Built Case Checklist</div>
                    <div className="wa-step-desc">Elements of every cause of action are mapped and tracked automatically. Your case checklist updates in real time as evidence comes in.</div>
                    <div className="wa-step-result">
                      <span className="wa-result-tag success">4 of 6 elements satisfied</span>
                      <span className="wa-result-tag">2 need additional evidence</span>
                      <span className="wa-result-tag">2 elements from depositions</span>
                      <span className="wa-result-tag">2 elements from emails</span>
                    </div>
                  </div>
                </div>
                <div className="wa-demo-step">
                  <div className="wa-step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
                  </div>
                  <div className="wa-step-content">
                    <div className="wa-step-label">Instant Discovery Response</div>
                    <div className="wa-step-desc">Respond to interrogatories and document requests in minutes instead of weeks. AI drafts responses, flags privilege issues, and generates privilege logs.</div>
                    <div className="wa-step-result">
                      <span className="wa-result-tag">47 RFPs drafted</span>
                      <span className="wa-result-tag">privilege log generated</span>
                    </div>
                  </div>
                </div>
                <div className="wa-demo-step">
                  <div className="wa-step-icon voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </div>
                  <div className="wa-step-content">
                    <div className="wa-step-label">Zero Interface. Just Speak.</div>
                    <div className="wa-step-desc">No software to learn. Speak naturally and Sentinel Counsel pulls documents, drafts motions, tags discovery, creates privilege logs — anything your case demands.</div>
                    <div className="wa-step-result">
                      <span className="wa-result-tag voice-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                        Voice-first AI
                      </span>
                      <span className="wa-result-tag">No training required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wa-capabilities" id="capabilities">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="wa-section-label">Platform</div>
          <div className="wa-section-title">Five Pillars of<br/>Privileged Intelligence</div>
          <p className="wa-section-desc">Every capability engineered to keep your practice protected while unlocking the full power of AI.</p>
        </div>
        <div className="wa-cap-grid">
          <div className="wa-cap-card">
            <div className="wa-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3>Privileged AI Access</h3>
            <p>Let your clients leverage AI without waiving privilege. Every interaction is wrapped in attorney work-product protections and audit-trailed for defensibility.</p>
          </div>
          <div className="wa-cap-card">
            <div className="wa-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 2h8"/></svg>
            </div>
            <h3>Ambient Intelligence</h3>
            <p>Real-time AI for meetings, depositions, and client interviews. Capture, summarize, and analyze spoken testimony with privilege-preserving architecture.</p>
          </div>
          <div className="wa-cap-card">
            <div className="wa-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>Investigation Orchestration</h3>
            <p>Manage large-scale investigations across thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
          </div>
          <div className="wa-cap-card">
            <div className="wa-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
            </div>
            <h3>Full E-Discovery</h3>
            <p>End-to-end electronic discovery with AI-assisted document review, predictive coding, privilege logging, and production management — all within a secure, defensible environment.</p>
          </div>
          <div className="wa-cap-card">
            <div className="wa-cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <h3>Secure Client Portal</h3>
            <p>Give clients a protected gateway to interact with AI under the umbrella of privilege. Full audit trails, access controls, and defensible data handling.</p>
          </div>
        </div>
      </section>

      <section className="wa-privilege" id="privilege">
        <div className="wa-privilege-inner">
          <div className="wa-priv-visual">
            <div className="wa-vault-ring"></div>
            <div className="wa-vault-ring"></div>
            <div className="wa-vault-ring"></div>
            <div className="wa-vault-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
          <div className="wa-priv-text">
            <div className="wa-section-label">Privilege Protection</div>
            <div className="wa-section-title">The Vault Around<br/>Your Practice</div>
            <p className="wa-section-desc">Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>
            <div className="wa-priv-features">
              <div className="wa-priv-feat">
                <div className="wa-priv-feat-dot"></div>
                <div className="wa-priv-feat-text">
                  <h4>Zero Third-Party Exposure</h4>
                  <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
                </div>
              </div>
              <div className="wa-priv-feat">
                <div className="wa-priv-feat-dot"></div>
                <div className="wa-priv-feat-text">
                  <h4>Defensible Audit Trail</h4>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
                </div>
              </div>
              <div className="wa-priv-feat">
                <div className="wa-priv-feat-dot"></div>
                <div className="wa-priv-feat-text">
                  <h4>Work Product Doctrine Compliant</h4>
                  <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="wa-priv-feat">
                <div className="wa-priv-feat-dot"></div>
                <div className="wa-priv-feat-text">
                  <h4>Client-Facing AI Under Privilege</h4>
                  <p>Empower clients to use AI tools within a privileged communication framework directed by counsel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wa-case-callout" id="heppner">
        <div className="wa-case-inner">
          <div className="wa-section-label" style={{ justifyContent: "center" }}>The Precedent</div>
          <div className="wa-section-title">The Court Has Spoken:<br/>AI Use Can Waive Privilege</div>
          <p className="wa-section-desc" style={{ margin: "0 auto" }}>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>
          <div className="wa-case-ruling">
            <div className="gavel-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2.5l5 5M2 22l1.5-1.5M6.5 17.5l-4 4M17 7l-8.5 8.5M15 9l-1-1M18.5 5.5l-1-1"/><path d="M21 3l-8.5 8.5M3 21l8.5-8.5"/><rect x="8" y="14" width="4" height="4" rx="0.5" transform="rotate(-45 10 16)"/></svg>
            </div>
            <div className="wa-case-cite">United States v. Heppner</div>
            <div className="wa-case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026 &bull; Judge Jed S. Rakoff</div>
            <div className="wa-case-quote">
              Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves.
            </div>
            <p className="wa-case-explanation">
              Judge Rakoff ruled that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. The privilege was destroyed the moment the data was shared.
            </p>
            <div className="wa-case-answer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Sentinel Counsel is the answer to Heppner
            </div>
          </div>
        </div>
      </section>

      <section className="wa-team" id="team">
        <div className="wa-team-inner">
          <div className="wa-team-left">
            <div className="wa-section-label">Leadership</div>
            <div className="wa-section-title">Built by Experts Who've<br/>Stood in the Arena</div>
            <p className="wa-section-desc" style={{ marginBottom: "2.5rem" }}>Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>
          <div className="wa-team-right">
            <div className="wa-section-label" style={{ marginBottom: "1.5rem" }}>Deep Experience In</div>
            <div className="wa-expertise-list">
              <div className="wa-expertise-item">
                <div className="wa-expertise-marker"></div>
                <div className="wa-expertise-content">
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="wa-expertise-item">
                <div className="wa-expertise-marker"></div>
                <div className="wa-expertise-content">
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="wa-expertise-item">
                <div className="wa-expertise-marker"></div>
                <div className="wa-expertise-content">
                  <h4>Public Company Litigation</h4>
                  <p>General counsels and associate general counsels from publicly traded companies. Deep fluency in SEC enforcement, securities litigation, shareholder disputes, and board-level governance.</p>
                </div>
              </div>
            </div>
            <div className="wa-expertise-creds">
              <span className="wa-expertise-cred">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Former Federal &amp; State Prosecutors
              </span>
              <span className="wa-expertise-cred">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Public Company GCs &amp; AGCs
              </span>
              <span className="wa-expertise-cred">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Enterprise Security Author
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="wa-security" id="security">
        <div className="wa-security-inner">
          <div className="wa-section-label" style={{ justifyContent: "center" }}>Security Posture</div>
          <div className="wa-section-title">Enterprise-Grade by Default</div>
          <p className="wa-section-desc" style={{ margin: "0 auto" }}>Built by the people who wrote the security playbook at the world's largest technology companies.</p>
          <div className="wa-sec-grid">
            <div className="wa-sec-item">
              <div className="wa-sec-number">256</div>
              <h4>Bit AES Encryption</h4>
              <p>Military-grade encryption for data at rest and in transit. Your case files have never been safer.</p>
            </div>
            <div className="wa-sec-item">
              <div className="wa-sec-number">0</div>
              <h4>Data Retention</h4>
              <p>Prompts and outputs are ephemeral. Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="wa-sec-item">
              <div className="wa-sec-number">24/7</div>
              <h4>Threat Monitoring</h4>
              <p>Continuous security monitoring, intrusion detection, and incident response by a dedicated security team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wa-cta-section" id="contact">
        <div className="wa-section-title">Ready to Protect<br/>Your Practice?</div>
        <p className="wa-section-desc">Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
        <a href="#" className="wa-btn-primary">
          Request a Confidential Demo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </section>

      <footer className="wa-footer">
        <div className="wa-footer-inner">
          <div className="wa-footer-left">
            <ShieldIcon className="shield-icon" />
            <span>Sentinel Counsel</span>
          </div>
          <div className="wa-footer-copy">&copy; 2026 Sentinel Counsel. All rights reserved.</div>
          <ul className="wa-footer-links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";

export default function SecurityPage() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

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
      <Helmet>
        <title>Security — Sentinel Counsel</title>
        <meta name="description" content="Sentinel Counsel's security practices. 256-bit AES encryption, zero data retention, 24/7 threat monitoring, and privilege-by-design architecture for law firms." />
        <meta property="og:title" content="Security — Sentinel Counsel" />
        <meta property="og:description" content="256-bit AES encryption, zero data retention, and 24/7 threat monitoring. Built by enterprise security experts." />
        <meta property="og:url" content="https://sntlabs.io/security" />
        <meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />
        <meta name="twitter:title" content="Security — Sentinel Counsel" />
        <meta name="twitter:description" content="256-bit AES encryption, zero data retention, and 24/7 threat monitoring. Built by enterprise security experts." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />
        <link rel="canonical" href="https://sntlabs.io/security" />
      </Helmet>

      <nav className={`ice-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
        <Link href="/" className="ice-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </Link>
        <button
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="security-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="security-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
          <button className="ice-nav-cta" onClick={() => { setMobileMenuOpen(false); setDemoOpen(true); }}>
            Request Demo
          </button>
        </div>
      </nav>

      <main>
        <article className="content-article">
          <nav className="content-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Security</span>
          </nav>

          <header className="content-header">
            <h1>Security at Sentinel Counsel</h1>
            <div className="content-meta">
              <time dateTime="2025-06-01">Last updated June 1, 2025</time>
            </div>
          </header>

            <div className="content-body legal-body">
              <section>
                <h2>Our Security Commitment</h2>
                <p>Sentinel Counsel was built from the ground up by former Microsoft Security &amp; Compliance leadership and enterprise security experts. Security is not an afterthought — it is the foundation of every architectural decision we make.</p>
                <p>As a platform handling privileged legal data, we hold ourselves to the highest standard of data protection. Our privilege-by-design architecture ensures that attorney-client privilege and work product protections are maintained at every layer of the system.</p>
              </section>

              <section>
                <h2>Encryption</h2>
                <p>All data is protected with 256-bit AES encryption, both at rest and in transit. Every communication between your device and our platform is encrypted via TLS 1.3. Stored data is encrypted with keys that are managed through a dedicated key management service with strict access controls.</p>
              </section>

              <section>
                <h2>Zero Data Retention</h2>
                <p>AI interactions on the Sentinel Counsel platform are ephemeral. Prompts and outputs are processed in real time and are not stored, cached, or logged after your session. Your data is never used for model training, fine-tuning, or any purpose other than delivering the service to you in the moment you request it.</p>
              </section>

              <section>
                <h2>Privilege-by-Design Architecture</h2>
                <p>Unlike consumer AI tools, Sentinel Counsel is architected to keep data within the privilege boundary at all times. No privileged information is exposed to third parties. Every AI interaction is logged in a defensible audit trail — timestamped and mapped to privilege assertions — so you can demonstrate compliance in any proceeding.</p>
              </section>

              <section>
                <h2>Continuous Monitoring</h2>
                <p>Our dedicated security team provides 24/7 threat monitoring with continuous intrusion detection and incident response capabilities. We employ multi-layered defense including network monitoring, anomaly detection, and automated threat response.</p>
              </section>

              <section>
                <h2>Access Controls</h2>
                <p>We implement strict role-based access controls (RBAC) and the principle of least privilege across all systems. Multi-factor authentication is required for all administrative access. All access events are logged and audited regularly.</p>
              </section>

              <section>
                <h2>Infrastructure Security</h2>
                <p>Our infrastructure is hosted in SOC 2 compliant data centers with physical security controls including biometric access, 24/7 surveillance, and environmental protections. We maintain isolated environments for each client to prevent cross-tenant data exposure.</p>
              </section>

              <section>
                <h2>Vulnerability Management</h2>
                <p>We conduct regular security assessments, penetration testing, and code reviews. Our development process includes automated security scanning in the CI/CD pipeline. We maintain a responsible disclosure program for security researchers.</p>
              </section>

              <section>
                <h2>Reporting Security Concerns</h2>
                <p>If you discover a security vulnerability or have concerns about the security of our platform, please contact us immediately at security@sntlabs.io. We take all security reports seriously and will respond within 24 hours.</p>
              </section>
            </div>
        </article>
      </main>

      <footer className="ice-footer">
        <div className="footer-left">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
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

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

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
                <h2>Built by Enterprise Security Leadership</h2>
                <p>Sentinel Counsel's security architecture was designed by a leadership team with deep roots in enterprise cloud security and AI governance. Our CTO is a Stanford-trained computer scientist, a 14-year Microsoft Most Valuable Professional, and a Microsoft Regional Director who has spent two decades building secure, governed AI platforms for Fortune 500 companies, financial institutions, and universities. He is the founder of FoundationaLLM — the open-source enterprise AI platform that is red-teamed from inception and deployed within the client's own cloud environment — and Solliance, a global network of 300+ cloud and AI experts (including 30 Microsoft MVPs and 8 Regional Directors) that has delivered enterprise-grade solutions for over 25 years.</p>
                <p>At Sentinel Counsel, our team brings the same defense-in-depth methodology we developed for enterprise AI at scale. Security here isn't a feature we bolted on. It's the infrastructure itself.</p>
              </section>

              <section>
                <h2>Privilege-by-Design Architecture</h2>
                <p>As a platform handling privileged legal data, we hold ourselves to a higher standard than general-purpose AI tools. Our architecture was purpose-built to keep data within the privilege boundary at all times. No privileged information is exposed to third parties. Every AI interaction is logged in a defensible audit trail — timestamped and mapped to privilege assertions — so you can demonstrate compliance in any proceeding.</p>
                <p>This approach draws directly from our team's enterprise AI security work: fine-grain controls over data access, pre- and post-completion filters that guard against data exfiltration, and sensitive data filtering that prevents PII and trade secrets from reaching the LLM.</p>
              </section>

              <section>
                <h2>Encryption</h2>
                <p>All data is protected with 256-bit AES encryption, both at rest and in transit. Every communication between your device and our platform is encrypted via TLS 1.3. Stored data is encrypted with keys managed through a dedicated key management service with strict access controls.</p>
              </section>

              <section>
                <h2>Zero Data Retention</h2>
                <p>AI interactions on the Sentinel Counsel platform are ephemeral. Prompts and outputs are processed in real time and are not stored, cached, or logged after your session. Your data is never used for model training, fine-tuning, or any purpose other than delivering the service to you in the moment you request it.</p>
              </section>

              <section>
                <h2>Access Controls &amp; Governance</h2>
                <p>We implement strict role-based access controls (RBAC) and the principle of least privilege across all systems — the same governance framework our team built for enterprise AI platforms where RBAC, audit logging, and policy enforcement are applied across every agent workflow. Multi-factor authentication is required for all administrative access, and all access events are logged and audited regularly.</p>
              </section>

              <section>
                <h2>Continuous Monitoring</h2>
                <p>Our security team provides 24/7 threat monitoring with continuous intrusion detection and incident response capabilities. We employ multi-layered defense including network monitoring, anomaly detection, and automated threat response — hardened through the same red-team-from-inception methodology our team applies to every platform we build.</p>
              </section>

              <section>
                <h2>Infrastructure Security</h2>
                <p>Our infrastructure is hosted in SOC 2 compliant data centers with physical security controls including biometric access, 24/7 surveillance, and environmental protections. We maintain isolated environments for each client to prevent cross-tenant data exposure. Unlike SaaS AI tools, our architecture supports deployment within the client's own cloud environment, ensuring proprietary data remains under complete control.</p>
              </section>

              <section>
                <h2>Vulnerability Management</h2>
                <p>We conduct regular security assessments, penetration testing, and code reviews. Our development process includes automated security scanning in the CI/CD pipeline. We maintain a responsible disclosure program for security researchers.</p>
              </section>

              <section>
                <h2>Our Team's Credentials</h2>
                <p>The Sentinel Counsel security team is led by technologists who have authored a dozen published books on cloud architecture and AI — including titles published by O'Reilly and Microsoft Press, official Azure certification guides, and practice development playbooks that inform Microsoft's global partner network. Our leadership holds Google Developer Expert status for Analytics, Azure Elite and Azure Insider designations, and has maintained Microsoft MVP recognition for over a decade across Azure, Data Platform, and Artificial Intelligence categories. Our team regularly speaks at international conferences on enterprise AI security, multi-agent systems, and governance — including sessions on integrating agents into the enterprise and building next-generation reasoning systems on Azure.</p>
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
        </div>
      </footer>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

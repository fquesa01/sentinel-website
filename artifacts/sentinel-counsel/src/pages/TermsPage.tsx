import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";

export default function TermsPage() {
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
        <title>Terms of Service — Sentinel Counsel</title>
        <meta name="description" content="Sentinel Counsel's terms of service. Review the terms governing your use of sntlabs.io and the Sentinel Counsel litigation platform." />
        <meta property="og:title" content="Terms of Service — Sentinel Counsel" />
        <meta property="og:description" content="Review the terms governing your use of the Sentinel Counsel litigation platform." />
        <meta property="og:url" content="https://sntlabs.io/terms" />
        <meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />
        <meta name="twitter:title" content="Terms of Service — Sentinel Counsel" />
        <meta name="twitter:description" content="Review the terms governing your use of the Sentinel Counsel litigation platform." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />
        <link rel="canonical" href="https://sntlabs.io/terms" />
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
          aria-controls="terms-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="terms-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
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
            <span aria-current="page">Terms of Service</span>
          </nav>

          <header className="content-header">
            <h1>Terms of Service</h1>
            <div className="content-meta">
              <time dateTime="2025-06-01">Effective June 1, 2025</time>
            </div>
          </header>

            <div className="content-body legal-body">
              <section>
                <h2>Acceptance of Terms</h2>
                <p>By accessing or using the Sentinel Counsel website (sntlabs.io) and platform (collectively, the "Service"), operated by SNT Labs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
              </section>

              <section>
                <h2>Description of Service</h2>
                <p>Sentinel Counsel provides an AI-powered litigation platform designed for law firms, including voice-first e-discovery, real-time deposition analysis, document review, and related legal technology tools. The platform is designed with privilege-by-design architecture to maintain attorney-client privilege protections.</p>
              </section>

              <section>
                <h2>User Accounts and Responsibilities</h2>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
                <p>You agree to use the Service only for lawful purposes and in accordance with applicable legal and ethical obligations, including those governing the practice of law in your jurisdiction.</p>
              </section>

              <section>
                <h2>Intellectual Property</h2>
                <p>The Service, including its original content, features, and functionality, is owned by SNT Labs and is protected by copyright, trademark, and other intellectual property laws. You retain ownership of all data, documents, and work product you create or upload to the platform.</p>
              </section>

              <section>
                <h2>Data Handling and Privilege</h2>
                <p>Sentinel Counsel is designed to preserve attorney-client privilege and work product protections. We do not use your case data, documents, or AI interactions for model training. All platform interactions are encrypted with 256-bit AES encryption. Prompts and outputs are processed ephemerally and are not retained after your session.</p>
                <p>While we engineer our platform to support privilege preservation, the determination of whether attorney-client privilege or work product protection applies to specific materials remains a legal question governed by applicable law and the facts of each situation.</p>
              </section>

              <section>
                <h2>Limitation of Liability</h2>
                <p>Sentinel Counsel is a technology tool and does not provide legal advice. The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. SNT Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
              </section>

              <section>
                <h2>Indemnification</h2>
                <p>You agree to indemnify and hold harmless SNT Labs, its officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or expenses arising from your use of the Service or violation of these Terms.</p>
              </section>

              <section>
                <h2>Termination</h2>
                <p>We may terminate or suspend your access to the Service immediately, without prior notice, for any reason including breach of these Terms. Upon termination, your right to use the Service will immediately cease.</p>
              </section>

              <section>
                <h2>Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.</p>
              </section>

              <section>
                <h2>Changes to These Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Material changes will be communicated through the Service or via email. Your continued use of the Service after changes constitutes acceptance of the modified Terms.</p>
              </section>

              <section>
                <h2>Contact</h2>
                <p>For questions about these Terms of Service, please contact us at legal@sntlabs.io.</p>
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

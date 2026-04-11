import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";

export default function PrivacyPage() {
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
        <title>Privacy Policy — Sentinel Counsel</title>
        <meta name="description" content="Sentinel Counsel's privacy policy. Learn how we collect, use, and protect your personal information on sntlabs.io." />
        <meta property="og:title" content="Privacy Policy — Sentinel Counsel" />
        <meta property="og:description" content="Learn how Sentinel Counsel collects, uses, and protects your personal information." />
        <meta property="og:url" content="https://sntlabs.io/privacy" />
        <meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />
        <meta name="twitter:title" content="Privacy Policy — Sentinel Counsel" />
        <meta name="twitter:description" content="Learn how Sentinel Counsel collects, uses, and protects your personal information." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />
        <link rel="canonical" href="https://sntlabs.io/privacy" />
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
          aria-controls="privacy-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="privacy-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
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
            <span aria-current="page">Privacy Policy</span>
          </nav>

          <header className="content-header">
            <h1>Privacy Policy</h1>
            <div className="content-meta">
              <time dateTime="2025-06-01">Effective June 1, 2025</time>
            </div>
          </header>

          <div className="content-layout">
            <div className="content-body">
              <section>
                <h2>Introduction</h2>
                <p>Sentinel Counsel ("we," "us," or "our"), operated by SNT Labs, is committed to protecting the privacy and confidentiality of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at sntlabs.io or use our AI-powered litigation platform.</p>
                <p>We understand that as a legal technology provider, the trust you place in us with sensitive information carries extraordinary responsibility. Privacy is not merely a compliance obligation for us — it is foundational to our privilege-by-design architecture.</p>
              </section>

              <section>
                <h2>Information We Collect</h2>
                <p><strong>Information you provide directly:</strong> When you request a demo, contact us, or create an account, we may collect your name, email address, law firm name, phone number, and professional role.</p>
                <p><strong>Usage data:</strong> We automatically collect certain information when you visit our website, including IP address, browser type, operating system, referring URLs, pages viewed, and time spent on pages. We use Google Analytics for aggregated website analytics.</p>
                <p><strong>Platform data:</strong> When using the Sentinel Counsel platform, all case data, documents, and AI interactions are processed within our privilege-preserving architecture. We do not retain, store, or use your case data for model training or any purpose other than providing the service to you.</p>
              </section>

              <section>
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <p>Provide, operate, and maintain our website and platform. Process demo requests and respond to inquiries. Send administrative information, updates, and security alerts. Analyze usage trends to improve our services. Comply with legal obligations and enforce our terms.</p>
              </section>

              <section>
                <h2>Data Retention and Security</h2>
                <p>Sentinel Counsel employs 256-bit AES encryption for data at rest and in transit. Platform interactions (prompts and outputs) are ephemeral — they are not stored, cached, or used for model training. We maintain zero data retention for AI interactions.</p>
                <p>Personal information collected through demo requests and account creation is retained only as long as necessary to fulfill the purposes described in this policy or as required by law.</p>
              </section>

              <section>
                <h2>Third-Party Sharing</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our website and conducting our business, provided they agree to keep this information confidential. We may also disclose information when required by law or to protect our rights.</p>
              </section>

              <section>
                <h2>Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. You may also have the right to opt out of certain data processing activities. To exercise any of these rights, please contact us at the information provided below.</p>
              </section>

              <section>
                <h2>Cookies</h2>
                <p>Our website uses essential cookies for site functionality and analytics cookies (via Google Analytics) to understand how visitors interact with our site. You can control cookie preferences through your browser settings.</p>
              </section>

              <section>
                <h2>Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the effective date above.</p>
              </section>

              <section>
                <h2>Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us at privacy@sntlabs.io.</p>
              </section>
            </div>
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

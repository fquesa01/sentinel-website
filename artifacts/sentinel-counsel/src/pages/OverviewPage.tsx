import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import "@/styles/homepage.css";
import "@/styles/overview.css";
import DemoRequestModal from "@/components/DemoRequestModal";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sntlabs.io/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Platform Overview",
      item: "https://sntlabs.io/overview",
    },
  ],
};

const productSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Counsel — Privileged AI Access",
    description: "Clients use AI without waiving privilege. Every interaction is wrapped in attorney work-product protections with a full audit trail.",
    brand: { "@type": "Brand", name: "Sentinel Counsel" },
    category: "Legal Technology Software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo for pricing",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Counsel — Ambient Intelligence",
    description: "Real-time AI for depositions, meetings, and interviews. Capture, summarize, and flag inconsistencies as testimony happens.",
    brand: { "@type": "Brand", name: "Sentinel Counsel" },
    category: "Legal Technology Software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo for pricing",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Counsel — Investigation Orchestration",
    description: "Manage thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.",
    brand: { "@type": "Brand", name: "Sentinel Counsel" },
    category: "Legal Technology Software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo for pricing",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Counsel — Full E-Discovery",
    description: "End-to-end electronic discovery with predictive coding, privilege logging, and production management — in a secure, defensible environment.",
    brand: { "@type": "Brand", name: "Sentinel Counsel" },
    category: "eDiscovery Software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo for pricing",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Counsel — Secure Client Portal",
    description: "A protected gateway for clients to interact with AI under the umbrella of privilege. Full access controls and defensible data handling.",
    brand: { "@type": "Brand", name: "Sentinel Counsel" },
    category: "Legal Technology Software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      description: "Request a demo for pricing",
    },
  },
];

export default function OverviewPage() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

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
        <title>Platform Overview — Sentinel Counsel | AI Litigation Software</title>
        <meta name="description" content="Sentinel Counsel platform overview: five pillars of privileged intelligence — AI access, ambient intelligence, investigation orchestration, e-discovery, and secure client portal. All privilege-protected." />
        <link rel="canonical" href="https://sntlabs.io/overview" />
        <meta property="og:title" content="Platform Overview — Sentinel Counsel" />
        <meta property="og:description" content="Five pillars of privileged intelligence: AI access, ambient intelligence, investigation orchestration, e-discovery, and secure client portal." />
        <meta property="og:url" content="https://sntlabs.io/overview" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {productSchemas.map((schema, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>

      <nav className={`ice-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
        <Link href="/" className="ice-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </Link>
        <div className="ice-nav-links">
          <Link href="/">Home</Link>
          <Link href="/overview" className="ice-nav-active">Overview</Link>
          <button className="ice-nav-cta" onClick={() => setDemoOpen(true)}>Request Demo</button>
        </div>
      </nav>

      <main>
        <section className="ov-hero">
          <div className="hero-content">
            <div className="hero-badge">
              Platform Overview
            </div>
            <h1>Everything Sentinel Counsel<br />Delivers — <em>At a Glance</em></h1>
            <p className="hero-sub">
              One platform. Five pillars. Zero compromise on privilege.
            </p>
          </div>
        </section>

        <section className="ov-value" aria-labelledby="value-heading">
          <div className="ov-value-inner">
            <span className="mono-label">The Problem</span>
            <h2 id="value-heading">AI Is Transforming Law.<br />Privilege Is Being Left Behind.</h2>
            <p className="ov-value-desc">
              Consumer AI tools expose sensitive communications to third parties, waiving attorney-client privilege. After <em>United States v. Heppner</em> (S.D.N.Y. 2026), the risk is no longer theoretical — it's precedent. Sentinel Counsel gives your firm the full power of AI without sacrificing the protections your clients depend on.
            </p>
          </div>
        </section>

        <section className="ov-pillars" aria-labelledby="pillars-heading">
          <span className="mono-label">Five Pillars of Privileged Intelligence</span>
          <h2 id="pillars-heading">What You Get</h2>

          <div className="ov-pillar-grid">
            <div className="ov-pillar-card">
              <div className="ov-pillar-num" aria-hidden="true">01</div>
              <div className="ov-pillar-content">
                <h3>Privileged AI Access</h3>
                <p>Clients use AI without waiving privilege. Every interaction is wrapped in attorney work-product protections with a full audit trail.</p>
              </div>
            </div>

            <div className="ov-pillar-card">
              <div className="ov-pillar-num" aria-hidden="true">02</div>
              <div className="ov-pillar-content">
                <h3>Ambient Intelligence</h3>
                <p>Real-time AI for depositions, meetings, and interviews. Capture, summarize, and flag inconsistencies as testimony happens.</p>
              </div>
            </div>

            <div className="ov-pillar-card">
              <div className="ov-pillar-num" aria-hidden="true">03</div>
              <div className="ov-pillar-content">
                <h3>Investigation Orchestration</h3>
                <p>Manage thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
              </div>
            </div>

            <div className="ov-pillar-card">
              <div className="ov-pillar-num" aria-hidden="true">04</div>
              <div className="ov-pillar-content">
                <h3>Full E-Discovery</h3>
                <p>End-to-end electronic discovery with predictive coding, privilege logging, and production management — in a secure, defensible environment.</p>
              </div>
            </div>

            <div className="ov-pillar-card">
              <div className="ov-pillar-num" aria-hidden="true">05</div>
              <div className="ov-pillar-content">
                <h3>Secure Client Portal</h3>
                <p>A protected gateway for clients to interact with AI under the umbrella of privilege. Full access controls and defensible data handling.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="ov-privilege" aria-labelledby="ov-priv-heading">
          <div className="ov-priv-grid">
            <div className="ov-priv-left">
              <span className="mono-label">Privilege Protection</span>
              <h2 id="ov-priv-heading">The Vault Around Your Practice</h2>
              <p>Built from the ground up to prevent privilege waiver — not retrofitted.</p>
            </div>
            <div className="ov-priv-right">
              <div className="ov-priv-item">
                <div className="ov-priv-dot" aria-hidden="true"></div>
                <div>
                  <h3>Zero Third-Party Exposure</h3>
                  <p>Data never leaves the privilege boundary. No model training on your inputs.</p>
                </div>
              </div>
              <div className="ov-priv-item">
                <div className="ov-priv-dot" aria-hidden="true"></div>
                <div>
                  <h3>Defensible Audit Trail</h3>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions.</p>
                </div>
              </div>
              <div className="ov-priv-item">
                <div className="ov-priv-dot" aria-hidden="true"></div>
                <div>
                  <h3>Work Product Compliant</h3>
                  <p>Satisfies both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="ov-priv-item">
                <div className="ov-priv-dot" aria-hidden="true"></div>
                <div>
                  <h3>Client-Facing AI Under Privilege</h3>
                  <p>Clients use AI within a privileged communication framework directed by counsel.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ov-security" aria-labelledby="ov-sec-heading">
          <span className="mono-label">Security Posture</span>
          <h2 id="ov-sec-heading">Enterprise-Grade by Default</h2>
          <div className="ov-sec-grid">
            <div className="ov-sec-item">
              <div className="ov-sec-num">256-bit</div>
              <h3>AES Encryption</h3>
              <p>Military-grade encryption for data at rest and in transit.</p>
            </div>
            <div className="ov-sec-item">
              <div className="ov-sec-num">Zero</div>
              <h3>Data Retention</h3>
              <p>Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="ov-sec-item">
              <div className="ov-sec-num">24/7</div>
              <h3>Threat Monitoring</h3>
              <p>Continuous security monitoring and incident response.</p>
            </div>
          </div>
        </section>

        <section className="ov-team" aria-labelledby="ov-team-heading">
          <span className="mono-label">Leadership</span>
          <h2 id="ov-team-heading">Built by Experts Who've Stood in the Arena</h2>
          <p className="ov-team-desc">
            Former federal and state prosecutors, public company general counsels, and the author of several enterprise-level security treatises — our team has the litigation experience and security expertise to build what the legal industry needs.
          </p>
          <div className="ov-team-creds">
            <span className="ov-team-cred">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Former Federal & State Prosecutors
            </span>
            <span className="ov-team-cred">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Public Company GCs & AGCs
            </span>
            <span className="ov-team-cred">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Enterprise Security Author
            </span>
          </div>
        </section>

        <section className="ov-heppner" aria-labelledby="ov-heppner-heading">
          <div className="ov-heppner-inner">
            <span className="mono-label">The Precedent</span>
            <h2 id="ov-heppner-heading">Why This Matters Now</h2>
            <div className="ov-heppner-quote">
              <div className="case-cite">United States v. Heppner</div>
              <div className="case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026</div>
              <p>Judge Rakoff ruled that sharing privileged communications with a consumer AI platform waives attorney-client privilege. Sentinel Counsel is the answer — purpose-built so this never happens to your firm.</p>
            </div>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="ov-cta-heading">
          <h2 id="ov-cta-heading">Ready to Protect<br />Your Practice?</h2>
          <p className="section-desc">Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
          <button className="btn-primary" onClick={() => setDemoOpen(true)}>
            Request a Confidential Demo
          </button>
        </section>
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
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Security</a>
        </div>
      </footer>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

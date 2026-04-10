import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  contentPages,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getContentPagesByCategory,
} from "@/data/content";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";

export default function ResourcesHub() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
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
        name: "Resources",
        item: "https://sntlabs.io/resources",
      },
    ],
  };

  const categoriesWithPages = CATEGORY_ORDER.filter(
    (cat) => getContentPagesByCategory(cat).length > 0,
  );

  return (
    <div className="ice-container">
      <Helmet>
        <title>
          Resources — Sentinel Counsel | Legal Technology Guides
        </title>
        <meta
          name="description"
          content="Legal technology resources from Sentinel Counsel. Guides on eDiscovery, legal holds, compliance monitoring, AI deposition tools, and privilege-preserving AI for law firms."
        />
        <meta
          property="og:title"
          content="Resources — Sentinel Counsel"
        />
        <meta
          property="og:description"
          content="Legal technology resources: guides on eDiscovery, legal holds, compliance, and privilege-preserving AI for law firms."
        />
        <meta
          property="og:url"
          content="https://sntlabs.io/resources"
        />
        <meta
          name="twitter:title"
          content="Resources — Sentinel Counsel"
        />
        <meta
          name="twitter:description"
          content="Legal technology resources: guides on eDiscovery, legal holds, compliance, and privilege-preserving AI for law firms."
        />
        <link rel="canonical" href="https://sntlabs.io/resources" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav
        className={`ice-nav ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <Link href="/" className="ice-logo">
          <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z"
              strokeWidth="1.5"
            />
          </svg>
          <span>Sentinel Counsel</span>
        </Link>
        <button
          className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="hub-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="hub-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/resources" className="ice-nav-active" onClick={() => setMobileMenuOpen(false)}>
            Resources
          </Link>
          <button
            className="ice-nav-cta"
            onClick={() => { setMobileMenuOpen(false); setDemoOpen(true); }}
          >
            Request Demo
          </button>
        </div>
      </nav>

      <main>
        <section className="hub-hero">
          <div className="hero-content">
            <div className="hero-badge">Legal Technology Resources</div>
            <h1>
              Guides, Comparisons &<br />
              <em>Expert Analysis</em>
            </h1>
            <p className="hero-sub">
              In-depth resources on eDiscovery, legal holds, compliance,
              and how AI is transforming litigation — all through the
              lens of privilege protection.
            </p>
          </div>
        </section>

        <div className="hub-filters" role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={activeFilter === "all"}
            className={`hub-filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`hub-filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {categoriesWithPages
          .filter((cat) => activeFilter === "all" || cat === activeFilter)
          .map((category) => {
            const pages = getContentPagesByCategory(category);
            return (
              <section
                key={category}
                className="hub-category"
                aria-labelledby={`cat-${category}`}
              >
                <div className="hub-category-header">
                  <span className="mono-label">{CATEGORY_LABELS[category]}</span>
                  <h2 id={`cat-${category}`}>
                    {CATEGORY_LABELS[category]}
                  </h2>
                </div>
                <div className="hub-grid">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/resources/${page.slug}`}
                      className="hub-card"
                    >
                      <div className="hub-card-category">
                        {CATEGORY_LABELS[page.category]}
                      </div>
                      <h3>{page.title}</h3>
                      <p>{page.metaDescription}</p>
                      <div className="hub-card-meta">
                        <time dateTime={page.lastUpdated}>
                          {new Date(page.lastUpdated).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

        <section className="cta-section" aria-labelledby="hub-cta-heading">
          <h2 id="hub-cta-heading">
            Ready to Protect
            <br />
            Your Practice?
          </h2>
          <p className="section-desc">
            Join the law firms already using Sentinel Counsel to harness
            AI without compromising privilege.
          </p>
          <button
            className="btn-primary"
            onClick={() => setDemoOpen(true)}
          >
            Request a Confidential Demo
          </button>
        </section>
      </main>

      <footer className="ice-footer">
        <div className="footer-left">
          <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z"
              strokeWidth="1.5"
            />
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

      <DemoRequestModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
      />
    </div>
  );
}

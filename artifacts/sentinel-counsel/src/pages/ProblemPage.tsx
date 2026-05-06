import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  privilegeIncidents,
  INCIDENT_CATEGORY_LABELS,
  INCIDENT_CATEGORY_ORDER,
  getYears,
  sanitizeExternalUrl,
  type IncidentCategory,
} from "@/data/privilegeIncidents";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";
import "@/styles/problem.css";

const TIPS_EMAIL = "tips@sntlabs.io";

export default function ProblemPage() {
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<IncidentCategory | "all">("all");
  const [activeYear, setActiveYear] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [mobileMenuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const years = useMemo(() => getYears(), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return privilegeIncidents
      .filter((i) => activeCategory === "all" || i.category === activeCategory)
      .filter((i) => activeYear === "all" || String(i.year) === activeYear)
      .filter(
        (i) =>
          q === "" ||
          i.headline.toLowerCase().includes(q) ||
          i.quote.toLowerCase().includes(q) ||
          i.attribution.toLowerCase().includes(q),
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeCategory, activeYear, search]);

  const totalIncidents = privilegeIncidents.length;
  const totalSanctioned = privilegeIncidents.filter(
    (i) => i.category === "court-filing" || i.category === "court-transcript",
  ).length;
  const earliestYear = Math.min(...privilegeIncidents.map((i) => i.year));

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "The Problem — Attorney-Client Privilege Violations Tracker",
    description:
      "A curated, sourced catalog of real-world incidents where attorney-client privilege has been broken or eroded by use of consumer AI tools, sloppy workflows, or public disclosures.",
    url: "https://sntlabs.io/problem",
    creator: {
      "@type": "Organization",
      name: "Sentinel Counsel",
      url: "https://sntlabs.io",
    },
    keywords: [
      "attorney-client privilege",
      "AI hallucination",
      "ChatGPT lawyer",
      "legal sanctions",
      "privilege waiver",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://sntlabs.io/" },
      { "@type": "ListItem", position: 2, name: "The Problem", item: "https://sntlabs.io/problem" },
    ],
  };

  return (
    <div className="ice-container">
      <Helmet>
        <title>
          The Problem — Where Attorney-Client Privilege Is Breaking, In Public | Sentinel Counsel
        </title>
        <meta
          name="description"
          content="A live catalog of real-world incidents — court filings, transcripts, news, and leaked LLM chats — where attorneys, clients, and experts have eroded attorney-client privilege using consumer AI tools."
        />
        <meta property="og:title" content="The Problem — Sentinel Counsel" />
        <meta
          property="og:description"
          content="Real, sourced incidents of attorney-client privilege being broken by consumer AI tools and sloppy workflows."
        />
        <meta property="og:url" content="https://sntlabs.io/problem" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />
        <meta property="og:site_name" content="Sentinel Counsel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Problem — Sentinel Counsel" />
        <meta
          name="twitter:description"
          content="Real, sourced incidents of attorney-client privilege being broken by consumer AI tools."
        />
        <meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />
        <link rel="canonical" href="https://sntlabs.io/problem" />
        <script type="application/ld+json">{JSON.stringify(datasetSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <nav
        className={`ice-nav ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
      >
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
          aria-controls="problem-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="problem-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/problem" className="ice-nav-active" onClick={() => setMobileMenuOpen(false)}>
            The Problem
          </Link>
          <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
          <button
            className="ice-nav-cta"
            onClick={() => { setMobileMenuOpen(false); setDemoOpen(true); }}
          >
            Request Demo
          </button>
        </div>
      </nav>

      <main>
        <section className="problem-hero">
          <span className="mono-label">The Problem</span>
          <h1>
            Every week, attorney-client privilege<br />
            is broken in <em>public</em>.
          </h1>
          <p className="problem-lede">
            Court filings. Transcripts. News reports. Leaked chatbot conversations.
            A growing record of attorneys, clients, and experts handing privileged
            matter to consumer AI tools — and getting caught. Below are the receipts.
          </p>
          <div className="problem-hero-cta">
            <button className="btn-primary" onClick={() => setDemoOpen(true)}>
              Request a Demo
            </button>
            <a className="btn-ghost" href="#problem-incidents">
              See the Receipts ↓
            </a>
          </div>
          <div className="problem-counter" role="region" aria-label="Tracker statistics">
            <div className="problem-counter-item">
              <span className="problem-counter-num">{totalIncidents}</span>
              <span className="problem-counter-label">Incidents Tracked</span>
            </div>
            <div className="problem-counter-item">
              <span className="problem-counter-num">{totalSanctioned}</span>
              <span className="problem-counter-label">On the Court Record</span>
            </div>
            <div className="problem-counter-item">
              <span className="problem-counter-num">{earliestYear}–{new Date().getFullYear()}</span>
              <span className="problem-counter-label">Date Range</span>
            </div>
          </div>
        </section>

        <section className="problem-controls" aria-label="Filter incidents">
          <div className="problem-chips" role="group" aria-label="Filter by source category">
            <button
              type="button"
              className={`problem-chip ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
            >
              All Sources
            </button>
            {INCIDENT_CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`problem-chip ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {INCIDENT_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div className="problem-controls-row">
            <input
              type="search"
              className="problem-search"
              placeholder="Search quotes, attorneys, courts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search incidents"
            />
            <select
              className="problem-year-select"
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              aria-label="Filter by year"
            >
              <option value="all">All Years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
            <span className="problem-result-count" aria-live="polite">
              Showing {filtered.length} of {totalIncidents}
            </span>
          </div>
        </section>

        <section id="problem-incidents" className="problem-grid" aria-label="Incidents">
          {filtered.length === 0 && (
            <div className="problem-empty">No incidents match your filters.</div>
          )}
          {filtered.map((incident) => (
            <article key={incident.id} className="problem-card">
              <div className="problem-card-header">
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span className="problem-badge">
                    {INCIDENT_CATEGORY_LABELS[incident.category]}
                  </span>
                  {incident.tool && (
                    <span className="problem-badge-tool">{incident.tool}</span>
                  )}
                </div>
                <time className="problem-card-date" dateTime={incident.date}>
                  {new Date(incident.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="problem-card-headline">{incident.headline}</h2>
              <blockquote className="problem-quote">{incident.quote}</blockquote>
              <div className="problem-attribution">— {incident.attribution}</div>
              <div className="problem-why">
                <span className="problem-why-label">Why it matters</span>
                {incident.whyItMatters}
              </div>
              <a
                className="problem-source"
                href={sanitizeExternalUrl(incident.sourceUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: {incident.sourceName} ↗
              </a>
            </article>
          ))}
        </section>

        <section className="problem-submit" aria-labelledby="problem-submit-heading">
          <span className="mono-label">Submit a Case</span>
          <h2 id="problem-submit-heading">Seen one we missed?</h2>
          <p>
            Send us the link — court opinion, news article, leaked share-link,
            anything publicly verifiable. We add new incidents weekly.
          </p>
          <div className="problem-submit-actions">
            <a
              className="btn-primary"
              href={`mailto:${TIPS_EMAIL}?subject=Privilege%20incident%20tip`}
            >
              Email a Tip
            </a>
            <button className="btn-ghost" onClick={() => setDemoOpen(true)}>
              Or Request a Demo
            </button>
          </div>
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
          <Link href="/problem">The Problem</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
        </div>
      </footer>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

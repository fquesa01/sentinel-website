import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { getContentPage, contentPages, CATEGORY_LABELS, type ContextualLink } from "@/data/content";
import DemoRequestModal from "@/components/DemoRequestModal";
import "@/styles/homepage.css";
import "@/styles/content.css";

function renderParagraphWithLinks(text: string, links: ContextualLink[]): React.ReactNode {
  if (!links || links.length === 0) return text;
  const parts: React.ReactNode[] = [text];
  const used = new Set<string>();
  for (const link of links) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof part !== "string") continue;
      if (used.has(link.keyword)) continue;
      const pattern = new RegExp(`\\b(${link.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i");
      const m = pattern.exec(part);
      if (!m) continue;
      const idx = m.index;
      const matchText = m[1];
      const before = part.slice(0, idx);
      const after = part.slice(idx + matchText.length);
      used.add(link.keyword);
      const replacement: React.ReactNode[] = [];
      if (before) replacement.push(before);
      replacement.push(
        <Link key={link.slug} href={`/resources/${link.slug}`} className="contextual-link">
          {matchText}
        </Link>
      );
      if (after) replacement.push(after);
      parts.splice(i, 1, ...replacement);
      break;
    }
  }
  return <>{parts}</>;
}


export default function ContentPage() {
  const params = useParams<{ slug: string }>();
  const page = getContentPage(params.slug || "");
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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
  }, [params.slug]);

  useEffect(() => {
    if (!page) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    for (const section of page.sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [page]);

  if (!page) {
    return (
      <div className="ice-container">
        <Helmet>
          <meta name="robots" content="noindex,follow" />
          <title>Page Not Found — Sentinel Counsel</title>
        </Helmet>
        <div className="content-not-found">
          <h1>Page Not Found</h1>
          <p>The resource you're looking for doesn't exist.</p>
          <Link href="/resources" className="btn-primary">
            Browse All Resources
          </Link>
        </div>
      </div>
    );
  }

  const relatedPages = page.relatedSlugs
    .map((slug) => contentPages.find((p) => p.slug === slug))
    .filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    datePublished: page.publishDate,
    dateModified: page.lastUpdated,
    author: {
      "@type": "Organization",
      name: "Sentinel Counsel",
      url: "https://sntlabs.io",
    },
    publisher: {
      "@type": "Organization",
      name: "Sentinel Counsel",
      url: "https://sntlabs.io",
      logo: {
        "@type": "ImageObject",
        url: "https://sntlabs.io/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sntlabs.io/resources/${page.slug}`,
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: CATEGORY_LABELS[page.category],
        item: "https://sntlabs.io/resources",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: page.title,
        item: `https://sntlabs.io/resources/${page.slug}`,
      },
    ],
  };

  return (
    <div className="ice-container">
      <Helmet>
        <title>{page.title} — Sentinel Counsel</title>
        <meta name="description" content={page.metaDescription} />
        <meta
          property="og:title"
          content={`${page.title} — Sentinel Counsel`}
        />
        <meta property="og:description" content={page.metaDescription} />
        <meta
          property="og:url"
          content={`https://sntlabs.io/resources/${page.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={page.publishDate}
        />
        <meta
          property="article:modified_time"
          content={page.lastUpdated}
        />
        <meta
          property="article:section"
          content={CATEGORY_LABELS[page.category]}
        />
        <meta
          name="twitter:title"
          content={`${page.title} — Sentinel Counsel`}
        />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />
        <meta property="og:site_name" content="Sentinel Counsel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />
        <link
          rel="canonical"
          href={`https://sntlabs.io/resources/${page.slug}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
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
          aria-controls="content-nav-links"
        >
          <span /><span /><span />
        </button>
        <div id="content-nav-links" className={`ice-nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
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
        <article className="content-article">
          <nav className="content-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/resources">Resources</Link>
            <span aria-hidden="true">/</span>
            <span>{CATEGORY_LABELS[page.category]}</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.title}</span>
          </nav>

          <header className="content-header">
            <h1>{page.title}</h1>
            <div className="content-meta">
              <time dateTime={page.lastUpdated}>
                Updated{" "}
                {new Date(page.lastUpdated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="content-meta-sep" aria-hidden="true">
                ·
              </span>
              <span>By Sentinel Counsel</span>
            </div>
          </header>

          <div className="content-layout">
            <aside className="content-toc" aria-label="Table of contents">
              <div className="content-toc-inner">
                <div className="content-toc-label">On This Page</div>
                <ul>
                  {page.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={
                          activeSection === section.id
                            ? "content-toc-active"
                            : ""
                        }
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="content-body">
              {page.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{renderParagraphWithLinks(paragraph, page.contextualLinks || [])}</p>
                  ))}
                  {section.table && (
                    <div className="comparison-table-wrap">
                      <table className="comparison-table">
                        <thead>
                          <tr>
                            <th>Feature</th>
                            <th>{section.table.headerA}</th>
                            <th>{section.table.headerB}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.feature}>
                              <td className="comparison-feature">{row.feature}</td>
                              <td>{row.colA}</td>
                              <td>{row.colB}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          <div className="content-share">
            <span>Share</span>
            <button
              className="share-btn"
              onClick={() => {
                navigator.clipboard.writeText(`https://sntlabs.io/resources/${page.slug}`);
              }}
            >
              Copy Link
            </button>
          </div>

          {relatedPages.length > 0 && (
            <aside
              className="content-related"
              aria-label="Related articles"
            >
              <h2>Related Articles</h2>
              <div className="content-related-grid">
                {relatedPages.map(
                  (related) =>
                    related && (
                      <Link
                        key={related.slug}
                        href={`/resources/${related.slug}`}
                        className="content-related-card"
                      >
                        <h3>{related.title}</h3>
                        <p>{related.metaDescription}</p>
                      </Link>
                    ),
                )}
              </div>
            </aside>
          )}

          <section className="content-cta" aria-labelledby="content-cta-heading">
            <h2 id="content-cta-heading">
              Ready to Protect Your Practice?
            </h2>
            <p>
              See how Sentinel Counsel keeps your firm's AI usage
              privilege-protected with zero third-party exposure.
            </p>
            <button
              className="btn-primary"
              onClick={() => setDemoOpen(true)}
            >
              Request a Confidential Demo
            </button>
          </section>
        </article>
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
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
        </div>
      </footer>

      <DemoRequestModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
      />
    </div>
  );
}

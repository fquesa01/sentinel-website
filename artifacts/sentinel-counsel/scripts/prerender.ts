import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  contentPages,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getContentPagesByCategory,
  type ContentPage,
} from "../src/data/content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist", "public");
const PROD_DOMAIN = "https://sntlabs.io";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripExistingMeta(html: string): string {
  html = html.replace(/<meta\s+name="description"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?\s*>/gi, "");
  html = html.replace(/\n\s*\n\s*\n/g, "\n\n");
  return html;
}

function buildHeadMeta(meta: {
  title: string;
  description: string;
  url: string;
  ogType?: string;
  publishDate?: string;
  lastUpdated?: string;
  jsonLd?: object[];
}): string {
  const tags = [
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:type" content="${meta.ogType || "website"}" />`,
    `<meta property="og:image" content="${PROD_DOMAIN}/opengraph.jpg" />`,
    `<meta property="og:site_name" content="Sentinel Counsel" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${PROD_DOMAIN}/opengraph.jpg" />`,
    `<link rel="canonical" href="${meta.url}" />`,
  ];

  if (meta.publishDate) {
    tags.push(`<meta property="article:published_time" content="${meta.publishDate}" />`);
  }
  if (meta.lastUpdated) {
    tags.push(`<meta property="article:modified_time" content="${meta.lastUpdated}" />`);
  }

  if (meta.jsonLd) {
    for (const schema of meta.jsonLd) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
    }
  }

  return tags.join("\n    ");
}

function injectIntoTemplate(
  template: string,
  title: string,
  headMeta: string,
  bodyContent: string,
): string {
  let html = stripExistingMeta(template);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace("</head>", `    ${headMeta}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyContent}</div>`,
  );
  return html;
}

function renderArticleBody(page: ContentPage): string {
  const relatedPages = page.relatedSlugs
    .map((slug) => contentPages.find((p) => p.slug === slug))
    .filter(Boolean) as ContentPage[];

  const formattedDate = new Date(page.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let html = `<article>`;
  html += `<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/resources">Resources</a> / <span>${escapeHtml(page.title)}</span></nav>`;
  html += `<header><h1>${escapeHtml(page.title)}</h1><div><time datetime="${page.lastUpdated}">Updated ${formattedDate}</time> · By Sentinel Counsel</div></header>`;

  for (const section of page.sections) {
    html += `<section id="${section.id}"><h2>${escapeHtml(section.heading)}</h2>`;
    for (const paragraph of section.body) {
      html += `<p>${escapeHtml(paragraph)}</p>`;
    }
    if (section.table) {
      html += `<div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Feature</th><th>${escapeHtml(section.table.headerA)}</th><th>${escapeHtml(section.table.headerB)}</th></tr></thead><tbody>`;
      for (const row of section.table.rows) {
        html += `<tr><td class="comparison-feature">${escapeHtml(row.feature)}</td><td>${escapeHtml(row.colA)}</td><td>${escapeHtml(row.colB)}</td></tr>`;
      }
      html += `</tbody></table></div>`;
    }
    html += `</section>`;
  }

  if (relatedPages.length > 0) {
    html += `<aside aria-label="Related articles"><h2>Related Articles</h2>`;
    for (const related of relatedPages) {
      html += `<a href="/resources/${related.slug}"><h3>${escapeHtml(related.title)}</h3><p>${escapeHtml(related.metaDescription)}</p></a>`;
    }
    html += `</aside>`;
  }

  html += `</article>`;
  return html;
}

function renderResourcesHub(): string {
  let html = `<main>`;
  html += `<section><h1>Guides, Comparisons &amp; Expert Analysis</h1>`;
  html += `<p>In-depth resources on eDiscovery, legal holds, compliance, and how AI is transforming litigation — all through the lens of privilege protection.</p></section>`;

  for (const category of CATEGORY_ORDER) {
    const pages = getContentPagesByCategory(category);
    if (pages.length === 0) continue;
    html += `<section aria-labelledby="cat-${category}"><h2 id="cat-${category}">${escapeHtml(CATEGORY_LABELS[category])}</h2>`;
    for (const page of pages) {
      html += `<a href="/resources/${page.slug}"><h3>${escapeHtml(page.title)}</h3><p>${escapeHtml(page.metaDescription)}</p></a>`;
    }
    html += `</section>`;
  }

  html += `</main>`;
  return html;
}

function prerender() {
  const indexPath = join(distDir, "index.html");

  if (!existsSync(indexPath)) {
    console.error("Build output not found at", indexPath);
    process.exit(1);
  }

  const template = readFileSync(indexPath, "utf-8");
  let created = 0;

  {
    const meta = buildHeadMeta({
      title: "Resources — Sentinel Counsel | Legal Technology Guides",
      description:
        "Legal technology resources from Sentinel Counsel. Guides on eDiscovery, legal holds, compliance monitoring, AI deposition tools, and privilege-preserving AI for law firms.",
      url: `${PROD_DOMAIN}/resources`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Legal Technology Resources",
          description:
            "Guides on eDiscovery, legal holds, compliance, and privilege-preserving AI for law firms.",
          url: `${PROD_DOMAIN}/resources`,
          publisher: { "@type": "Organization", name: "Sentinel Counsel", url: PROD_DOMAIN },
        },
      ],
    });

    const bodyHtml = renderResourcesHub();
    const html = injectIntoTemplate(
      template,
      "Resources — Sentinel Counsel | Legal Technology Guides",
      meta,
      bodyHtml,
    );
    writeRoute("/resources", html);
    created++;
  }

  for (const page of contentPages) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.metaDescription,
      datePublished: page.publishDate,
      dateModified: page.lastUpdated,
      author: { "@type": "Organization", name: "Sentinel Counsel", url: PROD_DOMAIN },
      publisher: {
        "@type": "Organization",
        name: "Sentinel Counsel",
        url: PROD_DOMAIN,
        logo: { "@type": "ImageObject", url: `${PROD_DOMAIN}/favicon.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${PROD_DOMAIN}/resources/${page.slug}` },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${PROD_DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Resources", item: `${PROD_DOMAIN}/resources` },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: `${PROD_DOMAIN}/resources/${page.slug}`,
        },
      ],
    };

    const headMeta = buildHeadMeta({
      title: `${page.title} — Sentinel Counsel`,
      description: page.metaDescription,
      url: `${PROD_DOMAIN}/resources/${page.slug}`,
      ogType: "article",
      publishDate: page.publishDate,
      lastUpdated: page.lastUpdated,
      jsonLd: [articleSchema, breadcrumbSchema],
    });

    const bodyHtml = renderArticleBody(page);
    const html = injectIntoTemplate(
      template,
      `${page.title} — Sentinel Counsel`,
      headMeta,
      bodyHtml,
    );
    writeRoute(`/resources/${page.slug}`, html);
    created++;
  }

  // Pre-render static policy pages
  const policyPages = [
    {
      route: "/privacy",
      title: "Privacy Policy — Sentinel Counsel",
      description: "Sentinel Counsel's privacy policy. Learn how we collect, use, and protect your personal information on sntlabs.io.",
      heading: "Privacy Policy",
    },
    {
      route: "/terms",
      title: "Terms of Service — Sentinel Counsel",
      description: "Sentinel Counsel's terms of service. Review the terms governing your use of sntlabs.io and the Sentinel Counsel litigation platform.",
      heading: "Terms of Service",
    },
    {
      route: "/security",
      title: "Security — Sentinel Counsel",
      description: "Sentinel Counsel's security practices. 256-bit AES encryption, zero data retention, 24/7 threat monitoring, and privilege-by-design architecture for law firms.",
      heading: "Security at Sentinel Counsel",
    },
  ];

  for (const policy of policyPages) {
    const headMeta = buildHeadMeta({
      title: policy.title,
      description: policy.description,
      url: `${PROD_DOMAIN}${policy.route}`,
    });
    const bodyHtml = `<article><header><h1>${escapeHtml(policy.heading)}</h1></header></article>`;
    const html = injectIntoTemplate(template, policy.title, headMeta, bodyHtml);
    writeRoute(policy.route, html);
    created++;
  }

  // Private signup. Emit a prerendered shell with a server-delivered
  // noindex,nofollow robots meta so non-JS crawlers honor it without
  // depending on the SPA hydrating.
  {
    const startTitle = "Sentinel Counsel — Private Signup";
    let startHtml = stripExistingMeta(template);
    startHtml = startHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(startTitle)}</title>`);
    startHtml = startHtml.replace(
      /<meta\s+name="robots"[^>]*\/?\s*>/gi,
      '<meta name="robots" content="noindex,nofollow" />',
    );
    startHtml = startHtml.replace(
      "</head>",
      `    <meta name="googlebot" content="noindex,nofollow" />\n  </head>`,
    );
    writeRoute("/start", startHtml);
    created++;
  }

  generateSitemap();

  console.log(`\nPre-rendered ${created} routes with full content HTML.`);
}

function writeRoute(route: string, html: string) {
  const outDir = join(distDir, route);
  const outFile = join(outDir, "index.html");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, html, "utf-8");
  console.log(`  [prerender] ${route}/index.html`);
}

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${PROD_DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${PROD_DOMAIN}/resources</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  for (const page of contentPages) {
    xml += `
  <url>
    <loc>${PROD_DOMAIN}/resources/${page.slug}</loc>
    <lastmod>${page.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  // Policy pages
  for (const path of ["/privacy", "/terms", "/security"]) {
    xml += `
  <url>
    <loc>${PROD_DOMAIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`;
  }

  xml += `
</urlset>
`;

  writeFileSync(join(distDir, "sitemap.xml"), xml, "utf-8");
  console.log("  [sitemap] generated from content data");
}

prerender();

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist", "public");
const contentPath = join(
  __dirname,
  "..",
  "src",
  "data",
  "content.ts",
);

const PROD_DOMAIN = "https://sntlabs.io";

function parseContentPages() {
  const src = readFileSync(contentPath, "utf-8");
  const pages = [];

  const pageRegex =
    /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)",[\s\S]*?publishDate:\s*"([^"]+)",\s*lastUpdated:\s*"([^"]+)"/g;
  let match;
  while ((match = pageRegex.exec(src)) !== null) {
    pages.push({
      slug: match[1],
      title: match[2],
      metaDescription: match[3],
      publishDate: match[4],
      lastUpdated: match[5],
    });
  }

  return pages;
}

function stripExistingMeta(html) {
  html = html.replace(/<meta\s+name="description"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?\s*>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?\s*>/gi, "");
  html = html.replace(/\n\s*\n\s*\n/g, "\n\n");
  return html;
}

function injectMeta(template, meta) {
  let html = stripExistingMeta(template);

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`,
  );

  const metaTags = [
    `<meta name="description" content="${meta.description}" />`,
    `<meta property="og:title" content="${meta.ogTitle}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:type" content="${meta.ogType || "website"}" />`,
    `<meta property="og:image" content="https://sntlabs.io/opengraph.jpg" />`,
    `<meta property="og:site_name" content="Sentinel Counsel" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${meta.ogTitle}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    `<meta name="twitter:image" content="https://sntlabs.io/opengraph.jpg" />`,
    `<link rel="canonical" href="${meta.url}" />`,
  ];

  if (meta.publishDate) {
    metaTags.push(
      `<meta property="article:published_time" content="${meta.publishDate}" />`,
    );
  }
  if (meta.lastUpdated) {
    metaTags.push(
      `<meta property="article:modified_time" content="${meta.lastUpdated}" />`,
    );
  }

  if (meta.jsonLd) {
    metaTags.push(
      `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`,
    );
  }

  html = html.replace("</head>", metaTags.join("\n    ") + "\n  </head>");

  return html;
}

function prerender() {
  const indexPath = join(distDir, "index.html");

  if (!existsSync(indexPath)) {
    console.error("Build output not found at", indexPath);
    process.exit(1);
  }

  const template = readFileSync(indexPath, "utf-8");
  const contentPagesList = parseContentPages();
  let created = 0;

  const resourcesMeta = {
    title: "Resources — Sentinel Counsel | Legal Technology Guides",
    ogTitle: "Resources — Sentinel Counsel",
    description:
      "Legal technology resources from Sentinel Counsel. Guides on eDiscovery, legal holds, compliance monitoring, AI deposition tools, and privilege-preserving AI for law firms.",
    url: `${PROD_DOMAIN}/resources`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Legal Technology Resources",
      description:
        "Guides on eDiscovery, legal holds, compliance, and privilege-preserving AI for law firms.",
      url: `${PROD_DOMAIN}/resources`,
      publisher: {
        "@type": "Organization",
        name: "Sentinel Counsel",
        url: PROD_DOMAIN,
      },
    },
  };

  writeRoute("/resources", injectMeta(template, resourcesMeta));
  created++;

  for (const page of contentPagesList) {
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
        url: PROD_DOMAIN,
      },
      publisher: {
        "@type": "Organization",
        name: "Sentinel Counsel",
        url: PROD_DOMAIN,
        logo: {
          "@type": "ImageObject",
          url: `${PROD_DOMAIN}/favicon.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${PROD_DOMAIN}/resources/${page.slug}`,
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
          item: `${PROD_DOMAIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resources",
          item: `${PROD_DOMAIN}/resources`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: `${PROD_DOMAIN}/resources/${page.slug}`,
        },
      ],
    };

    const meta = {
      title: `${page.title} — Sentinel Counsel`,
      ogTitle: `${page.title} — Sentinel Counsel`,
      description: page.metaDescription,
      url: `${PROD_DOMAIN}/resources/${page.slug}`,
      ogType: "article",
      publishDate: page.publishDate,
      lastUpdated: page.lastUpdated,
      jsonLd: [articleSchema, breadcrumbSchema],
    };

    const injected = injectMeta(template, {
      ...meta,
      jsonLd: articleSchema,
    });

    const finalHtml = injected.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n  </head>`,
    );

    writeRoute(`/resources/${page.slug}`, finalHtml);
    created++;
  }

  generateSitemap(contentPagesList);

  console.log(`\nPre-rendered ${created} routes with SEO metadata.`);
}

function writeRoute(route, html) {
  const outDir = join(distDir, route);
  const outFile = join(outDir, "index.html");

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  writeFileSync(outFile, html, "utf-8");
  console.log(`  [prerender] ${route}/index.html`);
}

function generateSitemap(pages) {
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

  for (const page of pages) {
    xml += `
  <url>
    <loc>${PROD_DOMAIN}/resources/${page.slug}</loc>
    <lastmod>${page.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  xml += `
</urlset>
`;

  writeFileSync(join(distDir, "sitemap.xml"), xml, "utf-8");
  console.log("  [sitemap] dist/public/sitemap.xml generated from content data");
}

prerender();

#!/usr/bin/env tsx
const url = process.argv.slice(2).find((a) => a !== "--");
if (!url) {
  console.error("Usage: pnpm --filter @workspace/sentinel-counsel run new:incident -- <source-url>");
  process.exit(1);
}

let host = "source";
try {
  host = new URL(url).hostname.replace(/^www\./, "").split(".")[0];
} catch {
  console.error(`Warning: "${url}" is not a parseable URL. Continuing anyway.`);
}

const today = new Date().toISOString().slice(0, 10);
const year = new Date().getUTCFullYear();
const slug = `${host}-${today.slice(0, 7).replace("-", "")}`;

const skeleton = `  {
    id: "${slug}",
    date: "${today}",
    year: ${year},
    category: "court-filing", // court-filing | court-transcript | news | llm-chat | social-media | other
    tool: "ChatGPT",          // optional: ChatGPT | Claude | Grok | Gemini | Bard | Replit | Copilot | Other
    headline:
      "TODO — one-line factual headline (no clickbait, no hype)",
    quote:
      "TODO — verbatim quote from the source (judge, court order, news article, etc.)",
    attribution:
      "TODO — who said it / where it appeared (e.g. 'Hon. Jane Doe, S.D.N.Y., Order, Case v. Case, 24-cv-1234')",
    sourceName: "TODO — outlet or court name (e.g. 'ABA Journal', 'FindLaw — Mata v. Avianca opinion')",
    sourceUrl:
      "${url}",
    whyItMatters:
      "TODO — 1-2 sentences on why this incident matters for attorney-client privilege.",
  },`;

console.log("\n// Paste this into artifacts/sentinel-counsel/src/data/privilegeIncidents.ts");
console.log("// at the TOP of the privilegeIncidents array (newest first).");
console.log("// Before you commit: verify the URL resolves and the quote is verbatim.\n");
console.log(skeleton);
console.log("");

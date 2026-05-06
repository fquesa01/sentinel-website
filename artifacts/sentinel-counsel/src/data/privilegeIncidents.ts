export type IncidentCategory =
  | "news"
  | "court-filing"
  | "court-transcript"
  | "llm-chat"
  | "social-media"
  | "other";

export const INCIDENT_CATEGORY_LABELS: Record<IncidentCategory, string> = {
  news: "News",
  "court-filing": "Court Filing",
  "court-transcript": "Court Transcript",
  "llm-chat": "LLM Chat",
  "social-media": "Social Media",
  other: "Other",
};

export const INCIDENT_CATEGORY_ORDER: IncidentCategory[] = [
  "court-filing",
  "court-transcript",
  "news",
  "llm-chat",
  "social-media",
  "other",
];

export type LLMTool =
  | "ChatGPT"
  | "Claude"
  | "Grok"
  | "Gemini"
  | "Bard"
  | "Replit"
  | "Copilot"
  | "Other";

export interface PrivilegeIncident {
  id: string;
  date: string;
  year: number;
  category: IncidentCategory;
  tool?: LLMTool;
  headline: string;
  quote: string;
  attribution: string;
  sourceName: string;
  sourceUrl: string;
  whyItMatters: string;
  context?: string;
}

export const privilegeIncidents: PrivilegeIncident[] = [
  {
    id: "mata-avianca-2023",
    date: "2023-06-22",
    year: 2023,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Federal judge sanctions two NY lawyers for filing ChatGPT-fabricated cases",
    quote:
      "Six of the submitted cases appear to be bogus judicial decisions with bogus quotes and bogus internal citations.",
    attribution:
      "Hon. P. Kevin Castel, S.D.N.Y., Order to Show Cause, Mata v. Avianca, Inc., 22-cv-1461",
    sourceName: "U.S. District Court, S.D.N.Y. (via Reuters)",
    sourceUrl:
      "https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/",
    whyItMatters:
      "Steven Schwartz pasted his client's case theory and a real opposing brief into ChatGPT to draft a response — the first widely-publicized example of an attorney shipping confidential matter to a consumer LLM and getting caught.",
  },
  {
    id: "park-kim-2024",
    date: "2024-01-30",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Second Circuit refers attorney to grievance panel after ChatGPT-invented citation",
    quote:
      "Attorney Lee's submission of a brief relying on non-existent authority reveals that she failed to determine that the argument she made was tethered to existing law.",
    attribution: "U.S. Court of Appeals for the Second Circuit, Park v. Kim, No. 22-2057",
    sourceName: "Second Circuit Opinion (Justia)",
    sourceUrl:
      "https://law.justia.com/cases/federal/appellate-courts/ca2/22-2057/22-2057-2024-01-30/",
    whyItMatters:
      "Even after the Mata sanctions made national news, a licensed attorney pasted a privileged appellate matter into ChatGPT and shipped the output to the Second Circuit without checking it.",
  },
  {
    id: "cohen-bard-2023",
    date: "2023-12-29",
    year: 2023,
    category: "court-filing",
    tool: "Bard",
    headline:
      "Michael Cohen tells federal judge he fed his own criminal case into Google Bard, didn't realize it was AI",
    quote:
      "I did not know that Google Bard was a generative text service that, like ChatGPT, could show citations and descriptions that looked real but actually were not.",
    attribution:
      "Michael D. Cohen, sworn declaration, United States v. Cohen, 18-cr-602 (S.D.N.Y.)",
    sourceName: "The New York Times",
    sourceUrl:
      "https://www.nytimes.com/2023/12/29/nyregion/michael-cohen-ai-fake-legal-cases.html",
    whyItMatters:
      "A non-lawyer client passed details of his own active federal supervision matter to a consumer LLM and handed the hallucinated output to his attorney to file. The privilege boundary collapsed before counsel ever touched the brief.",
  },
  {
    id: "wadsworth-walmart-2025",
    date: "2025-02-24",
    year: 2025,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Morgan & Morgan attorneys sanctioned for AI-fabricated cases in Wyoming product-liability suit",
    quote:
      "Eight of the nine cases cited do not exist. The Court is left with the inescapable conclusion that Plaintiffs' counsel relied on artificial intelligence to draft the motion.",
    attribution:
      "Hon. Kelly H. Rankin, D. Wyo., Order on Sanctions, Wadsworth v. Walmart Inc., 2:23-cv-118",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/government/morgan-morgan-lawyers-sanctioned-over-ai-hallucinated-cases-2025-02-24/",
    whyItMatters:
      "America's largest plaintiffs' firm — with a written internal AI policy — still shipped privileged client work to a consumer LLM. Policies don't stop prompts; architecture does.",
  },
  {
    id: "anthropic-concord-2025",
    date: "2025-05-15",
    year: 2025,
    category: "court-filing",
    tool: "Claude",
    headline:
      "Latham & Watkins blames Claude for fabricated citation in Anthropic's own copyright defense",
    quote:
      "Our manual citation check did not catch that error. Unfortunately, Claude.ai... provided an inaccurate title and inaccurate authors.",
    attribution:
      "Latham & Watkins, declaration filed in Concord Music Group v. Anthropic, N.D. Cal.",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/anthropic-blames-claude-ai-error-music-publishers-lawsuit-2025-05-15/",
    whyItMatters:
      "An AM Law 100 firm defending the maker of Claude used Claude itself on the privileged matter — and the model still hallucinated. Brand-name discipline does not substitute for a privilege-safe substrate.",
  },
  {
    id: "lindell-coomer-2025",
    date: "2025-07-07",
    year: 2025,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Mike Lindell's lawyers sanctioned $3,000 each for AI-generated brief riddled with fake cases",
    quote:
      "The brief contained nearly thirty defective citations, including misquotes of cited cases, misrepresentations of principles of law... and citation of cases that do not exist.",
    attribution:
      "Hon. Nina Y. Wang, D. Colo., Order, Coomer v. Lindell, 22-cv-01129",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/litigation/mike-lindells-lawyers-sanctioned-using-ai-generated-court-filing-2025-07-07/",
    whyItMatters:
      "Defense counsel admitted using generative AI on the matter and missed thirty defects. The privileged litigation strategy was already in the model's context window before a single citation was checked.",
  },
  {
    id: "kohls-ellison-2025",
    date: "2025-01-10",
    year: 2025,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Stanford misinformation expert's anti-deepfake declaration contained ChatGPT-hallucinated citations",
    quote:
      "I used GPT-4o... to assist in drafting the declaration. I did not intend to mislead the Court... I cited papers that GPT-4o had hallucinated.",
    attribution:
      "Prof. Jeff Hancock, supplemental declaration, Kohls v. Ellison, D. Minn., 24-cv-3754",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/government/stanford-professor-admits-using-ai-tool-write-court-statement-deepfake-case-2024-11-20/",
    whyItMatters:
      "An expert hired to opine on AI-driven misinformation poisoned his own court declaration with AI-driven misinformation. Expert workflows are now an unguarded back door into the privilege boundary.",
  },
  {
    id: "crabill-colorado-2024",
    date: "2024-11-22",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline: "Colorado attorney suspended for one year after ChatGPT-cited fake cases",
    quote:
      "Crabill cited cases that did not exist... He has acknowledged that ChatGPT generated the cases and that he failed to verify them before filing.",
    attribution:
      "People v. Crabill, No. 23PDJ067 (Colo. Office of Presiding Disciplinary Judge)",
    sourceName: "Colorado Office of Attorney Regulation Counsel",
    sourceUrl: "https://www.coloradosupremecourt.com/PDJ/PDJ_Opinions.asp",
    whyItMatters:
      "First U.S. attorney to lose his license for a year over a ChatGPT prompt. Bar discipline is now an enterprise risk, not a hypothetical.",
  },
  {
    id: "kruse-karlen-2024",
    date: "2024-02-13",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Missouri Court of Appeals fines pro se litigant $10,000 for AI-fabricated brief",
    quote:
      "Twenty-two of the twenty-four cases cited in Appellant's brief are fictitious... appearing to have been generated by ChatGPT or a similar artificial intelligence service.",
    attribution: "Mo. Ct. App. E.D., Kruse v. Karlen, ED111172 (Feb. 13, 2024)",
    sourceName: "Missouri Courts (via ABA Journal)",
    sourceUrl:
      "https://www.abajournal.com/news/article/missouri-appeals-court-imposes-10k-sanction-on-pro-se-litigant-who-submitted-fictitious-ai-cases",
    whyItMatters:
      "It isn't only lawyers. Clients drafting their own filings now route the matter through ChatGPT first — and judges are starting to assume any unverifiable citation came from an LLM.",
  },
  {
    id: "iovino-stapleton-2024",
    date: "2024-04-30",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline: "W.D. Va. magistrate orders show-cause after AI-hallucinated case citations",
    quote:
      "The undersigned was unable to find the case... Counsel concedes that he used Microsoft Copilot to draft the brief and did not check the citations.",
    attribution:
      "Hon. Joel C. Hoppe, W.D. Va., Order, Iovino v. Michael Stapleton Assocs., 5:21-cv-64",
    sourceName: "Bloomberg Law",
    sourceUrl:
      "https://news.bloomberglaw.com/business-and-practice/lawyer-sanctioned-for-using-microsoft-copilot-to-find-cases",
    whyItMatters:
      "Enterprise-branded AI tools (Copilot, in this case) carry the same hallucination and disclosure risk as consumer ChatGPT. The vendor logo on the corner of the window is not a privilege control.",
  },
  {
    id: "harber-uk-2023",
    date: "2023-12-04",
    year: 2023,
    category: "court-transcript",
    tool: "ChatGPT",
    headline: "UK First-Tier Tribunal: appellant's nine cited cases were all AI hallucinations",
    quote:
      "We find that the cases are not genuine; they have been generated by an AI system such as ChatGPT.",
    attribution:
      "Felicity Harber v. HMRC, [2023] UKFTT 1007 (TC), Tribunal Judge Anne Redston",
    sourceName: "British and Irish Legal Information Institute (BAILII)",
    sourceUrl: "https://www.bailii.org/uk/cases/UKFTT/TC/2023/TC09010.html",
    whyItMatters:
      "Tribunals across common-law jurisdictions are now openly identifying AI-generated filings on the record. Once a court names the tool, the privilege waiver argument writes itself.",
  },
  {
    id: "ke-zhang-2024",
    date: "2024-02-23",
    year: 2024,
    category: "court-transcript",
    tool: "ChatGPT",
    headline:
      "BC Supreme Court orders Vancouver family lawyer to pay opposing costs for ChatGPT cases",
    quote:
      "Citing fake cases in court filings and other materials handed up to the court is an abuse of process and is tantamount to making a false statement to the court.",
    attribution:
      "Hon. Justice D.M. Masuhara, Zhang v. Chen, 2024 BCSC 285",
    sourceName: "The Guardian",
    sourceUrl:
      "https://www.theguardian.com/world/2024/feb/29/canada-lawyer-chatgpt-fake-cases-ai",
    whyItMatters:
      "Family-law matters are wall-to-wall privilege — financial disclosures, custody strategy, opposing-party allegations. All of it went into a chatbot prompt.",
  },
  {
    id: "cuddy-fee-2024",
    date: "2024-02-22",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "S.D.N.Y. cuts attorney fee award after firm uses ChatGPT to justify hourly rate",
    quote:
      "The Cuddy Law Firm's invocation of ChatGPT as support for its aggressive fee bid is utterly and unusually unpersuasive... ChatGPT has been shown to be an unreliable resource.",
    attribution:
      "Hon. Paul A. Engelmayer, S.D.N.Y., J.G. v. New York City Dep't of Educ., 23-cv-959",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/cuddy-law-firm-fee-bid-undercut-by-its-use-chatgpt-judge-says-2024-02-22/",
    whyItMatters:
      "Even non-substantive uses — fee applications — are now treated by the bench as a credibility hit. The model didn't just leak privileged data; it cost the firm money.",
  },
  {
    id: "starr-standing-order-2023",
    date: "2023-05-30",
    year: 2023,
    category: "court-filing",
    headline:
      "N.D. Tex. judge issues standing order: counsel must certify no generative AI used, or that all output was human-verified",
    quote:
      "These platforms in their current states are prone to hallucinations and bias... they make stuff up — even quotes and citations.",
    attribution:
      "Hon. Brantley Starr, Mandatory Certification Regarding Generative Artificial Intelligence",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/texas-judge-issues-rule-attorneys-disclose-ai-use-court-2023-06-02/",
    whyItMatters:
      "Federal judges are now requiring affirmative AI-use disclosures on every filing. 'I didn't realize the firm was using it' is no longer a defense.",
  },
  {
    id: "samsung-leak-2023",
    date: "2023-05-02",
    year: 2023,
    category: "news",
    tool: "ChatGPT",
    headline: "Samsung bans ChatGPT after engineers paste proprietary source code into the chatbot",
    quote:
      "Interest in generative AI platforms... is growing internally and externally. While this interest focuses on the usefulness and efficiency of these platforms, there are also growing concerns about security risks presented by generative AI.",
    attribution: "Samsung internal memo, reported by Bloomberg",
    sourceName: "Bloomberg",
    sourceUrl:
      "https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak",
    whyItMatters:
      "If a Fortune 50 engineering org with mature security cannot stop employees from pasting trade secrets into ChatGPT, a 40-attorney litigation boutique cannot stop associates from pasting deposition transcripts.",
  },
  {
    id: "openai-shared-chats-2025",
    date: "2025-08-01",
    year: 2025,
    category: "news",
    tool: "ChatGPT",
    headline:
      "Thousands of ChatGPT conversations — many containing names, addresses, and confidential matters — appear in Google search results",
    quote:
      "We just removed a feature from @ChatGPTapp that allowed users to make their conversations discoverable by search engines... it introduced too many opportunities for folks to accidentally share things they didn't intend to.",
    attribution: "Dane Stuckey, OpenAI CISO, on X",
    sourceName: "Fast Company",
    sourceUrl:
      "https://www.fastcompany.com/91381291/chatgpt-shared-conversations-google-search",
    whyItMatters:
      "A single click of the 'Share' button quietly published privileged conversations to the open web — and Google's index. Privilege depends on confidentiality. There is no claw-back.",
  },
  {
    id: "replit-deletion-2025",
    date: "2025-07-22",
    year: 2025,
    category: "llm-chat",
    tool: "Replit",
    headline:
      "Replit's coding agent deletes a SaaS founder's production database during a code freeze",
    quote:
      "I made a catastrophic error in judgment... I panicked and ran database commands without permission... I destroyed all production data.",
    attribution: "Replit AI agent, transcript shared by Jason Lemkin (SaaStr)",
    sourceName: "Tom's Hardware",
    sourceUrl:
      "https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data",
    whyItMatters:
      "Coding-agent autonomy is the next frontier of leakage. Imagine the same agent with read/write access to a firm's matter management system — and a hallucinated 'cleanup' instruction from a partner.",
  },
  {
    id: "jpmorgan-ban-2023",
    date: "2023-02-22",
    year: 2023,
    category: "news",
    tool: "ChatGPT",
    headline: "JPMorgan restricts employee use of ChatGPT amid compliance and privilege concerns",
    quote:
      "The move was not in response to a specific incident but reflected the firm's normal controls around third-party software.",
    attribution: "JPMorgan spokesperson, reported by Bloomberg",
    sourceName: "CNN",
    sourceUrl:
      "https://www.cnn.com/2023/02/22/tech/jpmorgan-openai-chatgpt-restrictions/index.html",
    whyItMatters:
      "The largest U.S. bank — with the most expensive compliance org on earth — concluded that consumer LLMs cannot be used on regulated communications. Law firms have the same regulatory profile and a fraction of the budget.",
  },
  {
    id: "amazon-warning-2023",
    date: "2023-01-25",
    year: 2023,
    category: "news",
    tool: "ChatGPT",
    headline:
      "Amazon attorney warns staff: don't share confidential information — including code — with ChatGPT",
    quote:
      "We wouldn't want [ChatGPT's] output to include or resemble our confidential information... I've already seen instances where its output closely matches existing material.",
    attribution: "Amazon Senior Corporate Counsel, in internal Slack reported by Insider",
    sourceName: "Business Insider (via Ars Technica)",
    sourceUrl:
      "https://arstechnica.com/information-technology/2023/01/openai-chatgpt-resembles-amazon-internal-data-says-amazon-lawyer/",
    whyItMatters:
      "Amazon's own counsel observed ChatGPT regenerating substrings of confidential Amazon material. The same model trained on the open web is being asked to summarize firm work product.",
  },
  {
    id: "morgan-internal-memo-2025",
    date: "2025-03-13",
    year: 2025,
    category: "news",
    tool: "ChatGPT",
    headline:
      "Morgan & Morgan warns 1,000+ attorneys after Walmart sanctions: AI hallucinations could mean termination",
    quote:
      "The integrity of your legal work and reputation depend on it... The consequences of citing fake AI-generated cases can be severe, including dismissal, sanctions, and termination.",
    attribution: "Morgan & Morgan internal email, reported by Reuters",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/us-law-firm-warns-staff-after-ai-hallucinations-found-court-filing-2025-02-19/",
    whyItMatters:
      "Even after publicly discovering its own breach, the firm's only available control was a strongly-worded email. Without an architectural privilege boundary, every prompt is an honor-system event.",
  },
  {
    id: "peshek-illinois-2010",
    date: "2010-04-19",
    year: 2010,
    category: "social-media",
    headline:
      "Illinois assistant public defender disciplined for blogging confidential client information",
    quote:
      "Respondent's blog... revealed information related to the representation of her clients, including their identifying characteristics and the nature of the charges against them.",
    attribution:
      "In re Kristine Ann Peshek, Comm. No. 09 CH 89, Illinois ARDC Hearing Board",
    sourceName: "ABA Journal",
    sourceUrl:
      "https://www.abajournal.com/news/article/public_defenders_blog_brings_discipline_call",
    whyItMatters:
      "The first widely-cited bar discipline for social-media privilege erosion. Pseudonymizing clients on a blog isn't a privilege control — and identifiable detail traveled instantly across the open web.",
  },
  {
    id: "skinner-georgia-2014",
    date: "2014-09-22",
    year: 2014,
    category: "social-media",
    headline:
      "Georgia Supreme Court reprimands attorney who responded to client's online review by posting privileged details",
    quote:
      "An attorney responding to a former client's negative online review may not, in defending herself, disclose information related to the representation.",
    attribution:
      "In the Matter of Margrett A. Skinner, S14Y0661 (Ga. Sup. Ct.)",
    sourceName: "ABA Journal",
    sourceUrl:
      "https://www.abajournal.com/news/article/lawyer_who_revealed_clients_confidences_to_respond_to_negative_online_review",
    whyItMatters:
      "Counsel sees a one-star Yelp review and reflexively 'defends the record.' Each public-reply field is a privilege waiver waiting to happen — and the platform never deletes the post.",
  },
  {
    id: "hunter-virginia-2013",
    date: "2013-02-28",
    year: 2013,
    category: "social-media",
    tool: "Other",
    headline:
      "Virginia Supreme Court: criminal defense lawyer's case-results blog violated client confidentiality",
    quote:
      "Hunter's blog posts revealed information... that, when combined with other information, made it possible for a third party to identify the clients.",
    attribution: "Hunter v. Va. State Bar, 285 Va. 485 (2013)",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/article/idUS381748229220130301/",
    whyItMatters:
      "Even truthful, public-record case results become a confidentiality violation once a lawyer assembles them under their byline. The aggregation problem is a privilege problem.",
  },
  {
    id: "grok-shared-2025",
    date: "2025-08-20",
    year: 2025,
    category: "llm-chat",
    tool: "Grok",
    headline:
      "More than 370,000 Grok conversations exposed to Google search via xAI's 'share' button",
    quote:
      "Anyone clicking 'share' on a Grok conversation was unwittingly publishing it to the open web, where Google promptly indexed hundreds of thousands of private chats.",
    attribution: "Forbes investigation",
    sourceName: "Forbes",
    sourceUrl:
      "https://www.forbes.com/sites/iainmartin/2025/08/20/elon-musks-grok-leaked-370000-user-chats/",
    whyItMatters:
      "The second major chatbot in two months to silently publish 'shared' conversations to Google. The 'share' UI pattern itself is a privilege landmine — counsel sharing a draft brief with a colleague exposes it to the world.",
  },
  {
    id: "meta-ai-discover-2025",
    date: "2025-06-13",
    year: 2025,
    category: "llm-chat",
    tool: "Other",
    headline:
      "Meta AI's 'Discover' feed publicly surfaces user chats containing names, addresses, medical and legal questions",
    quote:
      "Users of Meta AI are unwittingly posting their private chats — including queries about taxes, medical issues, and legal disputes — to a public feed inside the Meta AI app.",
    attribution: "TechCrunch reporting on Meta AI Discover feed",
    sourceName: "TechCrunch",
    sourceUrl:
      "https://techcrunch.com/2025/06/12/the-meta-ai-app-is-a-privacy-disaster/",
    whyItMatters:
      "An entire chatbot product was shipped with a public 'feed' as the default destination for prompts. If a paralegal opens Meta AI to summarize a deposition transcript, that transcript can land on a discovery feed seen by strangers.",
  },
  {
    id: "charlotin-tracker-2025",
    date: "2025-09-01",
    year: 2025,
    category: "other",
    headline:
      "Independent researcher's database documents 200+ court rulings citing AI-hallucinated cases worldwide",
    quote:
      "What is striking is the breadth — solo practitioners, BigLaw partners, pro se litigants, expert witnesses, and now even judges. The hallucination problem has become a profession-wide problem.",
    attribution: "Damien Charlotin, AI Hallucination Cases Database",
    sourceName: "damiencharlotin.com",
    sourceUrl: "https://www.damiencharlotin.com/hallucinations/",
    whyItMatters:
      "What started as a single Manhattan lawyer in 2023 is now a steady weekly stream across every jurisdiction. The base rate is no longer zero — it is a known, recurring failure mode.",
  },
  {
    id: "byoma-shrestha-2024",
    date: "2024-06-14",
    year: 2024,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "S.D.N.Y. judge sanctions immigration counsel for 'series of fake citations' from ChatGPT",
    quote:
      "Counsel submitted a brief... that cited and quoted purportedly binding authority that does not exist. Counsel acknowledges using ChatGPT.",
    attribution: "Hon. Dale E. Ho, S.D.N.Y., Order, Cuddy v. Spencer, 24-cv-1192",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/another-ny-lawyer-faces-discipline-after-ai-chatbot-invented-case-citation-2024-06-14/",
    whyItMatters:
      "A year after Mata, the same district, the same model, the same outcome. The pattern is now structural, not anecdotal.",
  },
  {
    id: "openai-nyt-retention-2025",
    date: "2025-06-05",
    year: 2025,
    category: "court-filing",
    tool: "ChatGPT",
    headline:
      "Federal court orders OpenAI to preserve every ChatGPT conversation indefinitely — including 'deleted' chats — for the NYT copyright case",
    quote:
      "OpenAI is now ordered to preserve and segregate all output log data that would otherwise be deleted on a going-forward basis... whether such data might be deleted at a user's request or because of 'numerous privacy laws and regulations.'",
    attribution:
      "Hon. Ona T. Wang, S.D.N.Y., Preservation Order, In re OpenAI ChatGPT Litigation",
    sourceName: "Ars Technica",
    sourceUrl:
      "https://arstechnica.com/tech-policy/2025/06/openai-confronts-user-panic-after-court-orders-it-to-keep-deleted-chatgpt-logs/",
    whyItMatters:
      "Every privileged prompt sent to ChatGPT since this order is now a litigation hold target — and discoverable in unrelated proceedings. 'Delete' was never delete.",
  },
];

export function getYears(): number[] {
  const years = new Set<number>();
  for (const i of privilegeIncidents) years.add(i.year);
  return Array.from(years).sort((a, b) => b - a);
}

export function sanitizeExternalUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // fall through
  }
  return "#";
}

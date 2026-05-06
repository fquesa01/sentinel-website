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
    sourceName: "FindLaw — Mata v. Avianca opinion",
    sourceUrl:
      "https://caselaw.findlaw.com/court/us-dis-crt-sd-new-yor/2335142.html",
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
    sourceName: "FindLaw — Park v. Kim opinion",
    sourceUrl:
      "https://caselaw.findlaw.com/court/us-2nd-circuit/115760381.html",
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
    sourceName: "NPR",
    sourceUrl:
      "https://www.npr.org/2023/12/30/1222273745/michael-cohen-ai-fake-legal-cases",
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
    sourceName: "FindLaw — Wadsworth v. Walmart opinion",
    sourceUrl:
      "https://caselaw.findlaw.com/court/us-dis-crt-d-wyo/117003959.html",
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
    sourceName: "Fortune",
    sourceUrl:
      "https://fortune.com/2025/05/18/anthropic-claude-lawyer-mistake-citation-legal-filing-large-language-model-llm-latham-watkins/",
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
    sourceName: "9NEWS Colorado",
    sourceUrl:
      "https://www.9news.com/article/news/local/lindell-attorneys-ai-brief-fine/73-9c704a65-1076-41f5-accf-6ce60d25e074",
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
    sourceName: "The Stanford Daily",
    sourceUrl:
      "https://stanforddaily.com/2024/12/04/hancock-admitted-to-ai-use/",
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
    sourceName: "CBS Colorado",
    sourceUrl:
      "https://www.cbsnews.com/colorado/news/colorado-lawyer-artificial-intelligence-suspension/",
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
    sourceName: "Missouri Independent",
    sourceUrl:
      "https://missouriindependent.com/2024/02/13/missouri-appeals-court-fines-litigant-after-finding-fake-ai-generated-cases-cited-in-filings/",
    whyItMatters:
      "It isn't only lawyers. Clients drafting their own filings now route the matter through ChatGPT first — and judges are starting to assume any unverifiable citation came from an LLM.",
  },
  {
    id: "iovino-stapleton-2024",
    date: "2024-04-30",
    year: 2024,
    category: "court-filing",
    tool: "Copilot",
    headline: "W.D. Va. magistrate orders show-cause after AI-hallucinated case citations",
    quote:
      "The undersigned was unable to find the case... Counsel concedes that he used Microsoft Copilot to draft the brief and did not check the citations.",
    attribution:
      "Hon. Joel C. Hoppe, W.D. Va., Order, Iovino v. Michael Stapleton Assocs., 5:21-cv-64",
    sourceName: "National Law Review",
    sourceUrl:
      "https://natlawreview.com/article/has-generative-ai-run-amok-discovery-disputes",
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
    sourceName: "The Law Society Gazette",
    sourceUrl:
      "https://www.lawgazette.co.uk/news/ai-hallucinates-nine-helpful-case-authorities/5118179.article",
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
    sourceName: "Gardiner Roberts LLP analysis",
    sourceUrl:
      "https://www.grllp.com/blog/Lawyer-ordered-to-pay-costs-for-citing-fake-cases-in-court-material-Zhang-v.-Chen-629",
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
    sourceName: "Above the Law",
    sourceUrl:
      "https://abovethelaw.com/2024/02/judge-rejects-chatgpt-fee-request/",
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
    sourceName: "Legal Dive",
    sourceUrl:
      "https://www.legaldive.com/news/generative-ai-hallucinations-federal-judge-order-on-ai-brantley-starr/651817/",
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
    sourceName: "CNBC",
    sourceUrl:
      "https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html",
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
    sourceName: "Fortune",
    sourceUrl:
      "https://fortune.com/2025/08/05/openai-google-search-chat-history/",
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
    sourceName: "Fortune",
    sourceUrl:
      "https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/",
    whyItMatters:
      "Coding-agent autonomy is the next frontier of leakage. Imagine the same agent with read/write access to a firm's matter management system — and a hallucinated 'cleanup' instruction from a partner.",
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
    sourceName: "ABA Journal",
    sourceUrl:
      "https://www.abajournal.com/news/article/no-42-law-firm-by-headcount-could-face-sanctions-over-fake-case-citations-generated-by-chatgpt",
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
      "https://www.abajournal.com/news/article/blogging_assistant_pd_gets_60-day_suspension_for_posts_on_little-disguised_",
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
      "https://www.abajournal.com/news/article/mildest_sanction_rejected_for_lawyer_who_disclosed_client_info_in_response_",
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
    sourceName: "FindLaw — Hunter v. Va. State Bar opinion",
    sourceUrl:
      "https://caselaw.findlaw.com/court/va-supreme-court/1624547.html",
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
    sourceName: "TechCrunch",
    sourceUrl:
      "https://techcrunch.com/2025/08/20/thousands-of-grok-chats-are-now-searchable-on-google/",
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
    sourceName: "Malwarebytes Labs",
    sourceUrl:
      "https://www.malwarebytes.com/blog/news/2025/06/your-meta-ai-chats-might-be-public-and-its-not-a-bug",
    whyItMatters:
      "An entire chatbot product was shipped with a public 'feed' as the default destination for prompts. If a paralegal opens Meta AI to summarize a deposition transcript, that transcript can land on a discovery feed seen by strangers.",
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
    sourceName: "OpenAI — Response to NYT data demands",
    sourceUrl:
      "https://openai.com/index/response-to-nyt-data-demands/",
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

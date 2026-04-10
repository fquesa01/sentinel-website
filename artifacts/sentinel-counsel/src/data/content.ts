export type ContentCategory =
  | "pillar"
  | "comparison"
  | "listicle"
  | "educational"
  | "landing";

export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  pillar: "Pillar Pages",
  comparison: "Comparisons",
  listicle: "Listicles",
  educational: "Guides & Education",
  landing: "Solutions",
};

export const CATEGORY_ORDER: ContentCategory[] = [
  "pillar",
  "educational",
  "comparison",
  "listicle",
  "landing",
];

export interface ContentSection {
  id: string;
  heading: string;
  body: string[];
}

export interface ContentPage {
  slug: string;
  title: string;
  metaDescription: string;
  category: ContentCategory;
  sections: ContentSection[];
  relatedSlugs: string[];
  publishDate: string;
  lastUpdated: string;
}

export const contentPages: ContentPage[] = [
  {
    slug: "what-is-a-legal-hold",
    title: "What Is a Legal Hold? Complete Guide for Law Firms",
    metaDescription:
      "Learn what a legal hold is, when to issue one, and how modern software automates the process. A complete guide for law firms navigating preservation obligations.",
    category: "educational",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "A legal hold — also known as a litigation hold or preservation order — is a directive requiring an organization to preserve all potentially relevant documents and electronically stored information (ESI) when litigation is reasonably anticipated.",
          "This guide covers everything law firms need to know about legal holds: when to issue them, what they must include, how to enforce them, and how modern technology is transforming the process.",
        ],
      },
      {
        id: "when-to-issue",
        heading: "When to Issue a Legal Hold",
        body: [
          "The duty to preserve evidence arises when litigation is reasonably anticipated — not when a complaint is actually filed. Courts have imposed severe sanctions on parties who failed to preserve evidence once they had reason to believe litigation was forthcoming.",
          "Common triggers include receiving a demand letter, becoming aware of a regulatory investigation, learning of a workplace complaint, or discovering a potential breach of contract. The key question is whether a reasonable person in the same position would anticipate litigation.",
        ],
      },
      {
        id: "key-components",
        heading: "Key Components of an Effective Legal Hold",
        body: [
          "An effective legal hold notice must identify the matter, describe the types of documents to preserve, specify the relevant time period, and name the custodians responsible for preservation. It should also explain the consequences of non-compliance.",
          "Beyond the initial notice, firms must implement a system for tracking acknowledgments, sending reminders, and documenting compliance. Courts increasingly expect organizations to demonstrate an active, ongoing preservation effort — not just a single email.",
        ],
      },
      {
        id: "technology",
        heading: "How Technology Automates Legal Holds",
        body: [
          "Modern legal hold software automates the entire lifecycle: issuing notices, tracking custodian acknowledgments, sending periodic reminders, and generating defensible audit trails. This reduces the risk of spoliation and the burden on legal teams.",
          "Sentinel Counsel integrates legal hold management directly into its privilege-protected platform, ensuring that hold-related communications and documents remain within the attorney-client privilege boundary throughout the preservation process.",
        ],
      },
    ],
    relatedSlugs: [
      "legal-hold-software",
      "what-is-ediscovery",
      "ediscovery-software-law-firms",
    ],
    publishDate: "2026-03-15",
    lastUpdated: "2026-04-10",
  },
  {
    slug: "what-is-ediscovery",
    title: "What Is eDiscovery? The Complete 2026 Guide",
    metaDescription:
      "Understand electronic discovery from start to finish. This 2026 guide covers the EDRM model, key stages, technology trends, and how AI is transforming the process.",
    category: "educational",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "Electronic discovery (eDiscovery) is the process of identifying, collecting, reviewing, and producing electronically stored information (ESI) in response to litigation, regulatory investigations, or internal inquiries.",
          "As organizations generate exponentially more digital data, eDiscovery has evolved from a manual document review exercise into a technology-driven discipline that leverages AI, predictive coding, and advanced analytics.",
        ],
      },
      {
        id: "edrm-model",
        heading: "The EDRM Model Explained",
        body: [
          "The Electronic Discovery Reference Model (EDRM) provides a framework for the eDiscovery process. It consists of nine stages: Information Governance, Identification, Preservation, Collection, Processing, Review, Analysis, Production, and Presentation.",
          "While not every case requires all nine stages, the EDRM provides a common language and structured approach that helps legal teams manage complex discovery obligations efficiently and defensibly.",
        ],
      },
      {
        id: "ai-transformation",
        heading: "How AI Is Transforming eDiscovery",
        body: [
          "AI-powered eDiscovery tools use machine learning for predictive coding (technology-assisted review), concept clustering, email threading, and anomaly detection. These technologies can reduce document review time by 60-80% compared to manual review.",
          "However, using consumer AI tools for eDiscovery introduces serious privilege risks. After United States v. Heppner (S.D.N.Y. 2026), courts have confirmed that sharing privileged documents with third-party AI platforms waives attorney-client privilege. Purpose-built platforms like Sentinel Counsel solve this by keeping all data within the privilege boundary.",
        ],
      },
    ],
    relatedSlugs: [
      "ediscovery-software-law-firms",
      "ediscovery-processing",
      "what-is-a-legal-hold",
    ],
    publishDate: "2026-03-20",
    lastUpdated: "2026-04-10",
  },
  {
    slug: "ediscovery-software-law-firms",
    title: "eDiscovery Software for Small & Mid-Size Law Firms",
    metaDescription:
      "Find the right eDiscovery software for your law firm. Compare features, pricing models, and privilege protection for small and mid-size firms.",
    category: "pillar",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: [
          "Small and mid-size law firms face unique challenges in eDiscovery: limited budgets, lean teams, and cases that still generate massive volumes of electronically stored information. The right software can level the playing field.",
          "This guide examines what to look for in eDiscovery software, how pricing models differ, and why privilege protection should be a non-negotiable requirement for any AI-powered platform your firm adopts.",
        ],
      },
      {
        id: "key-features",
        heading: "Key Features to Evaluate",
        body: [
          "Essential features for law firm eDiscovery software include: document ingestion and processing, search and filtering, technology-assisted review (TAR/predictive coding), privilege logging, production management, and defensible export capabilities.",
          "For firms considering AI-powered features, the critical differentiator is how the platform handles privileged data. Consumer AI tools and cloud-based platforms that train models on user data create unacceptable privilege risks. Look for platforms with zero data retention, no third-party data sharing, and defensible audit trails.",
        ],
      },
      {
        id: "privilege-protection",
        heading: "Why Privilege Protection Matters",
        body: [
          "The landmark ruling in United States v. Heppner (S.D.N.Y. 2026) confirmed that sharing privileged communications with a consumer AI platform constitutes a waiver of attorney-client privilege. This decision has fundamentally changed how law firms must evaluate technology vendors.",
          "Sentinel Counsel was designed from the ground up with privilege-by-design architecture. Every AI interaction occurs within the privilege boundary, with zero third-party exposure, no model training on client data, and a complete defensible audit trail.",
        ],
      },
    ],
    relatedSlugs: [
      "what-is-ediscovery",
      "best-ediscovery-software-2026",
      "ediscovery-solo-small-firms",
    ],
    publishDate: "2026-03-10",
    lastUpdated: "2026-04-10",
  },
];

export function getContentPage(slug: string): ContentPage | undefined {
  return contentPages.find((p) => p.slug === slug);
}

export function getContentPagesByCategory(
  category: ContentCategory,
): ContentPage[] {
  return contentPages.filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
  return contentPages.map((p) => p.slug);
}

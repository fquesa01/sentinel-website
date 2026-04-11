# Frequently Asked Questions

> Last updated: April 2026

This FAQ covers common questions about **Sentinel Counsel**, the AI-powered litigation platform built for law firms.

---

## Table of Contents

- [General](#general)
- [Features & Capabilities](#features--capabilities)
- [Security & Privacy](#security--privacy)
- [Pricing & Getting Started](#pricing--getting-started)
- [AI & Technology](#ai--technology)
- [Support](#support)
- [Legal & Compliance](#legal--compliance)

---

## General

### What is Sentinel Counsel?

Sentinel Counsel is a voice-first, AI-powered litigation platform built for trial attorneys and law firms. It provides real-time deposition support, full e-discovery, ambient intelligence, and a secure client portal — all within a privilege-by-design architecture that ensures attorney-client privilege is never waived. Attorneys interact with the platform by speaking naturally, with no training or complex interfaces required.

### Who builds Sentinel Counsel?

Sentinel Counsel is built by Sentinel Counsel LLP (SNT Labs). Our leadership team includes former Microsoft Security & Compliance leaders with decades of experience building secure, governed AI platforms for Fortune 500 companies, financial institutions, and universities. Our team includes a Microsoft Regional Director, multi-year Microsoft Most Valuable Professional (Azure, Data Platform, AI), Google Developer Expert for Analytics, and published authors with O'Reilly and Microsoft Press.

---

## Features & Capabilities

### What is voice-first AI and how does it work in litigation?

Voice-first means you interact with Sentinel Counsel the way you'd talk to your sharpest associate — by speaking naturally. There are no menus to navigate or buttons to click. You can retrieve case files, draft discovery responses, generate privilege logs, tag documents, and query witness testimony, all by voice command. This is especially valuable during live proceedings where hands-free operation is essential.

### How does real-time deposition support work?

During a live deposition, Sentinel Counsel provides ambient intelligence that cross-references the deponent's testimony against prior sworn statements, filings, emails, text messages, and public records. Inconsistencies are flagged instantly so you can follow up in the moment. The platform also generates deposition summaries automatically, builds and updates case checklists in real time as testimony comes in, and retrieves relevant case files by voice command.

### What e-discovery capabilities does Sentinel Counsel provide?

Sentinel Counsel provides end-to-end electronic discovery including AI-powered document review, predictive coding (technology-assisted review), automated privilege logging with a defensible audit trail, and production management. The platform can respond to interrogatories and document requests in minutes instead of weeks — drafting responses, flagging privilege issues, and generating privilege logs automatically.

### What is ambient intelligence?

Ambient intelligence is Sentinel Counsel's ability to passively listen and analyze during live proceedings — depositions, client interviews, and meetings. The platform processes audio in real time, cross-references spoken content against your case files, and surfaces relevant information or flags inconsistencies without requiring any manual interaction from the attorney. All of this operates within a privilege-preserving architecture.

### How does the secure client portal work?

The secure client portal gives your clients a protected gateway to interact with AI under the umbrella of attorney-client privilege. All communications through the portal stay within the privilege boundary, with full audit trails, access controls, and defensible data handling. This allows clients to leverage AI tools without risking privilege waiver, because all interactions are directed by counsel within a privileged communication framework.

---

## Security & Privacy

### Does using AI tools waive attorney-client privilege?

Yes — using consumer AI tools with privileged information can waive attorney-client privilege. In *United States v. Heppner* (S.D.N.Y. 2026), Judge Jed S. Rakoff ruled that sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. Sentinel Counsel is designed with privilege-by-design architecture specifically to prevent this: data never leaves the privilege boundary and no model training occurs on your inputs.

### What is privilege-by-design architecture?

Privilege-by-design means the platform is architected from the ground up to maintain attorney-client privilege and work product protections. This includes: zero third-party exposure of privileged data; no model training on user inputs; a defensible audit trail of every AI interaction (timestamped and mapped to privilege assertions); pre- and post-completion filters that guard against data exfiltration; and sensitive data filtering that prevents PII and trade secrets from reaching the LLM. This approach satisfies both attorney-client privilege and work product doctrine standards.

### What encryption does Sentinel Counsel use?

All data is protected with 256-bit AES encryption, both at rest and in transit. Every communication between your device and the platform is encrypted via TLS 1.3. Stored data is encrypted with keys managed through a dedicated key management service with strict access controls.

### What is Sentinel Counsel's data retention policy?

AI interactions on Sentinel Counsel are ephemeral. Prompts and outputs are processed in real time and are not stored, cached, or logged after your session. Your data is never used for model training, fine-tuning, or any purpose other than delivering the service to you in the moment you request it. Case data is retained only as long as the client requires and remains under your control.

### Is Sentinel Counsel secure enough for sensitive litigation?

Yes. Sentinel Counsel was built by former Microsoft Security & Compliance leadership and enterprise security experts. The platform uses 256-bit AES encryption, maintains zero data retention for AI interactions, and provides 24/7 threat monitoring with continuous intrusion detection and automated threat response. Infrastructure is hosted in SOC 2 compliant data centers with physical security controls including biometric access and 24/7 surveillance. The platform supports deployment within the client's own cloud environment for complete data sovereignty. Regular security assessments, penetration testing, and automated security scanning in the CI/CD pipeline are standard practice.

---

## Pricing & Getting Started

### How do I get pricing for Sentinel Counsel?

Pricing for Sentinel Counsel is customized based on firm size and needs. To get a quote, request a demo through our website at [sntlabs.io](https://sntlabs.io) or reach out to our team directly. During the demo, we'll walk you through the platform and discuss a package that fits your practice.

### How do I request a demo?

You can request a demo by clicking the "Request Demo" button on our website at [sntlabs.io](https://sntlabs.io). Fill out the demo request form and our team will reach out to schedule a personalized walkthrough of the platform tailored to your firm's needs.

### How quickly can my firm start using Sentinel Counsel?

Because Sentinel Counsel is voice-first, the learning curve is minimal — there's no complex software to master. Once your tenant is provisioned, attorneys can start using the platform immediately by speaking naturally. Onboarding support and training resources are included to ensure your team gets the most out of every capability.

---

## AI & Technology

### What AI models power Sentinel Counsel?

Sentinel Counsel uses a combination of AI services:

- **OpenAI GPT-5**: Powers document analysis, sentiment detection, and the AI assistant
- **Google Gemini**: Provides semantic document search (File Search RAG) with natural language queries and embeddings for topic clustering
- **Azure Document Intelligence**: OCR for scanned document processing
- **Azure Speech Services / ElevenLabs**: Audio transcription for deposition support and interviews

All AI models are deployed within the privilege boundary — no data is sent to consumer AI services.

### Does Sentinel Counsel train models on my data?

No. Sentinel Counsel never uses your data for model training, fine-tuning, or any purpose other than delivering the service in the moment you request it. AI interactions are ephemeral — prompts and outputs are processed in real time and are not stored. This is a core principle of our privilege-by-design architecture and a direct response to the risks highlighted by the *US v. Heppner* ruling.

---

## Support

### How do I contact support?

You can reach our team through:

- **Website**: Request support through [sntlabs.io](https://sntlabs.io)
- **Security Team**: Our 24/7 threat monitoring team is available for urgent security concerns

### How do I report a security vulnerability?

If you discover a security vulnerability or have concerns about the security of our platform, please contact us immediately at **security@sntlabs.io**. We take all security reports seriously and will respond within 24 hours. We maintain a responsible disclosure program for security researchers.

---

## Legal & Compliance

### What is the US v. Heppner ruling and why does it matter?

*United States v. Heppner* (S.D.N.Y., No. 25-cr-00503, February 2026) is a landmark federal ruling by Judge Jed S. Rakoff. The court held that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. Judge Rakoff found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality, destroying privilege the moment data is shared.

This ruling means that law firms must ensure their legal technology vendors guarantee that data stays within the privilege boundary. Sentinel Counsel was built specifically to address this risk, with privilege-by-design architecture that ensures zero third-party data exposure and no model training on user inputs.

### Is Sentinel Counsel compliant with SOC 2 standards?

Sentinel Counsel infrastructure is hosted in SOC 2 compliant data centers with physical security controls including biometric access, 24/7 surveillance, and environmental protections. Our development process includes automated security scanning in the CI/CD pipeline, regular penetration testing, and code reviews. Multi-factor authentication is required for all administrative access, and all access events are logged and audited.

---

*Have a question not covered here? [Request a demo](https://sntlabs.io) or contact us to learn more.*

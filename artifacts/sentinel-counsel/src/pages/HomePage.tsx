import { useEffect, useState } from "react";
import "@/styles/homepage.css";
import VideoBackground from "@/components/VideoBackground";

const base = import.meta.env.BASE_URL;
const COURTROOM_VIDEOS = [
  `${base}videos/courtroom_drone_above.mp4`,
  `${base}videos/courtroom_drone_through.mp4`,
  `${base}videos/courtroom_drone_descend.mp4`,
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ice-container">
      <VideoBackground videos={COURTROOM_VIDEOS} clipDuration={10000} crossfadeDuration={2500} />
      <nav className={`ice-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="ice-logo">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
          </svg>
          <span>Sentinel Counsel</span>
        </a>
        <div className="ice-nav-links">
          <a href="#courtroom">Litigation</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#team">Team</a>
          <a href="#security">Security</a>
          <a href="#contact" className="ice-nav-cta">Request Demo</a>
        </div>
      </nav>

      <section className="ice-hero">
        <div className="hero-content">
          <div className="hero-badge">
            AI-Powered Litigation Platform
          </div>
          <h1>Your Unfair <em>Advantage</em><br/>in the Courtroom</h1>
          <p className="hero-sub">
            Sentinel handles the heavy lifting — voice-powered case files, real-time lie detection, e-discovery, and draft discovery — so you can focus on what matters most: your clients and your cases.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Request a Demo
            </a>
            <a href="#courtroom" className="btn-ghost">
              See It in Action
            </a>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-inner">
          <div className="trust-item">Voice-First — No Training Required</div>
          <div className="trust-item">Real-Time Deposition Support</div>
          <div className="trust-item">Discovery in Minutes, Not Weeks</div>
          <div className="trust-item">Privilege Protected</div>
        </div>
      </div>

      <section id="courtroom">
        <div className="courtroom-grid">
          <div className="courtroom-text">
            <span className="mono-label">Built for Trial Attorneys</span>
            <h2>Like Having Your Best<br/>Associate — <em>Always On</em></h2>
            <p>No interface to learn. No buttons to click. Speak to Sentinel Counsel the way you'd talk to your sharpest associate — and get instant results that would take a junior days.</p>
            <div className="voice-prompt">
              <span>"Pull the deposition transcript from the Martinez case and flag every inconsistency with his prior sworn statement."</span>
            </div>
          </div>

          <div className="courtroom-demo">
            <div className="demo-terminal">
              <div className="demo-header">
                <div>SENTINEL COUNSEL — LIVE SESSION</div>
                <div className="demo-status">SESSION ENCRYPTED</div>
              </div>
              <div className="demo-body">
                <div className="demo-step">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Case Files On Demand</div>
                    <div className="step-desc">Your case files surface the moment you need them. Briefs, exhibits, prior testimony — retrieved by voice in seconds, not hours of searching.</div>
                    <div className="step-result">
                      <span className="result-tag">3 depositions</span>
                      <span className="result-tag">12 exhibits</span>
                      <span className="result-tag">2 expert reports</span>
                    </div>
                  </div>
                </div>

                <div className="demo-step">
                  <div className="step-icon warn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Deponent Lie Detection</div>
                    <div className="step-desc">Real-time cross-reference against prior statements, filings, and public records. Inconsistencies are flagged instantly during live depositions.</div>
                    <div className="step-result">
                      <span className="result-tag alert">3 contradictions found</span>
                      <span className="result-tag">vs. prior sworn statement</span>
                      <span className="result-tag">vs. deponent's emails and text messages</span>
                    </div>
                  </div>
                </div>

                <div className="demo-step">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Auto-Built Case Checklist</div>
                    <div className="step-desc">Elements of every cause of action are mapped and tracked automatically. Your case checklist updates in real time as evidence comes in.</div>
                    <div className="step-result">
                      <span className="result-tag success">4 of 6 elements satisfied</span>
                      <span className="result-tag">2 need additional evidence</span>
                      <span className="result-tag">2 elements from depositions</span>
                      <span className="result-tag">2 elements from emails</span>
                    </div>
                  </div>
                </div>

                <div className="demo-step">
                  <div className="step-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Instant Discovery Response</div>
                    <div className="step-desc">Respond to interrogatories and document requests in minutes instead of weeks. AI drafts responses, flags privilege issues, and generates privilege logs.</div>
                    <div className="step-result">
                      <span className="result-tag">47 RFPs drafted</span>
                      <span className="result-tag">privilege log generated</span>
                    </div>
                  </div>
                </div>

                <div className="demo-step">
                  <div className="step-icon voice-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  </div>
                  <div className="step-content">
                    <div className="step-label">Zero Interface. Just Speak.</div>
                    <div className="step-desc">No software to learn. Speak naturally and Sentinel Counsel pulls documents, drafts motions, tags discovery, creates privilege logs — anything your case demands.</div>
                    <div className="step-result">
                      <span className="result-tag voice-tag">Voice-first AI</span>
                      <span className="result-tag">No training required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities">
        <div className="cap-header">
          <span className="mono-label">Platform</span>
          <h2>Five Pillars of<br/>Privileged Intelligence</h2>
          <p>Every capability engineered to keep your practice protected while unlocking the full power of AI.</p>
        </div>

        <div className="cap-grid">
          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3>Privileged AI Access</h3>
            <p>Let your clients leverage AI without waiving privilege. Every interaction is wrapped in attorney work-product protections and audit-trailed for defensibility.</p>
          </div>

          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8 2h8"/></svg>
            </div>
            <h3>Ambient Intelligence</h3>
            <p>Real-time AI for meetings, depositions, and client interviews. Capture, summarize, and analyze spoken testimony with privilege-preserving architecture.</p>
          </div>

          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3>Investigation Orchestration</h3>
            <p>Manage large-scale investigations across thousands of documents, witnesses, and data sources. AI-powered pattern recognition with human oversight at every step.</p>
          </div>

          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8h6M8 11h4"/></svg>
            </div>
            <h3>Full E-Discovery</h3>
            <p>End-to-end electronic discovery with AI-assisted document review, predictive coding, privilege logging, and production management — all within a secure, defensible environment.</p>
          </div>

          <div className="cap-card">
            <div className="cap-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <h3>Secure Client Portal</h3>
            <p>Give clients a protected gateway to interact with AI under the umbrella of privilege. Full audit trails, access controls, and defensible data handling.</p>
          </div>
        </div>
      </section>

      <section id="privilege">
        <div className="privilege-inner">
          <div className="priv-visual">
            <div className="vault-ticks"></div>
            <div className="vault-ring-1"></div>
            <div className="vault-ring-2"></div>
            <div className="vault-ring-3"></div>
            <div className="vault-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>

          <div className="priv-text">
            <span className="mono-label">Privilege Protection</span>
            <h2>The Vault Around<br/>Your Practice</h2>
            <p>Traditional AI tools expose sensitive communications to third parties, potentially waiving attorney-client privilege. Sentinel Counsel was designed from the ground up to prevent this.</p>

            <div className="priv-features">
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Zero Third-Party Exposure</h4>
                  <p>Data never leaves the privilege boundary. No model training on your inputs. Ever.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Defensible Audit Trail</h4>
                  <p>Every AI interaction is logged, timestamped, and mapped to privilege assertions for court defensibility.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Work Product Doctrine Compliant</h4>
                  <p>Architected to satisfy both attorney-client privilege and work product protection standards.</p>
                </div>
              </div>
              <div className="priv-feat">
                <div className="priv-feat-dot"></div>
                <div className="priv-feat-text">
                  <h4>Client-Facing AI Under Privilege</h4>
                  <p>Empower clients to use AI tools within a privileged communication framework directed by counsel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-callout" id="heppner">
        <div className="case-inner">
          <span className="mono-label">The Precedent</span>
          <h2>The Court Has Spoken:<br/>AI Use Can Waive Privilege</h2>
          <p>A landmark federal ruling has confirmed what many feared — using consumer AI tools with privileged information destroys attorney-client privilege.</p>

          <div className="case-ruling">
            <div className="case-cite">United States v. Heppner</div>
            <div className="case-court">S.D.N.Y. &bull; No. 25-cr-00503 &bull; Feb. 2026 &bull; Judge Jed S. Rakoff</div>

            <div className="case-quote">
              "Sharing privileged communications with a third-party AI platform constitutes a waiver of the privilege over the original attorney-client communications themselves."
            </div>

            <p className="case-explanation">
              Judge Rakoff ruled that 31 documents a defendant generated using a consumer AI platform were neither privileged nor protected as work product. The court found that inputting privileged information into a public AI tool — whose privacy policy permits data collection, model training, and disclosure to government authorities — eliminates any reasonable expectation of confidentiality. The privilege was destroyed the moment the data was shared.
            </p>

            <div className="case-answer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Sentinel Counsel is the answer to Heppner
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="team-new-inner">
          <div className="team-left">
            <span className="mono-label">Leadership</span>
            <h2>Built by Experts Who've<br/>Stood in the Arena</h2>
            <p>Our team is made up of former state and federal prosecutors, public company general and associate general counsels, and an author of several enterprise-level security treatises.</p>
          </div>

          <div className="team-right">
            <div className="expertise-label">Deep Experience In</div>

            <div className="expertise-list">
              <div className="expertise-item">
                <div className="expertise-marker"></div>
                <div className="expertise-content">
                  <h4>Enterprise Security &amp; Compliance</h4>
                  <p>Former Microsoft Security &amp; Compliance leadership. Author of multiple enterprise security treatises. A decade building zero-trust architectures and data protection frameworks for Fortune 500 organizations.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker"></div>
                <div className="expertise-content">
                  <h4>Litigation at All Levels</h4>
                  <p>Former federal and state prosecutors and big law alumni with extensive experience across complex investigations, regulatory enforcement, white-collar defense, and trial advocacy at every level of the court system.</p>
                </div>
              </div>
              <div className="expertise-item">
                <div className="expertise-marker"></div>
                <div className="expertise-content">
                  <h4>Public Company Litigation</h4>
                  <p>General counsels and associate general counsels from publicly traded companies. Deep fluency in SEC enforcement, securities litigation, shareholder disputes, and board-level governance.</p>
                </div>
              </div>
            </div>

            <div className="expertise-creds">
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Former Federal &amp; State Prosecutors
              </span>
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Public Company GCs &amp; AGCs
              </span>
              <span className="expertise-cred">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Enterprise Security Author
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="security">
        <div className="security-inner">
          <span className="mono-label">Security Posture</span>
          <h2>Enterprise-Grade by Default</h2>
          <p>Built by the people who wrote the security playbook at the world's largest technology companies.</p>

          <div className="sec-grid">
            <div className="sec-item">
              <div className="sec-number">256</div>
              <h4>Bit AES Encryption</h4>
              <p>Military-grade encryption for data at rest and in transit. Your case files have never been safer.</p>
            </div>
            <div className="sec-item">
              <div className="sec-number">0</div>
              <h4>Data Retention</h4>
              <p>Prompts and outputs are ephemeral. Nothing is stored, cached, or used for model training. Period.</p>
            </div>
            <div className="sec-item">
              <div className="sec-number">24/7</div>
              <h4>Threat Monitoring</h4>
              <p>Continuous security monitoring, intrusion detection, and incident response by a dedicated security team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <h2>Ready to Protect<br/>Your Practice?</h2>
        <p className="section-desc">Join the law firms already using Sentinel Counsel to harness AI without compromising privilege.</p>
        <a href="#" className="btn-primary">
          Request a Confidential Demo
        </a>
      </section>

      <footer className="ice-footer">
        <div className="footer-left">
          <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L4 8v9c0 8.3 5.5 16 13 18 7.5-2 13-9.7 13-18V8L17 2z" strokeWidth="1.5" />
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
    </div>
  );
}

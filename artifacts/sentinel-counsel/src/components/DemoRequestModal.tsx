import { useState, useRef, useEffect } from "react";
import "@/styles/demo-modal.css";

interface DemoRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoRequestModal({ open, onClose }: DemoRequestModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg("");
      setName("");
      setEmail("");
      setBusinessName("");
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !businessName.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const base = import.meta.env.BASE_URL;
      const apiBase = base.endsWith("/") ? base : base + "/";
      const res = await fetch(`${apiBase}api/demo-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          businessName: businessName.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="demo-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="demo-modal">
        <button className="demo-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="demo-modal-success">
            <div className="demo-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Request Received</h3>
            <p>Thank you. A member of our team will reach out within 24 hours to schedule your confidential demo.</p>
            <button className="btn-primary demo-modal-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="demo-modal-header">
              <span className="mono-label">Confidential</span>
              <h3>Request a Demo</h3>
              <p>Schedule a private walkthrough of Sentinel Counsel for your firm.</p>
            </div>

            <form className="demo-modal-form" onSubmit={handleSubmit}>
              <div className="demo-field">
                <label htmlFor="demo-name">Full Name</label>
                <input
                  ref={nameRef}
                  id="demo-name"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "submitting"}
                />
              </div>

              <div className="demo-field">
                <label htmlFor="demo-email">Email Address</label>
                <input
                  id="demo-email"
                  type="email"
                  placeholder="jane@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                />
              </div>

              <div className="demo-field">
                <label htmlFor="demo-business">Firm / Business Name</label>
                <input
                  id="demo-business"
                  type="text"
                  placeholder="Smith & Associates LLP"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={status === "submitting"}
                />
              </div>

              {errorMsg && <div className="demo-error">{errorMsg}</div>}

              <button
                type="submit"
                className="btn-primary demo-modal-btn"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Submitting…" : "Request Demo"}
              </button>

              <p className="demo-disclaimer">
                Your information is encrypted and will only be used to schedule your demo.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

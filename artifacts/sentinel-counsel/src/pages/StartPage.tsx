import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "@/styles/homepage.css";
import "@/styles/start-page.css";

type ContractLength = "1yr" | "2yr";

interface AuthorizedUser {
  name: string;
  email: string;
}

interface IntakeFormState {
  firmName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  primaryContactName: string;
  primaryContactTitle: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  billingContactName: string;
  billingContactEmail: string;
  ein: string;
  referralSource: string;
  notes: string;
  licenseCount: number;
  contractLength: ContractLength;
  authorizedUsers: AuthorizedUser[];
}

const ANNUAL_PRICE_PER_LICENSE = 2500;
const MIN_LICENSES = 10;

function apiUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base : base + "/";
  return `${root}api${path}`;
}

function emptyState(): IntakeFormState {
  return {
    firmName: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "US",
    primaryContactName: "",
    primaryContactTitle: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    billingContactName: "",
    billingContactEmail: "",
    ein: "",
    referralSource: "",
    notes: "",
    licenseCount: 10,
    contractLength: "1yr",
    authorizedUsers: [{ name: "", email: "" }],
  };
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function fmtMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface PricingMath {
  annualListPerLicense: number;
  effectiveAnnualPerLicense: number;
  annualTotal: number;
  quarterlyTotal: number;
  contractTotal: number;
  discountPct: number;
  contractYears: number;
}

function computePricing(
  licenses: number,
  contractLength: ContractLength,
): PricingMath {
  const discountPct = contractLength === "2yr" ? 10 : 0;
  const effectiveAnnualPerLicense =
    ANNUAL_PRICE_PER_LICENSE * (1 - discountPct / 100);
  const annualTotal = effectiveAnnualPerLicense * licenses;
  const quarterlyTotal = annualTotal / 4;
  const contractYears = contractLength === "2yr" ? 2 : 1;
  return {
    annualListPerLicense: ANNUAL_PRICE_PER_LICENSE,
    effectiveAnnualPerLicense,
    annualTotal,
    quarterlyTotal,
    contractTotal: annualTotal * contractYears,
    discountPct,
    contractYears,
  };
}

function StartTopbar() {
  return (
    <header className="start-topbar">
      <div className="ice-logo">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
          <path d="M12 2 L20 7 V13 C20 17 16 21 12 22 C8 21 4 17 4 13 V7 Z" />
        </svg>
        Sentinel Counsel
      </div>
      <div className="start-topbar-meta">Private Signup</div>
    </header>
  );
}

function StartFooter() {
  return (
    <footer className="start-footer">
      Encrypted intake · Payments processed by Stripe · © Sentinel Labs
    </footer>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps: Array<{ n: number; label: string }> = [
    { n: 1, label: "Firm Intake" },
    { n: 2, label: "Review Pricing" },
    { n: 3, label: "Payment" },
  ];
  return (
    <div className="start-stepper">
      {steps.map((s) => {
        const cls =
          step > s.n ? "start-step complete" : step === s.n ? "start-step active" : "start-step";
        return (
          <div key={s.n} className={cls}>
            <span className="num">0{s.n}</span>
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

interface IntakeStepProps {
  state: IntakeFormState;
  setState: React.Dispatch<React.SetStateAction<IntakeFormState>>;
  onNext: () => void;
  error: string | null;
}

function IntakeStep({ state, setState, onNext, error }: IntakeStepProps) {
  function update<K extends keyof IntakeFormState>(key: K, val: IntakeFormState[K]) {
    setState((s) => ({ ...s, [key]: val }));
  }

  function updateUser(idx: number, field: keyof AuthorizedUser, val: string) {
    setState((s) => {
      const next = [...s.authorizedUsers];
      next[idx] = { ...next[idx]!, [field]: val };
      return { ...s, authorizedUsers: next };
    });
  }

  function addUser() {
    setState((s) => ({
      ...s,
      authorizedUsers: [...s.authorizedUsers, { name: "", email: "" }],
    }));
  }

  function removeUser(idx: number) {
    setState((s) => ({
      ...s,
      authorizedUsers: s.authorizedUsers.filter((_, i) => i !== idx),
    }));
  }

  return (
    <>
      <h1>Start with Sentinel Counsel</h1>
      <p className="subhead">
        Tell us about your firm. This information powers your contract,
        billing setup, and team provisioning. All fields are required unless
        marked optional.
      </p>

      {error && <div className="start-error">{error}</div>}

      <section className="start-section">
        <h2>Firm</h2>
        <div className="start-form">
          <div className="start-field">
            <label>Law firm legal name</label>
            <input
              type="text"
              value={state.firmName}
              onChange={(e) => update("firmName", e.target.value)}
              placeholder="Smith &amp; Associates LLP"
            />
          </div>
          <div className="start-field">
            <label>
              Tax ID / EIN <span className="opt">(optional)</span>
            </label>
            <input
              type="text"
              value={state.ein}
              onChange={(e) => update("ein", e.target.value)}
              placeholder="12-3456789"
            />
          </div>
        </div>
      </section>

      <section className="start-section">
        <h2>Billing address</h2>
        <div className="start-form">
          <div className="start-field">
            <label>Street address</label>
            <input
              type="text"
              value={state.billingStreet}
              onChange={(e) => update("billingStreet", e.target.value)}
              placeholder="200 Park Ave, Suite 1500"
            />
          </div>
          <div className="start-form-grid-3">
            <div className="start-field">
              <label>City</label>
              <input
                type="text"
                value={state.billingCity}
                onChange={(e) => update("billingCity", e.target.value)}
              />
            </div>
            <div className="start-field">
              <label>State / Region</label>
              <input
                type="text"
                value={state.billingState}
                onChange={(e) => update("billingState", e.target.value)}
                placeholder="NY"
              />
            </div>
            <div className="start-field">
              <label>Postal code</label>
              <input
                type="text"
                value={state.billingZip}
                onChange={(e) => update("billingZip", e.target.value)}
              />
            </div>
          </div>
          <div className="start-field">
            <label>Country</label>
            <select
              value={state.billingCountry}
              onChange={(e) => update("billingCountry", e.target.value)}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="IE">Ireland</option>
              <option value="NZ">New Zealand</option>
            </select>
          </div>
        </div>
      </section>

      <section className="start-section">
        <h2>Primary contact</h2>
        <div className="start-form">
          <div className="start-form-grid">
            <div className="start-field">
              <label>Full name</label>
              <input
                type="text"
                value={state.primaryContactName}
                onChange={(e) => update("primaryContactName", e.target.value)}
              />
            </div>
            <div className="start-field">
              <label>Title</label>
              <input
                type="text"
                value={state.primaryContactTitle}
                onChange={(e) => update("primaryContactTitle", e.target.value)}
                placeholder="Managing Partner"
              />
            </div>
          </div>
          <div className="start-form-grid">
            <div className="start-field">
              <label>Email</label>
              <input
                type="email"
                value={state.primaryContactEmail}
                onChange={(e) => update("primaryContactEmail", e.target.value)}
              />
            </div>
            <div className="start-field">
              <label>Phone</label>
              <input
                type="tel"
                value={state.primaryContactPhone}
                onChange={(e) => update("primaryContactPhone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="start-section">
        <h2>
          Billing contact <span className="opt">(if different)</span>
        </h2>
        <div className="start-form-grid">
          <div className="start-field">
            <label>
              Name <span className="opt">(optional)</span>
            </label>
            <input
              type="text"
              value={state.billingContactName}
              onChange={(e) => update("billingContactName", e.target.value)}
            />
          </div>
          <div className="start-field">
            <label>
              Email <span className="opt">(optional)</span>
            </label>
            <input
              type="email"
              value={state.billingContactEmail}
              onChange={(e) => update("billingContactEmail", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="start-section">
        <h2>Authorized users</h2>
        <span className="mono-label">
          List the attorneys / staff who will receive Sentinel Counsel accounts.
        </span>
        <div className="start-users-list">
          {state.authorizedUsers.map((u, idx) => (
            <div key={idx} className="start-user-row">
              <input
                type="text"
                placeholder="Full name"
                value={u.name}
                onChange={(e) => updateUser(idx, "name", e.target.value)}
              />
              <input
                type="email"
                placeholder="email@firm.com"
                value={u.email}
                onChange={(e) => updateUser(idx, "email", e.target.value)}
              />
              <button
                type="button"
                className="start-user-remove"
                onClick={() => removeUser(idx)}
                disabled={state.authorizedUsers.length === 1}
                aria-label="Remove user"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="start-user-add" onClick={addUser}>
          + Add user
        </button>
      </section>

      <section className="start-section">
        <h2>Licenses &amp; contract</h2>
        <div className="start-license-row">
          <div className="start-field">
            <label>Number of licenses (min {MIN_LICENSES})</label>
            <input
              type="number"
              min={MIN_LICENSES}
              max={10000}
              value={state.licenseCount}
              onChange={(e) => update("licenseCount", Number(e.target.value) || 0)}
            />
          </div>
          <div className="start-field">
            <label>Contract length</label>
            <select
              value={state.contractLength}
              onChange={(e) => update("contractLength", e.target.value as ContractLength)}
            >
              <option value="1yr">1 year — list price</option>
              <option value="2yr">2 years — 10% discount</option>
            </select>
          </div>
        </div>
      </section>

      <section className="start-section">
        <h2>Anything else?</h2>
        <div className="start-form">
          <div className="start-field">
            <label>
              How did you hear about us? <span className="opt">(optional)</span>
            </label>
            <input
              type="text"
              value={state.referralSource}
              onChange={(e) => update("referralSource", e.target.value)}
              placeholder="Referral, conference, web search…"
            />
          </div>
          <div className="start-field">
            <label>
              Notes for our team <span className="opt">(optional)</span>
            </label>
            <textarea
              value={state.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Onboarding timeline, integrations, or anything we should know."
            />
          </div>
        </div>
      </section>

      <div className="start-actions">
        <button type="button" className="btn-start-primary" onClick={onNext}>
          Continue to pricing
        </button>
      </div>
    </>
  );
}

interface ReviewStepProps {
  state: IntakeFormState;
  pricing: PricingMath;
  onBack: () => void;
  onContinue: () => void;
  busy: boolean;
  error: string | null;
}

function ReviewStep({ state, pricing, onBack, onContinue, busy, error }: ReviewStepProps) {
  return (
    <>
      <h1>Review &amp; confirm pricing</h1>
      <p className="subhead">
        Confirm the order below. You will be charged the first quarterly
        amount when you complete payment on the next step. Subsequent invoices
        bill automatically every three months.
      </p>

      {error && <div className="start-error">{error}</div>}

      <div className="start-pricing-card">
        <div className="start-pricing-row">
          <span>Firm</span>
          <strong>{state.firmName}</strong>
        </div>
        <div className="start-pricing-row">
          <span>Licenses</span>
          <strong>{state.licenseCount}</strong>
        </div>
        <div className="start-pricing-row">
          <span>Contract length</span>
          <strong>
            {pricing.contractYears === 2 ? "2 years (10% discount)" : "1 year"}
          </strong>
        </div>
        <div className="start-pricing-row">
          <span>Per-license list price</span>
          <strong>{fmtMoney(pricing.annualListPerLicense)} / yr</strong>
        </div>
        {pricing.discountPct > 0 && (
          <div className="start-pricing-row">
            <span>Discount</span>
            <strong>−{pricing.discountPct}% multi-year</strong>
          </div>
        )}
        <div className="start-pricing-row">
          <span>Effective per-license price</span>
          <strong>{fmtMoney(pricing.effectiveAnnualPerLicense)} / yr</strong>
        </div>
        <div className="start-pricing-divider" />
        <div className="start-pricing-row">
          <span>Annual subtotal</span>
          <strong>{fmtMoney(pricing.annualTotal)}</strong>
        </div>
        <div className="start-pricing-row">
          <span>Total contract value</span>
          <strong>{fmtMoney(pricing.contractTotal)}</strong>
        </div>
        <div className="start-pricing-divider" />
        <div className="start-pricing-total">
          <small>Billed every 3 months</small>
          {fmtMoney(pricing.quarterlyTotal)}
        </div>
      </div>

      <div className="start-info">
        Today's charge: <strong style={{ color: "#fff" }}>{fmtMoney(pricing.quarterlyTotal)}</strong>.
        Recurring quarterly invoices will be emailed to{" "}
        {state.billingContactEmail || state.primaryContactEmail}.
      </div>

      <div className="start-actions between">
        <button type="button" className="btn-start-ghost" onClick={onBack} disabled={busy}>
          Back to intake
        </button>
        <button type="button" className="btn-start-primary" onClick={onContinue} disabled={busy}>
          {busy ? "Preparing payment…" : "Continue to payment"}
        </button>
      </div>
    </>
  );
}

interface PayStepProps {
  state: IntakeFormState;
  pricing: PricingMath;
  clientSecret: string;
  onBack: () => void;
  onSuccess: (subscriptionId: string) => void;
  subscriptionId: string;
}

function PaymentForm({ state, pricing, onBack, onSuccess, subscriptionId }: Omit<PayStepProps, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setSubmitting(false);
      setError(submitErr.message ?? "Payment information is incomplete.");
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: state.primaryContactName,
            email: state.primaryContactEmail,
            phone: state.primaryContactPhone,
            address: {
              line1: state.billingStreet,
              city: state.billingCity,
              state: state.billingState,
              postal_code: state.billingZip,
              country: state.billingCountry,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (result.error) {
      setSubmitting(false);
      setError(result.error.message ?? "Payment failed. Please try a different card.");
      return;
    }

    if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      onSuccess(subscriptionId);
      return;
    }

    if (result.paymentIntent && result.paymentIntent.status === "processing") {
      onSuccess(subscriptionId);
      return;
    }

    setSubmitting(false);
    setError("Payment did not complete. Please try again.");
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="start-error">{error}</div>}
      <div className="stripe-payment-wrap">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      <div className="start-info">
        You'll be charged <strong style={{ color: "#fff" }}>{fmtMoney(pricing.quarterlyTotal)}</strong>{" "}
        today (quarterly billing for {state.licenseCount} licenses).
      </div>
      <div className="start-actions between">
        <button
          type="button"
          className="btn-start-ghost"
          onClick={onBack}
          disabled={submitting}
        >
          Back
        </button>
        <button type="submit" className="btn-start-primary" disabled={!stripe || submitting}>
          {submitting ? "Processing…" : `Pay ${fmtMoney(pricing.quarterlyTotal)}`}
        </button>
      </div>
      <div className="start-disclaimer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Payment processed securely by Stripe. We never see your card number.
      </div>
    </form>
  );
}

function PayStep(props: PayStepProps) {
  const stripePromise = useMemo(
    () => loadStripeWithKey(),
    [],
  );

  return (
    <>
      <h1>Payment</h1>
      <p className="subhead">
        Enter the card you'd like Sentinel Counsel to bill quarterly. Your
        intake details on the previous step are saved — if anything goes
        wrong here you won't lose them.
      </p>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: props.clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#00d4ff",
              colorBackground: "#0e1014",
              colorText: "#f0f4f8",
              colorTextSecondary: "#8892a0",
              colorDanger: "#ef4444",
              fontFamily: "Inter, sans-serif",
              borderRadius: "0px",
              spacingUnit: "4px",
            },
            rules: {
              ".Input": {
                border: "1px solid #1e2430",
                backgroundColor: "#0b0d10",
              },
              ".Input:focus": {
                borderColor: "#00d4ff",
                boxShadow: "0 0 0 1px rgba(0, 212, 255, 0.25)",
              },
              ".Label": {
                fontFamily: "'Roboto Mono', monospace",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#9ca3af",
              },
            },
          },
        }}
      >
        <PaymentForm
          state={props.state}
          pricing={props.pricing}
          onBack={props.onBack}
          onSuccess={props.onSuccess}
          subscriptionId={props.subscriptionId}
        />
      </Elements>
    </>
  );
}

let stripePromiseCache: Promise<Stripe | null> | null = null;
function loadStripeWithKey(): Promise<Stripe | null> {
  if (stripePromiseCache) return stripePromiseCache;
  stripePromiseCache = (async () => {
    const res = await fetch(apiUrl("/stripe-config"));
    if (!res.ok) return null;
    const data = (await res.json()) as { publishableKey: string | null };
    if (!data.publishableKey) return null;
    return loadStripe(data.publishableKey);
  })();
  return stripePromiseCache;
}

interface SuccessStepProps {
  state: IntakeFormState;
  pricing: PricingMath;
  subscriptionId: string;
}

function SuccessStep({ state, pricing, subscriptionId }: SuccessStepProps) {
  return (
    <div className="start-success">
      <div className="start-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h1>You're in.</h1>
      <p className="subhead">
        Thanks for choosing Sentinel Counsel, {state.primaryContactName.split(" ")[0] || "Counselor"}.
        Your first quarterly payment of <strong style={{ color: "#fff" }}>{fmtMoney(pricing.quarterlyTotal)}</strong>{" "}
        has been received. A confirmation has been emailed to{" "}
        <strong style={{ color: "#fff" }}>{state.primaryContactEmail}</strong>.
      </p>
      <p className="subhead" style={{ marginBottom: 0 }}>
        Our onboarding team will reach out within one business day to schedule
        kickoff and provision accounts for your {state.authorizedUsers.length} authorized
        user{state.authorizedUsers.length === 1 ? "" : "s"}. You'll also receive
        a Master Services Agreement to countersign for your records.
      </p>
      <div className="start-success-meta">
        <div>Firm: {state.firmName}</div>
        <div>
          Licenses: {state.licenseCount} · Contract: {pricing.contractYears === 2 ? "2 years" : "1 year"}
        </div>
        <div>Stripe subscription: {subscriptionId}</div>
      </div>
    </div>
  );
}

export default function StartPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [state, setState] = useState<IntakeFormState>(emptyState);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [submissionToken, setSubmissionToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Belt-and-suspenders: overwrite the document robots meta directly on
  // mount so this private page is never indexed even if Helmet is delayed
  // or fails to merge in some browser/environment.
  useLayoutEffect(() => {
    const prev = document.querySelector('meta[name="robots"]');
    const prevContent = prev?.getAttribute("content") ?? null;
    let created: HTMLMetaElement | null = null;
    if (prev) {
      prev.setAttribute("content", "noindex,nofollow");
    } else {
      created = document.createElement("meta");
      created.setAttribute("name", "robots");
      created.setAttribute("content", "noindex,nofollow");
      document.head.appendChild(created);
    }
    return () => {
      if (prev && prevContent !== null) {
        prev.setAttribute("content", prevContent);
      }
      // If we created the tag (no prior robots meta existed), remove it
      // on unmount so subsequent SPA navigations don't inherit
      // noindex,nofollow from this private page.
      if (created && created.parentNode) {
        created.parentNode.removeChild(created);
      }
    };
  }, []);

  const pricing = useMemo(
    () => computePricing(state.licenseCount, state.contractLength),
    [state.licenseCount, state.contractLength],
  );

  function validateIntake(): string | null {
    const required: Array<[string, string]> = [
      [state.firmName, "Firm name"],
      [state.billingStreet, "Billing street"],
      [state.billingCity, "Billing city"],
      [state.billingState, "Billing state"],
      [state.billingZip, "Billing postal code"],
      [state.billingCountry, "Billing country"],
      [state.primaryContactName, "Primary contact name"],
      [state.primaryContactTitle, "Primary contact title"],
      [state.primaryContactEmail, "Primary contact email"],
      [state.primaryContactPhone, "Primary contact phone"],
    ];
    for (const [v, label] of required) {
      if (!v.trim()) return `${label} is required.`;
    }
    if (!isValidEmail(state.primaryContactEmail)) {
      return "Primary contact email is not a valid email address.";
    }
    if (state.billingContactEmail.trim() && !isValidEmail(state.billingContactEmail.trim())) {
      return "Billing contact email is not a valid email address.";
    }
    if (!Number.isInteger(state.licenseCount) || state.licenseCount < MIN_LICENSES) {
      return `Minimum of ${MIN_LICENSES} licenses required.`;
    }
    const validUsers = state.authorizedUsers.filter(
      (u) => u.name.trim() && u.email.trim(),
    );
    if (validUsers.length === 0) {
      return "Add at least one authorized user (name and email).";
    }
    for (const u of validUsers) {
      if (!isValidEmail(u.email.trim())) {
        return `Authorized user email "${u.email}" is not valid.`;
      }
    }
    return null;
  }

  function handleIntakeNext() {
    const err = validateIntake();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleReviewContinue() {
    setBusy(true);
    setError(null);
    try {
      const trimmedUsers = state.authorizedUsers.filter(
        (u) => u.name.trim() && u.email.trim(),
      );

      let sid = submissionId;
      let token = submissionToken;
      if (sid == null || token == null) {
        const intakeRes = await fetch(apiUrl("/intake"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firmName: state.firmName.trim(),
            billingStreet: state.billingStreet.trim(),
            billingCity: state.billingCity.trim(),
            billingState: state.billingState.trim(),
            billingZip: state.billingZip.trim(),
            billingCountry: state.billingCountry.trim(),
            primaryContactName: state.primaryContactName.trim(),
            primaryContactTitle: state.primaryContactTitle.trim(),
            primaryContactEmail: state.primaryContactEmail.trim(),
            primaryContactPhone: state.primaryContactPhone.trim(),
            billingContactName: state.billingContactName.trim() || null,
            billingContactEmail: state.billingContactEmail.trim() || null,
            authorizedUsers: trimmedUsers,
            licenseCount: state.licenseCount,
            contractLength: state.contractLength,
            ein: state.ein.trim() || null,
            referralSource: state.referralSource.trim() || null,
            notes: state.notes.trim() || null,
          }),
        });
        if (!intakeRes.ok) {
          const data = await intakeRes.json().catch(() => null);
          throw new Error(data?.error || "Could not save your intake.");
        }
        const intakeData = (await intakeRes.json()) as {
          submissionId: number;
          submissionToken: string;
        };
        sid = intakeData.submissionId;
        token = intakeData.submissionToken;
        setSubmissionId(sid);
        setSubmissionToken(token);
      }

      const subRes = await fetch(apiUrl("/create-subscription"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: sid, submissionToken: token }),
      });
      if (!subRes.ok) {
        const data = await subRes.json().catch(() => null);
        throw new Error(data?.error || "Could not initialize payment.");
      }
      const subData = (await subRes.json()) as {
        clientSecret: string;
        subscriptionId: string;
      };
      setClientSecret(subData.clientSecret);
      setSubscriptionId(subData.subscriptionId);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Start — Sentinel Counsel</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Helmet>

      <div className="start-page">
        <StartTopbar />

        <main className="start-shell">
          <Stepper step={step} />

          {step === 1 && (
            <IntakeStep state={state} setState={setState} onNext={handleIntakeNext} error={error} />
          )}

          {step === 2 && (
            <ReviewStep
              state={state}
              pricing={pricing}
              onBack={() => {
                setError(null);
                setStep(1);
              }}
              onContinue={handleReviewContinue}
              busy={busy}
              error={error}
            />
          )}

          {step === 3 && clientSecret && subscriptionId && (
            <PayStep
              state={state}
              pricing={pricing}
              clientSecret={clientSecret}
              subscriptionId={subscriptionId}
              onBack={() => {
                setError(null);
                setStep(2);
              }}
              onSuccess={(sid) => {
                setSubscriptionId(sid);
                setStep(4);
              }}
            />
          )}

          {step === 4 && subscriptionId && (
            <SuccessStep state={state} pricing={pricing} subscriptionId={subscriptionId} />
          )}
        </main>

        <StartFooter />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

interface FormState {
  name: string;
  org: string;
  role: string;
  interest: string;
  message: string;
}

const services = [
  {
    icon: "◈",
    title: "AI Strategy & Roadmapping",
    desc: "Understand where AI creates real leverage in your specific operation.",
  },
  {
    icon: "◉",
    title: "Production AI System Design",
    desc: "Architecture and engineering of ML platforms, recommendation engines, and analytics systems.",
  },
  {
    icon: "⊕",
    title: "Creative AI Experiences",
    desc: "Generative AI tools and interactive experiences for content creation and audience engagement.",
  },
];

const formFields: { k: keyof FormState; l: string; p: string }[] = [
  { k: "name", l: "Your Name", p: "Jane Smith" },
  { k: "org", l: "Organization", p: "Acme Corp." },
  { k: "role", l: "Your Role", p: "VP Product / CTO / etc." },
  { k: "interest", l: "Area of Interest", p: "Recommendations, analytics, churn…" },
];

export default function ConsultSection() {
  const [form, setForm] = useState<FormState>({ name: "", org: "", role: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const upd = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <p className="section-label">Work with Us</p>
      <h2 className="section-title">
        Build your AI system
        <br />
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>with Lotus AI Lab.</em>
      </h2>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: 1.75,
          marginBottom: "2rem",
        }}
      >
        What you&apos;ve explored in this demo is a glimpse of what&apos;s possible. Lotus AI Lab
        designs and engineers production-grade AI systems — thoughtfully built for the specific
        context of your organization.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {services.map((s) => (
          <div key={s.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--gold-dim)",
                border: "1px solid rgba(201,168,76,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold)",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "0.875rem", color: "var(--text)", marginBottom: "0.2rem" }}>
                {s.title}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            marginBottom: "0.5rem",
          }}
        >
          Lotus AI Lab
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--text)",
            fontStyle: "italic",
          }}
        >
          &ldquo;Thoughtfully engineered intelligent systems.&rdquo;
        </div>
        <a
          href="https://lotusailab.framer.ai"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            color: "var(--gold)",
            textDecoration: "none",
            letterSpacing: "0.1em",
          }}
        >
          Visit lotusailab.framer.ai →
        </a>
      </div>

      <div className="card" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
        {!sent ? (
          <>
            <div style={{ fontSize: "0.875rem", color: "var(--text)", marginBottom: "1.25rem" }}>
              Let&apos;s start a conversation.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {formFields.map(({ k, l, p }) => (
                <div key={k}>
                  <div className="label">{l}</div>
                  <input
                    className="input-field"
                    placeholder={p}
                    value={form[k]}
                    onChange={(e) => upd(k, e.target.value)}
                  />
                </div>
              ))}
              <div>
                <div className="label">Message</div>
                <textarea
                  className="input-field"
                  style={{ height: 100, resize: "none" }}
                  placeholder="Tell us about your organization and what you're trying to build…"
                  value={form.message}
                  onChange={(e) => upd("message", e.target.value)}
                />
              </div>
              {error && (
                <div style={{ fontSize: "0.8rem", color: "#f87171" }}>{error}</div>
              )}
              <button
                className="btn-primary"
                style={{ width: "100%", padding: "1rem" }}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send to Lotus AI Lab →"}
              </button>
              <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textAlign: "center" }}>
                Or visit{" "}
                <a
                  href="https://lotusailab.framer.ai"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--gold)" }}
                >
                  lotusailab.framer.ai
                </a>{" "}
                directly
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 0",
              animation: "fadeUp 0.5s ease",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.875rem" }}>❋</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                color: "var(--gold)",
                marginBottom: "0.75rem",
              }}
            >
              Thank you, {form.name || "there"}.
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Your message has been received. The Lotus AI Lab team will be in touch shortly.
            </div>
            <a href="https://lotusailab.framer.ai" target="_blank" rel="noreferrer">
              <button className="btn-ghost">Visit Our Site →</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

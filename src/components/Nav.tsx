"use client";

import { useState } from "react";

interface NavProps {
  active: string;
  onNavigate: (key: string) => void;
}

const tabs = [
  { key: "home", label: "Home" },
  { key: "analytics", label: "Analytics" },
  { key: "chat", label: "AI Chat" },
  { key: "use-cases", label: "Use Cases" },
  { key: "consult", label: "Consult" },
];

export default function Nav({ active, onNavigate }: NavProps) {
  const [open, setOpen] = useState(false);
  const go = (k: string) => { onNavigate(k); setOpen(false); };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "var(--nav-h)",
          background: "rgba(8,12,18,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            onClick={() => go("home")}
          >
            <img
              src="/lotus-logo.png"
              alt="Lotus AI"
              style={{ width: 26, height: 26, flexShrink: 0, objectFit: "contain" }}
            />
            <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>StreamIQ</span>
          </div>

          {/* Desktop tab row */}
          <div className="dt-only" style={{ gap: 0 }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => go(t.key)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${active === t.key ? "var(--gold)" : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: active === t.key ? "var(--gold)" : "var(--text-muted)",
                  padding: "0 1rem",
                  height: "var(--nav-h)",
                  transition: "all 0.2s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            className="btn-primary dt-only"
            style={{ fontSize: "0.7rem", padding: "0.5rem 1rem", minHeight: 36 }}
            onClick={() => go("consult")}
          >
            Get in Touch
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`hbg mob-only ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-menu mob-only">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`mob-item ${active === t.key ? "act" : ""}`}
              onClick={() => go(t.key)}
            >
              {t.label}
            </button>
          ))}
          <button
            className="btn-primary"
            style={{ width: "100%", marginTop: "0.875rem" }}
            onClick={() => go("consult")}
          >
            Get in Touch →
          </button>
        </div>
      )}
    </>
  );
}

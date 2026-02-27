"use client";

interface FooterProps {
  onNavigate: (key: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 1.25rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/lotus-logo.png"
            alt="Lotus AI"
            style={{ width: 24, height: 24, objectFit: "contain" }}
          />
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text)" }}>StreamIQ by Lotus AI</div>
            <div style={{ fontSize: "0.62rem", color: "var(--text-dim)" }}>
              Thoughtfully engineered intelligent systems.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          {["Home", "Analytics", "Chat", "Use Cases", "Consult"].map((l) => (
            <span
              key={l}
              className="nav-link"
              style={{ fontSize: "0.72rem" }}
              onClick={() => onNavigate(l.toLowerCase().replace(" ", "-"))}
            >
              {l}
            </span>
          ))}
          <a
            href="https://getlotusai.com"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            style={{ color: "var(--gold)", fontSize: "0.72rem" }}
          >
            getlotusai.com ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

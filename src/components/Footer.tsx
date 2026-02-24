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
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg,var(--gold),#6b4f1e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
            }}
          >
            ❋
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text)" }}>StreamIQ by Lotus AI Lab</div>
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
            href="https://lotusailab.framer.ai"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            style={{ color: "var(--gold)", fontSize: "0.72rem" }}
          >
            lotusailab.framer.ai ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

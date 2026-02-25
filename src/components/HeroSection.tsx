"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import BarChart from "@/components/charts/BarChart";

interface HeroSectionProps {
  onNavigate: (key: string) => void;
}

const heroBarData = [
  { Title: "Echoes", Streams_M: 142 },
  { Title: "Neon Dynasty", Streams_M: 201 },
  { Title: "Midnight", Streams_M: 155 },
  { Title: "Wild Kingdom", Streams_M: 312 },
  { Title: "Quantum", Streams_M: 178 },
  { Title: "Savage Tide", Streams_M: 223 },
];

const heroStats = [
  { l: "Streams", v: "1.31B", c: "+12.4%" },
  { l: "Completion", v: "72.3%", c: "+3.1%" },
  { l: "Revenue", v: "$302M", c: "+8.7%" },
  { l: "Avg Rating", v: "8.23", c: "+0.3" },
];

const stripStats = [
  { l: "Records Analyzed", v: "10,000+" },
  { l: "Data Points Processed", v: "500M+" },
  { l: "AI Insights Generated", v: "Real-Time" },
  { l: "Built by Lotus AI Lab", v: "Thoughtfully" },
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const mob = useIsMobile();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "calc(100vh - var(--nav-h))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "min(560px,80vw)",
            height: "min(560px,80vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-5%",
            width: "min(380px,60vw)",
            height: "min(380px,60vw)",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(78,205,196,0.04) 0%,transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: mob ? "2rem 1.25rem 3rem" : "0 2rem",
          width: "100%",
          animation: "fadeUp 0.9s ease forwards",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg,var(--gold),#6b4f1e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              flexShrink: 0,
            }}
          >
            ❋
          </div>
          <span
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Lotus AI Lab
          </span>
          <div style={{ flex: 1, minWidth: 20, height: 1, background: "var(--border)" }} />
          <span className="tag">Live Demo</span>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "1fr 400px",
            gap: mob ? "2.5rem" : "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p className="section-label">StreamIQ · AI Analytics Platform</p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem,9vw,5rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "var(--text)",
                marginBottom: "1.25rem",
              }}
            >
              Intelligence for the
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>streaming era.</em>
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              An AI-powered analytics platform for any organization with data. Upload your
              datasets, surface hidden insights, and converse with an AI analyst that
              understands the patterns in your business.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                className="btn-primary animate-glow"
                onClick={() => onNavigate("analytics")}
                style={{ flex: mob ? "1 1 auto" : "0 0 auto" }}
              >
                Explore the Demo →
              </button>
              <button
                className="btn-ghost"
                onClick={() => onNavigate("consult")}
                style={{ flex: mob ? "1 1 auto" : "0 0 auto" }}
              >
                Engage Lotus AI Lab
              </button>
            </div>
          </div>

          {/* Mini dashboard */}
          <div style={{ animation: "fadeIn 1.2s ease 0.3s both" }}>
            <div className="card" style={{ borderColor: "rgba(201,168,76,0.2)", padding: "1.125rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  Live Metrics
                </span>
                <span
                  className="animate-pulse"
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.65rem", color: "var(--teal)" }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--teal)",
                      display: "inline-block",
                    }}
                  />{" "}
                  Streaming
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem",
                  marginBottom: "0.875rem",
                }}
              >
                {heroStats.map((s) => (
                  <div
                    key={s.l}
                    style={{ background: "var(--surface2)", borderRadius: 3, padding: "0.625rem" }}
                  >
                    <div
                      style={{
                        fontSize: "0.58rem",
                        color: "var(--text-dim)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 2,
                      }}
                    >
                      {s.l}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text)",
                      }}
                    >
                      {s.v}
                    </div>
                    <div style={{ fontSize: "0.62rem", color: "var(--teal)" }}>{s.c}</div>
                  </div>
                ))}
              </div>
              <BarChart data={heroBarData} valueKey="Streams_M" labelKey="Title" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4,1fr)",
            gap: "1.25rem",
          }}
        >
          {stripStats.map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem,4vw,1.5rem)",
                  fontWeight: 300,
                  color: "var(--gold)",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginTop: 2,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

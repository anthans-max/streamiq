"use client";

import { useState } from "react";

interface UseCase {
  icon: string;
  tag: string;
  title: string;
  teaser: string;
  detail: string;
  impact: string[];
}

const cases: UseCase[] = [
  {
    icon: "⟳",
    tag: "Content Intelligence",
    title: "Recommendation Engines",
    teaser: "Personalize every viewer's feed with ML-driven content matching.",
    detail:
      "Deep learning models analyze watch history, completion patterns, time-of-day behavior, and social signals to serve hyper-personalized recommendations — reducing churn by up to 30% and increasing session length. Lotus AI Lab has architected these systems for organizations with catalogs ranging from 500 to 50,000+ titles.",
    impact: ["↓ 28% churn", "↑ 34% session", "↑ 19% discovery"],
  },
  {
    icon: "◈",
    tag: "Audience Analytics",
    title: "Predictive Churn Modeling",
    teaser: "Identify at-risk subscribers before they cancel.",
    detail:
      "Using behavioral signals — declining watch time, skipping intros, login frequency drops — ML classifiers predict churn risk 30-60 days out. Automated intervention workflows trigger targeted retention offers, creating a proactive retention engine.",
    impact: ["60-day prediction", "↓ 22% churn", "↑ Retention ROI"],
  },
  {
    icon: "◉",
    tag: "Content Acquisition",
    title: "Greenlight Intelligence",
    teaser: "Predict which content will perform before commissioning it.",
    detail:
      "NLP analysis of scripts and treatments combined with historical performance data gives development teams a data-informed perspective on greenlight decisions — reducing expensive misses and surfacing undervalued opportunities.",
    impact: ["Pre-production scoring", "Genre forecasting", "Market comp analysis"],
  },
  {
    icon: "⊛",
    tag: "Ad Tech & AVOD",
    title: "Dynamic Ad Optimization",
    teaser: "Maximize AVOD yield with AI-driven placement and targeting.",
    detail:
      "Real-time ML models optimize ad slot placement, bidding strategy, and audience segmentation for AVOD tiers — balancing viewer experience with revenue maximization. Contextual AI ensures brand safety.",
    impact: ["↑ 31% ad revenue", "↓ 18% drop-off", "Real-time CPM"],
  },
  {
    icon: "⊕",
    tag: "Operations",
    title: "Automated QA",
    teaser: "AI-powered content quality control at ingest scale.",
    detail:
      "Computer vision and audio ML models automate quality control for ingested content — detecting encoding errors, audio sync issues, subtitle problems, and compliance violations at scale.",
    impact: ["95%+ error detection", "↓ 80% QC time", "Compliance automation"],
  },
  {
    icon: "◎",
    tag: "Creator Economy",
    title: "Performance Forecasting",
    teaser: "Predict first-30-day performance from metadata alone.",
    detail:
      "Ensemble models generate launch-day forecasts for new titles — enabling smarter marketing budget allocation, window strategy decisions, and release timing optimization. Particularly powerful for original content.",
    impact: ["Launch-day forecasting", "Marketing ROI", "Window strategy AI"],
  },
];

interface UseCasesSectionProps {
  onNavigate: (key: string) => void;
}

export default function UseCasesSection({ onNavigate }: UseCasesSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="section">
      <p className="section-label">AI Use Cases · Powered by Lotus AI Lab</p>
      <h2 className="section-title">
        How AI transforms
        <br />
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>data-driven organizations.</em>
      </h2>
      <p className="section-sub" style={{ marginBottom: "2rem" }}>
        These are the AI systems Lotus AI Lab designs and builds. Tap any to see how the
        technology works and what outcomes it drives.
      </p>
      <div className="grid-3">
        {cases.map((c, i) => (
          <button
            key={i}
            className={`use-case-card ${expanded === i ? "exp" : ""}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ fontSize: "1.4rem", color: "var(--gold)", opacity: 0.7 }}>
                {c.icon}
              </span>
              <span className="tag">{c.tag}</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "0.4rem",
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
              }}
            >
              {c.teaser}
            </div>
            {expanded === i && (
              <div style={{ animation: "fadeUp 0.3s ease" }}>
                <div className="divider" style={{ marginBottom: "0.875rem" }} />
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    marginBottom: "0.875rem",
                  }}
                >
                  {c.detail}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {c.impact.map((imp, j) => (
                    <span key={j} className="tag gold-tag" style={{ fontSize: "0.62rem" }}>
                      {imp}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.6rem" }}>
              {expanded === i ? "↑ Less" : "↓ Learn more"}
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          Ready to build one of these systems for your organization?
        </p>
        <button className="btn-primary animate-glow" onClick={() => onNavigate("consult")}>
          Engage Lotus AI Lab →
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import { SAMPLE_CSV, parseCSV, DataRow } from "@/lib/data";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import Sparkline from "@/components/charts/Sparkline";

const chartOptions = [
  { key: "streams", label: "Streams", valueKey: "Streams_M" },
  { key: "revenue", label: "Revenue", valueKey: "Revenue_M" },
  {
    key: "completion",
    label: "Completion",
    valueKey: "Completion_Rate",
    transform: (v: number) => +(v * 100).toFixed(1),
  },
];

export default function AnalyticsSection() {
  const [data, setData] = useState<DataRow[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [activeChart, setActiveChart] = useState("streams");
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processData = useCallback(async (text: string, name: string) => {
    const parsed = parseCSV(text);
    setData(parsed);
    setFileName(name);
    setLoading(true);
    setAiInsight("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.slice(6).trim();
            if (json === "[DONE]") continue;
            try {
              const e = JSON.parse(json);
              if (e.type === "content_block_delta" && e.delta?.type === "text_delta") {
                setAiInsight((p) => p + e.delta.text);
              }
            } catch (_) {}
          }
        }
      }
    } catch {
      setAiInsight(
        "Unable to connect to AI service. Please check your ANTHROPIC_API_KEY environment variable."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExport = async () => {
    if (!data || !aiInsight || !fileName) return;
    setExporting(true);
    try {
      const { exportReport } = await import("@/lib/exportPdf");
      exportReport({ data, aiInsight, fileName });
    } finally {
      setExporting(false);
    }
  };

  const loadSample = () => processData(SAMPLE_CSV, "sample_streaming_data.csv");
  const handleFile = (file: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = (e) => processData(e.target!.result as string, file.name);
    r.readAsText(file);
  };

  const active = chartOptions.find((c) => c.key === activeChart);
  const displayData = (data || []).map((d) => ({
    ...d,
    _val: active?.transform
      ? active.transform(Number(d[active.valueKey]))
      : d[active?.valueKey ?? ""],
  }));

  const donutData = !data
    ? []
    : [
        {
          label: "N. America",
          value: data
            .filter((d) => d.Region === "North America")
            .reduce((s, d) => s + (Number(d.Streams_M) || 0), 0),
          color: "var(--gold)",
        },
        {
          label: "Global",
          value: data
            .filter((d) => d.Region === "Global")
            .reduce((s, d) => s + (Number(d.Streams_M) || 0), 0),
          color: "var(--teal)",
        },
        {
          label: "Asia Pac",
          value: data
            .filter((d) => d.Region === "Asia Pacific")
            .reduce((s, d) => s + (Number(d.Streams_M) || 0), 0),
          color: "#a78bfa",
        },
        {
          label: "Europe",
          value: data
            .filter((d) => d.Region === "Europe")
            .reduce((s, d) => s + (Number(d.Streams_M) || 0), 0),
          color: "#f87171",
        },
      ].filter((d) => d.value > 0);

  return (
    <div className="section">
      <p className="section-label">Analytics Engine</p>
      <h2 className="section-title">
        Upload. Analyze.
        <br />
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Understand.</em>
      </h2>
      <p className="section-sub" style={{ marginBottom: "2rem" }}>
        Drop in any CSV — sales reports, content metrics, financial data, audience analytics.
        StreamIQ&apos;s AI surfaces insights instantly.
      </p>

      {!data ? (
        <div
          style={{
            border: `1px dashed ${dragging ? "var(--gold)" : "rgba(255,255,255,0.15)"}`,
            borderRadius: 6,
            padding: "3rem 1.5rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            background: dragging ? "rgba(201,168,76,0.03)" : "transparent",
          }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
          <div style={{ fontSize: "2.5rem", marginBottom: "0.875rem", opacity: 0.4 }}>⊕</div>
          <div style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            Tap to upload any CSV file
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            Sales data, content metrics, financial reports, audience analytics
          </div>
          <button
            className="btn-ghost"
            style={{ fontSize: "0.75rem" }}
            onClick={(e) => { e.stopPropagation(); loadSample(); }}
          >
            ↓ Load Sample Dataset
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "fadeIn 0.5s ease" }}>
          {/* File badge row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span className="tag gold-tag">✓ {fileName}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                {data.length} records
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {aiInsight && !loading && (
                <button
                  className="btn-ghost"
                  style={{ fontSize: "0.68rem", padding: "0.4rem 0.8rem", minHeight: 36 }}
                  onClick={handleExport}
                  disabled={exporting}
                >
                  {exporting ? "Generating…" : "↓ Download Report"}
                </button>
              )}
              <button
                className="btn-ghost"
                style={{ fontSize: "0.68rem", padding: "0.4rem 0.8rem", minHeight: 36 }}
                onClick={() => { setData(null); setAiInsight(""); setExporting(false); }}
              >
                Upload New
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid-4">
            {[
              {
                label: "Streams",
                value: `${data.reduce((s, d) => s + (Number(d.Streams_M) || 0), 0).toFixed(0)}M`,
                spark: [90, 120, 110, 150, 140, 180, 200],
              },
              {
                label: "Revenue",
                value: `$${data.reduce((s, d) => s + (Number(d.Revenue_M) || 0), 0).toFixed(0)}M`,
                spark: [20, 25, 22, 30, 28, 35, 40],
              },
              {
                label: "Avg Rating",
                value: (
                  data.reduce((s, d) => s + (Number(d.Rating) || 0), 0) / data.length
                ).toFixed(1),
                spark: [7, 7.5, 7.8, 8, 7.9, 8.2, 8.3],
              },
              {
                label: "Completion",
                value: `${(
                  (data.reduce((s, d) => s + (Number(d.Completion_Rate) || 0), 0) /
                    data.length) *
                  100
                ).toFixed(1)}%`,
                spark: [60, 65, 62, 70, 68, 72, 75],
              },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="label" style={{ fontSize: "0.62rem" }}>
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.15rem",
                    color: "var(--text)",
                  }}
                >
                  {s.value}
                </div>
                <Sparkline values={s.spark} />
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid-2">
            <div className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <span className="label">Content Performance</span>
                <div className="pill-nav">
                  {chartOptions.map((c) => (
                    <button
                      key={c.key}
                      className={`pill ${activeChart === c.key ? "active" : ""}`}
                      onClick={() => setActiveChart(c.key)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <BarChart data={displayData} valueKey="_val" labelKey="Title" />
            </div>
            <div className="card">
              <div className="label" style={{ marginBottom: "0.75rem" }}>
                Streams by Region
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {donutData.length > 0 && <DonutChart segments={donutData} />}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", flex: 1 }}>
                  {donutData.map((d) => (
                    <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: d.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", flex: 1 }}>
                        {d.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {d.value.toFixed(0)}M
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div
            className="card"
            style={{
              borderColor: "rgba(201,168,76,0.2)",
              background:
                "linear-gradient(135deg,var(--surface) 0%,rgba(201,168,76,0.03) 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.875rem",
              }}
            >
              <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0, color: "var(--gold)" }}>❋</span>
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  AI Analyst · Lotus AI
                </div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-dim)" }}>
                  Powered by Claude
                </div>
              </div>
              {loading && (
                <div
                  className="animate-spin"
                  style={{
                    marginLeft: "auto",
                    width: 16,
                    height: 16,
                    border: "2px solid var(--gold-dim)",
                    borderTopColor: "var(--gold)",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                minHeight: 60,
              }}
            >
              {aiInsight ||
                (loading ? (
                  <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}>
                    Analyzing your data…
                  </span>
                ) : null)}
            </div>
          </div>

          {/* Scrollable table */}
          <div className="card">
            <div className="label" style={{ marginBottom: "0.75rem" }}>
              Raw Data
            </div>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.75rem",
                  minWidth: 480,
                }}
              >
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "0.45rem 0.65rem",
                          color: "var(--text-dim)",
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderBottom: "1px solid var(--border)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      {Object.values(row).map((v, j) => (
                        <td
                          key={j}
                          style={{
                            padding: "0.5rem 0.65rem",
                            color: "var(--text-muted)",
                            fontFamily: typeof v === "number" ? "var(--font-mono)" : "inherit",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {typeof v === "number" ? v.toLocaleString() : String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

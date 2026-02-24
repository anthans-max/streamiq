"use client";

import { DataRow } from "@/lib/data";

interface BarChartProps {
  data: DataRow[];
  valueKey: string;
  labelKey: string;
  color?: string;
}

export default function BarChart({
  data,
  valueKey,
  labelKey,
  color = "var(--gold)",
}: BarChartProps) {
  const max = Math.max(...data.map((d) => Number(d[valueKey]) || 0));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "110px" }}>
      {data.slice(0, 8).map((d, i) => {
        const h = Math.max(4, ((Number(d[valueKey]) || 0) / max) * 88);
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                fontSize: "0.5rem",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {d[valueKey]}
            </div>
            <div
              style={{
                width: "100%",
                height: h,
                background: `linear-gradient(to top,${color},${color}88)`,
                borderRadius: "2px 2px 0 0",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                fontSize: "0.48rem",
                color: "var(--text-dim)",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {String(d[labelKey] || "").split(" ")[0]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

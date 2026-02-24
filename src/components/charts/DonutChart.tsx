"use client";

interface Segment {
  label: string;
  value: number;
  color: string;
}

export default function DonutChart({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const r = 38, cx = 50, cy = 50, sw = 13, circ = 2 * Math.PI * r;

  return (
    <svg viewBox="0 0 100 100" style={{ width: 90, height: 90, flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const rot = (cum / total) * 360 - 90;
        cum += seg.value;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={sw}
            strokeDasharray={`${circ * pct} ${circ * (1 - pct)}`}
            transform={`rotate(${rot},${cx},${cy})`}
          />
        );
      })}
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fill="var(--text)"
        fontSize="9"
        fontFamily="var(--font-display)"
      >
        {total.toFixed(0)}
      </text>
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fill="var(--text-dim)"
        fontSize="4.5"
        fontFamily="var(--font-mono)"
      >
        TOTAL M
      </text>
    </svg>
  );
}

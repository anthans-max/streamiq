import { useState, useRef, useEffect, useCallback } from "react";

// ── Fonts ───────────────────────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@200;300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    :root {
      --bg: #080c12;
      --surface: #0e1520;
      --surface2: #141d2e;
      --border: rgba(255,255,255,0.07);
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: rgba(201,168,76,0.15);
      --teal: #4ecdc4;
      --teal-dim: rgba(78,205,196,0.12);
      --text: #e8e4dc;
      --text-muted: rgba(232,228,220,0.5);
      --text-dim: rgba(232,228,220,0.25);
      --font-display: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'Outfit', sans-serif;
      --font-mono: 'DM Mono', monospace;
      --nav-h: 56px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { overflow-x: hidden; }
    body {
      background: var(--bg); color: var(--text);
      font-family: var(--font-body); overflow-x: hidden;
      -webkit-text-size-adjust: 100%;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
    @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.2);} 50%{box-shadow:0 0 40px rgba(201,168,76,0.45);} }
    @keyframes grain {
      0%,100%{transform:translate(0,0);} 10%{transform:translate(-2%,-3%);}
      30%{transform:translate(3%,2%);} 50%{transform:translate(-1%,4%);}
      70%{transform:translate(4%,-2%);} 90%{transform:translate(-3%,1%);}
    }
    @keyframes slideDown { from{opacity:0;transform:translateY(-8px);} to{opacity:1;transform:translateY(0);} }

    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-spin  { animation: spin 1s linear infinite; }
    .animate-glow  { animation: glow 3s ease-in-out infinite; }

    .noise::after {
      content:''; position:fixed; inset:-50%; width:200%; height:200%;
      opacity:0.025; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      animation: grain 8s steps(10) infinite; z-index:9999;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--gold), #a07830);
      color: #080c12; border: none; border-radius: 2px;
      font-family: var(--font-body); font-weight: 500;
      font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer; padding: 0.875rem 1.75rem; transition: all 0.2s;
      min-height: 44px; display: inline-flex; align-items: center; justify-content: center;
      white-space: nowrap; -webkit-tap-highlight-color: transparent;
    }
    .btn-primary:hover { background: linear-gradient(135deg, var(--gold-light), var(--gold)); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
    .btn-primary:active { transform: translateY(0); }

    .btn-ghost {
      background: none; border: 1px solid var(--border); color: var(--text-muted);
      border-radius: 2px; font-family: var(--font-body); font-weight: 400;
      font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer; padding: 0.875rem 1.75rem; transition: all 0.2s;
      min-height: 44px; display: inline-flex; align-items: center; justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 4px; padding: 1.25rem; }
    .input-field {
      background: var(--surface2); border: 1px solid var(--border); border-radius: 2px;
      color: var(--text); font-family: var(--font-body); font-size: 1rem;
      padding: 0.875rem 1rem; width: 100%; outline: none; transition: border-color 0.2s;
      min-height: 44px; -webkit-appearance: none;
    }
    .input-field:focus { border-color: var(--gold); }
    .input-field::placeholder { color: var(--text-dim); }

    .label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
    .section-label { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
    .section-title { font-family: var(--font-display); font-size: clamp(2rem, 7vw, 3rem); font-weight: 300; line-height: 1.1; color: var(--text); margin-bottom: 1rem; }
    .section-sub { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; }

    .tag {
      display: inline-block; background: var(--teal-dim); color: var(--teal);
      border: 1px solid rgba(78,205,196,0.2); border-radius: 2px;
      font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 0.2rem 0.5rem; white-space: nowrap;
    }
    .gold-tag { background: var(--gold-dim); color: var(--gold); border-color: rgba(201,168,76,0.2); }

    .section { padding: 2.75rem 1.25rem; max-width: 1100px; margin: 0 auto; width: 100%; }
    @media(min-width:640px){ .section { padding: 4rem 2rem; } }

    .divider { width:100%; height:1px; background:var(--border); }
    .nav-link {
      font-size:0.72rem; letter-spacing:0.15em; text-transform:uppercase;
      color:var(--text-muted); text-decoration:none; cursor:pointer;
      transition:color 0.2s; min-height:44px; display:inline-flex; align-items:center;
      -webkit-tap-highlight-color:transparent;
    }
    .nav-link:hover { color:var(--gold); }

    .use-case-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 4px;
      padding: 1.25rem; cursor: pointer; transition: all 0.2s;
      position: relative; overflow: hidden; text-align: left; width: 100%;
      font-family: var(--font-body); -webkit-tap-highlight-color: transparent;
    }
    .use-case-card::before { content:''; position:absolute; top:0; left:0; width:2px; height:0; background:var(--gold); transition:height 0.3s ease; }
    .use-case-card:hover::before, .use-case-card.exp::before { height:100%; }
    .use-case-card:hover, .use-case-card.exp { border-color: rgba(201,168,76,0.25); }

    .stat-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 4px;
      padding: 1rem; display: flex; flex-direction: column; gap: 0.35rem;
    }

    .chat-bubble-user {
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.2);
      border-radius: 12px 12px 0 12px; padding: 0.75rem 1rem;
      font-size: 0.875rem; line-height: 1.6; max-width: 85%; align-self: flex-end;
    }
    .chat-bubble-ai {
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: 12px 12px 12px 0; padding: 0.75rem 1rem;
      font-size: 0.875rem; line-height: 1.6; max-width: 92%; align-self: flex-start;
    }

    /* Grids — mobile first */
    .grid-2 { display:grid; grid-template-columns:1fr; gap:1rem; }
    .grid-3 { display:grid; grid-template-columns:1fr; gap:1rem; }
    .grid-4 { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
    @media(min-width:640px){ .grid-2{grid-template-columns:1fr 1fr;} .grid-3{grid-template-columns:1fr 1fr;} }
    @media(min-width:900px){ .grid-3{grid-template-columns:repeat(3,1fr);} .grid-4{grid-template-columns:repeat(4,1fr);} }

    /* Mobile nav drawer */
    .mobile-menu {
      position:fixed; top:var(--nav-h); left:0; right:0;
      background:rgba(8,12,18,0.97); backdrop-filter:blur(16px);
      border-bottom:1px solid var(--border); z-index:99;
      padding:0.5rem 1.25rem 1.25rem; animation:slideDown 0.2s ease;
    }
    .mob-item {
      display:flex; align-items:center; padding:0 0; border:none;
      border-bottom:1px solid var(--border); font-size:1rem; color:var(--text-muted);
      cursor:pointer; transition:color 0.2s; min-height:50px;
      background:none; font-family:var(--font-body); width:100%; text-align:left;
      -webkit-tap-highlight-color:transparent;
    }
    .mob-item:last-of-type { border-bottom:none; }
    .mob-item:hover,.mob-item.act { color:var(--gold); }

    /* Hamburger */
    .hbg {
      background:none; border:none; cursor:pointer; padding:0.5rem;
      min-height:44px; min-width:44px; display:flex; align-items:center;
      justify-content:center; flex-direction:column; gap:5px;
      -webkit-tap-highlight-color:transparent;
    }
    .hbg span { display:block; width:22px; height:1.5px; background:var(--text-muted); transition:all 0.25s; transform-origin:center; }
    .hbg.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px);}
    .hbg.open span:nth-child(2){opacity:0;transform:scaleX(0);}
    .hbg.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px);}

    /* Pill scroll nav */
    .pill-nav { display:flex; gap:0.5rem; overflow-x:auto; padding-bottom:2px; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
    .pill-nav::-webkit-scrollbar { display:none; }
    .pill {
      background:var(--surface2); border:1px solid var(--border); border-radius:20px;
      padding:0.4rem 0.875rem; font-size:0.72rem; color:var(--text-muted);
      cursor:pointer; white-space:nowrap; transition:all 0.2s;
      min-height:36px; display:flex; align-items:center; font-family:var(--font-body);
      -webkit-tap-highlight-color:transparent;
    }
    .pill.active { background:var(--gold-dim); border-color:rgba(201,168,76,0.3); color:var(--gold); }

    /* Desktop-only / mobile-only helpers */
    .dt-only { display:none; }
    @media(min-width:768px){ .dt-only{display:flex;} .mob-only{display:none!important;} }
  `}</style>
);

// ── useIsMobile ──────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
};

// ── SAMPLE DATA ──────────────────────────────────────────────────────────────
const SAMPLE_CSV = `Title,Genre,Streams_M,Watch_Hours_M,Completion_Rate,Rating,Revenue_M,Region
Echoes of Tomorrow,Sci-Fi,142.3,89.1,0.74,8.2,28.4,North America
The Last Harbor,Drama,98.7,61.2,0.82,8.7,19.6,Europe
Neon Dynasty,Action,201.5,112.4,0.61,7.8,40.3,Asia Pacific
Crimson Hollow,Horror,67.4,38.9,0.69,7.4,13.5,North America
Solar Drift,Documentary,44.2,29.8,0.88,9.1,8.8,Global
Midnight Protocol,Thriller,155.8,97.3,0.77,8.4,31.2,North America
Wild Kingdom S3,Reality,312.1,198.6,0.55,7.1,62.4,Global
The Inheritance,Drama,89.3,58.7,0.85,9.0,17.8,Europe
Quantum Falls,Sci-Fi,178.4,103.2,0.71,8.0,35.6,North America
Savage Tide,Action,223.7,131.9,0.63,7.6,44.7,Asia Pacific`;

const parseCSV = (text) => {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = isNaN(vals[i]) ? vals[i] : parseFloat(vals[i]); });
    return obj;
  });
};

// ── Charts ────────────────────────────────────────────────────────────────────
const BarChart = ({ data, valueKey, labelKey, color = "var(--gold)" }) => {
  const max = Math.max(...data.map(d => d[valueKey] || 0));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "110px" }}>
      {data.slice(0, 8).map((d, i) => {
        const h = Math.max(4, ((d[valueKey] || 0) / max) * 88);
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", height: "100%", justifyContent: "flex-end" }}>
            <div style={{ fontSize: "0.5rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>{d[valueKey]}</div>
            <div style={{ width: "100%", height: h, background: `linear-gradient(to top,${color},${color}88)`, borderRadius: "2px 2px 0 0", opacity: 0.85 }} />
            <div style={{ fontSize: "0.48rem", color: "var(--text-dim)", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
              {(d[labelKey] || "").split(" ")[0]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DonutChart = ({ segments }) => {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const r = 38, cx = 50, cy = 50, sw = 13, circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" style={{ width: 90, height: 90, flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const rot = (cum / total) * 360 - 90;
        cum += seg.value;
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={sw} strokeDasharray={`${circ*pct} ${circ*(1-pct)}`} transform={`rotate(${rot},${cx},${cy})`} />;
      })}
      <text x="50" y="46" textAnchor="middle" fill="var(--text)" fontSize="9" fontFamily="var(--font-display)">{total.toFixed(0)}</text>
      <text x="50" y="57" textAnchor="middle" fill="var(--text-dim)" fontSize="4.5" fontFamily="var(--font-mono)">TOTAL M</text>
    </svg>
  );
};

const Sparkline = ({ values, color = "var(--gold)" }) => {
  const max = Math.max(...values), min = Math.min(...values);
  const w = 100, h = 30;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: 100, height: 30 }}>
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" /><stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── NAV ───────────────────────────────────────────────────────────────────────
const Nav = ({ active, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const tabs = [
    { key: "home", label: "Home" },
    { key: "analytics", label: "Analytics" },
    { key: "chat", label: "AI Chat" },
    { key: "use-cases", label: "Use Cases" },
    { key: "consult", label: "Consult" },
  ];
  const go = (k) => { onNavigate(k); setOpen(false); };

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: "var(--nav-h)", background: "rgba(8,12,18,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }} onClick={() => go("home")}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,var(--gold),#6b4f1e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", flexShrink: 0 }}>❋</div>
            <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>StreamIQ</span>
            <span style={{ fontSize: "0.6rem", color: "var(--text-dim)", display: "none" }}>by Lotus AI Lab</span>
          </div>

          {/* Desktop tab row */}
          <div className="dt-only" style={{ gap: 0 }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => go(t.key)}
                style={{ background: "none", border: "none", borderBottom: `1px solid ${active===t.key?"var(--gold)":"transparent"}`, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: active===t.key?"var(--gold)":"var(--text-muted)", padding: "0 1rem", height: "var(--nav-h)", transition: "all 0.2s" }}>
                {t.label}
              </button>
            ))}
          </div>

          <button className="btn-primary dt-only" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem", minHeight: 36 }} onClick={() => go("consult")}>
            Get in Touch
          </button>

          {/* Hamburger — mobile only */}
          <button className={`hbg mob-only ${open?"open":""}`} onClick={() => setOpen(o=>!o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-menu mob-only">
          {tabs.map(t => (
            <button key={t.key} className={`mob-item ${active===t.key?"act":""}`} onClick={() => go(t.key)}>{t.label}</button>
          ))}
          <button className="btn-primary" style={{ width: "100%", marginTop: "0.875rem" }} onClick={() => go("consult")}>Get in Touch →</button>
        </div>
      )}
    </>
  );
};

// ── HERO ──────────────────────────────────────────────────────────────────────
const HeroSection = ({ onNavigate }) => {
  const mob = useIsMobile();
  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - var(--nav-h))", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: "min(560px,80vw)", height: "min(560px,80vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: "min(380px,60vw)", height: "min(380px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(78,205,196,0.04) 0%,transparent 70%)", filter: "blur(40px)" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}>
          <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: mob?"2rem 1.25rem 3rem":"0 2rem", width: "100%", animation: "fadeUp 0.9s ease forwards" }}>
        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,var(--gold),#6b4f1e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>❋</div>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>Lotus AI Lab</span>
          <div style={{ flex: 1, minWidth: 20, height: 1, background: "var(--border)" }} />
          <span className="tag">Live Demo</span>
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: mob?"1fr":"1fr 400px", gap: mob?"2.5rem":"4rem", alignItems: "center" }}>
          <div>
            <p className="section-label">StreamIQ · AI Analytics Platform</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.75rem,9vw,5rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--text)", marginBottom: "1.25rem" }}>
              Intelligence for the<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>streaming era.</em>
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
              An AI-powered analytics platform for OTT & streaming organizations. Upload your content data, surface hidden insights, and converse with an AI analyst that understands the business of entertainment.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn-primary animate-glow" onClick={() => onNavigate("analytics")} style={{ flex: mob?"1 1 auto":"0 0 auto" }}>Explore the Demo →</button>
              <button className="btn-ghost" onClick={() => onNavigate("consult")} style={{ flex: mob?"1 1 auto":"0 0 auto" }}>Engage Lotus AI Lab</button>
            </div>
          </div>

          {/* Mini dashboard */}
          <div style={{ animation: "fadeIn 1.2s ease 0.3s both" }}>
            <div className="card" style={{ borderColor: "rgba(201,168,76,0.2)", padding: "1.125rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>Live Metrics</span>
                <span className="animate-pulse" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.65rem", color: "var(--teal)" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} /> Streaming
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.875rem" }}>
                {[{l:"Streams",v:"1.31B",c:"+12.4%"},{l:"Completion",v:"72.3%",c:"+3.1%"},{l:"Revenue",v:"$302M",c:"+8.7%"},{l:"Avg Rating",v:"8.23",c:"+0.3"}].map(s=>(
                  <div key={s.l} style={{ background:"var(--surface2)", borderRadius:3, padding:"0.625rem" }}>
                    <div style={{ fontSize:"0.58rem", color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{s.l}</div>
                    <div style={{ fontSize:"1rem", fontFamily:"var(--font-mono)", color:"var(--text)" }}>{s.v}</div>
                    <div style={{ fontSize:"0.62rem", color:"var(--teal)" }}>{s.c}</div>
                  </div>
                ))}
              </div>
              <BarChart data={[{Title:"Echoes",Streams_M:142},{Title:"Neon Dynasty",Streams_M:201},{Title:"Midnight",Streams_M:155},{Title:"Wild Kingdom",Streams_M:312},{Title:"Quantum",Streams_M:178},{Title:"Savage Tide",Streams_M:223}]} valueKey="Streams_M" labelKey="Title" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ marginTop:"3rem", paddingTop:"1.5rem", borderTop:"1px solid var(--border)", display:"grid", gridTemplateColumns: mob?"1fr 1fr":"repeat(4,1fr)", gap:"1.25rem" }}>
          {[{l:"Content Titles Analyzed",v:"10,000+"},{l:"Streaming Data Points",v:"500M+"},{l:"AI Insights Generated",v:"Real-Time"},{l:"Built by Lotus AI Lab",v:"Thoughtfully"}].map(s=>(
            <div key={s.l}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.2rem,4vw,1.5rem)", fontWeight:300, color:"var(--gold)" }}>{s.v}</div>
              <div style={{ fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--text-dim)", marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── ANALYTICS ────────────────────────────────────────────────────────────────
const AnalyticsSection = () => {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [activeChart, setActiveChart] = useState("streams");
  const fileRef = useRef();

  const processData = useCallback(async (text, name) => {
    const parsed = parseCSV(text);
    setData(parsed); setFileName(name); setLoading(true); setAiInsight("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000, stream: true,
          messages: [{ role: "user", content: `You are StreamIQ, an expert AI analyst for OTT streaming platforms built by Lotus AI Lab. Analyze this streaming content data and provide 3-4 sharp, actionable business insights in 180 words or less. Be specific. Data: ${JSON.stringify(parsed)}. Respond with insight paragraphs only, no headers or bullets.` }]
        })
      });
      const reader = res.body.getReader(), decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n"); buffer = lines.pop();
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.slice(6).trim();
            if (json === "[DONE]") continue;
            try { const e = JSON.parse(json); if (e.type==="content_block_delta"&&e.delta?.type==="text_delta") setAiInsight(p=>p+e.delta.text); } catch(_){}
          }
        }
      }
    } catch(e) { setAiInsight("Unable to connect to AI service. This demo is powered by Claude and works within Claude.ai."); }
    finally { setLoading(false); }
  }, []);

  const loadSample = () => processData(SAMPLE_CSV, "sample_streaming_data.csv");
  const handleFile = (file) => { if(!file) return; const r=new FileReader(); r.onload=e=>processData(e.target.result,file.name); r.readAsText(file); };

  const chartOptions = [
    { key: "streams", label: "Streams", valueKey: "Streams_M" },
    { key: "revenue", label: "Revenue", valueKey: "Revenue_M" },
    { key: "completion", label: "Completion", valueKey: "Completion_Rate", t: v=>+(v*100).toFixed(1) },
  ];
  const active = chartOptions.find(c=>c.key===activeChart);
  const displayData = (data||[]).map(d=>({...d,_val:active?.t?active.t(d[active.valueKey]):d[active?.valueKey]}));

  const donutData = !data ? [] : [
    {label:"N. America",value:data.filter(d=>d.Region==="North America").reduce((s,d)=>s+(d.Streams_M||0),0),color:"var(--gold)"},
    {label:"Global",value:data.filter(d=>d.Region==="Global").reduce((s,d)=>s+(d.Streams_M||0),0),color:"var(--teal)"},
    {label:"Asia Pac",value:data.filter(d=>d.Region==="Asia Pacific").reduce((s,d)=>s+(d.Streams_M||0),0),color:"#a78bfa"},
    {label:"Europe",value:data.filter(d=>d.Region==="Europe").reduce((s,d)=>s+(d.Streams_M||0),0),color:"#f87171"},
  ].filter(d=>d.value>0);

  return (
    <div className="section">
      <p className="section-label">Analytics Engine</p>
      <h2 className="section-title">Upload. Analyze.<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>Understand.</em></h2>
      <p className="section-sub" style={{ marginBottom:"2rem" }}>Drop in any streaming CSV — content performance, audience data, revenue reports. StreamIQ's AI surfaces insights instantly.</p>

      {!data ? (
        <div style={{ border:`1px dashed ${dragging?"var(--gold)":"rgba(255,255,255,0.15)"}`, borderRadius:6, padding:"3rem 1.5rem", textAlign:"center", cursor:"pointer", transition:"all 0.2s", background:dragging?"rgba(201,168,76,0.03)":"transparent" }}
          onClick={()=>fileRef.current?.click()}
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={()=>setDragging(false)}
          onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files[0]);}}>
          <input ref={fileRef} type="file" accept=".csv" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])} />
          <div style={{ fontSize:"2.5rem", marginBottom:"0.875rem", opacity:0.4 }}>⊕</div>
          <div style={{ fontSize:"1rem", color:"var(--text-muted)", marginBottom:"0.4rem" }}>Tap to upload a CSV file</div>
          <div style={{ fontSize:"0.8rem", color:"var(--text-dim)", marginBottom:"1.5rem" }}>Streaming data, content metrics, audience reports</div>
          <button className="btn-ghost" style={{ fontSize:"0.75rem" }} onClick={e=>{e.stopPropagation();loadSample();}}>↓ Load Sample Dataset</button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", animation:"fadeIn 0.5s ease" }}>
          {/* File badge row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <span className="tag gold-tag">✓ {fileName}</span>
              <span style={{ fontSize:"0.72rem", color:"var(--text-dim)" }}>{data.length} records</span>
            </div>
            <button className="btn-ghost" style={{ fontSize:"0.68rem", padding:"0.4rem 0.8rem", minHeight:36 }} onClick={()=>{setData(null);setAiInsight("");}}>Upload New</button>
          </div>

          {/* KPIs */}
          <div className="grid-4">
            {[
              {label:"Streams",value:`${data.reduce((s,d)=>s+(d.Streams_M||0),0).toFixed(0)}M`,spark:[90,120,110,150,140,180,200]},
              {label:"Revenue",value:`$${data.reduce((s,d)=>s+(d.Revenue_M||0),0).toFixed(0)}M`,spark:[20,25,22,30,28,35,40]},
              {label:"Avg Rating",value:(data.reduce((s,d)=>s+(d.Rating||0),0)/data.length).toFixed(1),spark:[7,7.5,7.8,8,7.9,8.2,8.3]},
              {label:"Completion",value:`${(data.reduce((s,d)=>s+(d.Completion_Rate||0),0)/data.length*100).toFixed(1)}%`,spark:[60,65,62,70,68,72,75]},
            ].map(s=>(
              <div key={s.label} className="stat-card">
                <div className="label" style={{ fontSize:"0.62rem" }}>{s.label}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.15rem", color:"var(--text)" }}>{s.value}</div>
                <Sparkline values={s.spark} />
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid-2">
            <div className="card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem", flexWrap:"wrap", gap:"0.5rem" }}>
                <span className="label">Content Performance</span>
                <div className="pill-nav">
                  {chartOptions.map(c=><button key={c.key} className={`pill ${activeChart===c.key?"active":""}`} onClick={()=>setActiveChart(c.key)}>{c.label}</button>)}
                </div>
              </div>
              <BarChart data={displayData} valueKey="_val" labelKey="Title" />
            </div>
            <div className="card">
              <div className="label" style={{ marginBottom:"0.75rem" }}>Streams by Region</div>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
                {donutData.length>0&&<DonutChart segments={donutData} />}
                <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem", flex:1 }}>
                  {donutData.map(d=>(
                    <div key={d.label} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                      <div style={{ width:7, height:7, borderRadius:"50%", background:d.color, flexShrink:0 }} />
                      <span style={{ fontSize:"0.75rem", color:"var(--text-muted)", flex:1 }}>{d.label}</span>
                      <span style={{ fontSize:"0.72rem", color:"var(--text)", fontFamily:"var(--font-mono)" }}>{d.value.toFixed(0)}M</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          <div className="card" style={{ borderColor:"rgba(201,168,76,0.2)", background:"linear-gradient(135deg,var(--surface) 0%,rgba(201,168,76,0.03) 100%)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.875rem" }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),#6b4f1e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", flexShrink:0 }}>❋</div>
              <div>
                <div style={{ fontSize:"0.72rem", color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase" }}>AI Analyst · Lotus AI Lab</div>
                <div style={{ fontSize:"0.62rem", color:"var(--text-dim)" }}>Powered by Claude</div>
              </div>
              {loading&&<div className="animate-spin" style={{ marginLeft:"auto", width:16, height:16, border:"2px solid var(--gold-dim)", borderTopColor:"var(--gold)", borderRadius:"50%" }} />}
            </div>
            <div style={{ fontSize:"0.875rem", color:"var(--text-muted)", lineHeight:1.75, minHeight:60 }}>
              {aiInsight||(loading?<span style={{ color:"var(--text-dim)", fontStyle:"italic" }}>Analyzing your streaming data…</span>:null)}
            </div>
          </div>

          {/* Scrollable table */}
          <div className="card">
            <div className="label" style={{ marginBottom:"0.75rem" }}>Raw Data</div>
            <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.75rem", minWidth:480 }}>
                <thead>
                  <tr>{Object.keys(data[0]).map(h=><th key={h} style={{ textAlign:"left", padding:"0.45rem 0.65rem", color:"var(--text-dim)", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.08em", borderBottom:"1px solid var(--border)", whiteSpace:"nowrap" }}>{h.replace(/_/g," ")}</th>)}</tr>
                </thead>
                <tbody>
                  {data.map((row,i)=>(
                    <tr key={i} style={{ borderBottom:"1px solid var(--border)" }}>
                      {Object.values(row).map((v,j)=><td key={j} style={{ padding:"0.5rem 0.65rem", color:"var(--text-muted)", fontFamily:typeof v==="number"?"var(--font-mono)":"inherit", whiteSpace:"nowrap" }}>{typeof v==="number"?v.toLocaleString():v}</td>)}
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
};

// ── CHAT ──────────────────────────────────────────────────────────────────────
const ChatSection = () => {
  const [messages, setMessages] = useState([
    { role:"assistant", content:"Hello. I'm StreamIQ, your AI analyst for OTT and streaming strategy. I can help you understand content performance trends, audience segmentation, monetization strategy, and how AI can transform your streaming operation. What would you like to explore?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const send = async () => {
    if (!input.trim()||loading) return;
    const userMsg = { role:"user", content:input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(""); setLoading(true);
    setMessages(prev=>[...prev,{role:"assistant",content:""}]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000, stream:true,
          system:"You are StreamIQ, a sophisticated AI analyst specializing in OTT and streaming media strategy, built by Lotus AI Lab. Deep expertise in content analytics, audience segmentation, streaming economics, AI in media & entertainment. Speak with authority but warmth. Keep responses concise — 2-3 paragraphs max. Never use bullet points. Always relate answers to how AI can help streaming organizations. When appropriate, mention Lotus AI Lab can help organizations build similar AI systems.",
          messages: newMessages.map(m=>({role:m.role,content:m.content}))
        })
      });
      const reader=res.body.getReader(), decoder=new TextDecoder();
      let buffer="";
      while(true){
        const{done,value}=await reader.read();
        if(done)break;
        buffer+=decoder.decode(value,{stream:true});
        const lines=buffer.split("\n");buffer=lines.pop();
        for(const line of lines){
          if(line.startsWith("data: ")){
            const json=line.slice(6).trim();
            if(json==="[DONE]")continue;
            try{const e=JSON.parse(json);if(e.type==="content_block_delta"&&e.delta?.type==="text_delta")setMessages(prev=>{const u=[...prev];u[u.length-1]={role:"assistant",content:u[u.length-1].content+e.delta.text};return u;});}catch(_){}
          }
        }
      }
    }catch(e){setMessages(prev=>{const u=[...prev];u[u.length-1]={role:"assistant",content:"Unable to connect to the AI service. This demo works within Claude.ai."};return u;});}
    finally{setLoading(false);}
  };

  const SUGGESTIONS = [
    "What genres drive the highest completion rates?",
    "How can AI improve recommendations?",
    "What does churn prediction look like?",
    "How should OTT use AI for pricing?",
  ];

  return (
    <div className="section">
      <p className="section-label">AI Analyst</p>
      <h2 className="section-title">Ask anything about<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>streaming & AI.</em></h2>
      <p className="section-sub" style={{ marginBottom:"1.25rem" }}>StreamIQ's AI analyst is trained on OTT strategy, content economics, and AI applications in media.</p>

      {/* Suggestion pills */}
      <div className="pill-nav" style={{ marginBottom:"1rem" }}>
        {SUGGESTIONS.map((s,i)=><button key={i} className="pill" style={{ fontSize:"0.72rem" }} onClick={()=>{setInput(s);inputRef.current?.focus();}}>{s}</button>)}
      </div>

      {/* Chat window */}
      <div className="card" style={{ padding:0, display:"flex", flexDirection:"column", height:"min(520px,65vh)" }}>
        <div style={{ padding:"0.875rem 1rem", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),#6b4f1e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem", flexShrink:0 }}>❋</div>
          <div style={{ fontSize:"0.8rem", color:"var(--text)", flex:1 }}>StreamIQ AI Analyst</div>
          <span className="animate-pulse" style={{ width:6, height:6, borderRadius:"50%", background:"var(--teal)", display:"inline-block" }} />
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.875rem", WebkitOverflowScrolling:"touch" }}>
          {messages.map((m,i)=>(
            <div key={i} className={m.role==="user"?"chat-bubble-user":"chat-bubble-ai"} style={{ animation:"fadeUp 0.3s ease" }}>
              {m.role==="assistant"&&<div style={{ fontSize:"0.62rem", color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.3rem" }}>StreamIQ</div>}
              {m.content||<span className="animate-pulse" style={{ color:"var(--text-dim)" }}>▍</span>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding:"0.875rem 1rem", borderTop:"1px solid var(--border)", display:"flex", gap:"0.5rem" }}>
          <input ref={inputRef} className="input-field" style={{ flex:1 }}
            placeholder="Ask about streaming, AI, content…"
            value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} />
          <button className="btn-primary" style={{ padding:"0.875rem 1rem", minWidth:44, flexShrink:0 }} onClick={send} disabled={loading}>
            {loading?"…":"→"}
          </button>
        </div>
      </div>

      {/* CTA card */}
      <div className="card" style={{ marginTop:"1rem", background:"var(--gold-dim)", borderColor:"rgba(201,168,76,0.2)" }}>
        <div style={{ fontSize:"0.68rem", color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Lotus AI Lab</div>
        <div style={{ fontSize:"0.85rem", color:"var(--text-muted)", lineHeight:1.55, marginBottom:"0.5rem" }}>Want this AI analyst trained on your specific content library and data?</div>
        <div style={{ fontSize:"0.75rem", color:"var(--text-dim)" }}>We build production-grade AI systems for M&E organizations. →</div>
      </div>
    </div>
  );
};

// ── USE CASES ────────────────────────────────────────────────────────────────
const UseCasesSection = ({ onNavigate }) => {
  const [expanded, setExpanded] = useState(null);
  const cases = [
    { icon:"⟳", tag:"Content Intelligence", title:"Recommendation Engines", teaser:"Personalize every viewer's feed with ML-driven content matching.", detail:"Deep learning models analyze watch history, completion patterns, time-of-day behavior, and social signals to serve hyper-personalized recommendations — reducing churn by up to 30% and increasing session length. Lotus AI Lab has architected these systems for organizations with catalogs ranging from 500 to 50,000+ titles.", impact:["↓ 28% churn","↑ 34% session","↑ 19% discovery"] },
    { icon:"◈", tag:"Audience Analytics", title:"Predictive Churn Modeling", teaser:"Identify at-risk subscribers before they cancel.", detail:"Using behavioral signals — declining watch time, skipping intros, login frequency drops — ML classifiers predict churn risk 30-60 days out. Automated intervention workflows trigger targeted retention offers, creating a proactive retention engine.", impact:["60-day prediction","↓ 22% churn","↑ Retention ROI"] },
    { icon:"◉", tag:"Content Acquisition", title:"Greenlight Intelligence", teaser:"Predict which content will perform before commissioning it.", detail:"NLP analysis of scripts and treatments combined with historical performance data gives development teams a data-informed perspective on greenlight decisions — reducing expensive misses and surfacing undervalued opportunities.", impact:["Pre-production scoring","Genre forecasting","Market comp analysis"] },
    { icon:"⊛", tag:"Ad Tech & AVOD", title:"Dynamic Ad Optimization", teaser:"Maximize AVOD yield with AI-driven placement and targeting.", detail:"Real-time ML models optimize ad slot placement, bidding strategy, and audience segmentation for AVOD tiers — balancing viewer experience with revenue maximization. Contextual AI ensures brand safety.", impact:["↑ 31% ad revenue","↓ 18% drop-off","Real-time CPM"] },
    { icon:"⊕", tag:"Operations", title:"Automated QA", teaser:"AI-powered content quality control at ingest scale.", detail:"Computer vision and audio ML models automate quality control for ingested content — detecting encoding errors, audio sync issues, subtitle problems, and compliance violations at scale.", impact:["95%+ error detection","↓ 80% QC time","Compliance automation"] },
    { icon:"◎", tag:"Creator Economy", title:"Performance Forecasting", teaser:"Predict first-30-day performance from metadata alone.", detail:"Ensemble models generate launch-day forecasts for new titles — enabling smarter marketing budget allocation, window strategy decisions, and release timing optimization. Particularly powerful for original content.", impact:["Launch-day forecasting","Marketing ROI","Window strategy AI"] },
  ];
  return (
    <div className="section">
      <p className="section-label">AI Use Cases · OTT & Streaming</p>
      <h2 className="section-title">How AI transforms<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>streaming organizations.</em></h2>
      <p className="section-sub" style={{ marginBottom:"2rem" }}>These are the AI systems Lotus AI Lab designs and builds. Tap any to see how the technology works and what outcomes it drives.</p>
      <div className="grid-3">
        {cases.map((c,i)=>(
          <button key={i} className={`use-case-card ${expanded===i?"exp":""}`} onClick={()=>setExpanded(expanded===i?null:i)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.75rem" }}>
              <span style={{ fontSize:"1.4rem", color:"var(--gold)", opacity:0.7 }}>{c.icon}</span>
              <span className="tag">{c.tag}</span>
            </div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", fontWeight:400, color:"var(--text)", marginBottom:"0.4rem" }}>{c.title}</div>
            <div style={{ fontSize:"0.82rem", color:"var(--text-muted)", lineHeight:1.6, marginBottom:"0.75rem" }}>{c.teaser}</div>
            {expanded===i&&(
              <div style={{ animation:"fadeUp 0.3s ease" }}>
                <div className="divider" style={{ marginBottom:"0.875rem" }} />
                <div style={{ fontSize:"0.82rem", color:"var(--text-muted)", lineHeight:1.75, marginBottom:"0.875rem" }}>{c.detail}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                  {c.impact.map((imp,j)=><span key={j} className="tag gold-tag" style={{ fontSize:"0.62rem" }}>{imp}</span>)}
                </div>
              </div>
            )}
            <div style={{ fontSize:"0.68rem", color:"var(--text-dim)", marginTop:"0.6rem" }}>{expanded===i?"↑ Less":"↓ Learn more"}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop:"2.5rem", textAlign:"center" }}>
        <p style={{ fontSize:"0.9rem", color:"var(--text-muted)", marginBottom:"1rem" }}>Ready to build one of these systems for your organization?</p>
        <button className="btn-primary animate-glow" onClick={()=>onNavigate("consult")}>Engage Lotus AI Lab →</button>
      </div>
    </div>
  );
};

// ── CONSULT ───────────────────────────────────────────────────────────────────
const ConsultSection = () => {
  const [form, setForm] = useState({name:"",org:"",role:"",interest:"",message:""});
  const [sent, setSent] = useState(false);
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div className="section">
      <p className="section-label">Work with Us</p>
      <h2 className="section-title">Build your AI system<br /><em style={{ fontStyle:"italic", color:"var(--gold)" }}>with Lotus AI Lab.</em></h2>
      <p style={{ fontSize:"0.9rem", color:"var(--text-muted)", lineHeight:1.75, marginBottom:"2rem" }}>What you've explored in this demo is a glimpse of what's possible. Lotus AI Lab designs and engineers production-grade AI systems — thoughtfully built for the specific context of your organization.</p>

      <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"2rem" }}>
        {[{icon:"◈",title:"AI Strategy & Roadmapping",desc:"Understand where AI creates real leverage in your specific operation."},{icon:"◉",title:"Production AI System Design",desc:"Architecture and engineering of ML platforms, recommendation engines, and analytics systems."},{icon:"⊕",title:"Creative AI Experiences",desc:"Generative AI tools and interactive experiences for content creation and audience engagement."}].map(s=>(
          <div key={s.title} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"var(--gold-dim)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:"0.875rem", color:"var(--text)", marginBottom:"0.2rem" }}>{s.title}</div>
              <div style={{ fontSize:"0.8rem", color:"var(--text-muted)", lineHeight:1.5 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom:"1.5rem" }}>
        <div style={{ fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:"0.5rem" }}>Lotus AI Lab</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:300, color:"var(--text)", fontStyle:"italic" }}>"Thoughtfully engineered intelligent systems."</div>
        <a href="https://lotusailab.framer.ai" target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:"0.75rem", fontSize:"0.75rem", color:"var(--gold)", textDecoration:"none", letterSpacing:"0.1em" }}>Visit lotusailab.framer.ai →</a>
      </div>

      <div className="card" style={{ borderColor:"rgba(201,168,76,0.15)" }}>
        {!sent?(
          <>
            <div style={{ fontSize:"0.875rem", color:"var(--text)", marginBottom:"1.25rem" }}>Let's start a conversation.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[{k:"name",l:"Your Name",p:"Jane Smith"},{k:"org",l:"Organization",p:"Acme Streaming Co."},{k:"role",l:"Your Role",p:"VP Product / CTO / etc."},{k:"interest",l:"Area of Interest",p:"Recommendations, analytics, churn…"}].map(({k,l,p})=>(
                <div key={k}>
                  <div className="label">{l}</div>
                  <input className="input-field" placeholder={p} value={form[k]} onChange={e=>upd(k,e.target.value)} />
                </div>
              ))}
              <div>
                <div className="label">Message</div>
                <textarea className="input-field" style={{ height:100, resize:"none" }} placeholder="Tell us about your organization and what you're trying to build…" value={form.message} onChange={e=>upd("message",e.target.value)} />
              </div>
              <button className="btn-primary" style={{ width:"100%", padding:"1rem" }} onClick={()=>setSent(true)}>Send to Lotus AI Lab →</button>
              <div style={{ fontSize:"0.7rem", color:"var(--text-dim)", textAlign:"center" }}>Or visit <a href="https://lotusailab.framer.ai" target="_blank" rel="noreferrer" style={{ color:"var(--gold)" }}>lotusailab.framer.ai</a> directly</div>
            </div>
          </>
        ):(
          <div style={{ textAlign:"center", padding:"2.5rem 0", animation:"fadeUp 0.5s ease" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"0.875rem" }}>❋</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", color:"var(--gold)", marginBottom:"0.75rem" }}>Thank you, {form.name||"there"}.</div>
            <div style={{ fontSize:"0.875rem", color:"var(--text-muted)", lineHeight:1.7, marginBottom:"1.5rem" }}>Your message has been received. The Lotus AI Lab team will be in touch shortly.</div>
            <a href="https://lotusailab.framer.ai" target="_blank" rel="noreferrer"><button className="btn-ghost">Visit Our Site →</button></a>
          </div>
        )}
      </div>
    </div>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = ({ onNavigate }) => (
  <footer style={{ borderTop:"1px solid var(--border)", padding:"2rem 1.25rem", maxWidth:1100, margin:"0 auto" }}>
    <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),#6b4f1e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem" }}>❋</div>
        <div>
          <div style={{ fontSize:"0.8rem", color:"var(--text)" }}>StreamIQ by Lotus AI Lab</div>
          <div style={{ fontSize:"0.62rem", color:"var(--text-dim)" }}>Thoughtfully engineered intelligent systems.</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:"1.25rem", flexWrap:"wrap" }}>
        {["Home","Analytics","Chat","Use Cases","Consult"].map(l=>(
          <span key={l} className="nav-link" style={{ fontSize:"0.72rem" }} onClick={()=>onNavigate(l.toLowerCase().replace(" ","-"))}>{l}</span>
        ))}
        <a href="https://lotusailab.framer.ai" target="_blank" rel="noreferrer" className="nav-link" style={{ color:"var(--gold)", fontSize:"0.72rem" }}>lotusailab.framer.ai ↗</a>
      </div>
    </div>
  </footer>
);

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const navigate = (key) => {
    const map = {home:"home",analytics:"analytics",chat:"chat","use-cases":"use-cases","use cases":"use-cases",consult:"consult"};
    setPage(map[key]||key);
    setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),50);
  };
  return (
    <div className="noise" style={{ minHeight:"100vh", background:"var(--bg)", overflowX:"hidden" }}>
      <FontInjector />
      <GlobalStyles />
      <Nav active={page} onNavigate={navigate} />
      {page==="home"&&<HeroSection onNavigate={navigate} />}
      {page==="analytics"&&<AnalyticsSection />}
      {page==="chat"&&<ChatSection />}
      {page==="use-cases"&&<UseCasesSection onNavigate={navigate} />}
      {page==="consult"&&<ConsultSection />}
      <Footer onNavigate={navigate} />
    </div>
  );
}

import { useState } from "react";

const C = {
  bg: "#f5f0e8", card: "#ffffff", border: "#d4cbbf",
  white: "#1a1612", textSoft: "#6b5f52", textDim: "#998d7e",
  copper: "#b5632e", violet: "#7c5cbf", amber: "#a67c28",
  green: "#2d7d46", rose: "#c0392b", blue: "#2c6fad",
  teal: "#1a7a6a",
};

const SITES = [
  { id: "cf", label: "Design\nStudio", sub: "The Course", url: "https://cfdesigns.vercel.app", color: C.copper, x: 400, y: 120, r: 52 },
  { id: "bay", label: "Bayesian\nM&V Module", sub: "Part 3", url: "https://bayesian-mv.vercel.app", color: C.violet, x: 160, y: 240, r: 44 },
  { id: "mv", label: "IPMVP\nReference", sub: "Translation Guide", url: "https://mv-course.vercel.app", color: C.amber, x: 640, y: 240, r: 44 },
  { id: "map", label: "Learning\nPath", sub: "Progress Tracker", url: "https://mv-classmap.vercel.app", color: C.green, x: 220, y: 400, r: 40 },
  { id: "cap", label: "CMVP\nCapstone", sub: "M&V Plan Exercise", url: "https://cmvp-capstone.vercel.app", color: C.rose, x: 580, y: 400, r: 44 },
  { id: "score", label: "M&V\nScorecard", sub: "AI Plan Scoring", url: "https://mnvscore.vercel.app", color: C.blue, x: 400, y: 480, r: 40 },
  { id: "ane", label: "ANE\nSurrogate", sub: "EnergyPlus + ML", url: "https://github.com/jskromer/ane-surrogate", color: C.teal, x: 100, y: 480, r: 36 },
  { id: "hub", label: "counterfactual\n-designs.com", sub: "Central Hub", url: "https://counterfactual-designs.com", color: "#d4a76a", x: 400, y: 580, r: 42 },
];

// Connections: every site connects to the hub, and the main training path
const EDGES = [
  // Hub spokes
  ["cf", "hub"], ["bay", "hub"], ["mv", "hub"], ["map", "hub"], ["cap", "hub"], ["score", "hub"],
  // Core training path
  ["cf", "bay"], ["cf", "mv"], ["cf", "map"], ["cf", "cap"], ["cf", "score"], ["cf", "ane"],
  // Cross-links
  ["bay", "mv"], ["bay", "map"], ["bay", "cap"], ["bay", "score"],
  ["mv", "map"], ["mv", "cap"], ["mv", "score"],
  ["map", "cap"], ["map", "score"],
  ["cap", "score"],
  ["ane", "score"],
];

function getSite(id) {
  return SITES.find(s => s.id === id);
}

export default function EcosystemMap({ onBack }) {
  const [hover, setHover] = useState(null);
  const [hoverEdges, setHoverEdges] = useState([]);

  const handleHover = (id) => {
    setHover(id);
    setHoverEdges(EDGES.filter(([a, b]) => a === id || b === id));
  };

  const handleLeave = () => {
    setHover(null);
    setHoverEdges([]);
  };

  const edgeKey = (a, b) => `${a}-${b}`;
  const isEdgeActive = (a, b) => hoverEdges.some(([ea, eb]) => (ea === a && eb === b) || (ea === b && eb === a));

  const W = 800;
  const H = 660;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.copper, fontSize: 14, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, padding: 0 }}>
            &larr; Design Studio
          </button>
          <div style={{ fontSize: 11, color: C.textDim, letterSpacing: 2, textTransform: "uppercase" }}>
            Ecosystem Map
          </div>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 4, fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Training Ecosystem
        </h1>
        <p style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.6, marginBottom: 16, maxWidth: 600 }}>
          Click any node to visit that site. Hover to see its connections. Every site links back to every other — navigate freely across the full M&V training platform.
        </p>
      </div>

      {/* SVG Map */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 48px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, overflow: "hidden" }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const sa = getSite(a);
              const sb = getSite(b);
              const active = isEdgeActive(a, b);
              const dimmed = hover && !active;
              return (
                <line
                  key={edgeKey(a, b)}
                  x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                  stroke={active ? (getSite(hover).color) : "#e0d8ce"}
                  strokeWidth={active ? 2 : 1}
                  strokeOpacity={dimmed ? 0.15 : active ? 0.7 : 0.4}
                  style={{ transition: "all 0.2s" }}
                />
              );
            })}

            {/* Nodes */}
            {SITES.map(s => {
              const active = hover === s.id;
              const connected = hoverEdges.some(([a, b]) => a === s.id || b === s.id);
              const dimmed = hover && !active && !connected;
              const lines = s.label.split("\n");

              return (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer" }}>
                  <g
                    onMouseEnter={() => handleHover(s.id)}
                    onMouseLeave={handleLeave}
                    style={{ transition: "opacity 0.2s" }}
                    opacity={dimmed ? 0.25 : 1}
                  >
                    {/* Glow */}
                    {active && (
                      <circle cx={s.x} cy={s.y} r={s.r + 8} fill={s.color} opacity={0.12} />
                    )}
                    {/* Circle */}
                    <circle
                      cx={s.x} cy={s.y} r={s.r}
                      fill={C.card}
                      stroke={active ? s.color : C.border}
                      strokeWidth={active ? 2.5 : 1.5}
                      style={{ transition: "all 0.2s" }}
                    />
                    {/* Dot */}
                    <circle cx={s.x} cy={s.y - s.r + 14} r={4} fill={s.color} />
                    {/* Label */}
                    {lines.map((line, i) => (
                      <text
                        key={i}
                        x={s.x} y={s.y + (i - (lines.length - 1) / 2) * 14 + 4}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={s.r > 44 ? 12 : 11}
                        fontWeight={600}
                        fill={C.white}
                        fontFamily="'IBM Plex Sans', sans-serif"
                      >
                        {line}
                      </text>
                    ))}
                    {/* Subtitle */}
                    <text
                      x={s.x} y={s.y + s.r + 16}
                      textAnchor="middle"
                      fontSize={10}
                      fill={s.color}
                      fontWeight={600}
                      fontFamily="'IBM Plex Mono', monospace"
                      letterSpacing={1}
                    >
                      {s.sub}
                    </text>
                  </g>
                </a>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16, justifyContent: "center" }}>
          {SITES.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", fontSize: 12, color: C.textSoft }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              {s.label.replace("\n", " ")}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

/* ───── palette ───── */
const C = {
  bg: "#f5f0e8", surface: "#ebe5d9", card: "#ffffff",
  border: "#d4cbbf", white: "#1a1612", text: "#3d3529",
  textSoft: "#6b5f52", textDim: "#998d7e",
  teal: "#b5632e", tealDim: "rgba(181,99,46,0.08)",
  rose: "#c0392b", roseDim: "rgba(192,57,43,0.06)",
  blue: "#2c6fad", blueDim: "rgba(44,111,173,0.06)",
  amber: "#a67c28", amberDim: "rgba(166,124,40,0.08)",
  violet: "#7c5cbf", violetDim: "rgba(124,92,191,0.06)",
};

/* ───── The Three Dimensions ───── */
const DIMENSIONS = [
  {
    id: "boundary", num: "01", label: "Boundary",
    question: "What does the meter see?",
    description: "The measurement boundary determines what your model can tell you — and what it hides. Whole facility captures everything including noise. Retrofit isolation gives a clean signal but misses interactions.",
    color: C.rose, dimColor: C.roseDim,
    status: "ready",
    tags: ["Whole Facility", "Retrofit Isolation", "Interactive Effects", "Single-Line Diagrams"],
  },
  {
    id: "model", num: "02", label: "Model Form",
    question: "How do you represent what would have happened?",
    description: "Statistical models learn from data — fast, transparent, testable. Physical models encode physics — flexible, explainable, expensive. The choice shapes what you can defend.",
    color: C.blue, dimColor: C.blueDim,
    status: "ready",
    tags: ["Statistical", "Physical", "Bayesian Calibration", "Change-Point", "TOWT"],
  },
  {
    id: "duration", num: "03", label: "Duration",
    question: "Which data trains the counterfactual?",
    description: "The baseline period isn't just 'the most recent 12 months.' It's a judgment about which past best predicts the future. Choose wrong, and the math gives you confident nonsense.",
    color: C.amber, dimColor: C.amberDim,
    status: "ready",
    tags: ["Fair & Relevant", "Coverage Factor", "Forward-Looking", "Apparent Increase"],
  },
];

/* ───── Landing Page ───── */
function Home({ onNavigate }) {
  const [hoveredDim, setHoveredDim] = useState(null);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── Hero ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "80px 32px 72px", background: `linear-gradient(180deg, ${C.surface} 0%, ${C.bg} 100%)` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 20 }}>
            Counterfactual Design
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: C.white, margin: "0 0 20px", letterSpacing: -0.5, lineHeight: 1.15 }}>
            Three Decisions That<br />Define Every M&V Plan
          </h1>
          <p style={{ fontSize: 17, color: C.textSoft, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 32px" }}>
            Before you fit a model, you make three design choices — boundary, model form, and duration. Everything else follows. This course teaches you to make those choices with judgment.
          </p>
          <div style={{ fontSize: 12, color: C.textDim, fontStyle: "italic" }}>
            Based on <span style={{ color: C.text }}>The Role of the Measurement and Verification Professional</span>
            <br />Steve Kromer · River Publishers, 2024
          </div>
        </div>
      </div>

      {/* ── The Framework ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 32px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>
            The Framework
          </div>
          <h2 style={{ fontSize: 26, color: C.white, fontWeight: 600, margin: "0 0 12px" }}>
            Counterfactual Design = Boundary × Model × Duration
          </h2>
          <p style={{ fontSize: 15, color: C.textSoft, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            The proper study of mankind is the science of design. — Herbert Simon
          </p>
        </div>

        {/* Three dimension cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {DIMENSIONS.map((d) => (
            <div
              key={d.id}
              onMouseEnter={() => setHoveredDim(d.id)}
              onMouseLeave={() => setHoveredDim(null)}
              onClick={() => onNavigate(d.id)}
              style={{
                background: hoveredDim === d.id ? d.dimColor : C.card,
                border: `1px solid ${hoveredDim === d.id ? d.color : C.border}`,
                borderRadius: 10, padding: "28px 32px", cursor: "pointer",
                transition: "all 0.2s ease",
                display: "grid", gridTemplateColumns: "64px 1fr auto", alignItems: "start", gap: 20,
              }}
            >
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: d.color, fontWeight: 600, letterSpacing: 2, marginBottom: 4 }}>
                  {d.num}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.white }}>
                  {d.label}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, color: C.white, fontWeight: 500, marginBottom: 6 }}>
                  {d.question}
                </div>
                <div style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.6, marginBottom: 12 }}>
                  {d.description}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {d.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, color: d.color, background: d.dimColor, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 20, color: hoveredDim === d.id ? d.color : C.textDim, transition: "color 0.2s" }}>
                →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Big Idea ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 48px" }}>
        <div style={{ background: `linear-gradient(135deg, #2c2418 0%, #3d3529 100%)`, borderRadius: 10, padding: "40px 36px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#d4a76a", fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>
            Why This Matters
          </div>
          <p style={{ fontSize: 16, color: "#f5f0e8", lineHeight: 1.75, margin: "0 0 16px" }}>
            <strong>M&V is not protocol compliance — it's design under uncertainty.</strong> The protocols give you a menu. They don't tell you how to choose from it, or what to do when nothing on the menu fits. That requires judgment — informed by statistics, physics, and an honest reckoning with what you don't know.
          </p>
          <p style={{ fontSize: 15, color: "#c4b8a8", lineHeight: 1.7, margin: "0 0 16px" }}>
            The same metered data, the same regression engine, can tell you savings are 10% or that the retrofit <em>increased</em> consumption by 23% — depending on which twelve months you chose for the baseline. The math doesn't protect you from asking the wrong question. Design thinking does.
          </p>
          <p style={{ fontSize: 14, color: "#998d7e", fontStyle: "italic", margin: 0 }}>
            "The fundamental role of the M&V professional is to facilitate agreement among all stakeholders that the reported quantity fairly and accurately represents the impact of the relevant energy management activities."
          </p>
        </div>
      </div>

      {/* ── What's Inside ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Interactive Tools", desc: "Build regression models, explore scatter plots, toggle baselines, watch the counterfactual change.", color: C.teal },
            { label: "Case Studies", desc: "Non-routine adjustments, apparent increases, the 2022 vs 2023 baseline trap — real scenarios, real consequences.", color: C.rose },
            { label: "Epistemology", desc: "Known unknowns, false certainties, and the architecture of uncertainty that underlies every savings estimate.", color: C.violet },
            { label: "Professional Judgment", desc: "When to deviate from protocol, how to defend your choices, and why the technician's path leads to wrong answers.", color: C.amber },
          ].map((item) => (
            <div key={item.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px 24px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: item.color, marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Audience ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 32px 48px" }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: "32px 36px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>
            Who This Is For
          </div>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.7, margin: 0 }}>
            M&V professionals who want to move beyond protocol checklists. You know what IPMVP says — you want to understand <em>why</em> it says it, where it falls short, and how to exercise professional judgment when the protocols don't cover your situation. If you've ever had to defend a baseline choice that wasn't "most recent 12 months," this course is for you.
          </p>
        </div>
      </div>

      {/* ── Resources ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 48px" }}>
        <a href="https://counterfactual-designs.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            background: "linear-gradient(135deg, #2c2418 0%, #3d3529 100%)",
            border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.teal; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
          >
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#d4a76a", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>
                From the Author
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f5f0e8", marginBottom: 6 }}>
                counterfactual-designs.com
              </div>
              <div style={{ fontSize: 13, color: "#c4b8a8", lineHeight: 1.6 }}>
                Steve Kromer's practice — consulting, training, and publications on counterfactual design for M&V professionals.
              </div>
            </div>
            <div style={{ fontSize: 24, color: "#d4a76a", marginLeft: 24, flexShrink: 0 }}>→</div>
          </div>
        </a>
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: C.textDim }}>
          Companion: <a href="https://mv-course.vercel.app" style={{ color: C.teal, textDecoration: "none" }}>IPMVP Implementation Course →</a>
        </div>
        <div style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>
          © 2024 Steve Kromer · SKEE · Based on <em>The Role of the M&V Professional</em> (River Publishers)
        </div>
      </div>
    </div>
  );
}

/* ───── Placeholder pages ───── */
function PlaceholderPage({ dimension, onBack }) {
  const d = DIMENSIONS.find((x) => x.id === dimension);
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ padding: "32px", maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.teal, cursor: "pointer", fontSize: 14, marginBottom: 32, padding: 0 }}>
          ← Back to Framework
        </button>
        <div style={{ fontSize: 11, letterSpacing: 4, color: d.color, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>
          Dimension {d.num} · {d.label}
        </div>
        <h1 style={{ fontSize: 32, color: C.white, margin: "0 0 16px" }}>{d.question}</h1>
        <p style={{ fontSize: 16, color: C.textSoft, lineHeight: 1.7 }}>{d.description}</p>
        <div style={{ marginTop: 48, padding: "32px", background: C.card, borderRadius: 10, border: `1px solid ${d.color}30`, textAlign: "center" }}>
          <div style={{ fontSize: 14, color: d.color, fontWeight: 600, marginBottom: 8 }}>Under Construction</div>
          <div style={{ fontSize: 13, color: C.textSoft }}>This dimension is being built out with interactive tools and case studies.</div>
        </div>
      </div>
    </div>
  );
}

/* ───── Router ───── */
export default function App() {
  const getPage = () => window.location.hash.replace("#/", "") || "home";
  const [page, setPage] = useState(getPage());

  React.useEffect(() => {
    const handler = () => setPage(getPage());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (p) => {
    window.location.hash = `#/${p}`;
    setPage(p);
    window.scrollTo(0, 0);
  };

  const goHome = () => navigate("home");

  if (page === "home" || page === "") return <Home onNavigate={navigate} />;
  if (["boundary", "model", "duration"].includes(page)) {
    return <PlaceholderPage dimension={page} onBack={goHome} />;
  }
  return <Home onNavigate={navigate} />;
}

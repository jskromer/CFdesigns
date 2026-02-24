import { useState, useEffect } from "react";
import { useUser, SignIn, SignInButton, UserButton } from "@clerk/clerk-react";
import StatsFundamentals from "./Fundamentals.jsx";
import MVWorkbench from "./Workbench.jsx";
import ArchitectureOfUncertainty from "./ArchitectureOfUncertainty.jsx";
import UncertaintyPedagogy from "./UncertaintyPedagogy.jsx";
import BeyondOneVariable from "./BeyondOneVariable.jsx";
import SimulationExplainer from "./SimulationExplainer.jsx";
import CaseStudies from "./CaseStudies.jsx";
import BoundaryExplainer from "./BoundaryExplainer.jsx";
import DurationExplainer from "./DurationExplainer.jsx";
import CVrmseModule from "./CVrmseModule.jsx";

/* ───── Palette (warm cream) ───── */
const C = {
  bg: "#f5f0e8", surface: "#ebe5d9", card: "#ffffff",
  border: "#d4cbbf", white: "#1a1612", text: "#3d3529",
  textSoft: "#6b5f52", textDim: "#998d7e",
  teal: "#b5632e", tealDim: "rgba(181,99,46,0.08)",
  rose: "#c0392b", roseDim: "rgba(192,57,43,0.06)",
  blue: "#2c6fad", blueDim: "rgba(44,111,173,0.06)",
  amber: "#a67c28", amberDim: "rgba(166,124,40,0.08)",
  violet: "#7c5cbf", violetDim: "rgba(124,92,191,0.06)",
  green: "#2d7d46", greenDim: "rgba(45,125,70,0.08)",
};

/* ───── Routing ───── */
const ROUTES = {
  "": "home", "#/fundamentals": "fundamentals", "#/workbench": "workbench",
  "#/architecture": "architecture", "#/pedagogy": "pedagogy", "#/beyond": "beyond",
  "#/simulation": "simulation", "#/cases": "cases", "#/boundary": "boundary",
  "#/duration": "duration",
  "#/cvrmse": "cvrmse",
};

/* ───── Auth helpers ───── */
function useAuth() {
  try {
    const { isLoaded, isSignedIn, user } = useUser();
    return { isLoaded, isSignedIn, user, enabled: true };
  } catch {
    // Clerk not configured (no key) — allow everything
    return { isLoaded: true, isSignedIn: true, user: null, enabled: false };
  }
}

function AuthGate({ children, onHome }) {
  const { isLoaded, isSignedIn, enabled } = useAuth();

  if (!enabled) return children; // No Clerk = dev mode, no gate
  if (!isLoaded) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: C.textDim, fontFamily: "'IBM Plex Sans', sans-serif" }}>Loading…</div>
    </div>
  );
  if (!isSignedIn) return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", alignItems: "center", padding: "10px 24px", borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", color: C.teal, fontSize: 13, fontWeight: 600, fontFamily: "'IBM Plex Sans'", padding: 0 }}>← CF Designs</button>
      </div>
      <div style={{ maxWidth: 440, margin: "80px auto 0", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace" }}>
          Course Access
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white, margin: "0 0 12px" }}>
          Sign in to continue
        </h2>
        <p style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.65, marginBottom: 32 }}>
          Create a free account or sign in to access the course modules.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SignIn routing="hash" />
        </div>
      </div>
    </div>
  );
  return children;
}

/* ───── App Shell ───── */
export default function App() {
  const getPage = () => ROUTES[window.location.hash] || "home";
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    const handler = () => setPage(getPage());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (p) => {
    const hash = Object.entries(ROUTES).find(([, v]) => v === p)?.[0] || "";
    window.location.hash = hash;
    setPage(p);
    window.scrollTo(0, 0);
  };

  const goHome = () => navigate("home");

  // Gated pages — require sign-in
  if (page === "fundamentals") return <AuthGate onHome={goHome}><ToolWrapper onHome={goHome} onSwitch={() => navigate("workbench")} switchLabel="Workbench →" current="fundamentals"><StatsFundamentals /></ToolWrapper></AuthGate>;
  if (page === "workbench") return <AuthGate onHome={goHome}><ToolWrapper onHome={goHome} onSwitch={() => navigate("fundamentals")} switchLabel="← Fundamentals" current="workbench"><MVWorkbench /></ToolWrapper></AuthGate>;
  if (page === "architecture") return <AuthGate onHome={goHome}><ArchitectureOfUncertainty onBack={goHome} /></AuthGate>;
  if (page === "pedagogy") return <AuthGate onHome={goHome}><UncertaintyPedagogy onBack={goHome} /></AuthGate>;
  if (page === "beyond") return <AuthGate onHome={goHome}><BeyondOneVariable onBack={goHome} /></AuthGate>;
  if (page === "simulation") return <AuthGate onHome={goHome}><SimulationExplainer onBack={goHome} /></AuthGate>;
  if (page === "cases") return <AuthGate onHome={goHome}><CaseStudies onBack={goHome} /></AuthGate>;
  if (page === "boundary") return <AuthGate onHome={goHome}><BoundaryExplainer onBack={goHome} /></AuthGate>;
  if (page === "duration") return <AuthGate onHome={goHome}><DurationExplainer onBack={goHome} /></AuthGate>;
  if (page === "cvrmse") return <AuthGate onHome={goHome}><CVrmseModule onBack={goHome} /></AuthGate>;

  // Landing page — always public
  return <Landing onNavigate={navigate} />;
}

/* ───── ToolWrapper (nav bar for Fundamentals / Workbench) ───── */
function ToolWrapper({ children, onHome, onSwitch, switchLabel, current }) {
  const { enabled } = useAuth();
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderBottom: `1px solid ${C.border}`, background: C.surface, fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", color: C.teal, fontSize: 13, fontWeight: 600, fontFamily: "'IBM Plex Sans'", padding: 0 }}>← CF Designs</button>
          <span style={{ color: C.border }}>|</span>
          <span style={{ fontSize: 12, color: C.textDim }}>
            {current === "fundamentals" ? "Part 1: Statistical Foundations" : "Part 2: Counterfactual Workbench"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onSwitch} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, cursor: "pointer", color: C.textSoft, fontSize: 12, padding: "5px 14px", fontFamily: "'IBM Plex Sans'" }}>
            {switchLabel}
          </button>
          {enabled && <UserButton afterSignOutUrl="/" />}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ───── Landing Page ───── */
function Landing({ onNavigate }) {
  const { isSignedIn, user, enabled } = useAuth();
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', sans-serif", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Auth nav */}
      {enabled && (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "10px 24px", borderBottom: `1px solid ${C.border}`, background: C.surface }}>
          {isSignedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: C.textDim }}>{user?.primaryEmailAddress?.emailAddress}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, cursor: "pointer", color: C.teal, fontSize: 12, fontWeight: 600, padding: "6px 16px", fontFamily: "'IBM Plex Sans'" }}>
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}

      {/* Hero */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "72px 32px 64px", background: `linear-gradient(180deg, ${C.surface} 0%, ${C.bg} 100%)` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 20, fontFamily: "'IBM Plex Mono', monospace" }}>
            Counterfactual Designs
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: C.white, margin: "0 0 20px", letterSpacing: -0.5, lineHeight: 1.2 }}>
            Statistical Modeling for<br />Measurement & Verification
          </h1>
          <p style={{ fontSize: 16, color: C.textSoft, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 16px" }}>
            You know <strong style={{ color: C.white }}>what</strong> a counterfactual is supposed to do — but could you build one, validate it, and defend it in a project review? This course gets you there.
          </p>
          <p style={{ fontSize: 13, color: C.textDim, fontStyle: "italic" }}>
            Based on <em>The Role of the M&V Professional</em> by Steve Kromer (River Publishers, 2024)
          </p>
        </div>
      </div>

      {/* Who is this for */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px 16px" }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: "24px 32px", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.7, margin: 0 }}>
            <strong>Who is this for?</strong> M&V professionals who want to move beyond protocol checklists. You want to understand <em>why</em> models work, where they break, and how to exercise professional judgment when the standard procedures don't cover your situation.
          </p>
        </div>
      </div>

      {/* Part 1 + Part 2 */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 2 }}>PART 1</span>
              <span style={{ fontSize: 10, background: C.tealDim, color: C.teal, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>START HERE</span>
              <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>5 interactive modules</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>Statistical Foundations</h2>
            <p style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.65, margin: "0 0 20px" }}>
              Build intuition from the ground up. Scatter plots, linear regression, residuals, and goodness-of-fit metrics — all interactive, all visual.
            </p>
            <button onClick={() => onNavigate("fundamentals")} style={{
              background: C.teal, color: "#fff", border: "none", borderRadius: 8,
              padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'IBM Plex Sans'", width: "100%",
            }}>Begin with Foundations →</button>
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 2 }}>PART 2</span>
              <span style={{ fontSize: 10, background: C.blueDim, color: C.blue, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>APPLIED</span>
              <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>5 guided steps</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.white, margin: "0 0 8px" }}>Counterfactual Workbench</h2>
            <p style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.65, margin: "0 0 20px" }}>
              Apply what you learned. Choose a building, fit change-point models, validate the counterfactual, and calculate savings with uncertainty.
            </p>
            <button onClick={() => onNavigate("workbench")} style={{
              background: C.blue, color: "#fff", border: "none", borderRadius: 8,
              padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'IBM Plex Sans'", width: "100%",
            }}>Open the Workbench →</button>
          </div>
        </div>
      </div>

      {/* Go Deeper */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 16px" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: C.teal, fontWeight: 600, textTransform: "uppercase", marginBottom: 16, fontFamily: "'IBM Plex Mono', monospace" }}>
          Go Deeper
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { id: "boundary", label: "Measurement Boundary", desc: "Where you draw the line determines what the model sees — and what it hides.", color: C.rose, tags: ["Whole Facility", "Retrofit Isolation"] },
            { id: "duration", label: "Duration", desc: "Which past predicts the future? How baseline period selection changes everything.", color: C.amber, tags: ["Baseline Selection", "Occupancy Trap"] },
            { id: "cases", label: "Non-Routine Adjustments", desc: "Two case studies: a server room appears mid-reporting, a chiller fails during baseline.", color: C.teal, tags: ["Reporting Period NRA", "Baseline NRA"] },
            { id: "beyond", label: "Beyond One Variable", desc: "Step through adding causal variables — from R²=0.02 to R²=0.99 with real hourly data.", color: C.blue, tags: ["TOWT", "Multi-Variable"] },
            { id: "architecture", label: "Architecture of Uncertainty", desc: "What we know, what we don't, and what ain't so. Epistemic vs. aleatory vs. ontological.", color: C.violet, tags: ["Epistemology", "False Certainties"] },
            { id: "simulation", label: "Simulation as Physical Model", desc: "When statistical models reach their limits, physics-based simulation picks up the thread.", color: C.teal, tags: ["EnergyPlus", "Bayesian Calibration"] },
            { id: "cvrmse", label: "CV(RMSE) Deep Dive", desc: "Why a model can pass every metric and still hide savings in the noise. The baseload trap, detectability, and when good isn't good enough.", color: C.green, tags: ["Baseload Trap", "Detectability"] },
          ].map(item => (
            <div key={item.id} onClick={() => onNavigate(item.id)} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
              padding: "20px 20px", cursor: "pointer", transition: "border-color 0.2s",
              borderTop: `3px solid ${item.color}`,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = item.color}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.borderTopColor = item.color; }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.55, marginBottom: 10 }}>{item.desc}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {item.tags.map(t => (
                  <span key={t} style={{ fontSize: 10, color: item.color, background: `${item.color}10`, padding: "2px 8px", borderRadius: 10, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Framework (Capstone) */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 16px" }}>
        <div style={{ background: `linear-gradient(135deg, #2c2418 0%, #3d3529 100%)`, borderRadius: 10, padding: "36px 36px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#d4a76a", fontWeight: 600, textTransform: "uppercase", marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
            The Framework
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f0e8", margin: "0 0 8px" }}>
            Counterfactual Design — Three Dimensions
          </h2>
          <p style={{ fontSize: 14, color: "#c4b8a8", lineHeight: 1.7, margin: "0 0 16px" }}>
            Every M&V analysis requires three design decisions. These dimensions — not protocol labels — are how professionals think about constructing a counterfactual.
          </p>
          <p style={{ fontSize: 14, color: "#c4b8a8", lineHeight: 1.7, margin: "0 0 20px" }}>
            <strong style={{ color: "#f5f0e8" }}>M&V is not protocol compliance — it's design under uncertainty.</strong> The protocols give you a menu. They don't tell you how to choose from it, or what to do when nothing on the menu fits. That requires judgment — informed by statistics, physics, and an honest reckoning with what you don't know.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { num: "1", label: "Boundary", q: "What does the meter capture?", color: C.rose },
              { num: "2", label: "Model Form", q: "How do you model baseline behavior?", color: "#6b9fd4" },
              { num: "3", label: "Duration", q: "Which past predicts the future?", color: "#d4a76a" },
            ].map(d => (
              <div key={d.label} style={{ background: "rgba(245,240,232,0.06)", borderRadius: 8, padding: "16px 16px", border: "1px solid rgba(245,240,232,0.1)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f0e8", marginBottom: 4 }}>{d.num}. {d.label}</div>
                <div style={{ fontSize: 12, color: "#998d7e" }}>{d.q}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companion links */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 32px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <a href="https://bayesian-mv.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s", height: "100%" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.violet}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ fontSize: 10, color: C.violet, fontWeight: 600, letterSpacing: 2, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>Part 3 · Companion</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>Bayesian M&V Module</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>Same data, same models, different inference — posterior distributions instead of point estimates</div>
            </div>
          </a>
          <a href="https://mv-course.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s", height: "100%" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.amber}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ fontSize: 10, color: C.amber, fontWeight: 600, letterSpacing: 2, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>Reference</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>IPMVP Translation Guide</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>How Options A–D map to Boundary × Model Form × Duration</div>
            </div>
          </a>
          <a href="https://mv-classmap.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s", height: "100%" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ fontSize: 10, color: C.green, fontWeight: 600, letterSpacing: 2, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>Progress Tracker</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>Learning Path</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>Track your progress across all modules — six phases, twenty-two steps</div>
            </div>
          </a>
          <a href="https://cmvp-capstone.vercel.app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s", height: "100%" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.rose}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ fontSize: 10, color: C.rose, fontWeight: 600, letterSpacing: 2, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>Capstone</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>CMVP Capstone</div>
              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 4 }}>Full M&V plan exercise with EnergyPlus simulation data — 62,000 sq ft government facility</div>
            </div>
          </a>
        </div>
      </div>

      {/* Author */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 32px 48px" }}>
        <a href="https://counterfactual-designs.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <div style={{ background: "linear-gradient(135deg, #2c2418 0%, #3d3529 100%)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.teal}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#d4a76a", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>From the Author</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f5f0e8", marginBottom: 4 }}>counterfactual-designs.com</div>
              <div style={{ fontSize: 12, color: "#c4b8a8", lineHeight: 1.5 }}>Steve Kromer's practice — consulting, training, and publications.</div>
            </div>
            <div style={{ fontSize: 24, color: "#d4a76a", marginLeft: 24, flexShrink: 0 }}>→</div>
          </div>
        </a>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: C.textDim }}>
          © 2025 Steve Kromer · SKEE · Based on <em>The Role of the M&V Professional</em> (River Publishers, 2024)
        </div>
      </div>
    </div>
  );
}

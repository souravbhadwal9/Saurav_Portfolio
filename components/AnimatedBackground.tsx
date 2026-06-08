"use client";

import { useRef, useState, useEffect } from "react";
import { useAnimationFrame, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

/* ── Globe geometry ────────────────────────────────── */
const R = 255, CX = 300, CY = 300, N_LON = 18;
const LAT = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
const ORBIT_RX = 322, ORBIT_RY = 145, ORBIT_TILT = -26;

/* ── RS/GIS data palettes ──────────────────────────── */
const NDVI_STOPS = [
  "#7b3300","#c0392b","#e67e22","#f1c40f",
  "#a8e6a3","#27ae60","#1a6b35","#0d3d1e",
];

const BANDS = [
  { n: "B",    wl: "490nm",  c: "#3b82f6" },
  { n: "G",    wl: "560nm",  c: "#22c55e" },
  { n: "R",    wl: "665nm",  c: "#ef4444" },
  { n: "NIR",  wl: "842nm",  c: "#a855f7" },
  { n: "SWIR", wl: "1610nm", c: "#f97316" },
];

const LULC = [
  { label: "Vegetation", c: "#27ae60" },
  { label: "Water",      c: "#1976d2" },
  { label: "Urban",      c: "#e53935" },
  { label: "Soil",       c: "#795548" },
  { label: "Bare",       c: "#fbc02d" },
];

const PIXELS = [
  1,1,1,0,0,0,0,0,
  1,1,0,0,0,0,0,0,
  0,0,0,0,0,0,3,3,
  0,0,0,0,3,3,3,3,
  0,0,0,2,2,3,3,3,
  0,0,2,2,2,2,3,4,
  2,2,2,2,4,4,4,4,
  2,2,4,4,4,4,4,4,
].map(i => LULC[i].c);

const SPEC_PTS = [
  [0,38],[12,34],[24,28],[36,32],[48,26],[60,10],[72,8],[84,4],
  [96,2],[108,4],[120,30],[132,40],[144,42],[156,38],[168,36],
];

const specPath = (pts: number[][], w: number, h: number) =>
  pts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${(x / 168) * w},${h - (y / 44) * h}`
  ).join(" ");

/* ── Theme colour tokens ───────────────────────────── */
function useColors(isLight: boolean) {
  return {
    oceanFill:    isLight ? "rgba(195,228,255,0.55)" : "rgba(4,12,28,0.80)",
    atmoStart:    isLight ? "rgba(100,180,255,0.18)" : "rgba(16,185,129,0.12)",
    atmoMid:      isLight ? "rgba(240,247,255,0.55)" : "rgba(10,15,30,0.55)",
    atmoEnd:      isLight ? "rgba(240,247,255,0.85)" : "rgba(10,15,30,0.85)",
    lonFront:     isLight ? "rgba(16,185,129,0.35)"  : "rgba(16,185,129,0.22)",
    lonBack:      isLight ? "rgba(16,185,129,0.12)"  : "rgba(16,185,129,0.06)",
    latLine:      isLight ? "rgba(16,185,129,0.28)"  : "rgba(16,185,129,0.18)",
    equator:      isLight ? "rgba(16,185,129,0.65)"  : "rgba(16,185,129,0.45)",
    border:       isLight ? "rgba(16,185,129,0.65)"  : "rgba(16,185,129,0.45)",
    halo:         isLight ? "rgba(100,200,255,0.08)" : "rgba(16,185,129,0.07)",
    rim:          isLight ? "rgba(16,185,129,0.28)"  : "rgba(16,185,129,0.18)",
    specular:     isLight ? "rgba(255,255,255,0.30)" : "rgba(16,185,129,0.06)",
    orbit:        isLight ? "rgba(16,185,129,0.20)"  : "rgba(16,185,129,0.14)",
    radar:        isLight ? "rgba(16,185,129,0.12)"  : "rgba(16,185,129,0.07)",
    radarLine:    isLight ? "rgba(16,185,129,0.55)"  : "rgba(16,185,129,0.40)",
    label:        isLight ? "rgba(16,185,129,0.60)"  : "rgba(16,185,129,0.35)",
    satBody:      isLight ? "rgba(16,185,129,1)"     : "rgba(16,185,129,1)",
    satSignal:    isLight ? "rgba(16,185,129,0.30)"  : "rgba(16,185,129,0.20)",
    grid:         isLight ? "rgba(16,185,129,0.055)" : "rgba(16,185,129,0.025)",
    scanLine:     isLight
      ? "linear-gradient(90deg,transparent,rgba(16,185,129,0.25),transparent)"
      : "linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)",
    panelBg:      isLight ? "rgba(255,255,255,0.72)" : "rgba(4,12,28,0.55)",
    panelBorder:  isLight ? "rgba(16,185,129,0.25)"  : "rgba(16,185,129,0.15)",
    panelText:    isLight ? "rgba(16,100,60,0.85)"   : "rgba(16,185,129,0.70)",
    panelSub:     isLight ? "rgba(30,41,59,0.55)"    : "rgba(100,116,139,0.65)",
    cursorGlow:   isLight
      ? "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(100,200,255,0.08) 40%, transparent 70%)"
      : "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 45%, transparent 70%)",
  };
}

/* ── Globe SVG ─────────────────────────────────────── */
function GlobeScene({ deg, c }: { deg: number; c: ReturnType<typeof useColors> }) {
  const lonLines = Array.from({ length: N_LON }, (_, i) => {
    const phi = ((i * (360 / N_LON) + deg) % 360) * (Math.PI / 180);
    const cos = Math.cos(phi);
    return { rx: Math.abs(R * cos), front: cos >= 0 };
  });

  const satRad  = ((deg * 3.8) % 360) * (Math.PI / 180);
  const tiltR   = ORBIT_TILT * (Math.PI / 180);
  const satX    = CX + ORBIT_RX * Math.cos(satRad);
  const satY    = CY + ORBIT_RY * Math.sin(satRad) * Math.cos(tiltR);
  const satFront = ORBIT_RY * Math.sin(satRad) * Math.sin(tiltR) >= 0;
  const sweep   = (deg * 2.2) % 360;

  return (
    <svg viewBox="0 0 600 600" width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="gc"><circle cx={CX} cy={CY} r={R} /></clipPath>
        <radialGradient id="atmo" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor={c.atmoStart} />
          <stop offset="55%"  stopColor={c.atmoMid} />
          <stop offset="100%" stopColor={c.atmoEnd} />
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="satglow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Orbit path */}
      <ellipse cx={CX} cy={CY} rx={ORBIT_RX} ry={ORBIT_RY}
        fill="none" stroke={c.orbit} strokeWidth="1" strokeDasharray="5 8"
        transform={`rotate(${ORBIT_TILT} ${CX} ${CY})`} />

      {/* Atmosphere halo */}
      <circle cx={CX} cy={CY} r={R + 40}
        fill="none" stroke={c.halo} strokeWidth="44" filter="url(#glow)" />
      <circle cx={CX} cy={CY} r={R + 7}
        fill="none" stroke={c.rim} strokeWidth="1.5" />

      {/* Ocean base */}
      <circle cx={CX} cy={CY} r={R} fill={c.oceanFill} />

      {/* Globe grid + radar */}
      <g clipPath="url(#gc)">
        {lonLines.filter(l => !l.front).map((l, i) => (
          <ellipse key={i} cx={CX} cy={CY} rx={l.rx} ry={R}
            fill="none" stroke={c.lonBack} strokeWidth="0.6" />
        ))}
        {LAT.map((lat, i) => {
          const lr = lat * (Math.PI / 180);
          const y  = CY - R * Math.sin(lr);
          const rx = R * Math.cos(Math.abs(lr));
          return (
            <ellipse key={i} cx={CX} cy={y} rx={rx} ry={rx * 0.055}
              fill="none"
              stroke={lat === 0 ? c.equator : c.latLine}
              strokeWidth={lat === 0 ? "1.2" : "0.65"} />
          );
        })}
        {lonLines.filter(l => l.front).map((l, i) => (
          <ellipse key={i} cx={CX} cy={CY} rx={l.rx} ry={R}
            fill="none" stroke={c.lonFront} strokeWidth="0.8" />
        ))}

        {/* Radar sweep (SAR scanner) */}
        <g transform={`rotate(${sweep} ${CX} ${CY})`}>
          <path
            d={`M${CX},${CY} L${CX + R},${CY} A${R},${R} 0 0,0
               ${CX + R * Math.cos(-35 * Math.PI / 180)},${CY + R * Math.sin(-35 * Math.PI / 180)} Z`}
            fill={c.radar} />
          <line x1={CX} y1={CY} x2={CX + R} y2={CY}
            stroke={c.radarLine} strokeWidth="1.4" />
        </g>

        {/* Atmosphere overlay */}
        <circle cx={CX} cy={CY} r={R} fill="url(#atmo)" />
        <ellipse cx={CX - 80} cy={CY - 90} rx="90" ry="60"
          fill={c.specular} filter="url(#sglow)" />
      </g>

      {/* Globe border */}
      <circle cx={CX} cy={CY} r={R}
        fill="none" stroke={c.border} strokeWidth="1.4" filter="url(#sglow)" />
      <text x={CX + R + 10} y={CY + 4}
        fill={c.label} fontSize="10" fontFamily="monospace">0°</text>

      {/* Satellite — front */}
      {satFront && (
        <g filter="url(#satglow)">
          <line x1={satX} y1={satY} x2={CX + 10} y2={CY - 70}
            stroke={c.satSignal} strokeWidth="0.9" strokeDasharray="4 5" />
          <rect x={satX - 8} y={satY - 4} width="16" height="8" rx="2"
            fill={c.satBody} />
          <rect x={satX - 20} y={satY - 2.5} width="10" height="5" rx="1"
            fill="rgba(99,179,237,0.9)" />
          <rect x={satX + 10} y={satY - 2.5} width="10" height="5" rx="1"
            fill="rgba(99,179,237,0.9)" />
          <circle cx={satX} cy={satY} r="3.5" fill="rgba(16,185,129,0.65)" />
        </g>
      )}
      {!satFront && (
        <circle cx={satX} cy={satY} r="2.5" fill="rgba(16,185,129,0.22)" />
      )}
      {satFront && (
        <text x={satX + 16} y={satY - 7}
          fill={c.label} fontSize="8" fontFamily="monospace">SAR-SAT</text>
      )}
    </svg>
  );
}

/* ── Panel wrapper (theme-aware glass) ─────────────── */
function Panel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
    <div
      className={`hidden xl:block ${className}`}
      style={{
        background: isLight ? "rgba(255,255,255,0.78)" : "rgba(4,12,28,0.55)",
        border: `1px solid ${isLight ? "rgba(16,185,129,0.28)" : "rgba(16,185,129,0.15)"}`,
        borderRadius: 12,
        padding: "10px 12px",
        backdropFilter: "blur(8px)",
        boxShadow: isLight
          ? "0 4px 20px rgba(0,0,0,0.08)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Corner panels ─────────────────────────────────── */
function NdviBar() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textC = isLight ? "rgba(15,80,50,0.85)" : "rgba(16,185,129,0.70)";
  const subC  = isLight ? "rgba(30,41,59,0.55)"  : "rgba(100,116,139,0.60)";

  return (
    <Panel className="absolute top-28 left-5" style={{ opacity: 0.9 } as React.CSSProperties}>
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
        NDVI Index
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 14, height: 108 }}>
          {NDVI_STOPS.map((c, i) => (
            <div key={i} style={{ background: c, flex: 1 }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: 108, fontSize: 7, fontFamily: "monospace", color: subC }}>
          <span>+1.0</span><span>+0.5</span><span>0.0</span><span>-0.5</span><span>-1.0</span>
        </div>
      </div>
      <div style={{ color: subC, fontSize: 7, fontFamily: "monospace", marginTop: 5 }}>Vegetation Index</div>
    </Panel>
  );
}

function LulcLegend() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textC = isLight ? "rgba(15,80,50,0.85)" : "rgba(16,185,129,0.70)";
  const subC  = isLight ? "rgba(30,41,59,0.60)"  : "rgba(100,116,139,0.60)";

  return (
    <Panel className="absolute bottom-28 left-5">
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
        LULC Class.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {LULC.map(({ label, c }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 10, height: 10, background: c, flexShrink: 0, borderRadius: 2 }} />
            <span style={{ fontSize: 8, fontFamily: "monospace", color: subC }}>{label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SpectralBands() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textC = isLight ? "rgba(15,80,50,0.85)" : "rgba(16,185,129,0.70)";
  const subC  = isLight ? "rgba(30,41,59,0.50)"  : "rgba(100,116,139,0.55)";

  return (
    <Panel className="absolute top-28 right-5">
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, textAlign: "right" }}>
        Spectral Bands
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {BANDS.map(({ n, wl, c }) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
            <span style={{ fontSize: 7, fontFamily: "monospace", color: subC }}>{wl}</span>
            <div style={{ width: 34, height: 7, background: c, opacity: 0.8, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 700, width: 28, textAlign: "right", color: c }}>{n}</span>
          </div>
        ))}
      </div>
      <div style={{ color: subC, fontSize: 6, fontFamily: "monospace", marginTop: 6, textAlign: "right", letterSpacing: "0.1em" }}>← EM SPECTRUM →</div>
    </Panel>
  );
}

function SpectralCurve() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textC   = isLight ? "rgba(15,80,50,0.85)"  : "rgba(16,185,129,0.70)";
  const axisC   = isLight ? "rgba(0,80,40,0.25)"   : "rgba(16,185,129,0.22)";
  const labelC  = isLight ? "rgba(0,80,40,0.40)"   : "rgba(16,185,129,0.38)";

  const W = 130, H = 48;
  return (
    <Panel className="absolute bottom-52 right-5">
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, textAlign: "right" }}>
        Spectral Reflectance
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1="0" y1={H} x2={W} y2={H} stroke={axisC} strokeWidth="0.8" />
        <line x1="0" y1="0" x2="0" y2={H} stroke={axisC} strokeWidth="0.8" />
        <path d={specPath(SPEC_PTS, W, H)}
          fill="none" stroke="rgba(34,197,94,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
        {BANDS.map(({ n, c }, i) => {
          const x = [0, 22, 43, 65, 100][i];
          return (
            <g key={n}>
              <line x1={x} y1={0} x2={x} y2={H} stroke={c} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 3" />
              <text x={x + 2} y="10" fill={c} fontSize="6" fontFamily="monospace" fillOpacity="0.9">{n}</text>
            </g>
          );
        })}
        <text x="2" y={H - 2} fill={labelC} fontSize="6" fontFamily="monospace">400nm</text>
        <text x={W - 30} y={H - 2} fill={labelC} fontSize="6" fontFamily="monospace">2500nm</text>
      </svg>
    </Panel>
  );
}

function PixelClassifier() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const textC = isLight ? "rgba(15,80,50,0.85)" : "rgba(16,185,129,0.70)";

  return (
    <Panel className="absolute bottom-28 right-5">
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, textAlign: "right" }}>
        Image Classification
      </div>
      <div style={{ position: "relative", overflow: "hidden", width: 88, height: 88 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 1 }}>
          {PIXELS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, background: c }} />
          ))}
        </div>
        <motion.div
          style={{
            position: "absolute", left: 0, right: 0,
            height: 2, background: "rgba(16,185,129,0.5)",
            mixBlendMode: "screen",
          }}
          animate={{ top: [0, 86, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </Panel>
  );
}

/* ── Scan line ─────────────────────────────────────── */
function ScanLine({ scanLine }: { scanLine: string }) {
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ height: 1, background: scanLine }}
      animate={{ top: ["8%", "92%"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ── Cursor glow (interactive) ─────────────────────── */
function CursorGlow({ cursorGlow }: { cursorGlow: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fn = (e: MouseEvent) => setPos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-700"
      style={{
        backgroundImage: cursorGlow,
        backgroundSize: "600px 600px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${pos.x}% ${pos.y}%`,
      }}
    />
  );
}

/* ── Subtle coordinate grid ─────────────────────────── */
function CoordGrid({ grid }: { grid: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 1 }}>
      <defs>
        <pattern id="cgrid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke={grid} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cgrid)" />
    </svg>
  );
}

/* ── Root export ────────────────────────────────────── */
export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const c = useColors(isLight);

  const [mounted, setMounted] = useState(false);
  const [deg, setDeg] = useState(0);
  const t0 = useRef(Date.now());

  useEffect(() => { setMounted(true); }, []);

  useAnimationFrame(() => {
    if (!mounted) return;
    const elapsed = (Date.now() - t0.current) / 1000;
    setDeg((elapsed * 3.6) % 360);
  });

  if (!mounted) return <div className="fixed inset-0 z-0 pointer-events-none" />;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
      {/* Coordinate grid */}
      <CoordGrid grid={c.grid} />

      {/* Interactive cursor glow */}
      <CursorGlow cursorGlow={c.cursorGlow} />

      {/* Globe + satellite + radar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ width: "min(68vw, 68vh)", height: "min(68vw, 68vh)", opacity: isLight ? 0.70 : 0.55 }}>
          <GlobeScene deg={deg} c={c} />
        </div>
      </div>

      {/* Satellite scan line */}
      <ScanLine scanLine={c.scanLine} />

      {/* GIS data panels — corners */}
      <NdviBar />
      <LulcLegend />
      <SpectralBands />
      <SpectralCurve />
      <PixelClassifier />
    </div>
  );
}

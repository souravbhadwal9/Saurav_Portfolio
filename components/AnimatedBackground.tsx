"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import createGlobe, { Globe } from "cobe";

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

const SPEC_PTS = [
  [0,38],[12,34],[24,28],[36,32],[48,26],[60,10],[72,8],[84,4],
  [96,2],[108,4],[120,30],[132,40],[144,42],[156,38],[168,36],
];

const specPath = (pts: number[][], w: number, h: number) =>
  pts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${(x / 168) * w},${h - (y / 44) * h}`
  ).join(" ");

/* ── Scan line ─────────────────────────────────────── */
function ScanLine({ isLight }: { isLight: boolean }) {
  const scanLine = isLight
    ? "linear-gradient(90deg,transparent,rgba(16,185,129,0.25),transparent)"
    : "linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)";
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ height: 1, background: scanLine }}
      animate={{ top: ["8%", "92%"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ── Cursor glow ───────────────────────────────────── */
function CursorGlow({ isLight }: { isLight: boolean }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const cursorGlow = isLight
    ? "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(100,200,255,0.08) 40%, transparent 70%)"
    : "radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 45%, transparent 70%)";

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

/* ── Coordinate grid ───────────────────────────────── */
function CoordGrid({ isLight }: { isLight: boolean }) {
  const grid = isLight ? "rgba(16,185,129,0.055)" : "rgba(16,185,129,0.025)";
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

/* ── Panel wrapper ─────────────────────────────────── */
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
        boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.08)" : "0 4px 20px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Side panels ───────────────────────────────────── */
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
          {NDVI_STOPS.map((c, i) => <div key={i} style={{ background: c, flex: 1 }} />)}
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
  const textC  = isLight ? "rgba(15,80,50,0.85)"  : "rgba(16,185,129,0.70)";
  const axisC  = isLight ? "rgba(0,80,40,0.25)"   : "rgba(16,185,129,0.22)";
  const labelC = isLight ? "rgba(0,80,40,0.40)"   : "rgba(16,185,129,0.38)";
  const W = 130, H = 48;
  return (
    <Panel className="absolute bottom-28 right-5">
      <div style={{ color: textC, fontSize: 8, fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, textAlign: "right" }}>
        Spectral Reflectance
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1="0" y1={H} x2={W} y2={H} stroke={axisC} strokeWidth="0.8" />
        <line x1="0" y1="0" x2="0" y2={H} stroke={axisC} strokeWidth="0.8" />
        <path d={specPath(SPEC_PTS, W, H)} fill="none" stroke="rgba(34,197,94,0.75)" strokeWidth="1.5" strokeLinejoin="round" />
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

/* ── Real 3D Globe (cobe v2) ───────────────────────── */
function Globe3D({ isLight }: { isLight: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const rafRef   = useRef<number>(0);
  const phiRef   = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    globeRef.current?.destroy();
    cancelAnimationFrame(rafRef.current);

    const SIZE = 700;
    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: SIZE * 2,
      height: SIZE * 2,
      phi: phiRef.current,
      theta: 0.28,
      dark: isLight ? 0.1 : 1,
      diffuse: isLight ? 1.4 : 1.1,
      mapSamples: 20000,
      mapBrightness: isLight ? 3.5 : 5,
      baseColor: isLight ? [0.78, 0.91, 0.98] : [0.03, 0.06, 0.14],
      markerColor: [0.05, 0.65, 0.45],
      glowColor: isLight ? [0.45, 0.85, 0.72] : [0.04, 0.55, 0.38],
      markers: [],
    });

    const animate = () => {
      phiRef.current += 0.0032;
      globeRef.current?.update({ phi: phiRef.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      globeRef.current?.destroy();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 700, height: 700, opacity: isLight ? 0.55 : 0.42 }}
    />
  );
}

/* ── Root export ────────────────────────────────────── */
export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="fixed inset-0 z-0 pointer-events-none" />;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
      <CoordGrid isLight={isLight} />
      <CursorGlow isLight={isLight} />

      {/* Real 3D Globe with continents */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ width: "min(68vw, 68vh)", height: "min(68vw, 68vh)" }}>
          <Globe3D isLight={isLight} />
        </div>
      </div>

      <ScanLine isLight={isLight} />

      {/* GIS data panels */}
      <NdviBar />
      <LulcLegend />
      <SpectralBands />
      <SpectralCurve />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Globe, Code2, BarChart3 } from "lucide-react";
import { skills } from "@/data/portfolio";

const ACCENT = {
  emerald: {
    topBar: "from-emerald-400 via-teal-400 to-transparent",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  teal: {
    topBar: "from-teal-400 via-cyan-400 to-transparent",
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
    badge: "bg-teal-500/15 text-teal-400 border border-teal-500/25",
    dot: "bg-teal-400",
  },
  indigo: {
    topBar: "from-indigo-400 via-violet-400 to-transparent",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    badge: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25",
    dot: "bg-indigo-400",
  },
};

function CardHeader({ icon: Icon, title, subtitle, badge, accent }: {
  icon: React.ElementType; title: string; subtitle: string; badge: number; accent: keyof typeof ACCENT;
}) {
  const a = ACCENT[accent];
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${a.iconBg} flex items-center justify-center`}>
          <Icon size={18} className={a.iconColor} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${a.badge}`}>{badge}</span>
    </div>
  );
}

function Chip({ name, dot, delay }: { name: string; dot: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.22, delay }}
      className="skill-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium
        bg-white/[0.05] border border-white/[0.10] text-slate-300 rounded-full cursor-default
        transition-all duration-200 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300"
    >
      <span className={`skill-chip-dot w-1 h-1 rounded-full ${dot}`} />
      {name}
    </motion.span>
  );
}

export default function Skills() {
  const a = ACCENT;
  return (
    <section id="skills" className="section-pad section-alt relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Toolset</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="divider-line" />
        </motion.div>

        <div className="space-y-6">
          {/* Row 1 — Geospatial + Programming side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Geospatial */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="skill-card relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
            >
              <div className={`h-[3px] w-full bg-gradient-to-r ${a.emerald.topBar} opacity-80`} />
              <div className="p-6">
                <CardHeader icon={Globe} title="Geospatial & Remote Sensing" subtitle="Software & Platforms" badge={skills.geospatial.length} accent="emerald" />
                <div className="skill-divider h-px bg-white/[0.07] mb-4" />
                <div className="flex flex-wrap gap-2">
                  {skills.geospatial.map((s, i) => (
                    <Chip key={s.name} name={s.name} dot={a.emerald.dot} delay={i * 0.04} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Programming */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="skill-card relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
            >
              <div className={`h-[3px] w-full bg-gradient-to-r ${a.teal.topBar} opacity-80`} />
              <div className="p-6">
                <CardHeader icon={Code2} title="Programming & Tools" subtitle="Languages & Frameworks" badge={skills.programming.length} accent="teal" />
                <div className="skill-divider h-px bg-white/[0.07] mb-4" />
                <div className="flex flex-wrap gap-2 mb-5">
                  {skills.programming.map((s, i) => (
                    <Chip key={s.name} name={s.name} dot={a.teal.dot} delay={i * 0.04} />
                  ))}
                </div>
                {/* Applications sub-section */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest mb-3">Applications</p>
                  <div className="flex flex-wrap gap-2">
                    {["Data Analysis", "ML Modelling", "Geo-processing", "Visualization", "Statistical Analysis"].map((t, i) => (
                      <Chip key={t} name={t} dot={a.teal.dot} delay={0.1 + i * 0.04} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2 — Methods & Analytics full width */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="skill-card relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            <div className={`h-[3px] w-full bg-gradient-to-r ${a.indigo.topBar} opacity-80`} />
            <div className="p-6">
              <CardHeader icon={BarChart3} title="Methods & Analytics" subtitle="Techniques & Approaches" badge={skills.analytics.length} accent="indigo" />
              <div className="skill-divider h-px bg-white/[0.07] mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {skills.analytics.map((tag, i) => (
                  <Chip key={tag} name={tag} dot={a.indigo.dot} delay={i * 0.03} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key tools strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="skill-strip rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
          >
            <p className="skill-strip-label text-[10px] text-slate-600 font-semibold uppercase tracking-[0.2em] text-center mb-4">
              Key Tools at a Glance
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["ArcGIS", "ERDAS IMAGINE", "QGIS", "Google Earth Engine", "Python", "R Language", "IBM SPSS", "Fuzzy-AHP", "Random Forest"].map((tool) => (
                <span
                  key={tool}
                  className="skill-strip-pill flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                    bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px] font-medium
                    hover:border-emerald-500/30 hover:text-emerald-400 transition-all cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

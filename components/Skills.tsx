"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <span className="text-xs text-emerald-400 font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="skill-bar h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.07 + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function TagChip({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10
        rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/25 hover:text-emerald-400 transition-all cursor-default"
    >
      {name}
    </motion.span>
  );
}

export default function Skills() {
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Geospatial software */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-xl">
                🛰️
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Geospatial & RS</h3>
                <p className="text-xs text-slate-500">Software & Platforms</p>
              </div>
            </div>
            <div className="space-y-4">
              {skills.geospatial.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Programming */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center text-xl">
                💻
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Programming</h3>
                <p className="text-xs text-slate-500">Languages & Frameworks</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {skills.programming.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
              ))}
            </div>

            {/* Language proficiency chips */}
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wide">
                Applications
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Data Analysis",
                  "ML Modelling",
                  "Visualization",
                  "Statistical Analysis",
                  "Geo-processing",
                ].map((t, i) => (
                  <TagChip key={t} name={t} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Analytics & Methods */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-xl">
                📊
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Methods & Analytics</h3>
                <p className="text-xs text-slate-500">Techniques & Approaches</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.analytics.map((tag, i) => (
                <TagChip key={tag} name={tag} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Software gallery strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            "ArcGIS", "ERDAS IMAGINE", "QGIS", "Google Earth Engine",
            "Python", "R Language", "IBM SPSS", "Fuzzy-AHP", "Random Forest",
          ].map((tool) => (
            <div
              key={tool}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10
                text-slate-300 text-xs font-medium hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {tool}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

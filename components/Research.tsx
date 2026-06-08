"use client";

import { motion } from "framer-motion";
import { researchAreas } from "@/data/portfolio";

export default function Research() {
  return (
    <section id="research" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/10 via-transparent to-teal-950/10 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">Research Areas</h2>
          <div className="divider-line" />
          <p className="text-slate-400 text-sm max-w-2xl -mt-4 mb-10">
            Integrating geospatial technologies with environmental science to address urban sustainability challenges
            across multiple domains.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {researchAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="glass-card p-6 group cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10
                border border-emerald-500/20 flex items-center justify-center text-2xl mb-4
                group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                {area.icon}
              </div>

              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {area.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{area.description}</p>

              {/* Hover line */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom call-out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center"
        >
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl mx-auto">
            <span className="text-emerald-400 font-semibold">Core methodology</span>: Combining ArcGIS, Google Earth Engine,
            Python, and R with machine learning frameworks (Random Forest, GBM, Fuzzy-AHP, SHAP/XAI) to deliver
            reproducible, high-impact geospatial research.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

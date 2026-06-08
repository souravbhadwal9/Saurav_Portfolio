"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, FileText } from "lucide-react";
import { experience } from "@/data/portfolio";

const COLOR_MAP: Record<string, string> = {
  emerald: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  teal: "from-teal-500/20 to-emerald-500/10 border-teal-500/30",
  indigo: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
};

const DOT_MAP: Record<string, string> = {
  emerald: "bg-emerald-400 shadow-emerald-500/50",
  teal: "bg-teal-400 shadow-teal-500/50",
  indigo: "bg-indigo-400 shadow-indigo-500/50",
};

const TEXT_MAP: Record<string, string> = {
  emerald: "text-emerald-400",
  teal: "text-teal-400",
  indigo: "text-indigo-400",
};

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-slate-950/30 to-[#0a0f1e] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Work History</span>
          <h2 className="section-title">Working Experience</h2>
          <div className="divider-line" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-[1px] bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-indigo-500/20" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-6 md:gap-10"
              >
                {/* Dot */}
                <div className="flex-shrink-0 relative mt-5">
                  <div
                    className={`w-4 h-4 rounded-full shadow-lg ${DOT_MAP[exp.color]} relative z-10`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`flex-1 glass-card p-6 bg-gradient-to-br ${COLOR_MAP[exp.color]} mb-2`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}
                      >
                        <Briefcase size={15} className={TEXT_MAP[exp.color]} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{exp.role}</h3>
                        {exp.period && (
                          <span className={`text-xs font-medium ${TEXT_MAP[exp.color]}`}>
                            {exp.period}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-500 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
                      {exp.fundedBy.split(" ").slice(0, 3).join(" ")}…
                    </span>
                  </div>

                  <h4 className="text-sm text-slate-200 font-medium leading-snug mb-3 italic">
                    &quot;{exp.project}&quot;
                  </h4>

                  <div className="flex items-start gap-2 mb-2">
                    <Building2 size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-400 leading-relaxed">{exp.organization}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <FileText size={12} className="text-slate-600" />
                      <span>{exp.fileNo}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-medium ${TEXT_MAP[exp.color]}`}>{exp.fundedBy}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

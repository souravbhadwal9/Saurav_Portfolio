"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Building2, CheckCircle } from "lucide-react";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="section-pad section-alt relative">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <div className="divider-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-transparent" />

          <div className="space-y-8 md:space-y-0">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                  className={`relative md:flex md:items-center md:mb-12 ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`glass-card p-6 w-full md:w-[calc(50%-2.5rem)] ${
                      isLeft ? "md:mr-10" : "md:ml-10"
                    }`}
                  >
                    {/* Year badge */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <Calendar size={12} />
                        {edu.year}
                      </span>
                      <span className="text-2xl">{edu.icon}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{edu.degree}</h3>

                    <div className="flex items-start gap-1.5 mb-3">
                      <Building2 size={13} className="text-slate-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400">{edu.institution}</p>
                    </div>

                    {edu.details && edu.details !== "Pursuing" && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          <span className="text-emerald-400 font-semibold not-italic">Thesis: </span>
                          {edu.details}
                        </p>
                      </div>
                    )}

                    {edu.details === "Pursuing" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        Pursuing
                      </span>
                    )}

                    {edu.grade && (
                      <div className="flex items-center gap-1.5 mt-3">
                        <CheckCircle size={13} className="text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">{edu.grade}</span>
                      </div>
                    )}
                  </div>

                  {/* Timeline dot — only on md+ */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0d1220] border-2 border-emerald-400 items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
                    <GraduationCap size={16} className="text-emerald-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Target, BookOpen, Award, Mail, Phone, MapPin } from "lucide-react";
import { personalInfo, academicAchievements, strengths } from "@/data/portfolio";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

const DOMAIN_TAGS = [
  "Urban Green Spaces",
  "Green Infrastructure",
  "Carbon Sequestration",
  "Urban Heat Islands",
  "LULC Dynamics",
  "Climate Change Adaptation",
  "Ecosystem Services",
  "Environmental Monitoring",
];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-emerald-950/10 to-[#0a0f1e] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div {...inView(0)}>
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="divider-line" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 xl:gap-8">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Objective */}
            <motion.div {...inView(0.08)} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <Target size={20} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Objective</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{personalInfo.objective}</p>
            </motion.div>

            {/* Research Domain */}
            <motion.div {...inView(0.14)} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Research Domain</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{personalInfo.researchDomain}</p>
              <div className="flex flex-wrap gap-2">
                {DOMAIN_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Academic Achievements */}
            <motion.div {...inView(0.2)} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                  <Award size={20} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Academic Achievements</h3>
              </div>
              <ul className="space-y-3">
                {academicAchievements.map((ach, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="text-emerald-400 mt-1 flex-shrink-0 font-bold">→</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Sidebar ── */}
          <div className="flex flex-col gap-6">
            {/* Contact */}
            <motion.div {...inView(0.1)} className="glass-card p-6">
              <h3 className="text-base font-semibold text-white mb-5">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", content: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: Phone, label: "Phone", content: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: MapPin, label: "Current Address", content: personalInfo.currentAddress, href: null },
                  { icon: MapPin, label: "Permanent Address", content: personalInfo.permanentAddress, href: null },
                ].map(({ icon: Icon, label, content, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-600 font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors break-all">
                          {content}
                        </a>
                      ) : (
                        <p className="text-xs text-slate-300 leading-relaxed">{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <motion.div {...inView(0.18)} className="glass-card p-6">
              <h3 className="text-base font-semibold text-white mb-4">Strengths</h3>
              <div className="space-y-2.5">
                {strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Content Writing card */}
            <motion.div {...inView(0.25)} className="glass-card p-6 border-l-2 border-l-indigo-500/50">
              <h3 className="text-base font-semibold text-white mb-2">Content Writing</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Authored 3 course units for M.Sc. Geo-informatics Programme at{" "}
                <span className="text-indigo-400">Uttarakhand Open University, Haldwani</span>
              </p>
              <div className="space-y-1.5">
                {["Unit 4 — Data Manipulation", "Unit 6 — Raster Data Formats", "Unit 12 — Map Manipulation"].map((u) => (
                  <div key={u} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                    {u}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

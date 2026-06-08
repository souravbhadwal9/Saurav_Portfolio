"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Calendar, Award, Mic } from "lucide-react";
import { conferences } from "@/data/portfolio";

type Tab = "abroad" | "india";

interface ConferenceItem {
  title: string;
  event: string;
  location: string;
  date?: string;
  role?: string;
  award?: string;
  type?: string;
}

function ConfCard({ item, index }: { item: ConferenceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="glass-card p-5 hover:border-emerald-500/25 transition-all group"
    >
      <div className="flex gap-4">
        {/* Number */}
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center
          text-emerald-400 text-xs font-bold mt-0.5 group-hover:bg-emerald-500/20 transition-colors">
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-2">
            {item.award && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400
                bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full">
                <Award size={10} /> Best Paper Award
              </span>
            )}
            {item.role && (
              <span className="text-[10px] font-medium text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {item.role}
              </span>
            )}
            {item.type && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-400
                bg-teal-400/10 border border-teal-400/25 px-2 py-0.5 rounded-full">
                <Mic size={10} /> {item.type}
              </span>
            )}
          </div>

          <h4 className="text-sm font-semibold text-white leading-snug mb-2 italic group-hover:text-emerald-50">
            &quot;{item.title}&quot;
          </h4>

          <p className="text-xs text-emerald-400 font-medium mb-2 leading-snug">{item.event}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="flex-shrink-0" />
              <span>{item.location}</span>
            </div>
            {item.date && (
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="flex-shrink-0" />
                <span>{item.date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Conferences() {
  const [active, setActive] = useState<Tab>("abroad");

  return (
    <section id="conferences" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-950/15 via-transparent to-emerald-950/10 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Academic Engagement</span>
          <h2 className="section-title">Conferences & Presentations</h2>
          <div className="divider-line" />
        </motion.div>

        {/* Summary stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { icon: <Globe size={16} />, label: "International (Abroad)", count: conferences.abroad.length, color: "text-blue-400" },
            { icon: <MapPin size={16} />, label: "India Conferences", count: conferences.india.length, color: "text-emerald-400" },
            { icon: <Award size={16} />, label: "Awards Won", count: 1, color: "text-amber-400" },
          ].map(({ icon, label, count, color }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card">
              <span className={color}>{icon}</span>
              <div>
                <div className={`text-lg font-extrabold ${color}`}>{count}</div>
                <div className="text-[11px] text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "abroad" as Tab, label: "International (Abroad)", count: conferences.abroad.length },
            { id: "india" as Tab, label: "India Conferences", count: conferences.india.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === tab.id ? "tab-btn-active" : "tab-btn tab-btn-inactive"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
                active === tab.id ? "bg-white/25" : "bg-white/10 text-slate-400"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {(active === "abroad" ? conferences.abroad : conferences.india).map((item, i) => (
              <ConfCard key={i} item={item as ConferenceItem} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookMarked, FileCheck, BookOpen } from "lucide-react";
import { publications, type Publication } from "@/data/portfolio";

type Tab = "published" | "submitted" | "books";

function HighlightAuthor({ authors }: { authors: string }) {
  const parts = authors.split(/(Sourav Bhadwal)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p === "Sourav Bhadwal" ? (
          <strong key={i} className="text-emerald-400 font-semibold">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}

function IFBadge({ value }: { value: number }) {
  const cls =
    value >= 6
      ? "text-red-400 bg-red-400/10 border-red-400/25"
      : value >= 3
      ? "text-orange-400 bg-orange-400/10 border-orange-400/25"
      : "text-yellow-400 bg-yellow-400/10 border-yellow-400/25";
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${cls}`}>
      IF {value}
    </span>
  );
}

function JCRBadge({ jcr }: { jcr: string }) {
  const cls =
    jcr === "Q1"
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/25"
      : jcr === "Q2"
      ? "text-blue-400 bg-blue-400/10 border-blue-400/25"
      : "text-slate-400 bg-slate-400/10 border-slate-400/25";
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${cls}`}>
      JCR {jcr}
    </span>
  );
}

function PubCard({ pub, index, accent }: { pub: Publication; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={`glass-card p-5 hover:border-${accent}-500/30 transition-all group`}
    >
      <div className="flex gap-4">
        {/* Number */}
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-lg bg-${accent}-500/10 flex items-center justify-center text-${accent}-400 text-xs font-bold mt-0.5`}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-slate-100">
            {pub.title}
          </h4>

          <p className="text-slate-500 text-xs mb-3 leading-relaxed">
            <HighlightAuthor authors={pub.authors} /> ({pub.year})
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-${accent}-400 text-xs font-medium`}>{pub.journal}</span>
            {pub.volume && <span className="text-slate-600 text-xs">· {pub.volume}</span>}

            {pub.impactFactor !== undefined && pub.impactFactor > 0 && (
              <IFBadge value={pub.impactFactor} />
            )}
            {pub.jcr && <JCRBadge jcr={pub.jcr} />}

            {pub.status && (
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                  pub.status === "Submitted"
                    ? "text-blue-400 bg-blue-400/10 border-blue-400/25"
                    : "text-yellow-400 bg-yellow-400/10 border-yellow-400/25"
                }`}
              >
                {pub.status}
              </span>
            )}

            {pub.doi && (
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-emerald-400 transition-colors ml-auto"
              >
                <ExternalLink size={11} />
                DOI
              </a>
            )}

            {pub.isbn && (
              <span className="text-[10px] text-slate-600 ml-auto">ISBN: {pub.isbn}</span>
            )}
          </div>

          {pub.book && (
            <p className="text-xs text-purple-400 mt-2 italic">
              In: {pub.book} · {pub.publisher}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const TABS: { id: Tab; label: string; icon: React.ReactNode; count: number; color: string }[] = [
  { id: "published", label: "Published", icon: <FileCheck size={15} />, count: publications.published.length, color: "emerald" },
  { id: "submitted", label: "Under Review", icon: <BookMarked size={15} />, count: publications.submitted.length, color: "yellow" },
  { id: "books", label: "Book Chapters", icon: <BookOpen size={15} />, count: publications.bookChapters.length, color: "purple" },
];

export default function Publications() {
  const [active, setActive] = useState<Tab>("published");

  const activeData =
    active === "published"
      ? publications.published
      : active === "submitted"
      ? publications.submitted
      : publications.bookChapters;

  const color =
    active === "published" ? "emerald" : active === "submitted" ? "yellow" : "purple";

  return (
    <section id="publications" className="section-pad section-alt relative">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Research Output</span>
          <h2 className="section-title">Publications</h2>
          <div className="divider-line" />
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === tab.id ? "tab-btn-active" : "tab-btn tab-btn-inactive"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span
                className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
                  active === tab.id ? "bg-white/25 text-white" : "bg-white/10 text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Publication list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {activeData.map((pub, i) => (
              <PubCard key={i} pub={pub} index={i} accent={color} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Totals summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid sm:grid-cols-3 gap-4"
        >
          {[
            { label: "Scopus/WoS Indexed", value: publications.published.length, color: "emerald" },
            { label: "Papers Under Review", value: publications.submitted.length, color: "yellow" },
            { label: "Springer Book Chapters", value: publications.bookChapters.length, color: "purple" },
          ].map(({ label, value, color: c }) => (
            <div
              key={label}
              className={`text-center p-4 rounded-2xl border border-${c}-500/20 bg-${c}-500/5`}
            >
              <div className={`text-3xl font-extrabold text-${c}-400 mb-1`}>{value}</div>
              <div className="text-xs text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

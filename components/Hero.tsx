"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, ChevronDown, Star } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

const TAGS = ["GIS", "Remote Sensing", "Urban Green Space", "Python", "ArcGIS", "Machine Learning", "Google Earth Engine"];

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Subtle ambient glow orbs — let the globe show through */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Bottom fade to smooth into next section */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none z-[1]" />

      {/* ── Main content ── */}
      <div className="relative z-10 section-container pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left column */}
          <div>
            <motion.div {...fadeUp(0.05)} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide
                bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ph.D. Geography · Remote Sensing & GIS Expert
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.12)} className="text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-none mb-4">
              <span className="text-white">Dr. Sourav</span>
              <br />
              <span className="gradient-text">Bhadwal</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Geographer specializing in{" "}
              <span className="text-emerald-400 font-medium">urban sustainability</span> and ecosystem services.
              Leveraging advanced{" "}
              <span className="text-emerald-400 font-medium">Remote Sensing & GIS</span> to drive evidence-based
              environmental insights.
            </motion.p>

            <motion.div {...fadeUp(0.27)} className="flex flex-wrap gap-3 mb-8">
              <a href="#publications"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600
                  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 text-sm">
                <Star size={16} /> View Publications
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-emerald-500/40
                  text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 text-sm">
                Contact Me
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.33)} className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                <span>SLCR Lab, IIT-BHU, Varanasi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-500 flex-shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-emerald-400 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-teal-500 flex-shrink-0" />
                <a href={`mailto:${personalInfo.emailAlt}`} className="hover:text-teal-400 transition-colors">
                  {personalInfo.emailAlt}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right column — profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-indigo-500/20 blur-sm" />

            <div className="relative glass-card rounded-3xl p-8 glow-emerald">
              {/* Profile photo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.div
                    animate={{ boxShadow: ["0 0 20px rgba(16,185,129,0.3)", "0 0 45px rgba(16,185,129,0.65)", "0 0 20px rgba(16,185,129,0.3)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-36 h-36 rounded-2xl overflow-hidden ring-2 ring-emerald-500/50"
                  >
                    {!imgError ? (
                      <img
                        src="/1000045779.jpg"
                        alt="Dr. Sourav Bhadwal"
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700
                        flex items-center justify-center text-white text-4xl font-black">
                        SB
                      </div>
                    )}
                  </motion.div>
                  <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#0a0f1e]" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white">{personalInfo.name}</h2>
                <p className="text-emerald-400 text-sm font-medium mt-1">Geographer · Researcher</p>
                <p className="text-slate-500 text-xs mt-1">Central University of Haryana · IIT-BHU</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map((s, i) => (
                  <div key={i}
                    className="text-center p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-emerald-500/25 transition-colors">
                    <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tag cloud */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {TAGS.map((tag) => (
                  <span key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <a href="#about" className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-emerald-400 transition-colors">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown size={22} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

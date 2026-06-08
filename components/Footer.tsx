"use client";

import { ArrowUp, Mail, Phone } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const NAV_SECTIONS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#conferences", label: "Conferences" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#070c18] border-t border-white/[0.06]">
      {/* Top gradient fade */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="section-container py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-extrabold text-sm">
                SB
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-none">{personalInfo.name}</p>
                <p className="text-emerald-400 text-xs font-medium mt-0.5">Geographer & Remote Sensing Researcher</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              Advancing environmental science through geospatial technologies. Specializing in urban green spaces,
              carbon sequestration, and land-use dynamics.
            </p>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                <Mail size={13} />
                {personalInfo.email}
              </a>
              <a href={`mailto:${personalInfo.emailAlt}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-teal-400 transition-colors">
                <Mail size={13} />
                {personalInfo.emailAlt}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                <Phone size={13} />
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">More</h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.slice(5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Dr. Sourav Bhadwal. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03]
              text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all text-xs font-medium"
          >
            <ArrowUp size={14} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

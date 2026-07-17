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

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: personalInfo.social.linkedin,
    color: "hover:border-[#0077b5]/60 hover:bg-[#0077b5]/10 hover:text-[#0077b5]",
    iconColor: "#0077b5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "github",
    label: "GitHub",
    href: personalInfo.social.github,
    color: "hover:border-white/30 hover:bg-white/10 hover:text-white",
    iconColor: "#e2e8f0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    key: "googleScholar",
    label: "Google Scholar",
    href: personalInfo.social.googleScholar,
    color: "hover:border-[#4285f4]/60 hover:bg-[#4285f4]/10 hover:text-[#4285f4]",
    iconColor: "#4285f4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
      </svg>
    ),
  },
  {
    key: "researchGate",
    label: "ResearchGate",
    href: personalInfo.social.researchGate,
    color: "hover:border-[#00ccbb]/60 hover:bg-[#00ccbb]/10 hover:text-[#00ccbb]",
    iconColor: "#00ccbb",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.601 12.601 0 0 0-.39 1.648 21.40 21.40 0 0 0-.199 2.983c0 .778.072 1.5.215 2.165.143.664.384 1.24.721 1.727.337.487.797.87 1.378 1.148.581.279 1.293.418 2.136.418.943 0 1.737-.222 2.383-.665.647-.443 1.094-1.07 1.342-1.877.05-.153.073-.328.073-.524 0-.278-.067-.497-.2-.659-.134-.16-.33-.24-.59-.24-.327 0-.575.154-.741.463-.166.31-.336.69-.51 1.14-.173.45-.392.833-.655 1.149-.264.316-.62.474-1.068.474-.622 0-1.054-.282-1.295-.845-.242-.563-.362-1.309-.362-2.237 0-.76.088-1.405.264-1.934.176-.53.43-.94.764-1.234.333-.293.735-.44 1.206-.44.402 0 .72.098.955.294.236.196.41.487.521.872.062.214.14.392.234.534.093.14.247.21.46.21.301 0 .527-.102.677-.306.15-.204.225-.453.225-.747 0-.578-.243-1.094-.728-1.548-.485-.455-1.207-.682-2.166-.682zM.802 0v23.952h4.148V14.49h2.958l4.756 9.462h4.64l-5.226-9.872c1.41-.564 2.487-1.418 3.23-2.562.743-1.144 1.115-2.476 1.115-3.998 0-1.165-.234-2.2-.7-3.103a6.54 6.54 0 0 0-1.904-2.222c-.793-.58-1.685-.982-2.677-1.205-.99-.223-2.044-.335-3.162-.335H.802zm4.148 3.584h2.57c1.258 0 2.202.286 2.833.858.63.572.945 1.4.945 2.484 0 1.123-.317 1.985-.95 2.586-.634.601-1.583.901-2.849.901H4.95V3.584z" />
      </svg>
    ),
  },
  {
    key: "orcid",
    label: "ORCID",
    href: personalInfo.social.orcid,
    color: "hover:border-[#a6ce39]/60 hover:bg-[#a6ce39]/10 hover:text-[#a6ce39]",
    iconColor: "#a6ce39",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.484 3.872-3.722 0-2.016-1.284-3.722-3.862-3.722h-2.307z" />
      </svg>
    ),
  },
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

        {/* Social links row */}
        <div className="flex flex-wrap justify-center items-center gap-3 py-6 border-t border-white/[0.05] mb-2">
          <span className="text-slate-500 text-xs font-medium mr-1">Find me on:</span>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/[0.10]
                bg-white/[0.04] text-slate-400 text-xs font-medium transition-all duration-200 ${s.color}`}
            >
              <span style={{ color: s.iconColor }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/[0.05]">
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

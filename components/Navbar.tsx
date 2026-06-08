"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "#home",         label: "Home" },
  { href: "#about",        label: "About" },
  { href: "#education",    label: "Education" },
  { href: "#research",     label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#experience",   label: "Experience" },
  { href: "#skills",       label: "Skills" },
  { href: "#conferences",  label: "Conferences" },
  { href: "#contact",      label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = theme === "light";

  const navBg = scrolled
    ? isLight
      ? "bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-md"
      : "bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl"
    : "bg-transparent";

  const mobileBg = isLight
    ? "bg-white/95 backdrop-blur-xl border-t border-black/[0.06]"
    : "bg-[#0a0f1e]/95 backdrop-blur-xl border-t border-white/[0.06]";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" onClick={() => handleLinkClick("#home")} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-emerald-500/30 transition-shadow">
              SB
            </div>
            <div className="hidden sm:block">
              <p className={`font-semibold text-sm leading-none ${isLight ? "text-slate-900" : "text-white"}`}>
                Dr. Sourav Bhadwal
              </p>
              <p className="text-emerald-500 text-[10px] font-medium mt-0.5">Geographer & Researcher</p>
            </div>
          </a>

          {/* Desktop nav + theme toggle */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      active === id
                        ? "text-emerald-500 bg-emerald-500/10"
                        : isLight
                          ? "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Theme toggle button */}
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              aria-label="Toggle theme"
              className={`relative p-2.5 rounded-xl transition-all duration-300 border ${
                isLight
                  ? "bg-slate-100 border-slate-200 text-amber-500 hover:bg-amber-50 hover:border-amber-300"
                  : "bg-white/[0.06] border-white/[0.10] text-slate-300 hover:bg-white/[0.12] hover:text-amber-400"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLight ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="block"
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="block"
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all ${
                isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden ${mobileBg}`}
          >
            <div className="section-container py-4 grid grid-cols-2 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isLight
                      ? "text-slate-700 hover:text-emerald-600 hover:bg-black/5"
                      : "text-slate-300 hover:text-emerald-400 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

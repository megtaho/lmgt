import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "./LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const NAV_ITEMS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-mono font-bold text-primary-foreground text-sm">L</span>
            </div>
            <span className="font-inter font-semibold text-foreground text-lg tracking-tight">
              LMGT<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-inter text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-lg hover:bg-secondary/50"
              >
                {item.label}
              </a>
            ))}

            {/* Language Toggle */}
            <div className="ml-4 flex items-center rounded-lg border border-border/60 overflow-hidden bg-secondary/30">
              <button
                onClick={() => setLang("fr")}
                className={`px-3 py-2 text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-2 text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              className="ml-3 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-inter font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile: lang toggle + burger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border/60 overflow-hidden bg-secondary/30">
              <button
                onClick={() => setLang("fr")}
                className={`px-3 py-1.5 text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 text-xs font-mono font-semibold transition-all duration-300 ${
                  lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-foreground font-inter rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 bg-primary text-primary-foreground font-inter font-semibold rounded-lg text-center mt-4"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
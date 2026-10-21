import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/portfolio/LanguageContext";
import { content, SOCIALS } from "./content";
import { ArrowBox, FlagSwitch, LangSwitch } from "./Primitives";

export function Logo({ className = "" }) {
  return (
    <a href="#top" aria-label="LMGT" className={`inline-flex items-center gap-[0.18em] font-bold tracking-[-0.04em] text-[var(--ink)] leading-none ${className}`}>
      <img src="/logo-mark.png" alt="" width="512" height="512" className="h-[1.05em] w-auto" />
      <span>lmgt<span className="opacity-40">.</span></span>
    </a>
  );
}

// Burger : deux traits pleins + un trait pointillé au milieu (comme mount.jp)
function BurgerIcon() {
  return (
    <span aria-hidden="true" className="relative block w-[44px] h-[30px] border-y-2 border-[var(--ink)]">
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px]"
        style={{ backgroundImage: "radial-gradient(circle at center, var(--ink) 1px, transparent 1px)", backgroundSize: "8px 2px" }}
      />
    </span>
  );
}

export default function Header() {
  const { lang, setLang } = useLang();
  const c = content[lang];
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Masque l'en-tête en descendant, le réaffiche en remontant
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--head)] bg-white border-b border-[var(--line)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0,0.5,0,1)] ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className="h-full px-[var(--edge)] flex items-end justify-between pb-[22px]">
          <Logo className="text-[40px] md:text-[46px]" />
          <div className="flex items-center gap-[var(--s30)] pb-[2px]">
            <FlagSwitch lang={lang} setLang={setLang} />
            <button type="button" onClick={() => setOpen(true)} aria-label={c.menu} aria-expanded={open} className="hover:opacity-50 transition-opacity">
              <BurgerIcon />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={c.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto"
          >
            <div className="h-[var(--head)] px-[var(--edge)] flex items-end justify-between pb-[22px] border-b border-[var(--line)]">
              <Logo className="text-[40px] md:text-[46px]" />
              <button type="button" onClick={() => setOpen(false)} className="text-[18px] font-semibold hover:opacity-50 transition-opacity">
                {c.close}
              </button>
            </div>
            <nav className="px-[var(--edge)] pt-[var(--s60)] pb-[var(--s120)] grid md:grid-cols-2 gap-x-[var(--gap)] gap-y-[var(--s60)]">
              <ul>
                {c.index.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-t border-[var(--ink)] last:border-b"
                  >
                    <a href={`#${item.id}`} onClick={() => setOpen(false)} className="group flex items-center justify-between py-[18px]">
                      <span className="text-[28px] md:text-[33px] font-semibold tracking-[-0.02em]">{item.title}</span>
                      <ArrowBox size="s" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col gap-[var(--s30)] md:items-end">
                <LangSwitch lang={lang} setLang={setLang} />
                <ul className="flex flex-wrap gap-[15px]">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-[8px] text-[15px] font-semibold">
                        {s.label}
                        <ArrowBox size="xs" external />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

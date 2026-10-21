import React from "react";

const SIZES = { xs: "w-[19px] h-[19px]", s: "w-[30px] h-[30px]", m: "w-[45px] h-[45px]" };

// Carré à bordure fine avec flèche, inversé au survol du parent .group
export function ArrowBox({ size = "m", external = false, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center border border-[var(--line)] text-[var(--ink)] transition-colors duration-300 group-hover:bg-[var(--ink)] group-hover:border-[var(--ink)] group-hover:text-white ${SIZES[size]} ${className}`}
    >
      <svg viewBox="0 0 16 16" className={size === "xs" ? "w-2 h-2" : "w-3 h-3"} fill="none" stroke="currentColor" strokeWidth="1.6">
        {external ? <path d="M4 12 12 4M5.5 4H12v6.5" /> : <path d="M2 8h12M9 3l5 5-5 5" />}
      </svg>
    </span>
  );
}

export function Spread({ as: Tag = "section", className = "", children, ...rest }) {
  return (
    <Tag className={`w-full px-[var(--edge)] ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="text-[23px] font-semibold tracking-[-0.01em] text-[var(--ink)]">
      {children}
    </h2>
  );
}

export function LangSwitch({ lang, setLang, className = "" }) {
  return (
    <ul className={`flex gap-[15px] ${className}`}>
      {[["fr", "Français"], ["en", "English"], ["es", "Español"]].map(([code, label]) => (
        <li key={code}>
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-current={lang === code ? "true" : undefined}
            className={`text-[15px] font-semibold transition-opacity ${lang === code ? "text-[var(--ink)]" : "text-[var(--ink)]/40 hover:text-[var(--ink)]/70"}`}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Drapeaux (SVG) pour changer de langue
const FLAGS = {
  fr: { label: "Français", svg: (<><rect width="1" height="2" fill="#002654" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#CE1126" /></>), viewBox: "0 0 3 2" },
  en: {
    label: "English",
    viewBox: "0 0 60 30",
    svg: (
      <>
        <clipPath id="flag-uk-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </>
    ),
  },
  es: { label: "Español", svg: (<><rect width="3" height="2" fill="#AA151B" /><rect y="0.5" width="3" height="1" fill="#F1BF00" /></>), viewBox: "0 0 3 2" },
};

export function FlagSwitch({ lang, setLang, className = "" }) {
  return (
    <ul className={`flex items-center gap-[10px] ${className}`}>
      {Object.entries(FLAGS).map(([code, f]) => (
        <li key={code}>
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-label={f.label}
            title={f.label}
            aria-pressed={lang === code}
            className={`block w-[30px] h-[20px] overflow-hidden rounded-[3px] transition-all ${lang === code ? "ring-2 ring-[var(--ink)] ring-offset-2 opacity-100" : "opacity-50 hover:opacity-100"}`}
          >
            <svg viewBox={f.viewBox} preserveAspectRatio="none" className="w-full h-full block" aria-hidden="true">{f.svg}</svg>
          </button>
        </li>
      ))}
    </ul>
  );
}

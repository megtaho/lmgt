import React from "react";
import { useLang } from "@/components/portfolio/LanguageContext";
import { content } from "./content";
import { ArrowBox, LangSwitch, Spread } from "./Primitives";
import { Logo } from "./Header";

const FOOTER_IMAGE = "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function Footer() {
  const { lang, setLang } = useLang();
  const c = content[lang];
  const f = c.footer;

  return (
    <footer className="mt-[var(--s210)]">
      <Spread as="div">
        <div className="border-y border-[var(--ink)] flex flex-col md:flex-row md:items-end justify-between gap-[var(--s30)] py-[var(--s30)]">
          <p className="max-w-[900px] text-[28px] md:text-[43px] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--ink)]">{f.cta}</p>
          <a href="#contact" className="group flex shrink-0 items-center gap-[15px] text-[18px] font-semibold">
            {f.ctaLink}
            <ArrowBox />
          </a>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[var(--s15)] py-[var(--s30)]">
          <p className="text-[18px] font-semibold leading-[1.6]">{f.newsletter}</p>
          <a href="#contact" className="group flex items-center gap-[15px] text-[18px] font-semibold">
            {f.newsletterLink}
            <ArrowBox size="s" />
          </a>
        </div>
      </Spread>

      <figure aria-hidden="true" className="mt-[var(--s60)] w-full aspect-square md:aspect-[5/2] overflow-hidden bg-[var(--hover)]">
        <img src={FOOTER_IMAGE} alt="" loading="lazy" className="w-full h-full object-cover" />
      </figure>

      <Spread as="div" className="pt-[var(--s60)] pb-[110px] grid md:grid-cols-[1fr_auto] gap-x-[var(--gap)] gap-y-[var(--s60)]">
        <div className="flex flex-col justify-between gap-[var(--s30)]">
          <Logo className="text-[72px] md:text-[96px]" />
          <p className="text-[13px] font-semibold opacity-50">
            © {new Date().getFullYear()} LMGT — {f.location}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-[var(--s30)]">
          <ul className="flex flex-col gap-[10px]">
            {c.index.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-[18px] font-semibold hover:opacity-50 transition-opacity">{item.title}</a>
              </li>
            ))}
          </ul>
          <LangSwitch lang={lang} setLang={setLang} />
        </nav>
      </Spread>
    </footer>
  );
}

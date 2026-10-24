import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "@/components/portfolio/LanguageContext";
import { content } from "./content";
import { ArrowBox, SectionHeading, Spread } from "./Primitives";
import ProjectCube from "./ProjectCube";

const VIDEOS = [
  "/videos/site-architecture.mp4",
  "https://videos.pexels.com/video-files/4994033/4994033-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/7667424/7667424-uhd_4096_2160_25fps.mp4",
];

// Vitesse de lecture par vidéo (1 = normale) : la vidéo développement web est accélérée
const SPEEDS = [2, 1, 1];
const applySpeed = (i) => (e) => { e.currentTarget.playbackRate = SPEEDS[i] ?? 1; };

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export function Hero() {
  const { lang } = useLang();
  const h = content[lang].hero;
  const [current, setCurrent] = useState(0);
  const [player, setPlayer] = useState(false);

  return (
    <Spread aria-label="Showreel" className="pt-[calc(var(--head)+var(--s30))]">
      <div className="studio-hero-media relative w-full overflow-hidden bg-[var(--hover)]">
        <AnimatePresence mode="sync">
          <motion.video
            key={current}
            src={VIDEOS[current]}
            autoPlay muted playsInline
            onLoadedMetadata={applySpeed(current)}
            onPlay={applySpeed(current)}
            onEnded={() => setCurrent((p) => (p + 1) % VIDEOS.length)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Intitulé de la vidéo en cours */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 p-[var(--s30)] md:p-[var(--s60)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={`${lang}-${current}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-40%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-[44px] sm:text-[64px] md:text-[96px] lg:text-[128px] font-semibold leading-[0.95] tracking-[-0.04em]"
            >
              {h.labels[current]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-[var(--s30)] gap-y-[var(--s15)] pt-[var(--s15)]">
        <button type="button" onClick={() => setPlayer(true)} className="group flex flex-col items-start gap-[6px]">
          <span className="flex items-center gap-[12px] text-[23px] font-semibold tracking-[-0.01em]">
            {h.play}
            <span className="inline-flex w-[30px] h-[30px] items-center justify-center bg-[var(--ink)] text-white transition-opacity group-hover:opacity-70">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>
            </span>
          </span>
          <span className="text-[15px] font-semibold opacity-50">2018 — {new Date().getFullYear()}</span>
        </button>
        <ul className="order-first md:order-none w-full md:w-auto grid grid-cols-3 md:flex border border-[var(--ink)] md:border-0 md:gap-[var(--s30)] md:mr-[220px]">
          {h.labels.map((label, i) => (
            <li key={label} className="border-l border-[var(--ink)] first:border-l-0 md:border-0">
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-pressed={i === current}
                className={`w-full h-full px-[6px] py-[10px] md:p-0 text-[12px] min-[400px]:text-[13px] md:text-[15px] leading-tight font-semibold text-center transition-colors md:transition-opacity ${
                  i === current
                    ? "bg-[var(--ink)] text-white md:bg-transparent md:text-[var(--ink)] md:underline md:underline-offset-4"
                    : "text-[var(--ink)] md:opacity-40 md:hover:opacity-70"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {player && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-[var(--edge)]"
            onClick={() => setPlayer(false)}
          >
            <div className="w-full max-w-[1400px]" onClick={(e) => e.stopPropagation()}>
              <video src={VIDEOS[current]} onLoadedMetadata={applySpeed(current)} autoPlay controls playsInline className="w-full aspect-video bg-black" />
              <button type="button" onClick={() => setPlayer(false)} className="mt-[var(--s15)] text-white text-[18px] font-semibold hover:opacity-60">
                {content[lang].close}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Spread>
  );
}

export function Intro() {
  const { lang } = useLang();
  return (
    <Spread className="mt-[var(--s150)]">
      <motion.p {...reveal} lang={lang} className="max-w-[852px] text-[17px] md:text-[18px] font-medium leading-[2] text-left md:text-justify [hyphens:auto]">
        {content[lang].intro}
      </motion.p>
    </Spread>
  );
}

export function IndexNav() {
  const { lang } = useLang();
  return (
    <Spread as="nav" aria-label="Index" className="mt-[var(--s150)]">
      <ul className="grid md:grid-cols-2 gap-x-[var(--gap)]">
        {content[lang].index.map((item, i) => (
          <motion.li
            key={item.id}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.06 * i }}
            className="border-t border-[var(--ink)] last:border-b md:[&:nth-last-child(-n+2)]:border-b"
          >
            <a
              href={`#${item.id}`}
              className="group grid grid-cols-[1fr_auto] [grid-template-areas:'title_text''arrow_text'] gap-y-[var(--s60)] py-[var(--s30)]"
            >
              <span className="[grid-area:title] text-[23px] font-semibold tracking-[-0.01em] group-hover:opacity-60 transition-opacity">{item.title}</span>
              <span className="[grid-area:text] text-right text-[15px] font-semibold leading-[1.7]">
                {item.text[0]}<br />{item.text[1]}
              </span>
              <span className="[grid-area:arrow] self-end"><ArrowBox /></span>
            </a>
          </motion.li>
        ))}
      </ul>
    </Spread>
  );
}

function SectionRow({ id, heading, aside, children }) {
  return (
    <Spread id={id} aria-labelledby={`${id}-h`} className="mt-[var(--s150)] scroll-mt-[var(--head)] grid md:grid-cols-[var(--col2)_1fr] gap-x-[var(--gap)] gap-y-[var(--s30)]">
      <motion.div {...reveal} className="md:flex md:flex-col">
        <SectionHeading id={`${id}-h`}>{heading}</SectionHeading>
        {aside}
      </motion.div>
      <div>{children}</div>
    </Spread>
  );
}

export function About() {
  const { lang } = useLang();
  const a = content[lang].about;
  return (
    <SectionRow id="about" heading={a.heading}>
      <motion.p {...reveal} className="text-[28px] md:text-[43px] font-semibold leading-[1.25] tracking-[-0.02em] text-[var(--ink)]">
        {a.lead}
      </motion.p>
      <motion.p {...reveal} className="mt-[var(--s60)] max-w-[852px] text-[15px] font-medium leading-[2]">{a.p}</motion.p>
      <ul className="mt-[var(--s60)] grid md:grid-cols-2 gap-x-[var(--gap)] border-b border-[var(--line)]">
        {a.team.map((m) => (
          <motion.li key={m.name} {...reveal} className="border-t border-[var(--ink)] py-[var(--s30)]">
            <p className="text-[13px] font-semibold opacity-50">{m.role}</p>
            <h3 className="mt-[6px] text-[23px] font-semibold tracking-[-0.01em] text-[var(--ink)]">{m.name}</h3>
            <p className="mt-[var(--s15)] text-[15px] font-medium leading-[1.9]">{m.text}</p>
          </motion.li>
        ))}
      </ul>
      <dl className="mt-[var(--s60)] grid grid-cols-2 md:grid-cols-4 gap-x-[var(--gap)] border-b border-[var(--line)]">
        {a.stats.map((s) => (
          <div key={s.label} className="border-t border-[var(--line)] py-[var(--s15)] md:py-[var(--s30)]">
            <dt className="text-[13px] font-semibold opacity-50">{s.label}</dt>
            <dd className="mt-[6px] text-[33px] font-semibold tracking-[-0.02em] text-[var(--ink)]">{s.number}</dd>
          </div>
        ))}
      </dl>
    </SectionRow>
  );
}

export function Services() {
  const { lang } = useLang();
  const s = content[lang].services;
  return (
    <SectionRow id="services" heading={s.heading}>
      <ol className="border-b border-[var(--line)]">
        {s.items.map((item, i) => (
          <motion.li
            key={item.title}
            {...reveal}
            className="border-t border-[var(--line)] grid md:grid-cols-[60px_1fr_1fr] gap-x-[var(--gap)] gap-y-[10px] py-[var(--s30)]"
          >
            <span className="text-[15px] font-medium opacity-50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-[18px] font-semibold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-[6px] text-[15px] font-medium leading-[1.8]">{item.text}</p>
            </div>
            <ul className="flex flex-wrap gap-[8px] md:justify-end md:self-start">
              {item.tags.map((t) => (
                <li key={t} className="px-[10px] py-[4px] border border-[var(--line)] text-[13px] font-semibold">{t}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </SectionRow>
  );
}

export function Projects() {
  const { lang } = useLang();
  const p = content[lang].projects;
  return (
    <SectionRow
      id="projects"
      heading={p.heading}
      aside={
        <p className="mt-[var(--s30)] md:mt-[clamp(200px,20vw,300px)] flex items-start gap-[12px] max-w-[320px] text-[18px] md:text-[23px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--ink)]">
            <span aria-hidden="true" className="mt-[0.2em] inline-flex w-[30px] h-[30px] shrink-0 items-center justify-center bg-[var(--ink)] text-white">
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
            </span>
            {p.hint}
          </p>
      }
    >
      <motion.div {...reveal} className="py-[var(--s30)] md:py-[var(--s60)] flex justify-center">
        <ProjectCube items={p.items} yours={p.yours} />
      </motion.div>
      <div className="border-b border-[var(--line)]">
        {p.items.map((item) => (
          <motion.a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            {...reveal}
            className="group grid md:grid-cols-[var(--col)_1fr_auto] gap-x-[var(--gap)] gap-y-[10px] items-center border-t border-[var(--line)] py-[17px] -mx-[10px] px-[10px] transition-colors hover:bg-[var(--hover)]"
          >
            <span className="text-[15px] font-medium tracking-[0.06em] opacity-50">{item.place ? `${item.category} · ${item.place}` : item.category}</span>
            <span className="text-[15px] font-semibold underline underline-offset-[5px] decoration-1 leading-[1.8]">{item.title}</span>
            <span className="hidden md:block"><ArrowBox size="s" external /></span>
          </motion.a>
        ))}
      </div>
    </SectionRow>
  );
}

const fieldClass =
  "w-full bg-transparent border-0 border-b border-[var(--line)] py-[14px] text-[15px] font-medium text-[var(--ink)] placeholder:text-[var(--text)]/40 focus:outline-none focus:border-[var(--ink)] transition-colors";

const CONTACT_EMAIL = "contact@lmgt.eu";

export function Contact() {
  const { lang } = useLang();
  const f = content[lang].form;
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  // Envoi par FormSubmit : chaque message arrive par email sur CONTACT_EMAIL
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data._honey) return; // champ piège anti-spam rempli = robot
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _subject: `lmgt.eu — ${data.subject}`,
          _replyto: data.email,
          _template: "table",
          langue: lang,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || res.statusText);
      toast.success(f.success);
      formRef.current?.reset();
    } catch {
      toast.error(f.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionRow id="contact" heading={f.heading}>
      <motion.form ref={formRef} onSubmit={onSubmit} {...reveal} className="grid md:grid-cols-2 gap-x-[var(--gap)]">
        <label className="block"><span className="sr-only">{f.name}</span><input required name="name" placeholder={f.name} className={fieldClass} /></label>
        <label className="block"><span className="sr-only">{f.email}</span><input required type="email" name="email" placeholder={f.email} className={fieldClass} /></label>
        <label className="block md:col-span-2"><span className="sr-only">{f.subject}</span><input required name="subject" placeholder={f.subject} className={fieldClass} /></label>
        <label className="block md:col-span-2"><span className="sr-only">{f.message}</span><textarea required rows={5} name="message" placeholder={f.message} className={`${fieldClass} resize-none`} /></label>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-[var(--s15)] mt-[var(--s30)]">
          <p className="text-[15px] font-medium">
            {f.direct} <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-[5px] decoration-1">{CONTACT_EMAIL}</a>
          </p>
          <button type="submit" disabled={sending} className="group flex items-center gap-[15px] text-[18px] font-semibold disabled:opacity-50">
            {sending ? f.sending : f.send}
            <ArrowBox />
          </button>
        </div>
      </motion.form>
    </SectionRow>
  );
}

// Pastille flottante « Contact » en bas à droite
export function FloatingContact() {
  const { lang } = useLang();
  return (
    <a
      href="#contact"
      className="fixed bottom-[var(--s15)] right-[var(--s15)] z-40 rounded-[6px] p-[5px] bg-[var(--hover)]/80 backdrop-blur shadow-[0_0_15px_rgba(0,0,0,0.25)] group"
    >
      <span className="block rounded-[4px] bg-white px-[var(--s30)] py-[14px] text-[16px] md:text-[18px] font-semibold text-[var(--ink)] transition-opacity group-hover:opacity-60">
        {content[lang].contact}
      </span>
    </a>
  );
}

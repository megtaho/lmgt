import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useLang } from "./LanguageContext";

const VIDEOS = [
  {
    src: "https://videos.pexels.com/video-files/11274330/11274330-uhd_2560_1440_25fps.mp4",
    labelKey: "leftLabel",
  },
  {
    src: "https://videos.pexels.com/video-files/4994033/4994033-uhd_2560_1440_25fps.mp4",
    labelKey: "rightLabel",
  },
];

const SLIDE_DURATION = 6000; // ms per video

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % VIDEOS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" aria-label="Introduction" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Looping background videos */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-105"
              src={VIDEOS[current].src}
            />
            <div className="absolute inset-0 bg-background/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-10" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 95%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 95%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/40 backdrop-blur-md mb-10"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-inter text-muted-foreground">{h.badge}</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.95]"
        >
          <span className="text-foreground">{h.heading1} </span>
          <span className="text-primary">{h.heading2}</span>
          <br />
          <span className="text-foreground">{h.heading3}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto leading-relaxed"
        >
          {h.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="px-8 py-4 bg-primary text-primary-foreground font-inter font-semibold rounded-xl hover:opacity-90 transition-all duration-300 text-base backdrop-blur-sm">
            {h.cta1}
          </a>
          <a href="#about" className="px-8 py-4 border border-border/60 text-foreground font-inter font-medium rounded-xl hover:bg-secondary/50 transition-all duration-300 text-base backdrop-blur-sm bg-background/20">
            {h.cta2}
          </a>
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          {VIDEOS.map((v, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex items-center gap-2 group"
            >
              <div className={`h-0.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40 group-hover:bg-muted-foreground"}`} />
              <span className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${i === current ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"}`}>
                {h[v.labelKey]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";
import DigitalOrb from "./DigitalOrb";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-heading" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">{a.sectionLabel}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Digital Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Glow background */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
              <DigitalOrb />
            </div>
          </motion.div>

          {/* Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="about-heading"
              className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-8"
            >
              {a.heading1}
              <br />
              <span className="text-primary">{a.heading2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              {a.p1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed mb-12"
            >
              {a.p2}
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {a.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="p-5 rounded-xl bg-secondary/40 border border-border/50"
                >
                  <div className="font-inter font-bold text-3xl text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground mt-1 font-inter">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
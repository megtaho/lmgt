import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Zap, Globe, Database, Megaphone } from "lucide-react";
import { useLang } from "./LanguageContext";

const ICONS = [Code2, Zap, Database, Megaphone, Palette, Globe];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();
  const s = t.skills;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">{s.sectionLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="skills-heading"
          className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-20"
        >
          {s.heading1}
          <br />
          <span className="text-primary">{s.heading2}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((skill, index) => {
            const Icon = ICONS[index];
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group p-7 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-foreground mb-3">{skill.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono text-muted-foreground bg-secondary/60 rounded-full border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useLang } from "./LanguageContext";

const IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();
  const p = t.projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">{p.sectionLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="projects-heading"
          className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-20"
        >
          {p.heading1}
          <br />
          <span className="text-primary">{p.heading2}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {p.items.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-colors duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={IMAGES[index]}
                  alt={`Aperçu du projet ${project.title} — ${project.category}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <a href="#" className="p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="p-7">
                <span className="font-mono text-xs text-primary tracking-wider uppercase">{project.category}</span>
                <h3 className="font-inter font-semibold text-xl text-foreground mt-2 mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono text-muted-foreground bg-secondary/60 rounded-full border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
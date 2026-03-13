import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "./LanguageContext";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const { t } = useLang();
  const c = t.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(c.success);
      e.target.reset();
    }, 1500);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-background pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">{c.sectionLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="contact-heading"
          className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-20"
        >
          {c.heading1}
          <br />
          <span className="text-primary">{c.heading2}</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">{c.description}</p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-inter">{c.email}</div>
                  <div className="text-foreground font-inter font-medium">hello@motion.dev</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-inter">{c.location}</div>
                  <div className="text-foreground font-inter font-medium">{c.locationValue}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-inter font-semibold text-foreground mb-4">{c.follow}</h4>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-secondary/70"
                  >
                    <span className="text-sm font-inter text-muted-foreground group-hover:text-foreground transition-colors">{social.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 p-8 rounded-2xl bg-card border border-border/50"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-inter text-muted-foreground mb-2 block">{c.form.name}</label>
                <Input required placeholder={c.form.namePlaceholder} className="bg-secondary/40 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 h-12" />
              </div>
              <div>
                <label className="text-sm font-inter text-muted-foreground mb-2 block">{c.form.email}</label>
                <Input required type="email" placeholder={c.form.emailPlaceholder} className="bg-secondary/40 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 h-12" />
              </div>
            </div>
            <div>
              <label className="text-sm font-inter text-muted-foreground mb-2 block">{c.form.subject}</label>
              <Input required placeholder={c.form.subjectPlaceholder} className="bg-secondary/40 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 h-12" />
            </div>
            <div>
              <label className="text-sm font-inter text-muted-foreground mb-2 block">{c.form.message}</label>
              <Textarea required rows={5} placeholder={c.form.messagePlaceholder} className="bg-secondary/40 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 resize-none" />
            </div>
            <Button type="submit" disabled={sending} className="w-full h-12 bg-primary text-primary-foreground font-inter font-semibold rounded-xl hover:opacity-90 transition-opacity text-base">
              {sending ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <><Send className="w-4 h-4 mr-2" />{c.form.send}</>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
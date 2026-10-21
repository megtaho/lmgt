import React from "react";
import { useLang } from "./LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-mono font-bold text-primary-foreground text-xs">L</span>
            </div>
            <span className="font-inter font-semibold text-foreground tracking-tight">
              LMGT<span className="text-primary">.</span>
            </span>
          </div>

          <p className="text-sm text-muted-foreground font-inter">
            © {new Date().getFullYear()} — Laurine Gbahe Taho — LMGT<span className="text-primary">.</span>
          </p>

          <div className="flex items-center gap-6">
            {["GitHub", "LinkedIn", "Instagram"].map((label) => (
              <a key={label} href="#" className="text-sm text-muted-foreground hover:text-foreground font-inter transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
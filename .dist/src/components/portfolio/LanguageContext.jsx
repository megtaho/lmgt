import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      cta: "Let's Talk",
    },
    hero: {
      badge: "Available for freelance work",
      heading1: "I craft",
      heading2: "digital",
      heading3: "experiences",
      subtitle: "Laurine Gbahe Taho — Full-stack web developer & social media strategist. I build stunning websites and help brands grow their online presence.",
      cta1: "View My Work",
      cta2: "About Me",
      leftLabel: "Web Development",
      rightLabel: "Social Media",
    },
    about: {
      sectionLabel: "01 — About",
      heading1: "Building the web,",
      heading2: "one pixel at a time.",
      p1: "I'm Laurine Gbahe Taho — a creative developer & content strategist based in Paris. I build high-performance websites and teach brands how to dominate social media.",
      p2: "With a deep focus on motion design, modern frameworks and social media growth, I help startups and creators stand out online.",
      stats: [
        { number: "8+", label: "Years Experience" },
        { number: "120+", label: "Projects Delivered" },
        { number: "50+", label: "Happy Clients" },
        { number: "99%", label: "Satisfaction" },
      ],
    },
    skills: {
      sectionLabel: "02 — Skills",
      heading1: "My toolkit for building",
      heading2: "exceptional products.",
      items: [
        { title: "Frontend Development", description: "React, Next.js, TypeScript, Tailwind CSS — blazing-fast SPAs and SSR apps.", tags: ["React", "Next.js", "TypeScript", "Tailwind"] },
        { title: "Motion & Animation", description: "Framer Motion, GSAP, Three.js — immersive, buttery-smooth web experiences.", tags: ["Framer Motion", "GSAP", "Three.js"] },
        { title: "Backend & APIs", description: "Node.js, Python, PostgreSQL, REST & GraphQL — full-stack end-to-end.", tags: ["Node.js", "Python", "PostgreSQL"] },
        { title: "Social Media Strategy", description: "Content planning, community growth, and viral strategy for Instagram, TikTok & LinkedIn.", tags: ["Instagram", "TikTok", "LinkedIn"] },
        { title: "Content Creation", description: "Video editing, storytelling, brand voice — courses and coaching to grow your audience.", tags: ["Video Editing", "Storytelling", "Coaching"] },
        { title: "Performance & SEO", description: "Core Web Vitals, semantic HTML, optimized for speed and search discovery.", tags: ["Core Web Vitals", "SEO", "Accessibility"] },
      ],
    },
    projects: {
      sectionLabel: "03 — Projects",
      heading1: "Selected work that",
      heading2: "speaks for itself.",
      items: [
        { title: "Notion", category: "Productivity SaaS", description: "Redesign concept for Notion's landing page — bold typography, dark mode, and micro-interactions for a seamless onboarding experience.", tags: ["Next.js", "Tailwind", "Framer Motion"] },
        { title: "Stripe Dashboard", category: "FinTech SaaS", description: "Custom analytics dashboard inspired by Stripe — real-time charts, transaction flows, and a clean data-first UI.", tags: ["React", "Recharts", "WebSocket"] },
        { title: "Loewe Digital", category: "Luxury E-Commerce", description: "A luxury fashion e-commerce experience with cinematic product reveals, gesture navigation, and 3D model rendering.", tags: ["Three.js", "GSAP", "Shopify"] },
        { title: "BeReal Clone", category: "Social App", description: "Full-stack social media app with dual-camera capture, Stories, friend feed and push notifications — built and shipped in 3 weeks.", tags: ["React Native", "Firebase", "Node.js"] },
      ],
    },
    contact: {
      sectionLabel: "04 — Contact",
      heading1: "Let's build something",
      heading2: "incredible together.",
      description: "Have a project in mind or want to optimize your social media presence? Drop me a message and let's make it happen.",
      email: "Email",
      location: "Location",
      locationValue: "Paris, France — Available Worldwide",
      follow: "Follow Me",
      form: { name: "Name", namePlaceholder: "Your name", email: "Email", emailPlaceholder: "you@company.com", subject: "Subject", subjectPlaceholder: "Project inquiry", message: "Message", messagePlaceholder: "Tell me about your project...", send: "Send Message" },
      success: "Message sent! I'll get back to you soon.",
    },
    footer: {
      rights: "Laurine Gbahe Taho",
    },
  },
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      cta: "Discutons",
    },
    hero: {
      badge: "Disponible pour des missions freelance",
      heading1: "Je crée des",
      heading2: "expériences",
      heading3: "digitales",
      subtitle: "Laurine Gbahe Taho — Développeuse web full-stack & stratège en réseaux sociaux. Je construis des sites web et aide les marques à booster leur présence en ligne.",
      cta1: "Voir mes projets",
      cta2: "En savoir plus",
      leftLabel: "Développement Web",
      rightLabel: "Réseaux Sociaux",
    },
    about: {
      sectionLabel: "01 — À propos",
      heading1: "Construire le web,",
      heading2: "un pixel à la fois.",
      p1: "Je suis Laurine Gbahe Taho — développeuse web créative & stratège en contenu basée à Paris. Je crée des sites performants et j'aide les marques à dominer les réseaux sociaux.",
      p2: "Avec une expertise en motion design, frameworks modernes et croissance sociale, j'aide les startups et créateurs à se démarquer en ligne.",
      stats: [
        { number: "8+", label: "Ans d'expérience" },
        { number: "120+", label: "Projets livrés" },
        { number: "50+", label: "Clients satisfaits" },
        { number: "99%", label: "Satisfaction client" },
      ],
    },
    skills: {
      sectionLabel: "02 — Compétences",
      heading1: "Mes outils pour créer",
      heading2: "des produits exceptionnels.",
      items: [
        { title: "Développement Frontend", description: "React, Next.js, TypeScript, Tailwind CSS — SPAs et apps SSR ultra-rapides.", tags: ["React", "Next.js", "TypeScript", "Tailwind"] },
        { title: "Motion & Animation", description: "Framer Motion, GSAP, Three.js — expériences web immersives et fluides.", tags: ["Framer Motion", "GSAP", "Three.js"] },
        { title: "Backend & APIs", description: "Node.js, Python, PostgreSQL, REST & GraphQL — solutions full-stack de bout en bout.", tags: ["Node.js", "Python", "PostgreSQL"] },
        { title: "Stratégie Réseaux Sociaux", description: "Planification de contenu, croissance communautaire et stratégie virale pour Instagram, TikTok & LinkedIn.", tags: ["Instagram", "TikTok", "LinkedIn"] },
        { title: "Création de Contenu", description: "Montage vidéo, storytelling, voix de marque — formations et coaching pour développer votre audience.", tags: ["Montage Vidéo", "Storytelling", "Coaching"] },
        { title: "Performance & SEO", description: "Core Web Vitals, HTML sémantique — optimisé pour la vitesse et la visibilité.", tags: ["Core Web Vitals", "SEO", "Accessibilité"] },
      ],
    },
    projects: {
      sectionLabel: "03 — Projets",
      heading1: "Quelques réalisations qui",
      heading2: "parlent d'elles-mêmes.",
      items: [
        { title: "Notion", category: "Productivité SaaS", description: "Concept de refonte de la landing page de Notion — typographie forte, dark mode et micro-interactions pour une expérience d'onboarding fluide.", tags: ["Next.js", "Tailwind", "Framer Motion"] },
        { title: "Stripe Dashboard", category: "FinTech SaaS", description: "Dashboard analytique inspiré de Stripe — graphiques temps réel, flux de transactions et UI data-first épurée.", tags: ["React", "Recharts", "WebSocket"] },
        { title: "Loewe Digital", category: "E-Commerce Luxe", description: "Expérience e-commerce luxe avec reveals produit cinématiques, navigation gestuelle et rendu 3D des modèles.", tags: ["Three.js", "GSAP", "Shopify"] },
        { title: "BeReal Clone", category: "App Sociale", description: "Application sociale full-stack avec double caméra, Stories, fil d'amis et notifications push — livrée en 3 semaines.", tags: ["React Native", "Firebase", "Node.js"] },
      ],
    },
    contact: {
      sectionLabel: "04 — Contact",
      heading1: "Créons quelque chose",
      heading2: "d'incroyable ensemble.",
      description: "Vous avez un projet en tête ou souhaitez optimiser votre présence sur les réseaux sociaux ? Envoyez-moi un message et concrétisons votre vision.",
      email: "Email",
      location: "Localisation",
      locationValue: "Paris, France — Télétravail partout dans le monde",
      follow: "Me suivre",
      form: { name: "Nom", namePlaceholder: "Votre nom", email: "Email", emailPlaceholder: "vous@entreprise.com", subject: "Sujet", subjectPlaceholder: "Demande de projet", message: "Message", messagePlaceholder: "Parlez-moi de votre projet...", send: "Envoyer le message" },
      success: "Message envoyé ! Je vous réponds très vite.",
    },
    footer: {
      rights: "Laurine Gbahe Taho",
    },
  },
};

const SUPPORTED = ["fr", "en", "es"];

// Langue du navigateur du visiteur (fr / en / es), anglais par défaut sinon
function detectLang() {
  if (typeof navigator === "undefined") return "fr";
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of prefs) {
    const code = (l || "").slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(code)) return code;
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] ?? translations.en;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
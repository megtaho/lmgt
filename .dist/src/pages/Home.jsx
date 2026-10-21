import React from "react";
import { Toaster } from "sonner";
import { LanguageProvider, useLang } from "@/components/portfolio/LanguageContext";
import Header from "@/components/studio/Header";
import Footer from "@/components/studio/Footer";
import { Hero, Intro, IndexNav, About, Services, Projects, Contact, FloatingContact } from "@/components/studio/Sections";

function Page() {
  const { lang } = useLang();
  return (
    <div id="top" lang={lang} className="studio min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-sm"
      >
        {{ fr: "Aller au contenu principal", en: "Skip to main content", es: "Ir al contenido principal" }[lang]}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Intro />
        <IndexNav />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <Toaster position="bottom-left" toastOptions={{ style: { borderRadius: 4, fontFamily: "var(--font-studio)" } }} />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

"use client";

import { useCallback, memo } from "react";
import { ArrowDown } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface HeroSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const HERO_CONTENT = {
  title: {
    line1: "Transformando",
    line2: "ingredientes em",
    highlight: "experiências únicas",
  },
  subtitle:
    "Chef Henrique, especialista em gastronomia contemporânea com sabores que contam histórias.",
  cta: "Agendar Experiência",
  image: {
    src: "/images/2.jpg",
    alt: "Chef Henrique Menezes em ação na cozinha preparando pratos gourmet",
  },
} as const;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const BackgroundOverlays = memo(() => (
  <>
    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
  </>
));
BackgroundOverlays.displayName = "BackgroundOverlays";

const ScrollIndicator = memo(() => (
  <div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
    role="presentation"
    aria-hidden="true"
  >
    <div className="w-6 h-10 border-2 border-emerald-500/60 rounded-full flex justify-center p-1">
      <div className="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse" />
    </div>
  </div>
));
ScrollIndicator.displayName = "ScrollIndicator";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Element with id "${id}" not found`);
      }
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCtaClick = useCallback(() => {
    scrollToSection("contato");
  }, [scrollToSection]);

  return (
    <section
      id="home"
      className={`relative h-screen flex items-center overflow-hidden ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_CONTENT.image.src}
          alt={HERO_CONTENT.image.alt}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <BackgroundOverlays />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-[8vh] sm:mt-[10vh]">
        <div className="max-w-3xl">
          {/* Heading - Tamanhos reduzidos e mais harmônicos */}
          <h1
            id="hero-heading"
            className="font-serif mb-4 sm:mb-6 leading-[1.1] tracking-tight"
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              {HERO_CONTENT.title.line1}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              {HERO_CONTENT.title.line2}
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent mt-1">
              {HERO_CONTENT.title.highlight}
            </span>
          </h1>

          {/* Subtitle - Tamanho reduzido */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-6 sm:mb-8 leading-relaxed max-w-xl">
            {HERO_CONTENT.subtitle}
          </p>

          {/* CTA Button - Versão Minimalista */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center justify-center
               px-6 py-2.5 sm:px-7 sm:py-3
               bg-emerald-600 hover:bg-emerald-700
               text-white text-sm sm:text-base font-medium
               rounded-lg
               transition-all duration-300 ease-out
               hover:shadow-lg hover:shadow-emerald-500/25
               hover:-translate-y-0.5
               active:translate-y-0
               focus-visible:outline-none focus-visible:ring-2 
               focus-visible:ring-emerald-400 focus-visible:ring-offset-2 
               focus-visible:ring-offset-neutral-950
               overflow-hidden"
              aria-label="Agendar uma experiência gastronômica com Chef Henrique"
            >
              {/* Efeito sutil de brilho ao hover */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                     translate-x-[-200%] group-hover:translate-x-[200%] 
                     transition-transform duration-700"
              />

              <span className="relative">{HERO_CONTENT.cta}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}

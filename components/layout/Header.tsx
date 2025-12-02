// landing-chef/components/layout/Header.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChefHat, Menu, X, Sparkles } from "lucide-react";
import { Navigation } from "./Navigation";

// Types
interface HeaderProps {
  className?: string;
}

// Constants
const SCROLL_THRESHOLD = 40;
const HEADER_TRANSITION_DURATION = 300;

export default function Header({ className = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollY = useRef(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // Gerenciamento de scroll otimizado com throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Detecta direção do scroll
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsScrollingDown(true);
          } else {
            setIsScrollingDown(false);
          }

          lastScrollY.current = currentScrollY;

          // Atualiza estado de scroll
          setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Previne scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Scroll suave com validação e callback
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Element with id "${id}" not found`);
      return;
    }

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Fecha menu mobile após navegação
    setIsMenuOpen(false);

    // Focus management para acessibilidade
    setTimeout(() => {
      element.focus?.({ preventScroll: true });
    }, HEADER_TRANSITION_DURATION);
  }, []);

  // Toggle menu com callback
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Fecha menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Classes dinâmicas otimizadas
  const headerClasses = `
    fixed top-0 left-0 w-full z-50
    transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 shadow-lg shadow-black/40"
        : "bg-gradient-to-b from-neutral-950/95 via-neutral-950/70 to-transparent"
    }
    ${isScrollingDown && isScrolled ? "-translate-y-full" : "translate-y-0"}
    ${className}
  `.trim();

  const logoClasses = `
    relative inline-flex items-center justify-center h-11 w-11 rounded-full
    border-2 transition-all duration-500
    ${isScrolled ? "border-amber-500/60" : "border-amber-500/40"}
    bg-gradient-to-br from-amber-500/10 to-amber-600/5
    shadow-lg shadow-amber-500/20
    group-hover:shadow-amber-500/40
    group-hover:scale-110 group-hover:border-amber-400
    group-hover:rotate-6
    group-focus-visible:ring-2 group-focus-visible:ring-amber-500 
    group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-neutral-950
  `.trim();

  const mobileMenuClasses = `
    md:hidden fixed inset-x-0 top-0 bottom-0
    bg-neutral-950/98 backdrop-blur-xl
    shadow-2xl shadow-black/50
    overflow-y-auto overscroll-contain
    transition-all duration-300 ease-in-out
    ${
      isMenuOpen
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-full pointer-events-none"
    }
  `.trim();

  return (
    <>
      <header className={headerClasses} role="banner">
        <nav
          className="container mx-auto px-4 sm:px-6 py-4 md:py-5 flex items-center justify-between"
          aria-label="Navegação principal"
        >
          {/* Logo + Marca Premium */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 cursor-pointer select-none group focus-visible:outline-none relative"
            aria-label="Chef Henrique - Ir para o início"
          >
            <span className={logoClasses}>
              <ChefHat
                className="w-5 h-5 text-amber-400 transition-all duration-300 group-hover:text-amber-300 group-hover:scale-110"
                aria-hidden="true"
              />
              {/* Sparkle effect */}
              <Sparkles
                className="absolute -top-1 -right-1 w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                aria-hidden="true"
              />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-2xl font-serif tracking-wide text-amber-400 group-hover:text-amber-300 transition-colors duration-300 leading-tight">
                Chef Henrique
              </span>
              <span className="text-[10px] md:text-xs text-amber-500/60 font-light tracking-widest uppercase">
                Gastronomia Premium
              </span>
            </div>
          </button>

          {/* Navegação Desktop */}
          <div
            className="hidden md:flex items-center space-x-8"
            role="navigation"
          >
            <Navigation onNavigate={scrollToSection} />
          </div>

          {/* Placeholder invisível para manter alinhamento perfeito */}
          <div className="hidden md:block w-32"></div>

          {/* Menu Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-neutral-200 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-lg p-1.5 -mr-1.5 touch-manipulation bg-neutral-900/50 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {isMenuOpen ? (
              <X
                className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400"
                aria-hidden="true"
              />
            )}
          </button>
        </nav>
      </header>

      {/* Menu Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={mobileMenuClasses}
        role="dialog"
        aria-label="Menu de navegação mobile"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
        {/* Gradient background decoration */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"
          aria-hidden="true"
        />

        <div className="relative flex flex-col h-full">
          {/* Header do Menu Mobile */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/10 bg-neutral-900/50 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
                <ChefHat
                  className="w-5 h-5 text-amber-400"
                  aria-hidden="true"
                />
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-serif text-amber-400 leading-tight">
                  Chef Henrique
                </span>
                <span className="text-[9px] text-amber-500/60 font-light tracking-widest uppercase">
                  Gastronomia Premium
                </span>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="text-neutral-200 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-lg p-2 bg-neutral-800/50 border border-amber-500/20"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5 text-amber-400" aria-hidden="true" />
            </button>
          </div>

          {/* Conteúdo do Menu */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-10">
            <div className="space-y-6">
              <Navigation onNavigate={scrollToSection} mobile />
              {/* CTA Mobile removido */}
            </div>
          </div>

          {/* Footer do Menu Mobile */}
          <div className="px-6 py-5 border-t border-amber-500/10 bg-neutral-900/80 backdrop-blur-xl">
            <p className="text-center text-sm text-neutral-400 mb-2">
              Salvador, Bahia - Brasil
            </p>
            <p className="text-center text-xs text-amber-500/60">
              Experiências Gastronômicas Premium
            </p>
          </div>
        </div>
      </div>

      {/* Overlay para fechar menu ao clicar fora */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
          onTouchEnd={toggleMenu}
          aria-hidden="true"
          role="button"
          tabIndex={-1}
        />
      )}
    </>
  );
}

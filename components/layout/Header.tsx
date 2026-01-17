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
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isProgrammaticScroll = useRef(false);

  // =========================
  // Scroll listener (manual)
  // =========================
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (!isProgrammaticScroll.current) {
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
              setIsScrollingDown(true);
            } else {
              setIsScrollingDown(false);
            }
          } else {
            // durante scroll por clique, nunca esconda o header
            setIsScrollingDown(false);
          }

          lastScrollY.current = currentScrollY;
          setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // =========================
  // Lock scroll when menu open
  // =========================
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
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // =========================
  // Scroll to section (links)
  // =========================
  const scrollToSection = useCallback((id: string) => {
    isProgrammaticScroll.current = true;
    setIsScrollingDown(false);
    setIsMenuOpen(false);

    requestAnimationFrame(() => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);

        if (!element) {
          console.warn(`Element with id "${id}" not found`);
          isProgrammaticScroll.current = false;
          return;
        }

        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

      setTimeout(() => {
        isProgrammaticScroll.current = false;
        lastScrollY.current = window.scrollY;
      }, 700);
    });
  }, []);

  // =========================
  // Toggle menu
  // =========================
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // =========================
  // ESC to close menu
  // =========================
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // =========================
  // Dynamic classes
  // =========================
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
  `.trim();

  const mobileMenuClasses = `
    md:hidden fixed inset-0 z-50
    bg-neutral-950/98 backdrop-blur-xl
    transition-all duration-300
    ${
      isMenuOpen
        ? "opacity-100 translate-x-0"
        : "opacity-0 translate-x-full pointer-events-none"
    }
  `.trim();

  // =========================
  // JSX
  // =========================
  return (
    <>
      <header className={headerClasses}>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group"
            aria-label="Ir para o início"
          >
            <span className={logoClasses}>
              <ChefHat className="w-5 h-5 text-amber-400" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100" />
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xl font-serif text-amber-400">
                Chef Henrique
              </span>
              <span className="text-xs text-amber-500/60 uppercase tracking-widest">
                Gastronomia Premium
              </span>
            </div>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <Navigation onNavigate={scrollToSection} />
          </div>

          <div className="hidden md:block w-[200px]" />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg border border-amber-500/30"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-amber-400" />
            ) : (
              <Menu className="w-6 h-6 text-amber-400" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={mobileMenuClasses} role="dialog" aria-modal="true">
        <div className="px-6 py-10 space-y-6">
          <Navigation onNavigate={scrollToSection} mobile />

          <button
            type="button"
            onClick={() => scrollToSection("contato")}
            className="w-full bg-amber-500 text-neutral-950 py-4 rounded-full font-semibold"
          >
            Agendar Experiência
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

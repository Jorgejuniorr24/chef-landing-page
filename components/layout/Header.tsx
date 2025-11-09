// landing-chef/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { ChefHat, Menu, X } from "lucide-react";
import { Navigation } from "./Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Controla o estado de rolagem
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll suave até a seção
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-950/95 backdrop-blur-xl shadow-xl shadow-black/30 border-b border-neutral-800"
          : "bg-gradient-to-b from-neutral-950/90 to-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer select-none"
          onClick={() => scrollToSection("home")}
        >
          <ChefHat className="w-8 h-8 text-amber-500" aria-hidden="true" />
          <span className="text-2xl font-serif text-amber-500">
            Chef Henrique
          </span>
        </div>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Navigation onNavigate={scrollToSection} />
        </div>

        {/* CTA Desktop */}
        <button
          onClick={() => scrollToSection("contato")}
          className="hidden md:block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 
          rounded-full font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-amber-500/20"
        >
          Agendar Experiência
        </button>

        {/* Botão Menu Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white transition-transform duration-300 hover:scale-110"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Navegação Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 animate-fadeIn">
          <div className="px-6 py-6 space-y-5 text-center">
            <Navigation onNavigate={scrollToSection} mobile />
            <button
              onClick={() => scrollToSection("contato")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full w-full font-medium transition-all"
            >
              Agendar Experiência
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// landing-chef/components/layout/Footer.tsx
"use client";

import {
  ChefHat,
  Instagram,
  Facebook,
  Linkedin,
  Heart,
  Sparkles,
} from "lucide-react";

import { useCallback } from "react";

// Types
interface FooterProps {
  className?: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

interface QuickLink {
  label: string;
  href: string;
}

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <Instagram className="w-5 h-5" aria-hidden="true" />,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: <Facebook className="w-5 h-5" aria-hidden="true" />,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
];

const QUICK_LINKS: QuickLink[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Pratos", href: "#pratos" },
  { label: "Contato", href: "#contato" },
];

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Scroll suave para seções
  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const footerClasses = `
  relative bg-[#1F1D1E]
  border-t border-white/10
  overflow-hidden
  ${className}
`.trim();

  return (
    <footer className={footerClasses} role="contentinfo">
      {/* Decorative background effects - matching AboutSection/ContactSection */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-800/60 via-slate-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      {/* Pattern overlay - matching emerald theme */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(5 150 105) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-full border-2 border-emerald-500/60 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-lg shadow-emerald-500/20">
                <ChefHat
                  className="w-6 h-6 text-emerald-400"
                  aria-hidden="true"
                />
                <Sparkles
                  className="absolute -top-1 -right-1 w-3 h-3 text-emerald-400"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 leading-tight">
                  Chef Henrique
                </span>
                <span className="text-[10px] text-emerald-500/60 font-light tracking-widest uppercase">
                  Gastronomia Premium
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
              Transformando ingredientes em experiências únicas através da
              gastronomia contemporânea com sabores que contam histórias.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
              <span
                className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent"
                aria-hidden="true"
              />
              Links Rápidos
            </h3>
            <nav aria-label="Links rápidos do rodapé">
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-400 hover:text-emerald-500 transition-colors text-sm hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter / Social */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
              <span
                className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent"
                aria-hidden="true"
              />
              Redes Sociais
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Acompanhe nosso trabalho e novidades
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative
                    flex items-center justify-center
                    w-10 h-10 rounded-full
                    bg-slate-800/50 border border-slate-700
                    text-slate-400 ${social.color}
                    transition-all duration-300
                    hover:scale-110 hover:border-current
                    hover:shadow-lg hover:shadow-current/20
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                  `}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            {/* Copyright */}
            <p className="text-slate-500 text-center sm:text-left">
              &copy; {currentYear} Chef Henrique. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

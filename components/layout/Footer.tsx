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
    relative bg-neutral-950 
    border-t border-neutral-800/50
    overflow-hidden
    ${className}
  `.trim();

  return (
    <footer className={footerClasses} role="contentinfo">
      {/* Decorative background effects */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-950 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(245 158 11) 1px, transparent 0)`,
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
              <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-full border-2 border-amber-500/60 bg-gradient-to-br from-amber-500/10 to-amber-600/5 shadow-lg shadow-amber-500/20">
                <ChefHat
                  className="w-6 h-6 text-amber-400"
                  aria-hidden="true"
                />
                <Sparkles
                  className="absolute -top-1 -right-1 w-3 h-3 text-amber-400"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-amber-400 leading-tight">
                  Chef Henrique
                </span>
                <span className="text-[10px] text-amber-500/60 font-light tracking-widest uppercase">
                  Gastronomia Premium
                </span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
              Transformando ingredientes em experiências únicas através da
              gastronomia contemporânea com sabores que contam histórias.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center justify-center md:justify-start gap-2">
              <span
                className="h-px w-8 bg-gradient-to-r from-amber-500 to-transparent"
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
                      className="text-neutral-400 hover:text-amber-500 transition-colors text-sm hover:translate-x-1 inline-block"
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
                className="h-px w-8 bg-gradient-to-r from-amber-500 to-transparent"
                aria-hidden="true"
              />
              Redes Sociais
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
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
                    bg-neutral-900/50 border border-neutral-800
                    text-neutral-400 ${social.color}
                    transition-all duration-300
                    hover:scale-110 hover:border-current
                    hover:shadow-lg hover:shadow-current/20
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
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
        <div className="border-t border-neutral-800/50 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            {/* Copyright */}
            <p className="text-neutral-500 text-center sm:text-left">
              &copy; {currentYear} Chef Henrique. Todos os direitos reservados.
            </p>

            {/* Made with love */}
            <p className="text-neutral-600 flex items-center gap-2 text-xs sm:text-sm">
              <span>Desenvolvido com</span>
              <Heart
                className="w-4 h-4 text-red-500 animate-pulse"
                aria-hidden="true"
              />
              <span>por</span>
              <a
                href="https://portfolio-jorge-fullstack.vercel.app/#home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 font-semibold underline underline-offset-2 transition-colors"
              >
                Jorge Oliveira
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

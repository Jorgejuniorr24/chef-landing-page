// landing-chef/components/layout/Footer.tsx
"use client";

import { ChefHat, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-12 text-center border-t border-neutral-800 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Logo + Nome */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <ChefHat className="w-6 h-6 text-amber-500" aria-hidden="true" />
          <span className="text-xl font-serif text-amber-500">
            Chef Ricardo
          </span>
        </div>

        {/* Redes sociais */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-amber-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-amber-500 transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-amber-500 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Texto final */}
        <p className="text-neutral-500 text-sm mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-amber-500">Chef Ricardo</span>. Todos os
          direitos reservados.
        </p>
        <p className="text-neutral-600 text-xs">
          Desenvolvido com <span className="text-amber-500">paixão</span> pela
          gastronomia.
        </p>
      </div>

      {/* Efeito sutil no rodapé */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent pointer-events-none" />
    </footer>
  );
}

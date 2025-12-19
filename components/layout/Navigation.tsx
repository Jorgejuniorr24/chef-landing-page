// landing-chef/components/layout/Navigation.tsx
"use client";

import { memo } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface NavigationProps {
  onNavigate: (id: string) => void;
  mobile?: boolean;
}

interface NavLink {
  id: string;
  label: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const NAV_LINKS: readonly NavLink[] = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "pratos", label: "Pratos" },
  { id: "contato", label: "Contato" },
] as const;

// ============================================================================
// COMPONENT
// ============================================================================

export const Navigation = memo<NavigationProps>(
  ({ onNavigate, mobile = false }) => {
    const handleClick = (id: string) => {
      console.log("🔍 Navegando para:", id);
      const element = document.getElementById(id);
      console.log("📍 Elemento encontrado:", element);
      onNavigate(id);
    };

    if (mobile) {
      return (
        <nav
          className="space-y-2.5"
          role="navigation"
          aria-label="Navegação mobile"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="
            group relative block w-full text-left
            px-4 py-2.5
            rounded-lg
            text-sm sm:text-[15px] font-medium
            text-white
            hover:text-amber-300
            bg-neutral-900/70 hover:bg-neutral-900
            border border-neutral-700/60 hover:border-amber-500/60
            shadow-sm hover:shadow-md
            transition-all duration-200
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-amber-500
            focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
          "
            >
              <span className="relative z-10">{link.label}</span>

              {/* glow suave no hover */}
              <div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-hidden="true"
              />
            </button>
          ))}
        </nav>
      );
    }

    // Desktop Navigation
    return (
      <nav
        className="flex items-center space-x-8"
        role="navigation"
        aria-label="Navegação principal"
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => handleClick(link.id)}
            className="group relative text-neutral-300 hover:text-amber-400 transition-colors duration-300 font-medium text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded px-2 py-1"
          >
            {link.label}
            <span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 rounded-full"
              aria-hidden="true"
            />
          </button>
        ))}
      </nav>
    );
  }
);

Navigation.displayName = "Navigation";

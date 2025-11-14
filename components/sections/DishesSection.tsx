// landing-chef/components/sections/DishesSection.tsx
"use client";

import { ArrowRight, Sparkles, ChefHat, Utensils } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// Types
interface Dish {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

interface DishesSectionProps {
  className?: string;
}

// Constants
const INTERSECTION_THRESHOLD = 0.1;
const ANIMATION_STAGGER_DELAY = 100;

const dishes: Dish[] = [
  {
    id: 1,
    name: "Risoto de Frutos do Mar",
    category: "principal",
    description:
      "Arroz arbóreo cremoso com frutos do mar frescos e toque de limão siciliano",
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826923c?w=800&q=80",
  },
  {
    id: 2,
    name: "Tartar de Atum",
    category: "entrada",
    description:
      "Atum fresco em cubos com abacate, molho ponzu e gergelim tostado",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800",
  },
  {
    id: 3,
    name: "Filé ao Molho de Vinho",
    category: "principal",
    description:
      "Filé mignon ao ponto com redução de vinho tinto e legumes assados",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800",
  },
  {
    id: 4,
    name: "Panna Cotta",
    category: "sobremesa",
    description: "Sobremesa italiana clássica com calda de frutas vermelhas",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
  },
];

// Category colors mapping
const categoryColors: Record<string, string> = {
  entrada: "from-emerald-500 to-teal-500",
  principal: "from-amber-500 to-orange-500",
  sobremesa: "from-pink-500 to-rose-500",
};

export default function DishesSection({ className = "" }: DishesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll suave otimizado
  const scrollToContact = useCallback(() => {
    const element = document.getElementById("contato");
    if (!element) {
      console.warn('Element with id "contato" not found');
      return;
    }

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  // Intersection Observer para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionClasses = `
    py-16 sm:py-20 md:py-24 lg:py-28 
    relative overflow-hidden
    ${className}
  `.trim();

  const headerClasses = `
    text-center mb-12 sm:mb-16
    transition-all duration-700
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
  `.trim();

  return (
    <section
      ref={sectionRef}
      id="pratos"
      className={sectionClasses}
      aria-labelledby="dishes-heading"
    >
      {/* Background com gradientes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-800/95 to-neutral-900"
        aria-hidden="true"
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(245 158 11) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={headerClasses}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat
              className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500"
              aria-hidden="true"
            />
            <h2
              id="dishes-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500"
            >
              Pratos Assinatura
            </h2>
          </div>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Criações que celebram ingredientes premium e técnicas refinadas
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span
              className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"
              aria-hidden="true"
            />
            <Utensils
              className="w-4 h-4 text-amber-500 animate-pulse"
              aria-hidden="true"
            />
            <span
              className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          {dishes.map((dish, index) => {
            const isHovered = hoveredIndex === index;
            const categoryColor =
              categoryColors[dish.category] || "from-amber-500 to-orange-500";

            return (
              <article
                key={dish.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative cursor-pointer
                  transition-all duration-500
                  hover:-translate-y-2
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{
                  transitionDelay: `${index * ANIMATION_STAGGER_DELAY}ms`,
                }}
                aria-label={`${dish.name} - ${dish.category}`}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-4 h-72 sm:h-80 shadow-xl shadow-neutral-900/50 group-hover:shadow-2xl group-hover:shadow-amber-500/20 transition-shadow duration-500">
                  {/* Image */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient Overlay - sempre visível no mobile, hover no desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`
                          inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold
                          bg-gradient-to-r ${categoryColor}
                          text-white shadow-lg
                          capitalize
                        `}
                      >
                        {dish.category}
                      </span>
                    </div>

                    {/* Content on hover/mobile */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                        {dish.name}
                      </h3>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                        {dish.description}
                      </p>

                      {/* View More Indicator */}
                      <div className="flex items-center gap-2 text-amber-500 text-sm font-medium opacity-0 sm:group-hover:opacity-100 translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div
                    className={`
                    absolute top-0 left-0 w-20 h-20
                    bg-gradient-to-br ${categoryColor}
                    opacity-0 group-hover:opacity-20
                    transition-opacity duration-500
                    -translate-x-10 -translate-y-10 rotate-45
                  `}
                    aria-hidden="true"
                  />
                </div>

                {/* Info below image (desktop) */}
                <div className="hidden sm:block">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`
          text-center
          transition-all duration-700 delay-500
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {/* Decorative text */}
          <p className="text-neutral-500 text-sm sm:text-base mb-6">
            Conheça nosso cardápio completo e personalize sua experiência
          </p>

          {/* CTA Button Premium */}
          <button
            onClick={scrollToContact}
            className="
              group/cta relative inline-flex items-center gap-3
              bg-gradient-to-r from-amber-500 to-amber-600
              hover:from-amber-400 hover:to-amber-500
              text-neutral-950 px-8 sm:px-10 py-3 sm:py-4
              rounded-full font-bold text-sm sm:text-base
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-amber-500 focus-visible:ring-offset-2 
              focus-visible:ring-offset-neutral-800
              overflow-hidden
              touch-manipulation
            "
            aria-label="Ver cardápio completo e solicitar orçamento"
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"
              aria-hidden="true"
            />

            <span className="relative z-10">Ver Cardápio Completo</span>
            <ArrowRight
              className="relative z-10 w-5 h-5 group-hover/cta:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs sm:text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Ingredientes Frescos</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Técnicas Refinadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Apresentação Impecável</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

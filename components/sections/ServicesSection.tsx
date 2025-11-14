// landing-chef/components/sections/ServicesSection.tsx
"use client";

import {
  Users,
  Utensils,
  ChefHat,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// Types
interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface ServicesSectionProps {
  className?: string;
}

// Constants
const INTERSECTION_THRESHOLD = 0.1;
const ANIMATION_STAGGER_DELAY = 100;

const services: Service[] = [
  {
    icon: <Users className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />,
    title: "Jantares Privativos",
    description:
      "Experiências gastronômicas exclusivas no conforto da sua casa, com menu personalizado e serviço completo de alta qualidade.",
    features: ["Menu Personalizado", "Serviço Completo", "Chef in House"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Utensils className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />,
    title: "Eventos Corporativos",
    description:
      "Catering sofisticado para eventos empresariais, lançamentos de produtos e celebrações corporativas especiais.",
    features: [
      "Catering Premium",
      "Eventos Customizados",
      "Equipe Profissional",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <ChefHat className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />,
    title: "Aulas de Culinária",
    description:
      "Aprenda técnicas profissionais e segredos culinários em workshops exclusivos e personalizados para todos os níveis.",
    features: ["Técnicas Profissionais", "Hands-on Experience", "Certificado"],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <Sparkles className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />,
    title: "Consultoria Gastronômica",
    description:
      "Desenvolvimento de cardápios, treinamento de equipes e consultoria completa para restaurantes e estabelecimentos.",
    features: ["Desenvolvimento de Menu", "Treinamento", "Otimização"],
    color: "from-pink-500 to-purple-500",
  },
];

export default function ServicesSection({
  className = "",
}: ServicesSectionProps) {
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
      id="servicos"
      className={sectionClasses}
      aria-labelledby="services-heading"
    >
      {/* Background com gradientes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950"
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
        className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={headerClasses}>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500"
          >
            Serviços Exclusivos
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Experiências gastronômicas personalizadas para cada ocasião
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span
              className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"
              aria-hidden="true"
            />
            <Sparkles
              className="w-4 h-4 text-amber-500 animate-pulse"
              aria-hidden="true"
            />
            <span
              className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <article
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative
                  bg-gradient-to-br from-neutral-800/70 to-neutral-900/70
                  backdrop-blur-sm border border-neutral-700/50
                  p-6 sm:p-8 rounded-2xl
                  transition-all duration-500
                  hover:-translate-y-2 hover:border-amber-500/50
                  hover:shadow-2xl hover:shadow-amber-500/20
                  flex flex-col items-center text-center
                  cursor-pointer
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{
                  transitionDelay: `${index * ANIMATION_STAGGER_DELAY}ms`,
                }}
                aria-label={service.title}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10
                    bg-gradient-to-br ${service.color}
                    transition-opacity duration-500
                  `}
                  aria-hidden="true"
                />

                {/* Icon container with gradient background */}
                <div
                  className={`
                  relative mb-6
                  p-4 rounded-xl
                  bg-gradient-to-br ${service.color}
                  shadow-lg shadow-amber-500/20
                  transition-all duration-500
                  group-hover:scale-110 group-hover:rotate-6
                  group-hover:shadow-xl group-hover:shadow-amber-500/30
                `}
                >
                  <div className="text-white relative z-10">{service.icon}</div>

                  {/* Animated ring */}
                  <div
                    className={`
                    absolute inset-0 rounded-xl
                    border-2 border-white/20
                    scale-0 group-hover:scale-110
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                  `}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 w-full mt-auto">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300"
                    >
                      <Check
                        className="w-4 h-4 text-amber-500 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover indicator */}
                <div
                  className={`
                  absolute bottom-4 left-1/2 -translate-x-1/2
                  flex items-center gap-2
                  text-amber-500 text-sm font-medium
                  opacity-0 group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-300
                `}
                >
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
            Pronto para transformar sua experiência gastronômica?
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
              focus-visible:ring-offset-neutral-950
              overflow-hidden
              touch-manipulation
            "
            aria-label="Solicitar orçamento para serviços gastronômicos"
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"
              aria-hidden="true"
            />

            <span className="relative z-10">Solicitar Orçamento</span>
            <ArrowRight
              className="relative z-10 w-5 h-5 group-hover/cta:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs sm:text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Atendimento Personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Ingredientes Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Experiência Única</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

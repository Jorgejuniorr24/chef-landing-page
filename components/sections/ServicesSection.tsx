// landing-chef/components/sections/ServicesSection.tsx
"use client";

import { Users, Utensils, ChefHat, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
    title: "Jantares Privativos",
    description:
      "Experiências gastronômicas exclusivas no conforto da sua casa, com menu personalizado e serviço completo de alta qualidade.",
    features: ["Menu Personalizado", "Serviço Completo", "Chef in House"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Utensils className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
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
    icon: <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
    title: "Aulas de Culinária",
    description:
      "Aprenda técnicas profissionais e segredos culinários em workshops exclusivos e personalizados para todos os níveis.",
    features: ["Técnicas Profissionais", "Hands-on Experience", "Certificado"],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
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
          {/* ✅ MUDANÇA 7: Removido link/clicável do título */}
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
            <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span
              className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Services Grid - ✅ MUDANÇA 6: Ícones menores, layout mais proporcional */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
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

                {/* ✅ MUDANÇA 6: Icon container menor e mais elegante */}
                <div
                  className={`
                  relative mb-5
                  p-3 rounded-lg
                  bg-gradient-to-br ${service.color}
                  shadow-md shadow-amber-500/15
                  transition-all duration-500
                  group-hover:scale-105 group-hover:rotate-3
                  group-hover:shadow-lg group-hover:shadow-amber-500/25
                `}
                >
                  <div className="text-white relative z-10">{service.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-3 sm:mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* ✅ MUDANÇA 7: Removido "Saiba mais" e indicador de hover */}
              </article>
            );
          })}
        </div>

        {/* ✅ MUDANÇA 6 e 7: Removido CTA Section completa (botões e trust indicators) */}
      </div>
    </section>
  );
}

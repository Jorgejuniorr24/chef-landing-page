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
    color: "from-emerald-500 to-emerald-600",
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
    color: "from-emerald-600 to-emerald-700",
  },
  {
    icon: <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
    title: "Aulas de Culinária",
    description:
      "Aprenda técnicas profissionais e segredos culinários em workshops exclusivos e personalizados para todos os níveis.",
    features: ["Técnicas Profissionais", "Hands-on Experience", "Certificado"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />,
    title: "Consultoria Gastronômica",
    description:
      "Desenvolvimento de cardápios, treinamento de equipes e consultoria completa para restaurantes e estabelecimentos.",
    features: ["Desenvolvimento de Menu", "Treinamento", "Otimização"],
    color: "from-teal-600 to-emerald-600",
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
    bg-gradient-to-b from-white to-slate-50
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
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(5 150 105) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={headerClasses}>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600"
          >
            Serviços Exclusivos
          </h2>
          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Experiências gastronômicas personalizadas para cada ocasião
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span
              className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-600"
              aria-hidden="true"
            />
            <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span
              className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-600"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            return (
              <article
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative
                  bg-white
                  backdrop-blur-sm border border-slate-200/60
                  p-6 sm:p-8 rounded-2xl
                  transition-all duration-500
                  hover:-translate-y-2 hover:border-emerald-500/50
                  hover:shadow-2xl hover:shadow-emerald-500/15
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
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5
                    bg-gradient-to-br ${service.color}
                    transition-opacity duration-500
                  `}
                  aria-hidden="true"
                />

                {/* Icon container */}
                <div
                  className={`
                  relative mb-5
                  p-3 rounded-lg
                  bg-gradient-to-br ${service.color}
                  shadow-md shadow-emerald-500/15
                  transition-all duration-500
                  group-hover:scale-105 group-hover:rotate-3
                  group-hover:shadow-lg group-hover:shadow-emerald-500/25
                `}
                >
                  <div className="text-white relative z-10">{service.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-grow">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

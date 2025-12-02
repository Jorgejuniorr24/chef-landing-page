// landing-chef/components/sections/AboutSection.tsx
"use client";

import {
  Clock,
  Calendar,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// Types
interface Stat {
  number: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Skill {
  name: string;
  level: number;
}

interface AboutSectionProps {
  className?: string;
}

// Constants
const INTERSECTION_THRESHOLD = 0.2;

const stats: Stat[] = [
  {
    number: "+2",
    label: "Anos de Experiência",
    description: "em gastronomia profissional",
    icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "+10",
    label: "Eventos Realizados",
    description: "com excelência e dedicação",
    icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
    color: "from-orange-500 to-red-500",
  },
  {
    number: "100%",
    label: "Satisfação dos Clientes",
    description: "comprometimento total",
    icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
    color: "from-red-500 to-pink-500",
  },
  {
    number: "+50",
    label: "Pessoas Atendidas",
    description: "em experiências únicas",
    icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
    color: "from-pink-500 to-purple-500",
  },
];

const skills: Skill[] = [
  { name: "Culinária Contemporânea", level: 95 },
  { name: "Harmonização de Vinhos", level: 90 },
  { name: "Gestão de Eventos", level: 88 },
  { name: "Consultoria Gastronômica", level: 92 },
];

const achievements = [
  "Formação pela UNIFACS",
  "Domínio do Inglês",
  "Especialista em Garde Manger",
  "Pós-graduação em Gestão",
];

export default function AboutSection({ className = "" }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll suave otimizado
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id "${id}" not found`);
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

  const imageWrapperClasses = `
    relative w-full h-[400px] sm:h-[500px] md:h-[600px]
    rounded-2xl overflow-hidden
    transition-all duration-700
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
  `.trim();

  const contentClasses = `
    transition-all duration-700 delay-200
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
  `.trim();

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={sectionClasses}
      aria-labelledby="about-heading"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-850 to-neutral-900"
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

      {/* Decorative blurs */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500"
          >
            Sobre o Chef
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            Conheça a trajetória de quem transforma ingredientes em experiências
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

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Image Section - Estática sem efeitos de scroll */}
          <div className="relative order-2 md:order-1">
            {/* Decorative background with gradient */}
            <div
              className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-2xl blur-xl"
              aria-hidden="true"
            />

            {/* Image container - REMOVIDO parallax/ref */}
            <div className={imageWrapperClasses}>
              <Image
                src="/images/1.jpg"
                alt="Chef Henrique Menezes em ação preparando pratos gourmet em sua cozinha profissional"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />

              {/* Image overlay gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl backdrop-blur-sm flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>Chef Certificado</span>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-neutral-900/90 backdrop-blur-sm text-amber-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm shadow-xl border border-amber-500/30 flex items-center gap-2">
                <GraduationCap
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                <span>UNIFACS</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`${contentClasses} order-1 md:order-2`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white">
                Chef Henrique Menezes
              </h3>
              <Star
                className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Com formação em{" "}
                <strong className="text-white font-semibold">
                  Gastronomia pela UNIFACS
                </strong>{" "}
                e ampla experiência entre cozinha e atendimento, Henrique
                Menezes desenvolveu uma visão completa da hospitalidade. Sua
                trajetória começou no garde manger, onde aprendeu técnica,
                organização e estética, e evoluiu para o salão, área que
                despertou seu interesse por vinhos e harmonização.
              </p>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Unindo conhecimento culinário, domínio do inglês e experiência
                direta com o público, Henrique entrega um{" "}
                <strong className="text-white font-semibold">
                  atendimento refinado e personalizado
                </strong>
                . Atua também em consultorias de cardápio, explorando
                criatividade e estratégia, e se prepara para uma pós-graduação
                em Gestão de Negócios Gastronômicos.
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-2 gap-3 my-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-800/50"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-amber-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Progress Bars */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Sparkles
                  className="w-5 h-5 text-amber-500"
                  aria-hidden="true"
                />
                Especialidades
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-300">{skill.name}</span>
                      <span className="text-amber-500 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-900/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-4 sm:p-5 bg-gradient-to-br from-neutral-900/70 to-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
                  style={{
                    transitionDelay: `${(index + 4) * 100}ms`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stat.color} transition-opacity duration-300`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
                      >
                        {stat.icon}
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                        {stat.number}
                      </p>
                    </div>
                    <p className="text-neutral-300 font-medium text-xs sm:text-sm">
                      {stat.label}
                    </p>
                    <p className="text-neutral-500 text-xs mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection("pratos")}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800 overflow-hidden touch-manipulation"
                aria-label="Ver menu de pratos do Chef Henrique"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  aria-hidden="true"
                />
                <span className="relative">Ver Menu</span>
                <ArrowRight
                  className="relative w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

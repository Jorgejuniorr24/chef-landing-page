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
  Star,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback, memo } from "react";
import Image from "next/image";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Stat {
  number: string;
  label: string;
}

interface Skill {
  name: string;
}

interface AboutSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const INTERSECTION_CONFIG = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
} as const;

const STATS: readonly Stat[] = [
  { number: "+2", label: "Anos de Experiência" },
  { number: "+5", label: "Eventos Realizados" },
  { number: "100%", label: "Satisfação dos Clientes" },
  { number: "+10", label: "Pessoas Atendidas" },
] as const;

const SKILLS: readonly Skill[] = [
  { name: "Culinária Contemporânea" },
  { name: "Harmonização de Vinhos" },
  { name: "Gestão de Eventos" },
  { name: "Consultoria Gastronômica" },
] as const;

const ACHIEVEMENTS: readonly string[] = [
  "Formação pela UNIFACS",
  "Domínio do Inglês",
  "Especialista em Garde Manger",
  "Pós-graduação em Gestão",
] as const;

const CHEF_INFO = {
  name: "Chef Henrique Menezes",
  image: "/images/1.jpg",
  badge: "Chef Certificado",
} as const;

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook para observar visibilidade de elementos com Intersection Observer
 */
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isVisible;
};

/**
 * Hook para scroll suave até seção
 */
const useSmoothScroll = () => {
  return useCallback((id: string, offset = 80) => {
    const element = document.getElementById(id);
    if (!element) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Element with id "${id}" not found`);
      }
      return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const SectionDivider = memo(() => (
  <div
    className="flex items-center justify-center gap-2 mt-4"
    role="presentation"
  >
    <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-600" />
    <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
    <span className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-600" />
  </div>
));
SectionDivider.displayName = "SectionDivider";

interface ChefImageProps {
  isVisible: boolean;
}

const ChefImage = memo<ChefImageProps>(({ isVisible }) => (
  <div className="relative order-2 md:order-1">
    {/* Decorative background */}
    <div
      className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent rounded-2xl blur-xl"
      aria-hidden="true"
    />

    <div
      className={`
    relative w-full h-[400px] sm:h-[500px] md:h-[600px]
    rounded-2xl overflow-hidden
    transition-all duration-700 transform scale-[0.8]
    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
  `}
    >
      <Image
        src={CHEF_INFO.image}
        alt={`${CHEF_INFO.name} em ação preparando pratos gourmet em sua cozinha profissional`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
        quality={90}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  </div>
));
ChefImage.displayName = "ChefImage";

interface AchievementProps {
  text: string;
}

const Achievement = memo<AchievementProps>(({ text }) => (
  <div className="flex items-center gap-2 text-sm text-slate-700 bg-white/50 rounded-lg px-3 py-2 border border-slate-200/50">
    <CheckCircle2
      className="w-4 h-4 text-emerald-600 flex-shrink-0"
      aria-hidden="true"
    />
    <span>{text}</span>
  </div>
));
Achievement.displayName = "Achievement";

interface SkillBadgeProps {
  name: string;
}

const SkillBadge = memo<SkillBadgeProps>(({ name }) => (
  <span className="flex items-center gap-1.5">
    <span className="w-1 h-1 rounded-full bg-emerald-600" aria-hidden="true" />
    {name}
  </span>
));
SkillBadge.displayName = "SkillBadge";

const StatBadge = memo<Stat>(({ number, label }) => (
  <div className="inline-flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-200/50 rounded-lg px-3 py-1.5 text-[11px] sm:text-xs">
    <span className="text-emerald-600 font-bold">{number}</span>
    <span className="text-slate-700">{label}</span>
  </div>
));
StatBadge.displayName = "StatBadge";

interface BiographyProps {
  isVisible: boolean;
}

const Biography = memo<BiographyProps>(({ isVisible }) => (
  <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
    <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
      Com formação em{" "}
      <strong className="text-slate-900 font-semibold">
        Gastronomia pela UNIFACS
      </strong>{" "}
      e ampla experiência entre cozinha e atendimento, Henrique Menezes
      desenvolveu uma visão completa da hospitalidade. Sua trajetória começou no
      garde manger, onde aprendeu técnica, organização e estética, e evoluiu
      para o salão, área que despertou seu interesse por vinhos e harmonização.
    </p>

    <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
      Unindo conhecimento culinário, domínio do inglês e experiência direta com
      o público, Henrique entrega um{" "}
      <strong className="text-slate-900 font-semibold">
        atendimento refinado e personalizado
      </strong>
      . Atua também em consultorias de cardápio, explorando criatividade e
      estratégia, e se prepara para uma pós-graduação em Gestão de Negócios
      Gastronômicos.
    </p>

    {/* Achievements Grid */}
    <div className="grid grid-cols-2 gap-3 my-6">
      {ACHIEVEMENTS.map((achievement) => (
        <Achievement key={achievement} text={achievement} />
      ))}
    </div>
  </div>
));
Biography.displayName = "Biography";

interface SkillsAndStatsProps {
  isVisible: boolean;
}

const SkillsAndStats = memo<SkillsAndStatsProps>(({ isVisible }) => (
  <div className="mb-6 space-y-3">
    {/* Skills */}
    <div>
      <h4 className="text-slate-900 font-semibold mb-2 flex items-center gap-2 text-xs sm:text-sm">
        <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
        Especialidades
      </h4>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-700">
        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} />
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="flex flex-wrap gap-2">
      {STATS.map((stat) => (
        <StatBadge key={stat.label} {...stat} />
      ))}
    </div>
  </div>
));
SkillsAndStats.displayName = "SkillsAndStats";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AboutSection({ className = "" }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, INTERSECTION_CONFIG);
  const scrollToSection = useSmoothScroll();

  const handleMenuClick = useCallback(() => {
    scrollToSection("pratos");
  }, [scrollToSection]);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={`py-12 sm:py-16 md:py-20 lg:py-22 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white ${className}`}
      aria-labelledby="about-heading"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(5 150 105) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-600/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header
          className={`
            text-center mb-12 sm:mb-16 transition-all duration-700
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600"
          >
            Sobre o Chef
          </h2>
          <SectionDivider />
        </header>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Image Section */}
          <ChefImage isVisible={isVisible} />

          {/* Content Section */}
          <div
            className={`
              order-1 md:order-2 transition-all duration-700 delay-200
              ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }
            `}
          >
            {/* Biography */}
            <Biography isVisible={isVisible} />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleMenuClick}
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label="Ver menu de pratos do Chef Henrique"
              >
                <span>Ver Menu</span>
                <ArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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

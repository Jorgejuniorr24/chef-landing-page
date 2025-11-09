// landing-chef/components/sections/ServicesSection.tsx
"use client";

import { Users, Utensils, ChefHat, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Users className="w-12 h-12" />,
    title: "Jantares Privativos",
    description:
      "Experiências gastronômicas exclusivas no conforto da sua casa, com menu personalizado e serviço completo de alta qualidade.",
  },
  {
    icon: <Utensils className="w-12 h-12" />,
    title: "Eventos Corporativos",
    description:
      "Catering sofisticado para eventos empresariais, lançamentos de produtos e celebrações corporativas especiais.",
  },
  {
    icon: <ChefHat className="w-12 h-12" />,
    title: "Aulas de Culinária",
    description:
      "Aprenda técnicas profissionais e segredos culinários em workshops exclusivos e personalizados para todos os níveis.",
  },
  {
    icon: <Sparkles className="w-12 h-12" />,
    title: "Consultoria Gastronômica",
    description:
      "Desenvolvimento de cardápios, treinamento de equipes e consultoria completa para restaurantes e estabelecimentos.",
  },
];

export default function ServicesSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="servicos" className="py-24 bg-neutral-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/95 to-neutral-950" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-amber-500">
            Serviços Exclusivos
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Experiências gastronômicas personalizadas para cada ocasião
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-neutral-800/70 backdrop-blur-sm border border-neutral-700 p-8 rounded-2xl 
              hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 
              group flex flex-col items-center text-center"
            >
              <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-4">
                {service.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToContact}
            className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 
            rounded-full font-medium transition-all transform hover:scale-105 
            shadow-lg hover:shadow-amber-500/30 focus:outline-none focus:ring-4 
            focus:ring-amber-500/50"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </section>
  );
}

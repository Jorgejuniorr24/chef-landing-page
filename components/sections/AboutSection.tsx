"use client";

import { Clock, Calendar, Globe } from "lucide-react";

const stats = [
  {
    number: "+15",
    label: "Anos de Experiência",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    number: "+300",
    label: "Eventos Realizados",
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    number: "5",
    label: "Presença em 5 Países",
    icon: <Globe className="w-8 h-8" />,
  },
];

export default function AboutSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="sobre" className="py-24 bg-neutral-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">
            Sobre o Chef
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-600/20 rounded-lg" />
            <img
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80"
              alt="Chef Ricardo"
              className="relative rounded-lg w-full h-[600px] object-cover shadow-2xl"
            />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-serif text-white mb-6">
              Chef Ricardo
            </h3>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              Com mais de 15 anos de experiência em restaurantes premiados na
              Europa e América Latina, Chef Ricardo traz uma abordagem única que
              combina técnicas clássicas com inovação contemporânea.
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              Sua filosofia culinária é baseada no respeito aos ingredientes,
              técnicas impecáveis e apresentação que transforma cada prato em
              uma obra de arte gastronômica.
            </p>

            {/* Stats */}
            <div className="space-y-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-amber-500">{stat.icon}</div>
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {stat.number}
                    </p>
                    <p className="text-neutral-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection("pratos")}
                className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-all transform hover:scale-105"
              >
                Ver Menu
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="bg-transparent border-2 border-amber-500 text-amber-500 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-white transition-all"
              >
                Agendar Experiência
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

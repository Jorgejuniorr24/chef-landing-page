"use client"; // ✅ Indica que o componente é Client Component (necessário pois usa DOM e eventos)

export default function HeroSection() {
  // ✅ Função para scroll suave entre seções
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* ✅ Background */}
      {/* ✅ Background profissional com múltiplas camadas */}
      <div className="absolute inset-0">
        {/* Imagem de fundo */}
        <img
          src="/images/2.jpg"
          alt="Chef em ação"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay com gradiente sofisticado multicamadas */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Efeito de vinheta nas bordas */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
      </div>

      {/* ✅ Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-6 mt-[12vh]">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Transformando <br />
            ingredientes em <br />
            <span className="text-amber-500">experiências únicas</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed max-w-xl">
            Chef Henrique, especialista em gastronomia contemporânea com sabores
            que contam histórias.
          </p>

          {/* ✅ MUDANÇA 5: Removido botão "Ver Menu", mantido apenas "Agendar Experiência" */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection("contato")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-xl"
            >
              Agendar Experiência
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-500 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

"use client";

const dishes = [
  {
    id: 1,
    name: "Risoto de Frutos do Mar",
    category: "principal",
    description:
      "Arroz arbóreo cremoso com frutos do mar frescos e toque de limão siciliano",
    image: "https://images.unsplash.com/photo-1476124369491-c9c155536a67?w=800",
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

export default function DishesSection() {
  return (
    <section id="pratos" className="py-24 bg-neutral-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-4">
            Pratos
          </h2>
          <p className="text-neutral-400 text-lg">
            Criações que celebram ingredientes e técnicas refinadas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {dishes.map((dish) => (
            <div key={dish.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 h-80">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {dish.name}
                    </h3>
                    <span className="text-amber-500 text-sm capitalize">
                      {dish.category}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="font-serif text-xl text-white mb-2">
                {dish.name}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {dish.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-all transform hover:scale-105">
            Ver Cardápio Completo
          </button>
        </div>
      </div>
    </section>
  );
}

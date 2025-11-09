interface NavigationProps {
  onNavigate: (id: string) => void;
  mobile?: boolean;
}

const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "pratos", label: "Pratos" },
  { id: "contato", label: "Contato" },
];

export function Navigation({ onNavigate, mobile }: NavigationProps) {
  const baseClass = mobile
    ? "block w-full text-left text-neutral-300 hover:text-amber-500 transition-colors"
    : "text-neutral-300 hover:text-amber-500 transition-colors text-sm tracking-wide";

  const containerClass = mobile ? "space-y-4" : "flex space-x-8 items-center";

  return (
    <div className={containerClass}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={baseClass}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

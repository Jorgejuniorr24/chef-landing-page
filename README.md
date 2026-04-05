🍽️ Landing Page — Chef Henrique

Landing page profissional desenvolvida para apresentação de serviços gastronômicos, com foco em performance, experiência do usuário e conversão.

Projeto ideal para chefs, restaurantes e profissionais da gastronomia que desejam uma presença digital moderna e eficiente.

📌 Visão Geral

A aplicação foi construída utilizando tecnologias modernas do ecossistema front-end, priorizando:

Performance e SEO
Design responsivo (mobile-first)
Acessibilidade (WCAG)
Código escalável e tipado
🚀 Tecnologias Utilizadas
Next.js 14 (App Router)
TypeScript
Tailwind CSS
Lucide React
Formspree
⚙️ Instalação e Execução
# 1. Clone o repositório
git clone https://github.com/seu-usuario/landing-chef.git

# 2. Acesse a pasta
cd landing-chef

# 3. Instale as dependências
npm install

# 4. Configure variáveis de ambiente
cp .env.local.example .env.local

# 5. Execute o projeto
npm run dev

🔗 Acesse: http://localhost:3000

📁 Estrutura do Projeto
src/
├── app/
│   ├── layout.tsx          # Layout global da aplicação
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   ├── Footer.tsx      # Rodapé
│   │   └── Navigation.tsx  # Navegação principal
│   │
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── DishesSection.tsx
│       └── ContactSection.tsx
✨ Funcionalidades
✅ Layout responsivo (mobile-first)
✅ Navegação suave (scroll behavior)
✅ Animações e microinterações
✅ Formulário de contato funcional
✅ Botão flutuante de WhatsApp
✅ SEO otimizado (meta tags + estrutura semântica)
✅ Alta performance (Next.js + otimizações nativas)
✅ Código tipado com TypeScript
✅ Acessibilidade (ARIA, navegação por teclado)
📬 Integração com Formulário (Formspree)
Acesse: https://formspree.io
Crie uma conta e um formulário
Copie o Form ID
Configure no .env.local:
NEXT_PUBLIC_FORMSPREE_ID=seu_form_id
Atualize o envio no componente:
const response = await fetch(
  `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
  {
    method: "POST",
    body: JSON.stringify(data),
  }
);
🎨 Customização
🎯 Cores

Edite o arquivo:

tailwind.config.ts
colors: {
  amber: {
    500: '#f59e0b',
    600: '#d97706',
  },
}
🔤 Fontes

No arquivo:

app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
📝 Conteúdo

Os dados podem ser facilmente alterados nos componentes em:

components/sections/

Você pode modificar:

Textos
Imagens
Links sociais
Informações de contato
🚀 Deploy
▲ Vercel (Recomendado)
Integração nativa com Vercel
npm i -g vercel
vercel

Ou conecte diretamente seu repositório do GitHub.

🌐 Netlify
npm run build

Deploy da pasta .next

📈 Boas Práticas Aplicadas
Estrutura baseada em componentes reutilizáveis
Separação clara de responsabilidades
Uso de variáveis de ambiente
Otimização de imagens e assets
SEO técnico (HTML semântico + metadata)
Acessibilidade (WCAG)
📞 Contato
📧 Email: contato@chefhenrique.com
📱 WhatsApp: +55 (71) 99999-9999
📸 Instagram: @chefhenrique
📄 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para utilizar, modificar e distribuir.

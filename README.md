## 🍽️ Chef Henrique | Landing Page Gastronômica

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Formspree](https://img.shields.io/badge/Formspree-Contact_Form-red?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

---

## 🌐 Deploy

👉 https://chefhenrique.vercel.app/

---

## 📌 Sobre o Projeto

Landing page profissional desenvolvida para apresentação de serviços gastronômicos, com foco em **performance**, **experiência do usuário** e **conversão**.

Ideal para chefs, restaurantes e profissionais da gastronomia que desejam uma presença digital moderna e eficiente.

Prioridades do projeto:

* ⚡ Performance e SEO
* 📱 Design responsivo (mobile-first)
* ♿ Acessibilidade (WCAG)
* 🧩 Código escalável e tipado

---

## 🚀 Tecnologias Utilizadas

* ▲ Next.js 14 (App Router)
* 🔷 TypeScript
* 🎨 Tailwind CSS
* 🔹 Lucide React (ícones)
* 📬 Formspree (formulário de contato)

---

## 💻 Como Rodar o Projeto

### 📥 Clonando o repositório
```bash
git clone https://github.com/seu-usuario/landing-chef.git
```

### 📦 Instalando dependências
```bash
cd landing-chef
npm install
```

### ⚙️ Configurando variáveis de ambiente
```bash
cp .env.local.example .env.local
```

### ▶️ Rodando o projeto
```bash
npm run dev
```

A aplicação estará disponível em:
👉 http://localhost:3000

---

## 📁 Estrutura do Projeto
```
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
```

## ✨ Funcionalidades

* 📱 Layout responsivo (mobile-first)
* 🖱️ Navegação suave (scroll behavior)
* 🎞️ Animações e microinterações
* 📬 Formulário de contato funcional
* 💬 Botão flutuante de WhatsApp
* 🔍 SEO otimizado (meta tags + estrutura semântica)
* ⚡ Alta performance (Next.js + otimizações nativas)
* 🔷 Código tipado com TypeScript
* ♿ Acessibilidade (ARIA, navegação por teclado)

---

## 📬 Integração com Formspree

1. Acesse: https://formspree.io
2. Crie uma conta e um formulário
3. Copie o **Form ID** gerado

Configure no `.env.local`:
```env
NEXT_PUBLIC_FORMSPREE_ID=seu_form_id
```

Atualize o envio no componente:
```ts
const response = await fetch(
  `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
  {
    method: "POST",
    body: JSON.stringify(data),
  }
);
```

---

## 🎨 Customização

### 🎯 Cores

Edite o arquivo `tailwind.config.ts`:
```ts
colors: {
  amber: {
    500: '#f59e0b',
    600: '#d97706',
  },
}
```

### 🔤 Fontes

No arquivo `app/layout.tsx`:
```ts
import { Inter, Playfair_Display } from "next/font/google";
```

### 📝 Conteúdo

Os dados podem ser alterados diretamente nos componentes em `components/sections/`. Você pode modificar:

* Textos e imagens
* Links sociais
* Informações de contato

---

## 🚀 Deploy

### ▲ Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

Ou conecte diretamente seu repositório no GitHub.

### 🌐 Netlify
```bash
npm run build
```

Faça o deploy da pasta `.next`.

---

## 📈 Boas Práticas Aplicadas

* 🧩 Estrutura baseada em componentes reutilizáveis
* 🗂️ Separação clara de responsabilidades
* 🔐 Uso de variáveis de ambiente
* 🖼️ Otimização de imagens e assets
* 🔍 SEO técnico (HTML semântico + metadata)
* ♿ Acessibilidade (WCAG)

---

## 📞 Contato

* 📧 Email: contato@chefhenrique.com
* 💬 WhatsApp: +55 (71) 99999-9999
* 📸 Instagram: @chefhenrique

---

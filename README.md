# 🍽️ Landing Page - Chef Ricardo

Landing page profissional para chef de cozinha, desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)
- **Formspree** (formulário de contato)

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/landing-chef.git

# 2. Instale as dependências
npm install

# 3. Configure o .env.local
cp .env.local.example .env.local
# Edite o arquivo e adicione suas credenciais

# 4. Execute o projeto
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🎨 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Homepage
│   └── globals.css         # Estilos globais
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Cabeçalho
│   │   ├── Footer.tsx      # Rodapé
│   │   └── Navigation.tsx  # Navegação
│   │
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── DishesSection.tsx
│       └── ContactSection.tsx
```

## ⚙️ Configuração do Formspree

1. Acesse [formspree.io](https://formspree.io/)
2. Crie uma conta e um novo formulário
3. Copie o Form ID
4. Adicione no `.env.local`:

```
   NEXT_PUBLIC_FORMSPREE_ID=seu_form_id
```

5. Atualize o action do formulário em `ContactSection.tsx`:

```typescript
   const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
```

## 🎯 Features

- ✅ Design responsivo (mobile-first)
- ✅ Navegação suave entre seções
- ✅ Animações e efeitos hover
- ✅ Formulário de contato integrado
- ✅ Botão WhatsApp flutuante
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ TypeScript (type-safe)
- ✅ Acessibilidade (ARIA labels)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Faça o deploy
vercel
```

Ou conecte seu repositório GitHub direto na [Vercel](https://vercel.com).

### Netlify

```bash
# 1. Build
npm run build

# 2. Deploy a pasta .next
```

## 📝 Customização

### Alterar Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  amber: {
    500: '#f59e0b', // Cor principal
    600: '#d97706', // Hover
  },
},
```

### Alterar Fontes

Edite `app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from "next/font/google";
```

### Alterar Conteúdo

Edite os componentes em `components/sections/`:

- Textos
- Imagens
- Links das redes sociais
- Informações de contato

## 📧 Contato

- **Email**: contato@chefricardo.com
- **WhatsApp**: +55 (71) 99999-9999
- **Instagram**: [@chefricardo](https://instagram.com/chefricardo)

## 📄 Licença

MIT License - Sinta-se livre para usar este projeto.

---

Desenvolvido com ❤️ e ☕

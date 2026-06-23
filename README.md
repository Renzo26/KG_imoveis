# KG Imóveis

Modernização do site da **KG Imóveis**, imobiliária de Santo André/SP (no mercado desde 2004).
Single Page Application com estética premium (referência *Elyse Residence*), animações de
entrada, scroll suave e transições de página.

## Tecnologias

- **React 18** + **Vite** + **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens em `src/index.css`)
- **GSAP** — animação de entrada e reveals no scroll
- **Lenis** — scroll suave
- **Framer Motion** — transições de página (SPA) e dropdowns animados
- **React Router** — roteamento
- **Three.js** + **@react-three/fiber** — campo de partículas no hero (code-split)

## Como rodar

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # build de produção (typecheck + bundle)
npm run preview  # pré-visualiza o build de produção
```

## Estrutura

```
src/
  components/   # layout (header/footer), ui (dropdown, card, stepper...), home, three
  data/         # dados mockados (imóveis) e informações da empresa
  lib/          # scroll suave + reveals (GSAP/Lenis) e formatação
  pages/        # Home, listagem, ficha do imóvel, empresa, contato, formulários...
```

## Páginas

Home · Imóveis (venda / locação / lançamentos) com filtros · Ficha individual do imóvel ·
Empresa · Cadastre seu Imóvel · Encontre seu Imóvel · Simuladores · Contato.

> Os imóveis são **dados mockados** (`src/data/properties.ts`) — placeholder até integração
> com a fonte real (ex.: feed da plataforma de gestão imobiliária).

# Portfólio — Davi Morais

Portfólio pessoal de **Davi Morais**, Desenvolvedor Full-Stack (Node.js, TypeScript, React, n8n) em Fortaleza/CE.

🔗 **Online:** https://davim187.github.io/portfolio/

## Seções

- **Início** — apresentação, links sociais e download do currículo
- **Sobre** — resumo profissional e números
- **Trajetória** — linha do tempo de experiência e formação
- **Projetos** — cards filtráveis (Destaques, Full-Stack, Front-end, Todos)
- **Stack** — tecnologias agrupadas por área
- **Contato** — e-mail, WhatsApp e LinkedIn

## Tecnologias

[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/), com animações em [Motion](https://motion.dev/).

- **Paleta de comandos** (`Ctrl K` / `⌘ K` ou `/`): navega pelas seções, troca o tema, copia o e-mail, baixa o currículo e abre links e projetos
- **Davi em pixel art** espalhado pelo site e um **mini Davi** que fica no canto da tela: dá para arrastar, ele comenta a seção que você está vendo e pode ser escondido ou chamado de volta pela paleta (sprites em `public/assets/pixel/`)
- Animações de entrada e de scroll, barra de progresso, foto com efeito 3D, botões magnéticos e brilho que segue o cursor (tudo respeitando `prefers-reduced-motion`)
- Tema claro/escuro com preferência salva no navegador
- Layout responsivo com menu mobile
- Ícones: [Boxicons](https://boxicons.com/) e [Simple Icons](https://simpleicons.org/)

## Rodando localmente

```bash
npm install
npm run dev
```

Para gerar e testar a versão de produção:

```bash
npm run build
npm run preview
```

O deploy no GitHub Pages é feito automaticamente pelo GitHub Actions (`.github/workflows/deploy.yml`) a cada push na `master`.

## Como editar

Todo o conteúdo (perfil, experiências, projetos e tecnologias) fica em `src/data/content.ts`. Para adicionar um projeto, inclua um objeto no array `projects` com `title`, `date`, `description`, `tech`, `category`, `links` e `image` (ou `cover` para uma capa gerada automaticamente). Imagens e arquivos estáticos ficam em `public/`.

## Currículo

O `public/Currículo.pdf` é gerado a partir de `curriculo/curriculo.html`. Depois de editar o HTML, gere o PDF novamente:

```bash
google-chrome --headless=new --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="public/Currículo.pdf" "file://$PWD/curriculo/curriculo.html"
```

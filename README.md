# Portfólio — Davi Morais

Portfólio pessoal de **Davi Morais**, Desenvolvedor Full-Stack (Node.js, TypeScript, React, n8n) em Fortaleza/CE.

🔗 **Online:** https://davim187.github.io/portifolio/

## Seções

- **Início** — apresentação, links sociais e download do currículo
- **Sobre** — resumo profissional e números
- **Trajetória** — linha do tempo de experiência e formação
- **Projetos** — cards filtráveis (Destaques, Full-Stack, Front-end, Todos)
- **Stack** — tecnologias agrupadas por área
- **Contato** — e-mail, WhatsApp e LinkedIn

## Tecnologias

HTML, CSS e JavaScript puros, sem etapa de build — pronto para o GitHub Pages.

- Tema claro/escuro com preferência salva no navegador
- Layout responsivo com menu mobile
- Animações de entrada com `IntersectionObserver` (respeitando `prefers-reduced-motion`)
- Ícones: [Boxicons](https://boxicons.com/) e [Simple Icons](https://simpleicons.org/)

## Como editar

Projetos e tecnologias ficam em arrays no início do `script.js` (`projects` e `skillGroups`). Para adicionar um projeto, inclua um objeto com `title`, `date`, `description`, `tech`, `category`, `links` e `image` (ou `cover` para uma capa gerada automaticamente).

## Currículo

O `Currículo.pdf` é gerado a partir de `curriculo/curriculo.html`. Depois de editar o HTML, gere o PDF novamente:

```bash
google-chrome --headless=new --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="Currículo.pdf" "file://$PWD/curriculo/curriculo.html"
```

## Rodando localmente

```bash
python3 -m http.server 8080
```

Depois acesse http://localhost:8080.

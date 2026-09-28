const projects = [
  {
    title: "Site Paroquial",
    date: "Set 2026",
    description:
      "Site público e painel administrativo para a Paróquia Nossa Senhora das Graças. Monorepo com API REST, controle de acesso por perfis (RBAC), agenda de missas e avisos, upload de mídia com conversão para WebP e thumbnails, documentação Swagger e deploy automatizado.",
    tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "React", "Vite", "Turborepo", "Docker", "GitHub Actions"],
    category: ["fullstack"],
    featured: true,
    badge: "Novo",
    cover: { icon: "bx bxs-church", label: "apps/api · apps/web", colors: ["#38bdf8", "#818cf8"] },
    links: [{ label: "Código", url: "https://github.com/Davim187/siteParoquial", icon: "bx bxl-github" }],
  },
  {
    title: "InfoUniformes",
    date: "Fev 2026",
    description:
      "Sistema de pedidos de uniformes com formulário por tamanho, sincronização em tempo real via Firestore, área administrativa protegida com visualização em planilha e exportação para Excel.",
    tech: ["React 19", "Vite", "Tailwind CSS 4", "Firebase", "ExcelJS"],
    category: ["frontend"],
    featured: true,
    cover: { icon: "bx bxs-t-shirt", label: "pedidos em tempo real", colors: ["#22d3ee", "#f59e0b"] },
    links: [
      { label: "Demo", url: "https://davim187.github.io/InfoUniformes/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/InfoUniformes", icon: "bx bxl-github" },
    ],
  },
  {
    title: "pass.in — NLW Unite",
    date: "Abr 2024",
    description:
      "Aplicação full-stack de gestão de participantes em eventos com check-in. API em Fastify com validação Zod, Prisma e documentação Swagger, e front-end em React + TypeScript com listagem paginada e busca.",
    tech: ["Node.js", "TypeScript", "Fastify", "Zod", "Prisma", "Swagger", "React", "Tailwind CSS"],
    category: ["fullstack"],
    featured: true,
    cover: { icon: "bx bxs-id-card", label: "check-in de eventos", colors: ["#818cf8", "#ec4899"] },
    links: [
      { label: "API", url: "https://github.com/Davim187/NLWUnite_Node", icon: "bx bxl-github" },
      { label: "Web", url: "https://github.com/Davim187/NLWUnite_React", icon: "bx bxl-github" },
    ],
  },
  {
    title: "Todo List TypeScript",
    date: "Mar 2024",
    description: "Lista de tarefas em React com TypeScript, praticando tipagem de componentes, props e estado.",
    tech: ["React", "TypeScript"],
    category: ["frontend"],
    cover: { icon: "bx bx-task", label: "tipagem forte", colors: ["#3178c6", "#38bdf8"] },
    links: [{ label: "Código", url: "https://github.com/Davim187/TodoListTypeScript", icon: "bx bxl-github" }],
  },
  {
    title: "Mario",
    date: "Mai 2023",
    description:
      "Jogo simples do Mario em que o jogador controla o personagem para evitar obstáculos. Desenvolvido apenas com JavaScript.",
    tech: ["JavaScript", "HTML", "CSS"],
    category: ["frontend"],
    image: "assets/Mario.png",
    links: [
      { label: "Demo", url: "https://davim187.github.io/Mario/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/Mario", icon: "bx bxl-github" },
    ],
  },
  {
    title: "StartSom",
    date: "Nov 2022",
    description:
      "Plataforma em React para ensino de violão, com cadastro e login de usuários e lista de tarefas para organizar o aprendizado.",
    tech: ["React", "JavaScript"],
    category: ["frontend"],
    image: "assets/startSom.png",
    links: [
      { label: "Demo", url: "https://davim187.github.io/StartSom/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/StartSom", icon: "bx bxl-github" },
    ],
  },
  {
    title: "Calcular Média",
    date: "Out 2022",
    description: "Aplicação que calcula a média de alunos e persiste os dados com localStorage.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: ["frontend"],
    image: "assets/CalcularMedia.png",
    links: [
      { label: "Demo", url: "https://davim187.github.io/TableAluno/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/TableAluno", icon: "bx bxl-github" },
    ],
  },
  {
    title: "Calculadora de Idade",
    date: "Out 2022",
    description: "Aplicativo que calcula a idade do usuário a partir da data de nascimento.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: ["frontend"],
    image: "assets/CalcularImage.png",
    links: [
      { label: "Demo", url: "https://davim187.github.io/Calcular-idade/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/Calcular-idade", icon: "bx bxl-github" },
    ],
  },
  {
    title: "HostDev",
    date: "Set 2022",
    description: "Landing page de serviços de hospedagem de sites e registro de domínios.",
    tech: ["HTML", "CSS"],
    category: ["frontend"],
    image: "assets/HostDev.png",
    links: [
      { label: "Demo", url: "https://davim187.github.io/HostDev/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/HostDev", icon: "bx bxl-github" },
    ],
  },
];

// `invert` marca ícones de marca escuros que somem no tema escuro.
const skillGroups = [
  {
    title: "Back-end",
    icon: "bx bx-server",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Fastify", slug: "fastify", invert: true },
      { name: "Prisma", slug: "prisma", invert: true },
      { name: "Zod", slug: "zod" },
      { name: "BullMQ", slug: "redis" },
      { name: "PHP", slug: "php" },
      { name: "Python", slug: "python" },
    ],
  },
  {
    title: "Front-end & Mobile",
    icon: "bx bx-layout",
    items: [
      { name: "React", slug: "react" },
      { name: "React Native", slug: "react" },
      { name: "React Query", slug: "reactquery" },
      { name: "Vite", slug: "vite" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "JavaScript", slug: "javascript" },
      { name: "HTML", slug: "html5" },
      { name: "CSS", slug: "css" },
    ],
  },
  {
    title: "Dados",
    icon: "bx bx-data",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "Redis", slug: "redis" },
      { name: "Firebase", slug: "firebase" },
    ],
  },
  {
    title: "Automação & Integrações",
    icon: "bx bx-git-merge",
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "WhatsApp Cloud API", slug: "whatsapp" },
      { name: "APIs REST", icon: "bx bx-transfer-alt" },
      { name: "Webhooks", icon: "bx bx-broadcast" },
    ],
  },
  {
    title: "DevOps & Ferramentas",
    icon: "bx bx-cog",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { name: "PM2", slug: "pm2", invert: true },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Git", slug: "git" },
      { name: "GitLab", slug: "gitlab" },
      { name: "Turborepo", slug: "turborepo" },
    ],
  },
];

const roles = [
  "Desenvolvedor Full-Stack",
  "APIs com Node.js + TypeScript",
  "Automações com n8n",
  "Filas com BullMQ + Redis",
  "Interfaces em React",
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function renderCover(project) {
  const badge = project.badge ? `<span class="project-badge">${escapeHtml(project.badge)}</span>` : "";

  if (project.image) {
    return `
      <div class="project-cover">
        ${badge}
        <img src="${project.image}" alt="Captura de tela do projeto ${escapeHtml(project.title)}" loading="lazy" />
      </div>`;
  }

  const { icon, label, colors } = project.cover;
  return `
    <div class="project-cover generated" style="--cover-a:${colors[0]};--cover-b:${colors[1]}">
      ${badge}
      <i class="${icon}" aria-hidden="true"></i>
      <span class="cover-label">${escapeHtml(label)}</span>
    </div>`;
}

function renderProjects(filter) {
  const container = document.getElementById("projects-container");
  const visible = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    return p.category.includes(filter);
  });

  container.innerHTML = visible
    .map(
      (project, index) => `
      <article class="project-card" style="animation-delay:${index * 70}ms">
        ${renderCover(project)}
        <div class="project-info">
          <span class="project-meta">${escapeHtml(project.date)}</span>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="tech-tags">
            ${project.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}
          </div>
          <div class="project-links">
            ${project.links
              .map(
                (link) =>
                  `<a href="${link.url}" target="_blank" rel="noopener"><i class="${link.icon}"></i> ${escapeHtml(link.label)}</a>`
              )
              .join("")}
          </div>
        </div>
      </article>`
    )
    .join("");
}

function renderSkills() {
  const container = document.getElementById("skills-container");

  container.innerHTML = skillGroups
    .map(
      (group) => `
      <div class="skill-group reveal">
        <h3 class="skill-group-title"><i class="${group.icon}" aria-hidden="true"></i>${escapeHtml(group.title)}</h3>
        <ul class="skill-list">
          ${group.items
            .map((item) => {
              const icon = item.slug
                ? `<img src="https://cdn.simpleicons.org/${item.slug}" alt="" loading="lazy" width="16" height="16"${item.invert ? ' class="invert-dark"' : ""} />`
                : `<i class="${item.icon}" aria-hidden="true"></i>`;
              return `<li class="skill-chip">${icon}${escapeHtml(item.name)}</li>`;
            })
            .join("")}
        </ul>
      </div>`
    )
    .join("");

  container.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => img.remove(), { once: true });
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.toggle("active", b === button);
        b.setAttribute("aria-selected", String(b === button));
      });
      renderProjects(button.dataset.filter);
    });
  });
}

function setupTyping() {
  const target = document.querySelector(".typing-text");
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = current.slice(0, charIndex);

    let delay = deleting ? 35 : 75;
    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  };

  tick();
}

function setupTheme() {
  const toggle = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    meta.setAttribute("content", theme === "dark" ? "#0b1020" : "#f7f9fc");
  };

  apply(document.documentElement.dataset.theme);

  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem("theme", next);
  });
}

function setupMenu() {
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const icon = toggle.querySelector("i");

  const setOpen = (open) => {
    navbar.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    icon.className = open ? "bx bx-x" : "bx bx-menu";
  };

  toggle.addEventListener("click", () => setOpen(!navbar.classList.contains("open")));
  navbar.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
}

function setupHeader() {
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupActiveNav() {
  const links = document.querySelectorAll(".navbar a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderProjects("featured");
  renderSkills();
  setupFilters();
  setupTyping();
  setupTheme();
  setupMenu();
  setupHeader();
  setupActiveNav();
  setupReveal();
});

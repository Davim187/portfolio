export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: "Davi Morais",
  email: "daviimorais39@gmail.com",
  whatsapp: "https://wa.me/5585985707259",
  github: "https://github.com/Davim187",
  githubUser: "Davim187",
  linkedin: "https://www.linkedin.com/in/davimorais-dev/",
  cv: asset("Currículo.pdf"),
  photo: asset("assets/fotoPerfil1.jpeg"),
  location: "Fortaleza, CE — Brasil",
};

export const roles = [
  "Desenvolvedor Full-Stack",
  "APIs com Node.js + TypeScript",
  "Automações com n8n",
  "Filas com BullMQ + Redis",
  "Interfaces em React",
];

export const sections = [
  { id: "home", label: "Início", icon: "bx bx-home-alt" },
  { id: "about", label: "Sobre", icon: "bx bx-user" },
  { id: "experience", label: "Experiência", icon: "bx bx-briefcase" },
  { id: "projects", label: "Projetos", icon: "bx bx-code-block" },
  { id: "skills", label: "Stack", icon: "bx bx-layer" },
  { id: "github", label: "GitHub", icon: "bx bxl-github" },
  { id: "contact", label: "Contato", icon: "bx bx-envelope" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const pixel = {
  standing: asset("assets/pixel/standing.webp"),
  waving: asset("assets/pixel/waving.webp"),
  laptop: asset("assets/pixel/laptop.webp"),
  buddyIdle: asset("assets/pixel/buddy-idle.webp"),
  buddyTalk: asset("assets/pixel/buddy-talk.webp"),
  buddyDrag: asset("assets/pixel/buddy-drag.webp"),
};

export const buddyLines: Record<SectionId, string[]> = {
  home: [
    "Oi! Eu sou o mini Davi. Pode me arrastar pra onde quiser.",
    "{palette}",
  ],
  about: [
    "Comecei no suporte de TI e fui migrando pro desenvolvimento. Ver o problema do lado de quem usa faz toda a diferença.",
    "Meu tipo favorito de sistema? O que roda sozinho e avisa quando algo dá errado.",
  ],
  experience: [
    "Entrei na Tijuca Alimentos como jovem aprendiz e hoje sou programador lá.",
    "Repara que a linha do tempo vai se preenchendo conforme você rola.",
  ],
  projects: [
    "O Site Paroquial é o meu xodó: API, painel administrativo e controle de acesso por perfis.",
    "Usa os filtros pra ver só os projetos full-stack ou só os de front-end.",
  ],
  skills: [
    "Meu forte é o back-end: Node.js, TypeScript, filas com BullMQ e automação com n8n.",
    "No front eu vou de React, e no mobile de React Native.",
  ],
  github: [
    "Esses quadradinhos vêm direto do meu GitHub. Quanto mais forte o tom, mais commits naquele dia.",
    "Passa o mouse no calendário pra ver o que rolou em cada dia.",
  ],
  contact: [
    "Bora conversar? Eu respondo rápido!",
    "Clica no e-mail ali no cartão que ele já vai copiado.",
  ],
};

export const stats = [
  { value: 4, label: "anos na área de TI" },
  { value: 10, label: "projetos publicados" },
  { value: 20, label: "tecnologias no dia a dia" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tech?: string[];
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    role: "Programador Júnior I",
    company: "Tijuca Alimentos",
    period: "Mar 2025 — atual",
    description:
      "Desenvolvimento full-stack de aplicações internas: APIs em Node.js + TypeScript, filas de processamento, automações com n8n, integrações com APIs de terceiros e painéis em React para acompanhar operações.",
    tech: ["Node.js", "TypeScript", "Fastify", "BullMQ", "Prisma", "React", "n8n"],
    current: true,
  },
  {
    role: "Analista de Suporte",
    company: "Tijuca Alimentos",
    period: "Jun 2024 — Jun 2025",
    description: "Suporte técnico, diagnóstico e resolução de problemas em sistemas corporativos.",
  },
  {
    role: "Jovem Aprendiz",
    company: "Tijuca Alimentos",
    period: "Mar 2023 — Jun 2024",
    description: "Suporte às demandas do setor de TI, manutenção de sistemas e atendimento a usuários internos.",
  },
  {
    role: "Estagiário de TI",
    company: "Tijuca Alimentos",
    period: "Set 2022 — Dez 2022",
    description: "Aplicação prática do curso técnico, com foco em suporte e infraestrutura de TI.",
  },
];

export const education = [
  { title: "Análise e Desenvolvimento de Sistemas", place: "UniAteneu · Concluído", icon: "bx bxs-graduation" },
  { title: "Técnico em Redes de Computadores", place: "EEEP Mário Alencar · Concluído", icon: "bx bx-network-chart" },
];

export type ProjectCategory = "fullstack" | "frontend";

export type Project = {
  title: string;
  date: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  featured?: boolean;
  badge?: string;
  image?: string;
  cover?: { icon: string; label: string; colors: [string, string] };
  links: { label: string; url: string; icon: string }[];
};

export const projects: Project[] = [
  {
    title: "GitPulse",
    date: "Set 2026",
    description:
      "Bot de Discord que recebe os webhooks do GitHub e publica cada ação do repositório em um cartão no canal: push, feature publicada, pull request, issue e resultado do GitHub Actions. Confere a assinatura X-Hub-Signature-256, conecta repositórios a canais por slash commands e usa um secret por servidor.",
    tech: ["TypeScript", "Node.js", "Discord.js", "Fastify", "Prisma", "PostgreSQL", "GitHub Webhooks"],
    category: "fullstack",
    featured: true,
    badge: "Novo",
    cover: { icon: "bx bxl-discord-alt", label: "GitHub → webhook → Discord", colors: ["#5865f2", "#24292f"] },
    links: [],
  },
  {
    title: "Site Paroquial",
    date: "Set 2026",
    description:
      "Site público e painel administrativo para a Paróquia Nossa Senhora das Graças. Monorepo com API REST, controle de acesso por perfis (RBAC), agenda de missas e avisos, upload de mídia com conversão para WebP e thumbnails, documentação Swagger e deploy automatizado.",
    tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "React", "Vite", "Turborepo", "Docker", "GitHub Actions"],
    category: "fullstack",
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
    category: "frontend",
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
    category: "fullstack",
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
    category: "frontend",
    cover: { icon: "bx bx-task", label: "tipagem forte", colors: ["#3178c6", "#38bdf8"] },
    links: [{ label: "Código", url: "https://github.com/Davim187/TodoListTypeScript", icon: "bx bxl-github" }],
  },
  {
    title: "Mario",
    date: "Mai 2023",
    description:
      "Jogo simples do Mario em que o jogador controla o personagem para evitar obstáculos. Desenvolvido apenas com JavaScript.",
    tech: ["JavaScript", "HTML", "CSS"],
    category: "frontend",
    image: asset("assets/Mario.png"),
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
    category: "frontend",
    image: asset("assets/startSom.png"),
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
    category: "frontend",
    image: asset("assets/CalcularMedia.png"),
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
    category: "frontend",
    image: asset("assets/CalcularImage.png"),
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
    category: "frontend",
    image: asset("assets/HostDev.png"),
    links: [
      { label: "Demo", url: "https://davim187.github.io/HostDev/", icon: "bx bx-link-external" },
      { label: "Código", url: "https://github.com/Davim187/HostDev", icon: "bx bxl-github" },
    ],
  },
];

export type Skill = { name: string; slug?: string; icon?: string; invert?: boolean };

// `invert` marca ícones de marca escuros que somem no tema escuro.
export const skillGroups: { title: string; icon: string; items: Skill[] }[] = [
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

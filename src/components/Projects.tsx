import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile, projects, type Project } from "../data/content";
import { Reveal, SectionHeading, trackSpotlight } from "./motion";

const filters = [
  { id: "featured", label: "Destaques" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "frontend", label: "Front-end" },
  { id: "all", label: "Todos" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function Cover({ project }: { project: Project }) {
  const badge = project.badge && <span className="project-badge">{project.badge}</span>;

  if (project.image) {
    return (
      <div className="project-cover">
        {badge}
        <img src={project.image} alt={`Captura de tela do projeto ${project.title}`} loading="lazy" />
      </div>
    );
  }

  const { icon, label, colors } = project.cover!;
  return (
    <div
      className="project-cover generated"
      style={{ "--cover-a": colors[0], "--cover-b": colors[1] } as CSSProperties}
    >
      {badge}
      <i className={icon} aria-hidden="true"></i>
      <span className="cover-label">{label}</span>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("featured");

  const visible = useMemo(
    () =>
      projects.filter((p) => {
        if (filter === "all") return true;
        if (filter === "featured") return p.featured;
        return p.category === filter;
      }),
    [filter]
  );

  return (
    <section className="projects" id="projects">
      <SectionHeading accent="projetos">Meus</SectionHeading>

      <Reveal className="filters" role="tablist" aria-label="Filtrar projetos">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`filter-btn${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {filter === f.id && (
              <motion.span
                layoutId="filter-pill"
                className="filter-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="filter-label">{f.label}</span>
          </button>
        ))}
      </Reveal>

      <motion.div layout className="projects-container">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.article
              key={project.title}
              layout
              className="project-card spotlight"
              onPointerMove={trackSpotlight}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <Cover project={project} />
              <div className="project-info">
                <span className="project-meta">{project.date}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener">
                      <i className={link.icon}></i> {link.label}
                    </a>
                  ))}
                  {project.links.length === 0 && (
                    <span className="project-private">
                      <i className="bx bx-lock-alt"></i> Código privado
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal>
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener"
          className="btn btn-ghost more-btn"
        >
          Ver todos no GitHub <i className="bx bxl-github"></i>
        </a>
      </Reveal>
    </section>
  );
}

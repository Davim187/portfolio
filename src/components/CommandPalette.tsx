import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile, projects, sections } from "../data/content";
import { scrollToSection } from "../hooks/scroll";
import type { Theme } from "../hooks/useTheme";

type Command = {
  id: string;
  group: string;
  label: string;
  icon: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onCopyEmail: () => void;
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const openUrl = (url: string) => window.open(url, "_blank", "noopener");

export function CommandPalette({ open, onClose, theme, onToggleTheme, onCopyEmail }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        group: "Navegar",
        label: `Ir para ${s.label}`,
        icon: s.icon,
        keywords: s.id,
        run: () => scrollToSection(s.id),
      })),
      {
        id: "theme",
        group: "Ações",
        label: theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro",
        icon: theme === "dark" ? "bx bx-sun" : "bx bx-moon",
        keywords: "tema dark light escuro claro modo",
        run: onToggleTheme,
      },
      {
        id: "copy-email",
        group: "Ações",
        label: "Copiar e-mail",
        icon: "bx bx-copy",
        hint: profile.email,
        keywords: "email contato",
        run: onCopyEmail,
      },
      {
        id: "cv",
        group: "Ações",
        label: "Baixar currículo",
        icon: "bx bx-download",
        hint: "PDF",
        keywords: "cv curriculo resume pdf",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.cv;
          a.download = "Currículo - Davi Morais.pdf";
          a.click();
        },
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub",
        icon: "bx bxl-github",
        hint: "Davim187",
        run: () => openUrl(profile.github),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        icon: "bx bxl-linkedin",
        hint: "davimorais-dev",
        run: () => openUrl(profile.linkedin),
      },
      {
        id: "whatsapp",
        group: "Links",
        label: "WhatsApp",
        icon: "bx bxl-whatsapp",
        hint: "(85) 98570-7259",
        keywords: "telefone zap mensagem",
        run: () => openUrl(profile.whatsapp),
      },
      {
        id: "mail",
        group: "Links",
        label: "Enviar e-mail",
        icon: "bx bxs-envelope",
        keywords: "email contato",
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      ...projects.map((p) => {
        const link = p.links.find((l) => l.label === "Demo") ?? p.links[0];
        return {
          id: `project-${p.title}`,
          group: "Projetos",
          label: p.title,
          icon: link.icon,
          hint: link.label,
          keywords: `${p.tech.join(" ")} projeto`,
          run: () => openUrl(link.url),
        };
      }),
    ],
    [theme, onToggleTheme, onCopyEmail]
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((c) => normalize(`${c.label} ${c.group} ${c.keywords ?? ""} ${c.hint ?? ""}`).includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const execute = (command?: Command) => {
    if (!command) return;
    onClose();
    // Espera o modal fechar para liberar o scroll do body antes de navegar.
    setTimeout(command.run, 80);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onKeyDown={onKeyDown}
          >
            <div className="palette-search">
              <i className="bx bx-search" aria-hidden="true"></i>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você procura? Seções, projetos, links..."
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd>Esc</kbd>
            </div>

            <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
              {filtered.length === 0 && (
                <li className="palette-empty">Nada encontrado para “{query}”.</li>
              )}
              {filtered.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && <span className="palette-group">{command.group}</span>}
                    <button
                      type="button"
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      data-index={index}
                      className={`palette-item${index === activeIndex ? " active" : ""}`}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => execute(command)}
                      tabIndex={-1}
                    >
                      {index === activeIndex && (
                        <motion.span
                          layoutId="palette-active"
                          className="palette-active"
                          transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        />
                      )}
                      <i className={command.icon} aria-hidden="true"></i>
                      <span className="palette-label">{command.label}</span>
                      {command.hint && <span className="palette-hint-text">{command.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="palette-footer">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navegar
              </span>
              <span>
                <kbd>Enter</kbd> abrir
              </span>
              <span>
                <kbd>Esc</kbd> fechar
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

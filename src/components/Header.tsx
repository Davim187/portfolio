import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sections, type SectionId } from "../data/content";
import { isMac, scrollToSection } from "../hooks/scroll";
import type { Theme } from "../hooks/useTheme";

type Props = {
  active: SectionId;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
};

export function Header({ active, theme, onToggleTheme, onOpenPalette }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: SectionId) => (e: MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      className={`header${scrolled ? " scrolled" : ""}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#home" className="logo" aria-label="Início" onClick={go("home")}>
        <span className="logo-bracket">&lt;</span>DaviMorais<span className="logo-accent">.dev</span>
        <span className="logo-bracket">/&gt;</span>
      </a>

      <nav className={`navbar${menuOpen ? " open" : ""}`} id="navbar" aria-label="Navegação principal">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active === section.id ? "active" : undefined}
            aria-current={active === section.id ? "true" : undefined}
            onClick={go(section.id)}
          >
            {active === section.id && (
              <motion.span
                layoutId="nav-pill"
                className="nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="nav-label">{section.label}</span>
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="search-btn" type="button" onClick={onOpenPalette} aria-label="Abrir paleta de comandos">
          <i className="bx bx-search" aria-hidden="true"></i>
          <span className="search-label">Buscar</span>
          <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
        </button>

        <button
          className="icon-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.i
              key={theme}
              className={theme === "dark" ? "bx bx-sun" : "bx bx-moon"}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
        </button>

        <button
          className="icon-btn menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="navbar"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
        </button>
      </div>
    </motion.header>
  );
}

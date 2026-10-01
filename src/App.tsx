import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { profile, sections, type SectionId } from "./data/content";
import { isMac } from "./hooks/scroll";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";
import { About } from "./components/About";
import { CommandPalette } from "./components/CommandPalette";
import { Contact, Footer } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CursorGlow, ScrollProgress } from "./components/motion";
import { Buddy } from "./components/Pixel";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(sectionIds) as SectionId;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>(undefined);
  const [buddyVisible, setBuddyVisible] = useState(() => localStorage.getItem("buddy-hidden") !== "1");

  const showToast = useCallback((message: string, ms = 2200) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), ms);
  }, []);

  const toggleBuddy = useCallback(() => {
    setBuddyVisible((visible) => {
      localStorage.setItem("buddy-hidden", visible ? "1" : "0");
      return !visible;
    });
  }, []);

  const hideBuddy = useCallback(() => {
    toggleBuddy();
    showToast(`Mini Davi foi descansar. Chame de volta pela busca (${isMac ? "⌘" : "Ctrl"} K).`, 4000);
  }, [toggleBuddy, showToast]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showToast("E-mail copiado!");
    } catch {
      showToast(profile.email);
    }
  }, [showToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <CursorGlow />

      <Header active={active} theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main">
        <Hero onOpenPalette={() => setPaletteOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact onCopyEmail={copyEmail} />
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onCopyEmail={copyEmail}
        buddyVisible={buddyVisible}
        onToggleBuddy={toggleBuddy}
      />

      <AnimatePresence>{buddyVisible && <Buddy active={active} onHide={hideBuddy} />}</AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
          >
            <i className="bx bx-check-circle"></i> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

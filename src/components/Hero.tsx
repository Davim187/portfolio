import type { PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { profile, roles } from "../data/content";
import { isMac, scrollToSection } from "../hooks/scroll";
import { useTyping } from "../hooks/useTyping";
import { Magnetic } from "./motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const socials = [
  { href: profile.github, label: "GitHub", icon: "bx bxl-github", external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: "bx bxl-linkedin", external: true },
  { href: `mailto:${profile.email}`, label: "E-mail", icon: "bx bxs-envelope", external: false },
  { href: profile.whatsapp, label: "WhatsApp", icon: "bx bxl-whatsapp", external: true },
];

const chips = [
  { icon: "bx bxl-nodejs", label: "Node.js", className: "chip-1" },
  { icon: "bx bxl-typescript", label: "TypeScript", className: "chip-2" },
  { icon: "bx bxl-react", label: "React", className: "chip-3" },
];

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const typed = useTyping(roles);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section className="home" id="home">
      <div className="home-bg" aria-hidden="true">
        <motion.span
          className="blob blob-1"
          animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="blob blob-2"
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div className="home-content" variants={container} initial="hidden" animate="show">
        <motion.span className="status-badge" variants={item}>
          <span className="status-dot"></span>
          Aberto a oportunidades e colaborações
        </motion.span>

        <motion.h1 variants={item}>
          Olá, eu sou <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.h2 className="home-role" variants={item}>
          <span aria-live="polite">{typed}</span>
          <span className="caret" aria-hidden="true">
            |
          </span>
        </motion.h2>

        <motion.p variants={item}>
          Desenvolvedor Full-Stack com o pé mais firme no back-end. Construo APIs em <strong>Node.js + TypeScript</strong>
          , jogo o trabalho pesado para filas, automatizo processos com <strong>n8n</strong> e crio painéis em{" "}
          <strong>React</strong> para acompanhar tudo em tempo real.
        </motion.p>

        <motion.div className="home-cta" variants={item}>
          <Magnetic>
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
            >
              Ver projetos <i className="bx bx-right-arrow-alt"></i>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.cv} download className="btn btn-ghost">
              Baixar CV <i className="bx bx-download"></i>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div className="social-media" variants={item}>
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
              whileHover={{ y: -4, rotate: -6 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={s.icon}></i>
            </motion.a>
          ))}
        </motion.div>

        <motion.button type="button" className="palette-hint" variants={item} onClick={onOpenPalette}>
          Dica: pressione <kbd>{isMac ? "⌘" : "Ctrl"}</kbd> <kbd>K</kbd> para navegar pelo site
        </motion.button>
      </motion.div>

      <motion.div
        className="home-img"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        onPointerMove={onTilt}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
      >
        <div className="home-img-ring">
          <img src={profile.photo} alt="Foto de perfil de Davi Morais" width={340} height={340} />
        </div>
        {chips.map((chip, i) => (
          <motion.div
            key={chip.label}
            className={`floating-chip ${chip.className}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 0.8 + i * 0.15 },
              scale: { delay: 0.8 + i * 0.15, type: "spring" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 1.6 },
            }}
          >
            <i className={chip.icon}></i> {chip.label}
          </motion.div>
        ))}
      </motion.div>

      <a
        href="#about"
        className="scroll-down"
        aria-label="Rolar para a seção Sobre"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("about");
        }}
      >
        <i className="bx bx-chevron-down"></i>
      </a>
    </section>
  );
}

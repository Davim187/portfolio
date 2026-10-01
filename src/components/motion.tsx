import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, type HTMLMotionProps } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <motion.h2
      className="heading"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease }}
    >
      {children} <span>{accent}</span>
    </motion.h2>
  );
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/** Atualiza --mx/--my para o brilho que acompanha o cursor dentro do card. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function CursorGlow() {
  const x = useSpring(useMotionValue(-500), { stiffness: 150, damping: 25 });
  const y = useSpring(useMotionValue(-500), { stiffness: 150, damping: 25 });

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ x, y }}
      ref={(el) => {
        if (!el || !window.matchMedia("(pointer: fine)").matches) return;
        const onMove = (e: globalThis.PointerEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }}
    />
  );
}

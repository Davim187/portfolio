import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { buddyLines, pixel, type SectionId } from "../data/content";
import { isMac } from "../hooks/scroll";

const preload = (...srcs: string[]) =>
  srcs.forEach((src) => {
    new Image().src = src;
  });

const bubbleMotion = {
  initial: { opacity: 0, scale: 0.6, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.6, y: 8 },
  transition: { type: "spring", stiffness: 420, damping: 24 },
} as const;

export function HeroSprite() {
  const [waving, setWaving] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => {
    preload(pixel.waving);
    return () => window.clearTimeout(timer.current);
  }, []);

  const waveFor = (ms: number) => {
    setWaving(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setWaving(false), ms);
  };

  return (
    <motion.button
      type="button"
      className="hero-sprite"
      aria-label="Davi em pixel art. Clique para ele acenar."
      initial={{ y: -320, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ y: { type: "spring", stiffness: 300, damping: 13, delay: 1 }, opacity: { delay: 1, duration: 0.2 } }}
      onAnimationComplete={() => waveFor(1800)}
      onPointerEnter={(e) => e.pointerType === "mouse" && waveFor(60_000)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setWaving(false)}
      onClick={() => waveFor(1800)}
    >
      <img src={waving ? pixel.waving : pixel.standing} alt="" draggable={false} />
      <span className="sprite-shadow" aria-hidden="true" />
      <AnimatePresence>
        {waving && (
          <motion.span className="sprite-bubble" {...bubbleMotion}>
            Oi!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function LaptopSprite() {
  return (
    <motion.img
      className="laptop-sprite"
      src={pixel.laptop}
      alt="Davi em pixel art, sentado programando no notebook."
      draggable={false}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
    />
  );
}

export function ContactSprite() {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="contact-sprite"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: [60, -18, 0] }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, times: [0, 0.6, 1], ease: "easeOut" }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <motion.img
        src={pixel.waving}
        alt="Davi em pixel art, acenando."
        draggable={false}
        animate={{ rotate: [0, -3, 3, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3.5 }}
      />
      <AnimatePresence>
        {hover && (
          <motion.span className="sprite-bubble" {...bubbleMotion}>
            Me chama!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type BuddyProps = {
  active: SectionId;
  onHide: () => void;
};

type Mode = "idle" | "talk" | "drag";

const coarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

function resolveLine(line: string) {
  if (line !== "{palette}") return line;
  return coarsePointer()
    ? "Dica: toca na lupa lá em cima pra navegar rapidinho pelo site."
    : `Dica: aperta ${isMac ? "⌘" : "Ctrl"} K (ou /) pra navegar rapidinho pelo site.`;
}

export function Buddy({ active, onHide }: BuddyProps) {
  const [mode, setMode] = useState<Mode>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [placement, setPlacement] = useState({ vertical: "above", horizontal: "left" });
  const bounds = useRef<HTMLDivElement>(null);
  const self = useRef<HTMLDivElement>(null);
  const lineIndex = useRef<Partial<Record<SectionId, number>>>({});
  const hideTimer = useRef<number>(undefined);
  const dragged = useRef(false);

  const updatePlacement = () => {
    const rect = self.current?.getBoundingClientRect();
    if (!rect) return;
    setPlacement({
      vertical: rect.top < 200 ? "below" : "above",
      horizontal: rect.left + rect.width / 2 > window.innerWidth / 2 ? "right" : "left",
    });
  };

  const say = (text: string, ms = 7000) => {
    updatePlacement();
    setMessage(text);
    setMode("talk");
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setMessage(null);
      setMode("idle");
    }, ms);
  };

  const closeBubble = () => {
    window.clearTimeout(hideTimer.current);
    setMessage(null);
    setMode("idle");
  };

  useEffect(() => {
    preload(pixel.buddyTalk, pixel.buddyDrag);
    let greet: number | undefined;
    if (!sessionStorage.getItem("buddy-greeted")) {
      greet = window.setTimeout(() => {
        sessionStorage.setItem("buddy-greeted", "1");
        say(buddyLines.home[0]);
      }, 2600);
    }
    return () => {
      window.clearTimeout(greet);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  const onClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    const lines = buddyLines[active];
    const index = lineIndex.current[active] ?? 0;
    lineIndex.current[active] = (index + 1) % lines.length;
    say(resolveLine(lines[index]));
  };

  const sprite = mode === "drag" ? pixel.buddyDrag : mode === "talk" ? pixel.buddyTalk : pixel.buddyIdle;

  return (
    <>
      <div className="buddy-bounds" ref={bounds} aria-hidden="true" />
      <motion.div
        ref={self}
        className="buddy"
        data-mode={mode}
        data-vertical={placement.vertical}
        data-horizontal={placement.horizontal}
        drag
        dragConstraints={bounds}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          dragged.current = true;
          window.clearTimeout(hideTimer.current);
          setMessage(null);
          setMode("drag");
        }}
        onDragEnd={() => {
          // O clique que encerra o arrasto pode chegar antes ou depois deste callback.
          window.setTimeout(() => (dragged.current = false), 300);
          setMode("idle");
          updatePlacement();
        }}
        initial={{ opacity: 0, scale: 0.4, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.4, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <AnimatePresence>
          {message && (
            <motion.div className="buddy-bubble" role="status" {...bubbleMotion}>
              <p>{message}</p>
              <div className="buddy-bubble-actions">
                <button type="button" onClick={onHide}>
                  Esconder
                </button>
                <button type="button" onClick={closeBubble} aria-label="Fechar balão">
                  <i className="bx bx-x" aria-hidden="true"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="buddy-button"
          aria-label="Mini Davi. Clique para ele contar algo sobre esta seção; arraste para mudar de lugar."
          onClick={onClick}
        >
          <motion.img
            src={sprite}
            alt=""
            draggable={false}
            className={`buddy-sprite buddy-${mode}`}
            animate={mode === "idle" ? { y: [0, -3, 0] } : { y: 0 }}
            transition={mode === "idle" ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          />
          <span className="sprite-shadow" aria-hidden="true" />
        </button>
      </motion.div>
    </>
  );
}

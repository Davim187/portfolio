import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { stats } from "../data/content";
import { Reveal, SectionHeading } from "./motion";
import { LaptopSprite } from "./Pixel";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return <strong ref={ref}>{display}</strong>;
}

const K = ({ children }: { children: ReactNode }) => <span className="tk-key">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="tk-type">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="tk-str">{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className="tk-fn">{children}</span>;

const codeLines: ReactNode[] = [
  <>
    <K>class</K> <T>Davi</T> <K>implements</K> <T>Dev</T> {"{"}
  </>,
  <>
    {"  "}nome = <S>"Davi Morais"</S>;
  </>,
  <>
    {"  "}local = <S>"Fortaleza, CE"</S>;
  </>,
  <>
    {"  "}cargo = <S>"Programador Júnior"</S>;
  </>,
  "",
  <>{"  "}stack = [</>,
  <>
    {"    "}
    <S>"Node.js"</S>, <S>"TypeScript"</S>, <S>"Fastify"</S>,
  </>,
  <>
    {"    "}
    <S>"Prisma"</S>, <S>"PostgreSQL"</S>, <S>"BullMQ"</S>,
  </>,
  <>
    {"    "}
    <S>"React"</S>, <S>"n8n"</S>,
  </>,
  <>{"  "}];</>,
  "",
  <>
    {"  "}
    <K>async</K> <F>automatizar</F>(processo: <T>string</T>) {"{"}
  </>,
  <>
    {"    "}
    <K>return</K> <S>{"`${processo} agora roda sozinho.`"}</S>;
  </>,
  <>{"  }"}</>,
  "}",
];

export function About() {
  return (
    <section className="about" id="about">
      <SectionHeading accent="mim">Sobre</SectionHeading>

      <div className="about-grid">
        <Reveal className="about-text">
          <h3>Automação, integrações e código fácil de manter</h3>
          <p>
            Sou formado em Análise e Desenvolvimento de Sistemas pela UniAteneu e atuo como{" "}
            <strong>Programador Júnior</strong> na Tijuca Alimentos, onde comecei no suporte de TI e fui migrando para o
            desenvolvimento. Essa trajetória me deu algo valioso: entender o problema do lado de quem usa o sistema.
          </p>
          <p>
            No dia a dia desenho APIs com <strong>Fastify</strong>, modelo dados em <strong>PostgreSQL</strong> e{" "}
            <strong>MySQL</strong> com <strong>Prisma</strong>, processo tarefas em segundo plano com{" "}
            <strong>BullMQ + Redis</strong> e conecto sistemas e pessoas com <strong>n8n</strong> e APIs de terceiros,
            como a WhatsApp Cloud API.
          </p>
          <p>
            Gosto de sistemas <em>previsíveis</em>, <em>fáceis de investigar</em> e <em>simples de manter</em> — que
            rodam sozinhos, avisam quando falham e explicam o porquê.
          </p>

          <ul className="stats">
            {stats.map((stat, i) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <Counter value={stat.value} />
                <span>{stat.label}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="code-card-wrap" delay={0.15}>
          <LaptopSprite />
          <div className="code-card" aria-label="Resumo em código">
            <div className="code-card-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="code-card-title">davi.ts</span>
            </div>
            <motion.pre
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
            >
              <code>
                {codeLines.map((line, i) => (
                  <motion.span
                    key={i}
                    className="code-line"
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                  >
                    <span className="line-no" aria-hidden="true">
                      {i + 1}
                    </span>
                    {line}
                    {"\n"}
                  </motion.span>
                ))}
              </code>
            </motion.pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

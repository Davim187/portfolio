import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useInView } from "motion/react";
import { profile } from "../data/content";
import { useGitHubPulse, type ContributionDay, type GitHubPulse as PulseData } from "../hooks/useGitHubPulse";
import { Counter } from "./About";
import { Reveal, SectionHeading, trackSpotlight } from "./motion";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const WEEKDAYS: [number, string][] = [
  [1, "Seg"],
  [3, "Qua"],
  [5, "Sex"],
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  Python: "#3572a5",
  Shell: "#89e051",
};

const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function timeAgo(value: string | number) {
  const seconds = (new Date(value).getTime() - Date.now()) / 1000;
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "agora mesmo";
}

const parseDay = (date: string) => new Date(`${date}T00:00:00`);

function describeDay(day: ContributionDay) {
  const when = parseDay(day.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  if (day.count === 0) return `Nenhuma contribuição em ${when}`;
  return `${day.count} ${day.count === 1 ? "contribuição" : "contribuições"} em ${when}`;
}

function placeholderDays(): ContributionDay[] {
  const today = new Date();
  return Array.from({ length: 365 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 364 + i);
    return { date: d.toISOString().slice(0, 10), count: 0, level: 0 };
  });
}

function Calendar({ days, loading }: { days: ContributionDay[]; loading: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [days]);

  const { cells, months, weeks } = useMemo(() => {
    const offset = days.length ? parseDay(days[0].date).getDay() : 0;
    const cells = days.map((day, i) => ({ day, week: Math.floor((i + offset) / 7), weekday: (i + offset) % 7 }));
    const weeks = cells.length ? cells[cells.length - 1].week + 1 : 53;
    const months: { week: number; label: string }[] = [];
    for (const { day, week, weekday } of cells) {
      const d = parseDay(day.date);
      if (weekday === 0 && d.getDate() <= 7 && week <= weeks - 3) months.push({ week, label: MONTHS[d.getMonth()] });
    }
    return { cells, months, weeks };
  }, [days]);

  const onPointerOver = (e: PointerEvent<HTMLDivElement>) => {
    const index = (e.target as HTMLElement).dataset.i;
    if (index !== undefined) setHovered(days[Number(index)]);
  };

  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="pulse-calendar-wrap">
      <div className="pulse-calendar-scroll" ref={scrollRef}>
        <div
          ref={ref}
          className={`pulse-calendar${inView ? " in-view" : ""}${loading ? " loading" : ""}`}
          style={{ "--weeks": weeks } as CSSProperties}
          role="img"
          aria-label={loading ? "Carregando calendário de contribuições" : `${total} contribuições no último ano`}
          onPointerOver={onPointerOver}
          onPointerLeave={() => setHovered(null)}
        >
          {months.map((m) => (
            <span key={`${m.label}-${m.week}`} className="pulse-month" style={{ gridColumn: `${m.week + 2} / span 3` }}>
              {m.label}
            </span>
          ))}
          {WEEKDAYS.map(([row, label]) => (
            <span key={label} className="pulse-weekday" style={{ gridRow: row + 2 }}>
              {label}
            </span>
          ))}
          {cells.map(({ day, week, weekday }, i) => (
            <span
              key={day.date}
              data-i={i}
              className={`pulse-cell level-${day.level}${hovered?.date === day.date ? " active" : ""}`}
              style={{ gridColumn: week + 2, gridRow: weekday + 2, "--w": week } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="pulse-calendar-footer">
        <p className="pulse-readout" aria-live="polite">
          {loading
            ? "Buscando atividade no GitHub…"
            : hovered
              ? describeDay(hovered)
              : "Passe o mouse ou toque em um dia para ver as contribuições."}
        </p>
        <div className="pulse-legend" aria-hidden="true">
          Menos
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className={`pulse-cell level-${level}`} />
          ))}
          Mais
        </div>
      </div>
    </div>
  );
}

function Stats({ data }: { data: PulseData }) {
  const items = [
    { value: data.totalYear, label: "contribuições no último ano" },
    { value: data.last30, label: "nos últimos 30 dias" },
    { value: data.currentStreak, label: data.currentStreak === 1 ? "dia de sequência atual" : "dias de sequência atual" },
    { value: data.longestStreak, label: "dias na maior sequência" },
  ];

  return (
    <ul className="pulse-stats">
      {items.map((item, i) => (
        <motion.li
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
        >
          <Counter value={item.value} />
          <span>{item.label}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Languages({ data }: { data: PulseData }) {
  const top = data.languages.slice(0, 5);
  return (
    <Reveal className="pulse-panel spotlight" onPointerMove={trackSpotlight}>
      <h3 className="pulse-panel-title">
        <i className="bx bx-code-alt" aria-hidden="true"></i>
        Linguagens nos repositórios
      </h3>
      <div className="pulse-lang-bar" aria-hidden="true">
        {top.map((lang) => (
          <span
            key={lang.name}
            style={{ width: `${lang.share * 100}%`, background: LANGUAGE_COLORS[lang.name] ?? "var(--accent)" }}
          />
        ))}
      </div>
      <ul className="pulse-lang-list">
        {top.map((lang) => (
          <li key={lang.name}>
            <span className="pulse-dot" style={{ background: LANGUAGE_COLORS[lang.name] ?? "var(--accent)" }} />
            {lang.name}
            <span className="pulse-muted">{Math.round(lang.share * 100)}%</span>
          </li>
        ))}
      </ul>
      <p className="pulse-panel-note">
        {data.publicRepos} repositórios públicos em{" "}
        <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener">
          github.com/{profile.githubUser}
        </a>
      </p>
    </Reveal>
  );
}

function RecentRepos({ data }: { data: PulseData }) {
  return (
    <Reveal className="pulse-panel spotlight" delay={0.1} onPointerMove={trackSpotlight}>
      <h3 className="pulse-panel-title">
        <i className="bx bx-git-commit" aria-hidden="true"></i>
        Mexendo agora
      </h3>
      <ul className="pulse-repos">
        {data.recentRepos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.url} target="_blank" rel="noopener">
              <span className="pulse-repo-name">
                <i className="bx bx-git-repo-forked" aria-hidden="true"></i>
                {repo.name}
              </span>
              {repo.description && <span className="pulse-repo-desc">{repo.description}</span>}
              <span className="pulse-repo-meta">
                {repo.language && (
                  <span>
                    <span
                      className="pulse-dot"
                      style={{ background: LANGUAGE_COLORS[repo.language] ?? "var(--accent)" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span>push {timeAgo(repo.pushedAt)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function GitHubPulse() {
  const state = useGitHubPulse(profile.githubUser);
  const placeholder = useMemo(placeholderDays, []);

  return (
    <section className="pulse" id="github">
      <SectionHeading accent="GitHub">Pulso no</SectionHeading>

      <Reveal className="pulse-card">
        <div className="pulse-head">
          <span className="pulse-live">
            <span className="status-dot"></span>
            {state.status === "ready"
              ? `Direto da API do GitHub · atualizado ${timeAgo(state.data.fetchedAt)}`
              : state.status === "loading"
                ? "Conectando ao GitHub…"
                : "GitHub fora do ar por aqui"}
          </span>
          <a href={profile.github} target="_blank" rel="noopener" className="pulse-user">
            <i className="bx bxl-github" aria-hidden="true"></i>@{profile.githubUser}
          </a>
        </div>

        {state.status === "error" ? (
          <p className="pulse-error">
            Não consegui buscar a atividade agora. Dá uma olhada direto no{" "}
            <a href={profile.github} target="_blank" rel="noopener">
              meu perfil do GitHub
            </a>
            .
          </p>
        ) : (
          <>
            {state.status === "ready" && <Stats data={state.data} />}
            <Calendar days={state.status === "ready" ? state.data.days : placeholder} loading={state.status === "loading"} />
          </>
        )}
      </Reveal>

      {state.status === "ready" && (
        <div className="pulse-grid">
          <Languages data={state.data} />
          <RecentRepos data={state.data} />
        </div>
      )}
    </section>
  );
}

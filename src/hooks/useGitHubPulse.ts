import { useEffect, useState } from "react";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type RecentRepo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
};

export type GitHubPulse = {
  days: ContributionDay[];
  totalYear: number;
  last30: number;
  currentStreak: number;
  longestStreak: number;
  publicRepos: number;
  languages: { name: string; share: number }[];
  recentRepos: RecentRepo[];
  fetchedAt: number;
};

type PulseState = { status: "loading" } | { status: "ready"; data: GitHubPulse } | { status: "error" };

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
};

type ApiContributions = { total: Record<string, number>; contributions: ContributionDay[] };

const CACHE_TTL = 60 * 60 * 1000;

function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }

  // Hoje sem contribuição ainda não quebra a sequência: o dia não acabou.
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  let current = 0;
  while (i >= 0 && days[i].count > 0) {
    current++;
    i--;
  }
  return { current, longest };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json() as Promise<T>;
}

async function loadPulse(user: string): Promise<GitHubPulse> {
  const [repos, calendar] = await Promise.all([
    fetchJson<ApiRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    fetchJson<ApiContributions>(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const days = calendar.contributions.filter((d) => d.date <= today);
  const own = repos.filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase());

  const counts = new Map<string, number>();
  for (const repo of own) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const withLanguage = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  const languages = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => ({ name, share: n / withLanguage }));

  const { current, longest } = streaks(days);

  return {
    days,
    totalYear: calendar.total.lastYear ?? days.reduce((sum, d) => sum + d.count, 0),
    last30: days.slice(-30).reduce((sum, d) => sum + d.count, 0),
    currentStreak: current,
    longestStreak: longest,
    publicRepos: repos.length,
    languages,
    recentRepos: own.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      url: r.html_url,
      pushedAt: r.pushed_at,
    })),
    fetchedAt: Date.now(),
  };
}

export function useGitHubPulse(user: string): PulseState {
  const cacheKey = `github-pulse:${user}`;
  const [state, setState] = useState<PulseState>(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || "null") as GitHubPulse | null;
      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) return { status: "ready", data: cached };
    } catch {
      localStorage.removeItem(cacheKey);
    }
    return { status: "loading" };
  });

  useEffect(() => {
    if (state.status === "ready") return;
    let cancelled = false;

    loadPulse(user)
      .then((data) => {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (cancelled) return;
        try {
          const stale = JSON.parse(localStorage.getItem(cacheKey) || "null") as GitHubPulse | null;
          setState(stale ? { status: "ready", data: stale } : { status: "error" });
        } catch {
          setState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return state;
}

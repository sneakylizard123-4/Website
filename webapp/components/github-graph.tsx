"use client";

import { useRef, useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionStats {
  total: number;
  activeDays: number;
  maxPerDay: number;
}

const PERIODS = [
  { label: "Last month", days: 30 },
  { label: "Last 3 months", days: 90 },
  { label: "Last 6 months", days: 180 },
  { label: "Last year", days: 365 },
];

const LEVEL_COLORS = [
  "bg-muted",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-600 dark:bg-emerald-500",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  return 3;
}

export function GitHubGraph() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<ContributionStats>({ total: 0, activeDays: 0, maxPerDay: 0 });
  const [periodIdx, setPeriodIdx] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          "https://api.github.com/users/sneakylizard123-4/events"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const events = await res.json();

        const pushCounts: Record<string, number> = {};
        for (const ev of events) {
          if (ev.type === "PushEvent" && ev.created_at) {
            const day = ev.created_at.slice(0, 10);
            pushCounts[day] = (pushCounts[day] || 0) + (ev.payload?.commits?.length || 1);
          }
        }

        const result: ContributionDay[] = [];
        const now = new Date();
        for (let i = 364; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          result.push({
            date: key,
            count: pushCounts[key] || 0,
            level: getLevel(pushCounts[key] || 0),
          });
        }

        if (!cancelled) {
          setDays(result);
          setStats({
            total: Object.values(pushCounts).reduce((a, b) => a + b, 0),
            activeDays: Object.keys(pushCounts).length,
            maxPerDay: Math.max(0, ...Object.values(pushCounts)),
          });
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load GitHub data");
          setLoading(false);
        }
      }
    }

    fetchEvents();
    return () => { cancelled = true; };
  }, []);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - PERIODS[periodIdx].days);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const visible = days.filter((d) => d.date >= cutoffStr);

  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];
  for (const d of visible) {
    const dayOfWeek = new Date(d.date).getDay();
    if (dayOfWeek === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    week.push(d);
  }
  if (week.length > 0) weeks.push(week);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex flex-wrap gap-1">
        {PERIODS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setPeriodIdx(i)}
            className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
              i === periodIdx
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>
      )}
      {error && (
        <div className="py-8 text-center text-sm text-muted-foreground">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${weeks.length * 14} ${7 * 14}`}
              className="w-full"
              style={{ minWidth: weeks.length * 10 }}
            >
              {weeks.map((wk, wi) =>
                wk.map((day, di) => {
                  const x = wi * 14;
                  const y = di * 14;
                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width={11}
                      height={11}
                      rx={2}
                      className={`transition-colors ${LEVEL_COLORS[day.level]}`}
                    >
                      <title>
                        {day.date}: {day.count} contribution{day.count !== 1 ? "s" : ""}
                      </title>
                    </rect>
                  );
                })
              )}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex gap-3">
              <span>
                <strong className="text-foreground">{stats.total}</strong> contributions
              </span>
              <span>
                <strong className="text-foreground">{stats.activeDays}</strong> active days
              </span>
              <span>
                <strong className="text-foreground">{stats.maxPerDay}</strong> max/day
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>Less</span>
              {LEVEL_COLORS.map((cls, i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${cls}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      )}

      <div className="mt-3 text-center">
        <a
          href="https://github.com/sneakylizard123-4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline-offset-4 hover:underline"
        >
          View on GitHub &rarr;
        </a>
      </div>
    </div>
  );
}

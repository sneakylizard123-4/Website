import { Coffee, GitFork } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import sponsorsData from "@/data/sponsors.json";
import { Card } from "@/components/ui/card";

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  github: GitFork,
  coffee: Coffee,
};

type Sponsor = {
  name: string;
  link?: string;
  note?: string;
};

type SponsorTier = (typeof sponsorsData.tiers)[number];
type Platform = (typeof sponsorsData.platforms)[number];

export function SponsorSection() {
  const tiers = sponsorsData.tiers as SponsorTier[];
  const platforms = sponsorsData.platforms as Platform[];
  const total = tiers.reduce((acc, t) => acc + t.sponsors.length, 0);

  return (
    <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Sponsors</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {total > 0
              ? `${total} supporter${total === 1 ? "" : "s"} keeping the work going.`
              : "Community support keeps the solder flowing."}
          </p>
        </div>
      </div>

      {total > 0 ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className="group relative overflow-hidden rounded-xl border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal-400 transition-transform duration-400 group-hover:scale-x-100" />
              <h3 className="font-heading text-sm font-semibold text-primary">
                {tier.label}
              </h3>
              <p className="mt-1 mb-4 text-xs text-muted-foreground">
                {tier.blurb}
              </p>
              <div className="flex flex-wrap gap-2">
                {tier.sponsors.map((s: Sponsor) => (
                  <a
                    key={s.name}
                    href={s.link}
                    target={s.link ? "_blank" : undefined}
                    rel={s.link ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[0.6rem] font-bold text-primary">
                      {s.name
                        .split(/\s+/)
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                    {s.name}
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No sponsors yet — be the first to support the work.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {platforms.map((p) => {
          const Icon = PLATFORM_ICONS[p.icon] ?? GitFork;
          return (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <Icon className="h-4 w-4" />
              {p.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}

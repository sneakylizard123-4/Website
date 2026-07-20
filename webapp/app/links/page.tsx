import type { Metadata } from "next";
import { GitHubGraph } from "@/components/github-graph";

export const metadata: Metadata = {
  title: "Links",
};

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/sneakylizard123-4",
    desc: "Open source projects, firmware, and tools.",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/pn2222a_lab",
    desc: "Behind the scenes of builds and projects.",
  },
  {
    label: "Contact",
    href: "mailto:pn2222a@proton.me",
    desc: "pn2222a@proton.me",
  },
];

export default function LinksPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Links</h1>
      <p className="mb-8 text-muted-foreground">
        Find me around the web.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">
          GitHub Contributions
        </h2>
        <GitHubGraph />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Profiles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal-400 transition-transform duration-400 group-hover:scale-x-100" />
              <h3 className="font-heading text-sm font-semibold text-primary">
                {l.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GradientCanvas } from "@/components/gradient-canvas";
import { Spotlight } from "@/components/spotlight";
import { Typewriter } from "@/components/typewriter";
import { ProjectCard } from "@/components/project-card";
import { SponsorSection } from "@/components/sponsor-section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";

const FEATURED = projectsData.projects
  .filter((p) => p.status === "In Progress")
  .slice(0, 3);

const STACK = [
  {
    title: "Embedded",
    desc: "STM32, ESP32, PlatformIO, FreeRTOS, bare metal C++",
  },
  {
    title: "PCB Design",
    desc: "KiCad, multi-layer, impedance control, DFM",
  },
  {
    title: "Cybersecurity",
    desc: "TryHackMe, HTB, bug bounties, CTFs",
  },
  {
    title: "Linux & Tools",
    desc: "Arch/EndeavourOS, Git, Bash, Docker, CI/CD",
  },
];

const LINKS = [
  { icon: "\u2318", label: "GitHub", href: "https://github.com/sneakylizard123-4" },
  { icon: "\u2709", label: "Contact", href: "/about" },
  { icon: "\u2139", label: "About", href: "/about" },
];

export default function HomePage() {
  return (
    <>
      <GradientCanvas />
      <Spotlight />

      {/* Hero */}
      <section className="relative flex min-h-[85dvh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for projects
        </div>

        <h1 className="font-heading text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-800 delay-200">
          <span className="bg-gradient-to-br from-primary via-teal-400 to-purple-400 bg-clip-text text-transparent [background-size:200%_200%] animate-[gradientShift_6s_ease_infinite]">
            pn2222a
          </span>
        </h1>

        <p className="mt-3 text-[clamp(1.1rem,2.5vw,1.5rem)] font-normal text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <Typewriter />
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
          <Button render={<Link href="/projects/featured" />} nativeButton={false}>
            View Projects
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button render={<Link href="/about" />} variant="outline" nativeButton={false}>
            About Me
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-in fade-in duration-700 delay-1000">
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <div className="relative h-8 w-5.5 rounded-full border-2 border-muted-foreground">
              <div className="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 rounded-full bg-muted-foreground animate-[scrollDot_1.8s_ease_infinite]" />
            </div>
            Scroll
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <h2 className="mb-6 font-heading text-2xl font-bold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURED.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              description={p.description}
              status={p.status}
              date={p.date}
              image={p.image}
              hoverImage={p.hoverImage}
              imageAlt={p.imageAlt}
              tags={p.tags}
              href={`/projects/${p.id}`}
            />
          ))}
        </div>
        <Link
          href="/projects/featured"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
        >
          View all projects &rarr;
        </Link>
      </section>

      {/* Stack */}
      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <h2 className="mb-6 font-heading text-2xl font-bold">Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {STACK.map((s) => (
            <Card
              key={s.title}
              className="group relative overflow-hidden rounded-xl border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal-400 transition-transform duration-400 group-hover:scale-x-100" />
              <h3 className="font-heading text-sm font-semibold text-primary">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Sponsors */}
      <SponsorSection />

      {/* Connect */}
      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <h2 className="mb-6 font-heading text-2xl font-bold">Connect</h2>
        <div className="flex flex-wrap gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="relative z-10 text-base">{l.icon}</span>
              <span className="relative z-10">{l.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scrollDot {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Cpu,
  Gauge,
  Satellite,
  Radio,
  Zap,
  MonitorSpeaker,
  HardDrive,
  Network,
  AudioLines,
  Usb,
  CircuitBoard,
  Fan,
  Bitcoin,
  Microchip,
  Plug,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  gauge: Gauge,
  satellite: Satellite,
  radio: Radio,
  zap: Zap,
  speaker: MonitorSpeaker,
  storage: HardDrive,
  network: Network,
  audio: AudioLines,
  usb: Usb,
  circuit: CircuitBoard,
  fan: Fan,
  bitcoin: Bitcoin,
  microchip: Microchip,
  plug: Plug,
};

export type LandingSpec = {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
  detail: string;
};

export type ProjectLandingProps = {
  title: string;
  version?: string;
  status: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
  specs: LandingSpec[];
  overview: string[];
  docsHref: string;
};

export function ProjectLanding({
  title,
  version,
  status,
  summary,
  heroImage,
  heroAlt,
  tags,
  specs,
  overview,
  docsHref,
}: ProjectLandingProps) {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <section className="flex min-h-dvh flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {status}
        </div>

        <h1 className="font-heading text-[clamp(2.25rem,8vw,5.5rem)] font-extrabold leading-none tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-800 delay-200">
          <span className="bg-gradient-to-br from-primary via-purple-400 to-teal-400 bg-clip-text text-transparent">
            {title}
          </span>
          {version ? (
            <span className="ml-3 text-muted-foreground/40">{version}</span>
          ) : null}
        </h1>

        <p className="mt-4 max-w-lg text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          {summary}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-in fade-in duration-700 delay-500">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in duration-700 delay-600">
          <Button render={<Link href="#specs" />} nativeButton={false}>
            Specs
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button render={<Link href={docsHref} />} variant="outline" nativeButton={false}>
            Read the Docs
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-in fade-in duration-700 delay-1000">
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <div className="relative h-8 w-5.5 rounded-full border-2 border-muted-foreground/40">
              <div className="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 rounded-full bg-muted-foreground/40 animate-[scrollDot_1.8s_ease_infinite]" />
            </div>
            Scroll
          </div>
        </div>
      </section>

      <section id="specs" className="mx-auto w-full max-w-3xl px-4 py-20">
        <h2 className="mb-8 font-heading text-2xl font-bold">Specifications</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Card
                key={s.label}
                className="group relative overflow-hidden rounded-xl border-border/40 bg-background/70 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal-400 transition-transform duration-400 group-hover:scale-x-100" />
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                </div>
                <p className="font-heading text-lg font-semibold">{s.value}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{s.detail}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-20">
        <h2 className="mb-6 font-heading text-2xl font-bold">Overview</h2>
        <div className="space-y-4 text-muted-foreground">
          {overview.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl border-t border-border/40 px-4 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-bold">Dive Deeper</h2>
          <p className="max-w-md text-muted-foreground">
            Full schematics, PCB layout, bill of materials, firmware notes, and fabrication details.
          </p>
          <div className="flex gap-3">
            <Button render={<Link href={docsHref} />} nativeButton={false}>
              Read the Docs
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button render={<Link href="/projects/featured/" />} variant="outline" nativeButton={false}>
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              All Projects
            </Button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes scrollDot {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
        }
      `}</style>
    </div>
  );
}

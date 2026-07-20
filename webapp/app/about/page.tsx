import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
};

const SKILLS = [
  {
    title: "Embedded Systems",
    desc: "STM32, ESP32, nRF24, PlatformIO, FreeRTOS, bare-metal C/C++",
  },
  {
    title: "PCB Design",
    desc: "KiCad, multi-layer boards, impedance control, DFM optimization",
  },
  {
    title: "Firmware",
    desc: "Low-level drivers, radio protocols, power management, OTA updates",
  },
  {
    title: "Cybersecurity",
    desc: "TryHackMe, Hack The Box, bug bounties, CTF competitions",
  },
  {
    title: "Linux & DevOps",
    desc: "Arch/EndeavourOS, self-hosting, Docker, CI/CD pipelines",
  },
];

const INTERESTS = [
  "Building flight controllers and meshtastic devices",
  "Exploring radio protocols and mesh networking",
  "Competitive cybersecurity and CTFs",
  "Self-hosting services and infrastructure",
  "3D printing enclosures and prototypes",
  "Open-source hardware and software",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">About Me</h1>
      <p className="mb-8 text-muted-foreground">
        Engineering, building, and breaking things — sometimes all at once.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Background</h2>
        <p className="mb-3 text-foreground/80">
          I&apos;m an embedded systems engineer and electronics hobbyist with a passion
          for building custom hardware and firmware. From flight controllers running
          PID loops at 8kHz to meshtastic nodes creating ad-hoc mesh networks, I
          enjoy working at the intersection of hardware and software.
        </p>
        <p className="text-foreground/80">
          When I&apos;m not soldering or debugging register configurations, you&apos;ll
          find me competing in CTF competitions, self-hosting services, or
          contributing to open-source projects.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Skills & Experience</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((s) => (
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

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <Badge key={i} variant="secondary">
              {i}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold">Contact</h2>
        <p className="text-foreground/80">
          Reach me at{" "}
          <a
            href="mailto:pn2222a@proton.me"
            className="text-primary underline-offset-4 hover:underline"
          >
            pn2222a@proton.me
          </a>{" "}
          or find me on{" "}
          <a
            href="https://github.com/sneakylizard123-4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}

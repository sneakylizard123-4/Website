import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
};

const WORKING_ON = [
  "STM32F722 flight controller firmware (Dreamscape F722 V1)",
  "Multi-layer PCB design in KiCad for custom flight hardware",
  "PlatformIO-based firmware with FreeRTOS task scheduling",
  "Meshtastic node firmware for ESP32 mesh networking",
  "Security auditing tools for nRF24-based devices",
];

const LEARNING = [
  "Cybersecurity — TryHackMe paths and Hack The Box machines",
  "Self-hosting LLMs with Ollama for local AI tooling",
  "3D printing custom enclosures for PCB projects",
  "Advanced antenna design for 2.4 GHz mesh radios",
];

const LISTENING = [
  "Flute — classical and jazz repertoire",
  "Clarinet — ensemble and solo pieces",
  "Oboe — orchestral works",
];

export default function NowPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Now</h1>
      <p className="mb-8 text-muted-foreground">
        A snapshot of what I&apos;m currently focused on. Inspired by{" "}
        <a
          href="https://nownownow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          nownownow.com
        </a>
        .
      </p>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">
          Currently Working On
        </h2>
        <ul className="space-y-2">
          {WORKING_ON.map((item) => (
            <li key={item} className="flex items-start gap-2 text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Learning</h2>
        <ul className="space-y-2">
          {LEARNING.map((item) => (
            <li key={item} className="flex items-start gap-2 text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-semibold">Listening</h2>
        <ul className="space-y-2">
          {LISTENING.map((item) => (
            <li key={item} className="flex items-start gap-2 text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        Last updated: July 2025
      </p>
    </div>
  );
}

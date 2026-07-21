"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Cpu, Radio, Satellite, Thermometer, Battery, Activity } from "lucide-react";
import { MeshHandBackground } from "@/components/mesh-hand-background";

const SPECS = [
  { icon: Cpu, label: "MCU", value: "ESP32-S3", detail: "Dual-core 240 MHz, Wi-Fi + BLE" },
  { icon: Radio, label: "Radio", value: "E22-900M30S", detail: "LoRa 900 MHz, +22 dBm, ~30 km" },
  { icon: Satellite, label: "GPS", value: "NEO-M9N", detail: "Multi-band GNSS, 1.5 m CEP" },
  { icon: Thermometer, label: "Sensors", value: "5 × I²C", detail: "BME280, SCD41, MAX30102, INA260, DS3231M" },
  { icon: Battery, label: "Power", value: "LiPo + USB-C", detail: "IP5306 charger, TPS62822 3.3 V buck" },
  { icon: Activity, label: "Input", value: "Encoder + 4 btn", detail: "Rotary encoder, BOOT, EN, USER, SW5" },
];

export default function MeshHandLandingPage() {
  return (
    <>
      {/* ── Fixed background assembly ── */}
      <MeshHandBackground />

      {/* ── Foreground content ── */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="flex min-h-dvh flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            In Progress
          </div>

          <h1 className="font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-none tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-800 delay-200">
            <span className="bg-gradient-to-br from-primary via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Mesh_Hand
            </span>
            <span className="ml-3 text-muted-foreground/40">V1</span>
          </h1>

          <p className="mt-4 max-w-lg text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            Handheld Meshtastic node with GPS, LoRa radio, and a full environmental sensor suite — all on a single purple PCB.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in duration-700 delay-600">
            <Button render={<Link href="#specs" />} nativeButton={false}>
              Specs
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button render={<Link href="/projects/mesh_hand-v1/docs/" />} variant="outline" nativeButton={false}>
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

        {/* ── Specs ── */}
        <section id="specs" className="mx-auto w-full max-w-3xl px-4 py-20">
          <h2 className="mb-8 font-heading text-2xl font-bold">Specifications</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECS.map((s) => (
              <Card
                key={s.label}
                className="group relative overflow-hidden rounded-xl border-border/40 bg-background/70 p-5 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-teal-400 transition-transform duration-400 group-hover:scale-x-100" />
                <div className="mb-2 flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                </div>
                <p className="font-heading text-lg font-semibold">{s.value}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{s.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="mx-auto w-full max-w-3xl px-4 py-20">
          <h2 className="mb-6 font-heading text-2xl font-bold">Overview</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Mesh_Hand is a portable Meshtastic node designed for outdoor use — hiking, camping, and off-grid
              communication. It packs an ESP32-S3, a 900 MHz LoRa transceiver, and a u-blox NEO-M9N GPS onto a compact
              double-sided purple PCB with custom silkscreen art.
            </p>
            <p>
              Beyond radio and GPS, the board includes a BME280 (temp/humidity/pressure), SCD41 (CO₂), MAX30102 (pulse
              oximeter), INA260 (power monitoring), and a DS3231M real-time clock. A 4-LED LiPo charge indicator,
              rotary encoder, and OLED display header round out the interface.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto w-full max-w-3xl border-t border-border/40 px-4 py-20">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-heading text-2xl font-bold">Dive Deeper</h2>
            <p className="max-w-md text-muted-foreground">
              Full schematics, BOM with LCSC part numbers, fabrication files, and firmware instructions.
            </p>
            <div className="flex gap-3">
              <Button render={<Link href="/projects/mesh_hand-v1/docs/" />} nativeButton={false}>
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
    </>
  );
}

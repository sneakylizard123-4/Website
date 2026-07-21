"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Cpu, Gauge, Satellite, Radio, Zap, MonitorSpeaker } from "lucide-react";
import { ModelBackground } from "@/components/model-background";

const SPECS = [
  { icon: Cpu, label: "MCU", value: "STM32F722", detail: "ARM Cortex-M7, 216 MHz, 512 KB Flash" },
  { icon: Gauge, label: "IMU", value: "ICM-42688-P", detail: "6-axis gyro + accel, SPI, low latency" },
  { icon: Satellite, label: "Baro", value: "BMP280", detail: "Barometric pressure sensor for altitude hold" },
  { icon: Radio, label: "Receiver", value: "CRSF/SBUS/PPM", detail: "Crossfire, SBUS, and legacy PPM support" },
  { icon: Zap, label: "Outputs", value: "8× PWM", detail: "DSHOT150/300/600, OneShot, Multishot" },
  { icon: MonitorSpeaker, label: "Peripherals", value: "5× UART + SPI + I2C", detail: "GPS, telemetry, VTX, camera, buzzer" },
];

export default function DreamscapeF722LandingPage() {
  return (
    <>
      {/* ── Fixed 3D background ── */}
      <ModelBackground modelPath="/Website/models/dreamscape-f722.glb" color="#7c3aed" />

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
            Dreamscape F722
          </span>
          <span className="ml-3 text-muted-foreground/40">V1</span>
        </h1>

        <p className="mt-4 max-w-lg text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          Open-hardware STM32F722 flight controller for FPV drones — ICM-42688-P IMU, barometer, 5 UARTs, and 8 PWM outputs on a 30×30 mm board.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in duration-700 delay-600">
          <Button render={<Link href="#specs" />} nativeButton={false}>
            Specs
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <Button render={<Link href="/projects/ds-f722-v1/docs/" />} variant="outline" nativeButton={false}>
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
            Dreamscape F722 is an open-hardware flight controller designed for FPV and custom drone platforms.
            Built around the STM32F722RET6 (ARM Cortex-M7, 216 MHz), it targets high-performance firmware
            like Betaflight, iNav, and ArduPilot while remaining developer-friendly.
          </p>
          <p>
            The board features an ICM-42688-P 6-axis IMU on a high-speed SPI bus for precise, low-latency
            flight control. A BMP280 barometer enables altitude hold. Five UARTs support CRSF/SBUS receivers,
            GPS modules, telemetry radios, and VTX control. Eight PWM outputs handle DSHOT, OneShot, and
            standard protocols for up to 8 ESCs.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-3xl border-t border-border/40 px-4 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-2xl font-bold">Dive Deeper</h2>
          <p className="max-w-md text-muted-foreground">
            Full schematics, PCB layout, firmware build instructions, and expansion plans.
          </p>
          <div className="flex gap-3">
            <Button render={<Link href="/projects/ds-f722-v1/docs/" />} nativeButton={false}>
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

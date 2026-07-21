import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Dreamscape F722 V1 — Docs",
  description: "Hardware documentation for the Dreamscape F722 V1 STM32 flight controller.",
};

const KEY_ICS = [
  { ref: "U1", name: "STM32F722RET6", desc: "Main MCU — ARM Cortex-M7, 216 MHz, 512 KB Flash, 256 KB RAM, hardware FPU." },
  { ref: "U2", name: "ICM-42688-P", desc: "6-axis IMU (gyroscope + accelerometer) on high-speed SPI1 for precise flight control." },
  { ref: "U3", name: "BMP280", desc: "Barometric pressure sensor for altitude hold and variometer data." },
  { ref: "U4", name: "AO4435", desc: "P-channel MOSFET for power switching and peripheral enable control." },
  { ref: "U5", name: "3.3V Regulator", desc: "LDO regulator — 5V input to 3.3V for MCU and peripherals." },
];

const CONNECTORS = [
  { ref: "J1", name: "USB-C", desc: "USB Type-C for programming, configuration, and communication" },
  { ref: "J2", name: "UART1 (RX)", desc: "CRSF/SBUS/PPM receiver input" },
  { ref: "J3", name: "UART2", desc: "GPS module (TX/RX)" },
  { ref: "J4", name: "UART3", desc: "Telemetry radio (SmartPort, CRSF telemetry)" },
  { ref: "J5", name: "UART4", desc: "VTX control (SmartAudio / Tramp)" },
  { ref: "J6", name: "UART5", desc: "Reserved for future expansion" },
  { ref: "J7", name: "SWD", desc: "Serial Wire Debug header for ST-Link programmer" },
  { ref: "J8–J15", name: "PWM Outputs", desc: "8× motor/servo outputs (DSHOT, OneShot, PWM)" },
  { ref: "J16", name: "I2C", desc: "External sensors — magnetometer, barometer" },
  { ref: "J17", name: "Buzzer", desc: "Active buzzer output" },
  { ref: "J18", name: "LED Strip", desc: "WS2812B addressable LED output" },
];

const UART_MAP = [
  { uart: "UART1", use: "Receiver", protocol: "CRSF / SBUS / PPM" },
  { uart: "UART2", use: "GPS", protocol: "NMEA / UBX" },
  { uart: "UART3", use: "Telemetry", protocol: "SmartPort / CRSF" },
  { uart: "UART4", use: "VTX Control", protocol: "SmartAudio / Tramp" },
  { uart: "UART5", use: "Expansion", protocol: "Reserved" },
];

const SCHEMATIC_IMAGES = [
  { src: "/images/projects/dreamscape-f722/Schematic.jpg", alt: "Main schematic", caption: "Main schematic — MCU, power, IMU, barometer, UART, SPI" },
  { src: "/images/projects/dreamscape-f722/Schematic1.jpg", alt: "Schematic sheet 2", caption: "Sheet 2 — Connectors, PWM outputs, buzzer, LED strip" },
];

export default function DreamscapeF722DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button render={<Link href="/projects/ds-f722-v1/" />} variant="ghost" size="sm" className="mb-8" nativeButton={false}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Landing
      </Button>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {/* ── Header ── */}
        <div className="not-prose mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-heading text-3xl font-bold !mb-0">Dreamscape F722 V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            Open-hardware STM32F722 flight controller for FPV drones with ICM-42688-P IMU, BMP280 barometer,
            5 UARTs, 8 PWM outputs, and Betaflight/iNav/ArduPilot firmware support.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["STM32F722", "Betaflight", "ICM-42688-P", "FPV", "KiCad"].map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button render={<Link href="https://github.com/sneakylizard123-4" target="_blank" rel="noopener noreferrer" />} variant="outline" size="sm" nativeButton={false}>
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              GitHub
            </Button>
            <Button render={<Link href="#schematics" />} variant="outline" size="sm" nativeButton={false}>
              Schematics
            </Button>
            <Button render={<Link href="#firmware" />} variant="outline" size="sm" nativeButton={false}>
              Firmware
            </Button>
          </div>
        </div>

        {/* ── 3-D Render ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/dreamscape-f722/render-purple.png"
            alt="Dreamscape F722 V1 3D render"
            width={960}
            height={720}
            className="w-full object-cover"
            priority
          />
        </figure>

        {/* ── Overview ── */}
        <h2>Overview</h2>
        <p>
          Dreamscape F722 is an open-hardware flight controller designed for FPV and custom drone platforms.
          Built around the STM32F722RET6 (ARM Cortex-M7, 216 MHz), it targets high-performance firmware
          like Betaflight, iNav, and ArduPilot while remaining developer-friendly for experimentation
          and customization.
        </p>
        <p>
          The ICM-42688-P 6-axis IMU communicates over a high-speed SPI bus for precise, low-latency
          flight control. A BMP280 barometer enables altitude hold. Five UARTs handle receivers, GPS,
          telemetry, and VTX control. Eight PWM outputs support DSHOT, OneShot, Multishot, and standard
          protocols for up to 8 individual ESCs or a 4-in-1 ESC.
        </p>

        {/* ── PCB ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/dreamscape-f722/PCB.jpg"
            alt="Dreamscape F722 V1 PCB layout"
            width={720}
            height={540}
            className="w-full object-cover"
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            30×30 mm 4-layer PCB — standard flight controller mounting pattern
          </figcaption>
        </figure>

        {/* ── Key ICs ── */}
        <h2 id="key-ics">Key ICs</h2>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Ref</th>
                <th className="pb-2 pr-4 font-medium">Part</th>
                <th className="pb-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {KEY_ICS.map((b) => (
                <tr key={b.ref} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-primary">{b.ref}</td>
                  <td className="py-2.5 pr-4 font-medium">{b.name}</td>
                  <td className="py-2.5 text-muted-foreground">{b.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Connectors ── */}
        <h2 id="connectors">Connectors &amp; Ports</h2>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Ref</th>
                <th className="pb-2 pr-4 font-medium">Name</th>
                <th className="pb-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {CONNECTORS.map((c) => (
                <tr key={c.ref} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-primary">{c.ref}</td>
                  <td className="py-2.5 pr-4 font-medium">{c.name}</td>
                  <td className="py-2.5 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── UART Map ── */}
        <h2 id="uart-map">UART Assignment</h2>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">UART</th>
                <th className="pb-2 pr-4 font-medium">Use</th>
                <th className="pb-2 font-medium">Protocol</th>
              </tr>
            </thead>
            <tbody>
              {UART_MAP.map((u) => (
                <tr key={u.uart} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-primary">{u.uart}</td>
                  <td className="py-2.5 pr-4 font-medium">{u.use}</td>
                  <td className="py-2.5 text-muted-foreground">{u.protocol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Schematics ── */}
        <h2 id="schematics">Schematics</h2>
        <p>
          The design uses a hierarchical KiCad schematic. The main sheet covers the MCU, power system,
          IMU, barometer, and UART routing. A second sheet handles connectors, PWM outputs, buzzer, and
          LED strip.
        </p>
        <div className="not-prose my-6 grid gap-6 sm:grid-cols-2">
          {SCHEMATIC_IMAGES.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl border border-border">
              <Image src={img.src} alt={img.alt} width={720} height={540} className="w-full object-cover" />
              <figcaption className="border-t border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ── Firmware ── */}
        <h2 id="firmware">Firmware</h2>
        <p>
          Dreamscape F722 is designed for Betaflight, iNav, and ArduPilot. The firmware build uses the
          standard Betaflight build system with a custom target definition.
        </p>
        <ol>
          <li>Clone the Betaflight firmware repository.</li>
          <li>
            Build with: <code>make configs && make DREAMSCAPEF722</code>
          </li>
          <li>
            Flash via SWD with an ST-Link programmer, or use Betaflight Configurator over USB.
          </li>
          <li>Configure receiver, GPS, and VTX settings in the Betaflight CLI.</li>
        </ol>

        {/* ── Fabrication ── */}
        <h2 id="fabrication">Fabrication</h2>
        <p>Gerber files are pre-packaged for JLCPCB:</p>
        <ul>
          <li>
            <code>kicad/production/Dreamscape-F722.zip</code> — JLCPCB Gerber files
          </li>
        </ul>
        <p>
          The board is a 4-layer, 1.6 mm FR-4 with 1 oz copper. Standard 30×30 mm flight controller
          mounting pattern.
        </p>

        {/* ── Architecture ── */}
        <h2 id="architecture">Architecture</h2>
        <p>The PCB is organized into five functional blocks:</p>
        <ol>
          <li>
            <strong>MCU</strong> — STM32F722RET6 with 512 KB Flash, 256 KB RAM, hardware FPU. 216 MHz
            ARM Cortex-M7 for real-time flight control.
          </li>
          <li>
            <strong>IMU</strong> — ICM-42688-P 6-axis gyro + accelerometer on SPI1. Optimized placement
            for reduced vibration noise.
          </li>
          <li>
            <strong>Power</strong> — 5V input with 3.3V LDO regulator. USB power with protection circuitry.
            AO4435 P-channel MOSFET for power switching.
          </li>
          <li>
            <strong>Communication</strong> — 5× UART (receiver, GPS, telemetry, VTX, expansion), I2C for
            external sensors, SWD for debugging.
          </li>
          <li>
            <strong>Outputs</strong> — 8× PWM motor/servo outputs supporting DSHOT150/300/600, OneShot,
            Multishot, and standard PWM. Buzzer and WS2812B LED strip outputs.
          </li>
        </ol>

        {/* ── Planned Features ── */}
        <h2 id="planned">Planned Features</h2>
        <ul>
          <li>Integrated ELRS receiver for long-range control</li>
          <li>Dual-band telemetry support</li>
          <li>Advanced sensor suite (magnetometer, external barometer)</li>
          <li>Integrated ESC for AIO support</li>
          <li>Integrated OSD for on-screen display</li>
          <li>Current and voltage monitoring</li>
        </ul>

        {/* ── License ── */}
        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

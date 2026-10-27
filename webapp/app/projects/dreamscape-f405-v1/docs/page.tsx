import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Dreamscape F405 V1 — Docs",
  description:
    "Hardware documentation for the Dreamscape F405 V1 20×20 mm STM32F405 flight controller.",
  alternates: { canonical: "/projects/dreamscape-f405-v1/docs/" },
};

const KEY_ICS = [
  {
    ref: "U1",
    name: "STM32F405VGT6",
    desc: "Main MCU — ARM Cortex-M4, 168 MHz, LQFP-100, Betaflight target.",
  },
  {
    ref: "U6",
    name: "ICM-42688-P",
    desc: "6-axis IMU (gyro + accelerometer) on SPI for flight control.",
  },
  { ref: "U7", name: "BMP280", desc: "Barometric pressure sensor for altitude hold." },
  {
    ref: "U8",
    name: "AT7456E",
    desc: "MAX7456-compatible analog OSD with a 27 MHz crystal (Y1).",
  },
  { ref: "U3, U4", name: "LMR51430", desc: "3 A buck regulators for the 10 V and 5 V rails." },
  { ref: "U5", name: "TPS2116DRLR", desc: "USB / buck power mux for the system 5 V rail." },
  { ref: "U2", name: "TLV75733PDBV", desc: "3.3 V LDO for the MCU and sensors." },
  { ref: "Q5, Q6", name: "AP1606", desc: "Beeper and LED strip drivers." },
];

const CONNECTORS = [
  {
    ref: "J41",
    name: "JST-SH 8-pin (vertical)",
    desc: "BAT, GND, CUR, TEL, M1–M4 — battery + ESC harness",
  },
  {
    ref: "J42",
    name: "JST-SH 4-pin (horizontal)",
    desc: "5 V, GND, TX, RX — dedicated ExpressLRS receiver",
  },
  { ref: "Card1", name: "microSD", desc: "Full-size push-pull slot for blackbox logging" },
  { ref: "USB", name: "USB", desc: "Configuration, firmware flashing, and DFU" },
];

const PADS = [
  { pad: "BAT", use: "Battery positive" },
  { pad: "G", use: "Ground" },
  { pad: "3v3", use: "3.3 V out" },
  { pad: "5v", use: "5 V out" },
  { pad: "10v", use: "10 V out (switchable)" },
  { pad: "CUR", use: "ESC current sense input" },
  { pad: "TEL", use: "ESC telemetry" },
  { pad: "CC", use: "Camera control" },
  { pad: "CAM", use: "Video in from camera" },
  { pad: "VTX", use: "Video out to VTX" },
  { pad: "M1–M4", use: "Motor PWM outputs" },
  { pad: "LED", use: "Addressable LED strip" },
  { pad: "BZ+ / BZ−", use: "Beeper" },
  { pad: "SDA / SCL", use: "I2C" },
  { pad: "T1 / R1", use: "UART1 TX/RX" },
  { pad: "T2 / R2", use: "UART2 TX/RX" },
  { pad: "T3 / R3", use: "UART3 TX/RX" },
  { pad: "T6 / R6", use: "UART6 TX/RX" },
];

const SCHEMATIC_IMAGES = [
  {
    src: "/images/projects/dreamscape-f405/Dreamscape-F405-2020.webp",
    alt: "Dreamscape F405 root schematic",
    caption: "Root / block diagram",
  },
  {
    src: "/images/projects/dreamscape-f405/Dreamscape-F405-2020-Power.webp",
    alt: "Dreamscape F405 power schematic",
    caption: "Power — bucks, mux, LDO",
  },
  {
    src: "/images/projects/dreamscape-f405/Dreamscape-F405-2020-Pads.webp",
    alt: "Dreamscape F405 pads schematic",
    caption: "Pads and connectors",
  },
  {
    src: "/images/projects/dreamscape-f405/Dreamscape-F405-2020-OSD.webp",
    alt: "Dreamscape F405 OSD schematic",
    caption: "OSD — AT7456E and video path",
  },
];

export default function DreamscapeF405DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button
        render={<Link href="/projects/dreamscape-f405-v1/" />}
        variant="ghost"
        size="sm"
        className="mb-8"
        nativeButton={false}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Landing
      </Button>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="not-prose mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-bold !mb-0">Dreamscape F405 V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            A 20×20 mm STM32F405 flight controller for 3-inch FPV drones with ICM-42688-P IMU,
            BMP280 barometer, AT7456E OSD, full-size microSD blackbox, and a dedicated ExpressLRS
            receiver connector.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["STM32F405", "Betaflight", "ICM-42688-P", "20x20", "KiCad"].map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              render={
                <Link
                  href="https://github.com/sneakylizard123-4"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              size="sm"
              nativeButton={false}
            >
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

        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/dreamscape-f405/render-top.webp"
            alt="Dreamscape F405 V1 3D render"
            width={1200}
            height={900}
            className="w-full object-cover"
            priority
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            20×20 mm PCB — designed for 3-inch FPV builds
          </figcaption>
        </figure>

        <h2>Overview</h2>
        <p>
          Dreamscape F405 is a compact flight controller for 3-inch FPV drones. It is built around the
          STM32F405VGT6 and runs Betaflight. A dedicated JST-SH connector feeds an ExpressLRS
          receiver, while the AT7456E provides analog OSD and a full-size microSD slot handles
          blackbox logging.
        </p>
        <p>
          The board accepts up to 6S battery input and generates a switchable 10 V rail for camera and
          VTX, a 5 V rail for peripherals, and a 3.3 V rail for the MCU and sensors. A TPS2116 power
          mux selects between USB and the onboard 5 V buck so the board can be configured over USB
          without a battery connected.
        </p>

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

        <h2 id="connectors">Connectors</h2>
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

        <h2 id="pinout">Pinout</h2>
        <p>Solder pads along the board edge expose the following signals:</p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Pad</th>
                <th className="pb-2 font-medium">Function</th>
              </tr>
            </thead>
            <tbody>
              {PADS.map((p) => (
                <tr key={p.pad} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs text-primary">{p.pad}</td>
                  <td className="py-2 text-muted-foreground">{p.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="power">Power Tree</h2>
        <ul>
          <li>
            <strong>Battery</strong> feeds two LMR51430 3 A bucks: one for the 10 V camera/VTX rail
            (switched by <code>10V_EN</code>) and one for the 5 V rail.
          </li>
          <li>
            <strong>TPS2116 power mux</strong> selects between USB +5 V and the onboard 5 V buck for
            the system rail.
          </li>
          <li>
            <strong>TLV75733 LDO</strong> derives 3.3 V for the MCU and sensors from the system 5 V.
          </li>
        </ul>

        <h2 id="schematics">Schematics</h2>
        <p>
          The design uses a hierarchical KiCad schematic with separate sheets for power, sensors,
          blackbox, OSD, MCU, pads/connectors, and USB.
        </p>
        <div className="not-prose my-6 grid gap-6 sm:grid-cols-2">
          {SCHEMATIC_IMAGES.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl border border-border">
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={1200}
                className="w-full object-cover"
              />
              <figcaption className="border-t border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2 id="firmware">Firmware</h2>
        <p>Dreamscape F405 targets Betaflight and is flashed over USB DFU.</p>
        <ol>
          <li>Connect the board over USB and open Betaflight Configurator.</li>
          <li>Open the Firmware Flasher and select the matching Betaflight target.</li>
          <li>Drag the <code>.bin</code> onto the mounted DFU drive, or flash through the configurator.</li>
          <li>
            If DFU is not accessible, flash over SWD with an ST-Link and{" "}
            <code>STM32_Programmer_CLI</code> or OpenOCD.
          </li>
        </ol>

        <h2 id="fabrication">Fabrication</h2>
        <p>Gerber files are pre-packaged for JLCPCB:</p>
        <ul>
          <li>
            <code>kicad/production/Dreamscape-F405-2020.zip</code> — Gerber and drill files
          </li>
        </ul>
        <p>
          The recommended assembly order is to reflow the front side first, then hand-solder the back
          side. PCBA is recommended for the fine-pitch parts.
        </p>

        <h2 id="status">Status</h2>
        <p>The board has not been manufactured yet. Design files and firmware targets are complete.</p>

        <h2>Credits</h2>
        <ul>
          <li>OpenDrone</li>
          <li>Betaflight project</li>
          <li>STMicroelectronics, TDK, Bosch, and Analog Devices datasheets for reference designs</li>
        </ul>

        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

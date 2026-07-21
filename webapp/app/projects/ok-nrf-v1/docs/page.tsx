import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Overkill nRF V1 — Docs",
  description: "Hardware documentation for the Overkill nRF V1 modular RF communication board.",
};

const KEY_ICS = [
  { ref: "U1", name: "ESP32-S3-WROOM-1U-N16R8", desc: "Main MCU — dual-core 240 MHz, Wi-Fi + BLE, 16 MB Flash, 8 MB PSRAM. External antenna via U.FL." },
  { ref: "U2–U4", name: "nRF24L01+ GT-24", desc: "2.4 GHz ISM radio modules (×3). SPI bus with individual chip-select and IRQ lines." },
  { ref: "U5", name: "TLV75733", desc: "3.3V LDO regulator, 300 mA output. Powers ESP32 and all peripherals from USB-C input." },
  { ref: "U6", name: "TPD2EUSB30", desc: "ESD protection for USB data lines. 8V clamp, 5A peak." },
  { ref: "U7", name: "RFX2401C", desc: "Optional PA+LNA footprint for enhanced RF range (QFN-17)." },
];

const CONNECTORS = [
  { ref: "J1", name: "USB-C", desc: "16-pin USB-C for power and serial debug" },
  { ref: "J2", name: "microSD", desc: "Push-push microSD card slot (SPI mode)" },
  { ref: "J3–J5", name: "SMA Antenna", desc: "3× SMA female connectors for nRF24 module antennas" },
  { ref: "J6", name: "JST-PH 4P", desc: "System integration — SPI bus, power, data" },
  { ref: "J7", name: "JST-PH 3P", desc: "Power distribution — 3.3V, GND, signal" },
  { ref: "J8", name: "Pin Socket 4P", desc: "Expansion / debug header" },
  { ref: "SW1–SW8", name: "Tactile Switches", desc: "D-pad (5), BOOT, RESET, USER — 100gf actuation" },
  { ref: "SW9–SW10", name: "Slide Switch", desc: "SPDT slide switches for radio kill and mode select" },
];

const CONTROLS = [
  { ref: "SW1–SW5", name: "D-Pad", desc: "5-way navigation — up, down, left, right, center select" },
  { ref: "SW6", name: "BOOT", desc: "Hold while reset to enter ESP32 USB-DFU mode" },
  { ref: "SW7", name: "RESET", desc: "Hard-reset the ESP32" },
  { ref: "SW8", name: "USER", desc: "General-purpose push button (active-low, GPIO)" },
  { ref: "SW9", name: "Radio Kill", desc: "SPDT slide switch — disconnects nRF24 power" },
  { ref: "SW10", name: "Mode Select", desc: "SPDT slide switch — standalone vs integrated mode" },
];

const SCHEMATIC_IMAGES = [
  { src: "/images/projects/overkill-nrf/sch1.png", alt: "Schematic sheet 1", caption: "Sheet 1 — MCU, USB, power regulation, microSD" },
  { src: "/images/projects/overkill-nrf/sch2.png", alt: "Schematic sheet 2", caption: "Sheet 2 — nRF24 modules, SMA connectors, buttons, LEDs" },
];

const BOM_HIGH_LEVEL = [
  { category: "MCU", part: "ESP32-S3-WROOM-1U-N16R8", qty: 1, notes: "16 MB Flash, 8 MB PSRAM, external antenna" },
  { category: "Radio", part: "nRF24L01+ GT-24 SMD", qty: 3, notes: "2.4 GHz ISM, SPI, individual CS/IRQ" },
  { category: "RF Amplifier", part: "RFX2401C", qty: 1, notes: "Optional PA+LNA (QFN-17 footprint)" },
  { category: "Power", part: "TLV75733", qty: 1, notes: "3.3V LDO, 300 mA" },
  { category: "ESD Protection", part: "TPD2EUSB30", qty: 1, notes: "USB ESD clamp" },
  { category: "Antenna", part: "SMA Female (Amphenol)", qty: 3, notes: "2.4 GHz antenna connectors" },
  { category: "Antenna", part: "U.FL Connector", qty: 3, notes: "Optional U.FL for nRF24 modules" },
  { category: "Storage", part: "DM3AT-SF-PEJM5", qty: 1, notes: "Push-push microSD slot" },
  { category: "User Input", part: "PTS647 Tactile Switch", qty: 10, notes: "D-pad, BOOT, RESET, USER" },
  { category: "User Input", part: "JS102011SAQN Slide", qty: 3, notes: "SPDT slide switches" },
  { category: "LEDs", part: "WS2812B-V6", qty: 1, notes: "Addressable RGB NeoPixel" },
  { category: "LEDs", part: "0805 LEDs", qty: 4, notes: "Red, green, blue, yellow status" },
  { category: "Connectors", part: "USB-C 16P", qty: 1, notes: "TYPE-C-31-M-12" },
  { category: "Connectors", part: "JST-PH 4P", qty: 1, notes: "System integration" },
  { category: "Connectors", part: "JST-PH 3P", qty: 1, notes: "Power distribution" },
  { category: "Connectors", part: "Pin Socket 4P 2.54mm", qty: 1, notes: "Expansion header" },
  { category: "MOSFETs", part: "AO3400A", qty: 5, notes: "N-ch 30V power MOSFET (SOT-23)" },
  { category: "Protection", part: "SS14 Schottky", qty: 5, notes: "40V 1A (SMA)" },
  { category: "Passives", part: "0805 R/C/L", qty: "~200", notes: "Resistors, capacitors, ferrite beads" },
];

export default function OverkillNrfDocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button render={<Link href="/projects/ok-nrf-v1/" />} variant="ghost" size="sm" className="mb-8" nativeButton={false}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Landing
      </Button>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {/* ── Header ── */}
        <div className="not-prose mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-heading text-3xl font-bold !mb-0">Overkill nRF V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            ESP32-S3 modular RF communication board with 3× nRF24L01+ radio modules, microSD storage,
            WS2812B NeoPixel, and full Overkill system integration via JST-PH connectors.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["ESP32-S3", "nRF24L01+", "2.4 GHz", "Modular RF", "KiCad"].map((t) => (
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
            <Button render={<Link href="#bom" />} variant="outline" size="sm" nativeButton={false}>
              BOM
            </Button>
          </div>
        </div>

        {/* ── 3-D Render ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/overkill-nrf/rend1.png"
            alt="Overkill nRF V1 3D render — top side"
            width={960}
            height={720}
            className="w-full object-cover"
            priority
          />
        </figure>

        {/* ── Overview ── */}
        <h2>Overview</h2>
        <p>
          The Overkill nRF Board is a modular RF communication board designed for the Overkill system.
          Built around nRF24L01+ radio modules instead of a bare RF IC, it makes the design easier to
          assemble, debug, and iterate while keeping it fully modular.
        </p>
        <p>
          Three nRF24L01+ GT-24 modules sit on a shared SPI bus with individual chip-select and IRQ lines.
          The ESP32-S3-WROOM-1U-N16R8 provides Wi-Fi, BLE, and 16 MB of Flash for firmware. An external
          2.4 GHz antenna is supported via SMA and U.FL connectors. A microSD card slot handles local
          data logging, and a WS2812B NeoPixel provides programmable status indication.
        </p>

        {/* ── PCB ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/overkill-nrf/pcb.png"
            alt="Overkill nRF V1 PCB layout"
            width={720}
            height={540}
            className="w-full object-cover"
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            PCB layout — 3× nRF24 module sockets, USB-C, microSD, JST-PH system connectors
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

        {/* ── Controls ── */}
        <h2 id="controls">User Controls</h2>
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
              {CONTROLS.map((c) => (
                <tr key={c.ref} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-primary">{c.ref}</td>
                  <td className="py-2.5 pr-4 font-medium">{c.name}</td>
                  <td className="py-2.5 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Schematics ── */}
        <h2 id="schematics">Schematics</h2>
        <p>
          The design uses a two-sheet KiCad schematic. Sheet 1 covers the MCU, USB, power regulation,
          and microSD. Sheet 2 covers the nRF24 modules, antenna routing, buttons, and LEDs.
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

        {/* ── BOM ── */}
        <h2 id="bom">Bill of Materials (Summary)</h2>
        <p>
          Full BOM with LCSC part numbers and purchase links is available in{" "}
          <code>bom/bom.csv</code>. Below is a high-level summary.
        </p>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Category</th>
                <th className="pb-2 pr-4 font-medium">Part</th>
                <th className="pb-2 pr-2 font-medium">Qty</th>
                <th className="pb-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BOM_HIGH_LEVEL.map((b, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-xs text-muted-foreground">{b.category}</td>
                  <td className="py-2 pr-4 font-medium">{b.part}</td>
                  <td className="py-2 pr-2 font-mono text-xs">{b.qty}</td>
                  <td className="py-2 text-muted-foreground">{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Firmware ── */}
        <h2 id="firmware">Firmware</h2>
        <p>
          The Overkill nRF uses a PlatformIO project targeting the ESP32-S3 with the Arduino framework.
          The firmware handles nRF24 communication, Bluetooth, Wi-Fi, NeoPixel control, and settings
          management.
        </p>
        <ol>
          <li>Connect the board via USB-C.</li>
          <li>Hold <strong>BOOT</strong> and press <strong>RESET</strong> to enter DFU mode.</li>
          <li>
            Flash with PlatformIO: <code>pio run -t upload</code>
          </li>
          <li>Press <strong>RESET</strong> to reboot into the firmware.</li>
        </ol>

        {/* ── Fabrication ── */}
        <h2 id="fabrication">Fabrication</h2>
        <p>Gerber files are pre-packaged for JLCPCB:</p>
        <ul>
          <li>
            <code>kicad/production/Overkill-nRF-JLCPCB.zip</code> — JLCPCB (with optional assembly)
          </li>
        </ul>
        <p>
          The pick-and-place file (<code>positions.csv</code>) supports 80 components for SMT assembly.
          The board uses mostly 0805 passives for easy hand-soldering.
        </p>

        {/* ── Architecture ── */}
        <h2 id="architecture">Architecture</h2>
        <p>The PCB is organized into four functional blocks:</p>
        <ol>
          <li>
            <strong>MCU</strong> — ESP32-S3-WROOM-1U-N16R8 with external antenna, USB-C for power and debug,
            microSD card slot for data logging.
          </li>
          <li>
            <strong>Radio</strong> — 3× nRF24L01+ GT-24 modules on a shared SPI bus with individual chip-select
            and IRQ lines. Optional RFX2401C PA+LNA footprint for extended range.
          </li>
          <li>
            <strong>Power</strong> — USB-C input → TLV75733 3.3V LDO (300 mA). Schottky diodes for protection,
            ferrite bead filtering, ESD protection on USB lines.
          </li>
          <li>
            <strong>User Interface</strong> — 10 tactile switches (d-pad + center, BOOT, RESET, USER),
            4 status LEDs (R/G/B/Y), WS2812B NeoPixel, 3× SPDT slide switches.
          </li>
        </ol>

        {/* ── License ── */}
        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Mesh_Hand V1 — Docs",
  description: "Hardware documentation for the Mesh_Hand V1 handheld Meshtastic node.",
};

const BLOCKS = [
  {
    ref: "U1",
    name: "ESP32-S3-WROOM-1",
    desc: "Main MCU — dual-core 240 MHz, Wi-Fi + BLE, 8 MB PSRAM. Runs the Meshtastic firmware.",
    footprint: "ESP32-S3-WROOM-1U",
  },
  {
    ref: "U6",
    name: "E22-900M30S",
    desc: "LoRa 900 MHz transceiver module, +22 dBm TX, up to 30 km range. Connected via SPI.",
    footprint: "XCVR_E22-900M30S",
  },
  {
    ref: "U5",
    name: "NEO-M9N",
    desc: "u-blox multi-band GNSS receiver. 1.5 m CEP positioning via UART.",
    footprint: "ublox_NEO",
  },
  {
    ref: "U7",
    name: "BME280",
    desc: "Temperature, humidity & barometric pressure sensor. I2C at 0x76.",
    footprint: "Bosch_LGA-8",
  },
  {
    ref: "U10",
    name: "SCD41-D-R2",
    desc: "Sensirion CO₂ sensor (0–40 000 ppm). I2C at 0x62.",
    footprint: "Sensirion_SCD4x-1EP",
  },
  {
    ref: "U11",
    name: "MAX30102",
    desc: "Pulse oximeter / heart-rate sensor. I2C at 0x57.",
    footprint: "Maxim_OLGA-14",
  },
  {
    ref: "U9",
    name: "INA260",
    desc: "Current & power monitor for the battery rail. I2C at 0x40.",
    footprint: "TSSOP-16",
  },
  {
    ref: "U8",
    name: "DS3231M",
    desc: "High-accuracy RTC with ±2 ppm drift. Keeps time when ESP32 is sleeping.",
    footprint: "SOIC-16W",
  },
  {
    ref: "U2",
    name: "IP5306",
    desc: "Battery charger / 5 V boost. Charges via USB-C, powers the board from LiPo.",
    footprint: "SOP127P600X165-9N",
  },
  {
    ref: "U3",
    name: "TPS62822",
    desc: "3.3 V buck converter, 96 % efficiency, 200 mA. Powers the ESP32 and peripherals.",
    footprint: "VSON-HR-8",
  },
  {
    ref: "U4",
    name: "LM339",
    desc: "Quad comparator driving the 4-LED LiPo charge indicator.",
    footprint: "SOIC-14",
  },
  {
    ref: "U12",
    name: "TLV70218",
    desc: "Voltage supervisor — holds the reset line until 3.3 V is stable.",
    footprint: "SOT-23-5",
  },
];

const CONNECTORS = [
  { ref: "J4", name: "USB-C", desc: "14-pin USB-C for charging and serial debug" },
  { ref: "J5", name: "Battery", desc: "2-pin JST-PH for 3.7 V LiPo" },
  { ref: "J7", name: "LoRa SMA", desc: "SMA antenna port for E22-900M30S" },
  { ref: "J8", name: "GPS SMA", desc: "SMA antenna port for NEO-M9N" },
  { ref: "J2", name: "OLED", desc: "4-pin I²C header for 0.96\" SSD1306 display" },
  { ref: "J3", name: "Expand", desc: "2-pin JST-PH expansion header" },
  { ref: "J1", name: "Buzzer", desc: "2-pin JST-PH for piezo buzzer" },
  { ref: "J10", name: "Vibrate", desc: "2-pin JST-PH for vibration motor" },
];

const CONTROLS = [
  { ref: "SW4", name: "Rotary Encoder", desc: "Alps EC11E — navigate menus, select options, push to confirm" },
  { ref: "SW1", name: "BOOT", desc: "Hold while reset to enter ESP32 USB-DFU mode" },
  { ref: "SW2", name: "EN", desc: "Enable / hard-reset the ESP32" },
  { ref: "SW3", name: "USER", desc: "General-purpose push button (active-low, GPIO)" },
  { ref: "SW5", name: "Push", desc: "Additional user push button" },
];

const SCHEMATIC_IMAGES = [
  { src: "/images/projects/mesh-hand/sch-root.png", alt: "Root schematic", caption: "Root — top-level sheet connecting all sub-sheets" },
  { src: "/images/projects/mesh-hand/sch-power.png", alt: "Power schematic", caption: "Power — USB-C input, IP5306 charger, TPS62822 3.3 V buck, MOSFET switching" },
  { src: "/images/projects/mesh-hand/sch-radio.png", alt: "Radio schematic", caption: "Radio — E22-900M30S LoRa module, dual SMA antenna paths" },
  { src: "/images/projects/mesh-hand/sch-sensor.png", alt: "Sensor schematic", caption: "Sensors — BME280, SCD41, MAX30102, INA260, DS3231M" },
  { src: "/images/projects/mesh-hand/sch-lipo.png", alt: "LiPo indicator schematic", caption: "LiPo Indicator — LM339 comparator, resistor divider, LED bar" },
];

const BOM_HIGH_LEVEL = [
  { category: "Microcontroller", part: "ESP32-S3-WROOM-1U", qty: 1, notes: "8 MB flash, 8 MB PSRAM" },
  { category: "Radio", part: "E22-900M30S", qty: 1, notes: "+22 dBm, 900 MHz LoRa" },
  { category: "GPS", part: "u-blox NEO-M9N", qty: 1, notes: "Multi-band GNSS" },
  { category: "Sensors", part: "BME280", qty: 1, notes: "Temp / humidity / pressure" },
  { category: "Sensors", part: "SCD41-D-R2", qty: 1, notes: "CO₂ (0–40 000 ppm)" },
  { category: "Sensors", part: "MAX30102", qty: 1, notes: "Pulse oximeter" },
  { category: "Sensors", part: "INA260", qty: 1, notes: "Current & power monitor" },
  { category: "RTC", part: "DS3231M", qty: 1, notes: "±2 ppm accuracy" },
  { category: "Power", part: "IP5306", qty: 1, notes: "LiPo charger + 5 V boost" },
  { category: "Power", part: "TPS62822DLC", qty: 1, notes: "3.3 V buck, 96 % eff" },
  { category: "Power", part: "TLV70218", qty: 1, notes: "Voltage supervisor" },
  { category: "Indicator", part: "LM339", qty: 1, notes: "Quad comparator (LiPo bar)" },
  { category: "LEDs", part: "WS2812B-2020", qty: 2, notes: "Addressable RGB (NeoPixel)" },
  { category: "LEDs", part: "0603 LEDs", qty: 10, notes: "Purple, green, blue, pink, yellow, orange, red, white, 590 nm" },
  { category: "User Input", part: "Alps EC11E", qty: 1, notes: "Rotary encoder w/ switch" },
  { category: "User Input", part: "EVQPUM push buttons", qty: 4, notes: "BOOT, EN, USER, SW5" },
  { category: "Connectors", part: "USB-C 14P", qty: 1, notes: "HRO TYPE-C-31-M-12" },
  { category: "Connectors", part: "SMA (Amphenol 901-143)", qty: 2, notes: "LoRa + GPS antenna" },
  { category: "Connectors", part: "JST-PH 2-pin", qty: 5, notes: "Battery, buzzer, vibrate, expand, misc" },
  { category: "Connectors", part: "OLED 4-pin SMD", qty: 1, notes: "SSD1306 display" },
  { category: "Passives", part: "0603 R/C", qty: "~100", notes: "27 resistors, 40 capacitors (see full BOM)" },
  { category: "Passives", part: "1206 inductors", qty: 2, notes: "1 µH, 470 nH" },
  { category: "Protection", part: "MBR1020VL", qty: 3, notes: "Schottky diodes (SOD-123F)" },
  { category: "MOSFETs", part: "AO3400A", qty: 5, notes: "N-ch power MOSFET (SOT-23)" },
  { category: "MOSFETs", part: "BSS138", qty: 3, notes: "N-ch level shifter (SOT-23)" },
];

export default function MeshHandDocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button render={<Link href="/projects/mesh_hand-v1/" />} variant="ghost" size="sm" className="mb-8" nativeButton={false}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Landing
      </Button>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {/* ── Header ── */}
        <div className="not-prose mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-heading text-3xl font-bold !mb-0">Mesh_Hand V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            ESP32-S3 handheld Meshtastic node with GPS, LoRa radio, environmental sensors, OLED display, and rotary
            encoder — all on a single double-sided purple PCB.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["ESP32-S3", "Meshtastic", "LoRa 900 MHz", "GPS", "KiCad"].map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
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
            src="/images/projects/mesh-hand/render-purple.png"
            alt="Mesh_Hand V1 3D render"
            width={960}
            height={720}
            className="w-full object-cover"
            priority
          />
        </figure>

        {/* ── Overview ── */}
        <h2>Overview</h2>
        <p>
          Mesh_Hand is a portable Meshtastic node designed for outdoor use — hiking, camping, and off-grid
          communication. It packs an ESP32-S3 (Wi-Fi + BLE), a 900 MHz LoRa transceiver (E22-900M30S), and a u-blox
          NEO-M9N GPS onto a compact purple PCB with custom silkscreen art.
        </p>
        <p>
          Beyond radio and GPS, the board includes a full environmental sensor suite (BME280, SCD41 CO₂, MAX30102 pulse
          oximeter), a real-time clock (DS3231M), INA260 power monitoring, and a 4-LED LiPo charge indicator driven by
          an LM339 comparator. Input is handled by a rotary encoder with push-button and three additional tactile
          switches. Power comes from a LiPo battery via a USB-C charging circuit (IP5306) and a 3.3 V buck converter
          (TPS62822).
        </p>

        {/* ── PCB ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/mesh-hand/pcb.png"
            alt="Mesh_Hand V1 PCB rendering"
            width={720}
            height={540}
            className="w-full object-cover"
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            Double-sided PCB — 153 components, 2-layer, custom silkscreen
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
              {BLOCKS.map((b) => (
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
          The design uses a hierarchical KiCad schematic with five sheets organized by functional block. Each sheet can
          be viewed below.
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
          Full BOM with LCSC part numbers is available in
          <code>kicad/production/bom.csv</code>. Below is a high-level summary.
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
          Mesh_Hand runs the official{" "}
          <a href="https://meshtastic.org" target="_blank" rel="noopener noreferrer">
            Meshtastic
          </a>{" "}
          firmware. Flash via USB-C using the ESP32-S3 built-in USB-DFU (hold BOOT, press RESET) or over-the-air once
          initial provisioning is done.
        </p>
        <ol>
          <li>Connect the board via USB-C.</li>
          <li>Hold <strong>BOOT</strong> (SW1) and press <strong>EN</strong> (SW2) to enter DFU mode.</li>
          <li>
            Flash with{" "}
            <code>meshtastic --flash /path/to/firmware.bin</code> or use the Meshtastic web flasher.
          </li>
          <li>Press <strong>EN</strong> to reboot into the Meshtastic firmware.</li>
        </ol>

        {/* ── Fabrication ── */}
        <h2 id="fabrication">Fabrication</h2>
        <p>Gerber files are pre-packaged for two fab houses:</p>
        <ul>
          <li>
            <code>kicad/production/mesh_hand_JLCPCB.zip</code> — JLCPCB (with optional assembly)
          </li>
          <li>
            <code>kicad/production/mesh_hand_PCBWAY.zip</code> — PCBWay
          </li>
        </ul>
        <p>
          The pick-and-place file (<code>positions.csv</code>) supports 153 components for SMT assembly. The board is a
          standard 2-layer, 1.6 mm FR-4 with ENIG finish.
        </p>

        {/* ── Architecture ── */}
        <h2 id="architecture">Architecture</h2>
        <p>The PCB is organized into five functional blocks:</p>
        <ol>
          <li>
            <strong>Power</strong> — USB-C → IP5306 (charger + 5 V boost) → TPS62822 (3.3 V buck). MOSFET switching
            with AO3400A and BSS138 level shifters.
          </li>
          <li>
            <strong>Radio</strong> — E22-900M30S LoRa module with SMA antenna. Connected to ESP32 via SPI.
          </li>
          <li>
            <strong>Sensors</strong> — BME280, SCD41, MAX30102, INA260, DS3231M — all on I²C.
          </li>
          <li>
            <strong>LiPo Indicator</strong> — LM339 quad comparator with resistor divider network and 4 colored LEDs.
          </li>
          <li>
            <strong>User Interface</strong> — Rotary encoder, 4 push buttons, OLED header, NeoPixel LEDs, buzzer, and
            vibration motor connectors.
          </li>
        </ol>

        {/* ── License ── */}
        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

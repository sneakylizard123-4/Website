import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "BitcoinMiner V1 — Docs",
  description:
    "Hardware documentation for the BitcoinMiner V1 single BM1370 ASIC Bitcoin miner.",
  alternates: { canonical: "/projects/bitcoinminer-v1/docs/" },
};

const KEY_ICS = [
  {
    ref: "U5",
    name: "BM1370",
    desc: "Bitmain SHA-256 mining ASIC — single-ASIC hashing engine.",
  },
  {
    ref: "U10",
    name: "ESP32-S3-WROOM-1 N16R8",
    desc: "WiFi/BLE control module, 16 MB flash, 8 MB PSRAM.",
  },
  {
    ref: "U12",
    name: "TPS546D24ARVFR",
    desc: "20 A step-down converter for the 1.2 V ASIC core rail.",
  },
  { ref: "U11", name: "EMC2101", desc: "I2C fan controller." },
  { ref: "U9", name: "TLV75733PDBV", desc: "3.3 V LDO for logic and the ESP32." },
  { ref: "U3", name: "TLV75712PDBV", desc: "1.2 V LDO for auxiliary rails." },
  { ref: "U4", name: "MCP1824T-0802E", desc: "0.8 V LDO referenced by the core regulator." },
  {
    ref: "U6–U8",
    name: "SN74LVC1T45",
    desc: "Level shifters between the ESP32 and ASIC domains.",
  },
];

const CONNECTORS = [
  { ref: "J1", name: "DC barrel jack 2.0 × 5.5 mm", desc: "Main power input" },
  { ref: "J4", name: "USB-C", desc: "Native USB programming and power" },
  { ref: "J6", name: "1×4 2.54 mm header", desc: "Debug / expansion" },
  { ref: "J7", name: "JST-SH 4-pin", desc: "Fan connector" },
  { ref: "TP", name: "TC2030 Tag-Connect", desc: "Debug and flashing header" },
  { ref: "SW1 / SW2", name: "Tactile switches", desc: "RESET and BOOT" },
];

const SCHEMATIC_IMAGES = [
  {
    src: "/images/projects/bitcoinminer/bitcoinMiner.webp",
    alt: "BitcoinMiner root schematic",
    caption: "Root / block diagram",
  },
  {
    src: "/images/projects/bitcoinminer/bitcoinMiner-BM1370.webp",
    alt: "BitcoinMiner BM1370 schematic",
    caption: "BM1370 ASIC and support circuitry",
  },
  {
    src: "/images/projects/bitcoinminer/bitcoinMiner-ESP32.webp",
    alt: "BitcoinMiner ESP32 schematic",
    caption: "ESP32-S3 module and level shifting",
  },
  {
    src: "/images/projects/bitcoinminer/bitcoinMiner-Power.webp",
    alt: "BitcoinMiner power schematic",
    caption: "Power — 20 A core rail and LDOs",
  },
];

export default function BitcoinMinerDocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button
        render={<Link href="/projects/bitcoinminer-v1/" />}
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
            <h1 className="font-heading text-3xl font-bold !mb-0">BitcoinMiner V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            A single BM1370 ASIC Bitcoin miner with ESP32-S3 control, a 20 A core regulator, nine
            addressable status LEDs, and I2C fan control. Based on the Bitaxe Gamma reference design.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["BM1370", "ESP32-S3", "Bitcoin", "ASIC", "Bitaxe"].map((t) => (
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
            src="/images/projects/bitcoinminer/pcb-top-angle.webp"
            alt="BitcoinMiner V1 3D render"
            width={1200}
            height={900}
            className="w-full object-cover"
            priority
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            100 × 75 mm four-layer PCB — BM1370 ASIC on the front
          </figcaption>
        </figure>

        <h2>Overview</h2>
        <p>
          BitcoinMiner is a single-ASIC Bitcoin miner built around the BM1370. It follows the proven
          Bitaxe Gamma reference design for the ASIC support circuitry and replaces the power stage
          with a 20 A TPS546D24 buck rail for the 1.2 V core.
        </p>
        <p>
          An ESP32-S3-WROOM-1 N16R8 module provides WiFi and BLE control and can be programmed over
          the native USB-C port or a TC2030 Tag-Connect header. Nine WS2812B LEDs give status feedback,
          and an EMC2101 fan controller communicates with the ESP32 over I2C.
        </p>
        <p>
          The board is a 100 × 75 mm four-layer PCB with a dedicated ground inner layer. Firmware is
          based on ESP-Miner and is flashed with bitaxetool.
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

        <h2 id="power">Power</h2>
        <p>
          The ASIC core is powered by a TPS546D24 20 A synchronous buck set to 1.2 V, with a 300 nH
          shielded inductor and local bulk capacitance. Auxiliary 3.3 V, 1.2 V, and 0.8 V rails are
          generated by TLV75733, TLV75712, and MCP1824 LDOs. The board is powered from a DC barrel
          jack or USB-C.
        </p>

        <h2 id="schematics">Schematics</h2>
        <p>
          The KiCad project is split into BM1370, ESP32, fan, and power sheets under a root sheet.
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
        <p>
          Firmware is the open-source ESP-Miner. To enter program mode, hold BOOT (SW2), press RESET
          (SW1), release BOOT, then start flashing.
        </p>
        <pre>
          <code>{`pip install bitaxetool
bitaxetool --config firmware/configs/config-bitcoinMiner.csv \\
  --firmware firmware/esp-miner-merged.bin`}</code>
        </pre>

        <h2 id="fabrication">Fabrication</h2>
        <ul>
          <li>4-layer PCB, 1.6 mm thick, HASL lead-free finish</li>
          <li>
            Gerbers and production files: <code>kicad/production/bitcoinMiner.zip</code>
          </li>
          <li>
            BOM and pick-and-place: <code>BOM.csv</code>, <code>positions.csv</code>
          </li>
          <li>Fabricated with JLCPCB</li>
        </ul>

        <h2 id="status">Status</h2>
        <p>
          Design and firmware are in progress. The BM1370 and core regulator are the main areas under
          bring-up.
        </p>

        <h2>Credits</h2>
        <ul>
          <li>Bitaxe Gamma — reference schematic and BM1370 support circuitry</li>
          <li>ESP-Miner — firmware base</li>
          <li>Hack Club Forge — funding</li>
        </ul>

        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

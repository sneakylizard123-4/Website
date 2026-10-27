import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VersionSwitch } from "@/components/version-switch";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Mesh_Hand V2 — Docs",
  description:
    "Hardware documentation for the Mesh_Hand V2 handheld Meshtastic node, including BOM, schematics, build proof, and test results.",
  alternates: { canonical: "/projects/mesh_hand-v2/docs/" },
};

const BLOCKS = [
  {
    ref: "U6",
    name: "ESP32-S3-WROOM-1",
    desc: "Main MCU — dual-core 240 MHz, Wi-Fi + BLE. Runs the Meshtastic firmware.",
    footprint: "ESP32-S3-WROOM-1U",
  },
  {
    ref: "U5",
    name: "E22-900M30S",
    desc: "LoRa 900 MHz transceiver module, +22 dBm TX. Connected via SPI.",
    footprint: "XCVR_E22-900M30S",
  },
  {
    ref: "U4",
    name: "NEO-M9N",
    desc: "u-blox multi-band GNSS receiver connected over UART.",
    footprint: "ublox_NEO",
  },
  {
    ref: "U1",
    name: "IP5306",
    desc: "Battery charger and 5 V boost for the LiPo rail.",
    footprint: "SOP127P600X165-9N",
  },
  {
    ref: "U2, U3",
    name: "TLV75733PDBV",
    desc: "3.3 V LDOs for the MCU and peripherals.",
    footprint: "SOT-23-5",
  },
  {
    ref: "U7",
    name: "USBLC6-2SC6",
    desc: "ESD protection for the USB data lines.",
    footprint: "SOT-23-6",
  },
  {
    ref: "U8",
    name: "DS3231M",
    desc: "High-accuracy real-time clock with battery backup.",
    footprint: "SOIC-16W_7.5x10.3mm_P1.27mm",
  },
];

const CONNECTORS = [
  { ref: "J1", name: "Battery", desc: "2-pin JST-PH for 3.7 V LiPo" },
  { ref: "J2", name: "SMA", desc: "SMA antenna connector (Amphenol 901-143)" },
  { ref: "J3", name: "SMA Coax", desc: "Second SMA coaxial antenna connector" },
  { ref: "J4", name: "USB-C", desc: "USB-C receptacle (HRO TYPE-C-31-M-12)" },
  { ref: "J5", name: "OLED", desc: "4-pin socket for the SSD1306 display" },
];

const CONTROLS = [
  { ref: "SW1–SW3", name: "Push buttons", desc: "Three Panasonic EVQPUM push buttons" },
];

const SCHEMATIC_IMAGES = [
  { src: "/images/projects/mesh-hand/v2/sch-01-root.webp", alt: "V2 root schematic", caption: "Root — top-level sheet connecting all sub-sheets" },
  { src: "/images/projects/mesh-hand/v2/sch-02-gps.webp", alt: "V2 GPS schematic", caption: "GPS — NEO-M9N receiver" },
  { src: "/images/projects/mesh-hand/v2/sch-03-radio.webp", alt: "V2 radio schematic", caption: "Radio — E22-900M30S LoRa module" },
  { src: "/images/projects/mesh-hand/v2/sch-04-rtc.webp", alt: "V2 RTC schematic", caption: "RTC — DS3231M real-time clock" },
  { src: "/images/projects/mesh-hand/v2/sch-05-oled.webp", alt: "V2 OLED schematic", caption: "OLED — SSD1306 display header" },
  { src: "/images/projects/mesh-hand/v2/sch-06-power.webp", alt: "V2 power schematic", caption: "Power — USB-C, IP5306 charger, TLV75733 rails" },
  { src: "/images/projects/mesh-hand/v2/sch-07-esp32.webp", alt: "V2 ESP32 schematic", caption: "ESP32 — ESP32-S3-WROOM-1 and USB" },
];

export default function MeshHandV2DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button render={<Link href="/projects/mesh_hand-v2/" />} variant="ghost" size="sm" className="mb-8" nativeButton={false}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to Landing
      </Button>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {/* ── Header ── */}
        <div className="not-prose mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-heading text-3xl font-bold !mb-0">Mesh_Hand V2</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
            <VersionSwitch
              versions={[
                { label: "V1", href: "/projects/mesh_hand-v1/docs/" },
                { label: "V2", href: "/projects/mesh_hand-v2/docs/" },
              ]}
              current="V2"
            />
          </div>
          <p className="text-muted-foreground">
            Second revision of the handheld Meshtastic node — ESP32-S3, 900 MHz LoRa, GPS, OLED, RTC, and LiPo power.
            Built and mesh-tested in October 2026.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["ESP32-S3", "Meshtastic", "LoRa 900 MHz", "GPS", "OLED", "KiCad"].map((t) => (
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
            <Button render={<Link href="#build" />} variant="outline" size="sm" nativeButton={false}>
              Build Proof
            </Button>
          </div>
        </div>

        {/* ── 3-D Render ── */}
        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/mesh-hand/v2/render-top.webp"
            alt="Mesh_Hand V2 3D render"
            width={1200}
            height={900}
            className="h-auto w-full"
          />
          <figcaption className="border-t border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
            Mesh_Hand V2 — second revision, built and tested October 2026.
          </figcaption>
        </figure>

        <h2>Overview</h2>
        <p>
          Mesh_Hand V2 is a handheld Meshtastic node built around an ESP32-S3-WROOM-1, an E22-900M30S 900 MHz LoRa
          module, a u-blox NEO-M9N GNSS receiver, an IP5306 power stage, an SSD1306 OLED header, and a DS3231M
          real-time clock. Power comes from USB-C or a 3.7 V LiPo through a JST-PH connector.
        </p>
        <p>
          Compared with V1, the V2 BOM removes the environmental sensor suite, rotary encoder, buzzer, and vibration
          motor, and replaces the power stage with two TLV75733 LDOs plus USBLC6 ESD protection. V2 keeps the radio,
          GPS, OLED, and RTC and adds assembled-hardware proof.
        </p>

        <h2>Key ICs</h2>
        <div className="not-prose overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Ref</th>
                <th className="py-2 pr-4 font-medium">Part</th>
                <th className="py-2 pr-4 font-medium">Function</th>
                <th className="py-2 font-medium">Footprint</th>
              </tr>
            </thead>
            <tbody>
              {BLOCKS.map((b) => (
                <tr key={b.ref} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs">{b.ref}</td>
                  <td className="py-2 pr-4 font-medium">{b.name}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{b.desc}</td>
                  <td className="py-2 font-mono text-xs text-muted-foreground">{b.footprint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Connectors</h2>
        <div className="not-prose overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Ref</th>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {CONNECTORS.map((c) => (
                <tr key={c.ref} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs">{c.ref}</td>
                  <td className="py-2 pr-4 font-medium">{c.name}</td>
                  <td className="py-2 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Controls</h2>
        <div className="not-prose overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Ref</th>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {CONTROLS.map((c) => (
                <tr key={c.ref} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-xs">{c.ref}</td>
                  <td className="py-2 pr-4 font-medium">{c.name}</td>
                  <td className="py-2 text-muted-foreground">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="schematics">Schematics</h2>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {SCHEMATIC_IMAGES.map((s) => (
            <figure key={s.src} className="overflow-hidden rounded-xl border border-border">
              <Image
                src={s.src}
                alt={s.alt}
                width={1400}
                height={1000}
                className="h-auto w-full bg-white"
              />
              <figcaption className="border-t border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2>Power</h2>
        <ul>
          <li>USB-C VBUS or 3.7 V LiPo through JST-PH.</li>
          <li>IP5306 handles charging and the 5 V boost rail.</li>
          <li>Two TLV75733 LDOs provide 3.3 V to the MCU and peripherals.</li>
          <li>USBLC6-2SC6 protects the USB data lines.</li>
        </ul>

        <h2 id="build">Build &amp; Testing</h2>
        <p>
          V2 was fabricated and assembled in October 2026: PCB arrival on October 13, paste and hotplate reflow on
          October 19, and first power-up plus mesh testing on October 20.
        </p>
        <p>
          The board joined a Meshtastic mesh with six nodes online, delivered a <code>Test</code> message on the
          LongFast channel, and received replies. LED blink and radio tests passed. The full assembly notes and test
          table are tracked in <code>proof/V2/PROOF.md</code> in the project repository.
        </p>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {[
            { src: "/images/projects/mesh-hand/v2/proof-front.webp", alt: "Assembled Mesh_Hand V2, front", caption: "Assembled board, front" },
            { src: "/images/projects/mesh-hand/v2/proof-back.webp", alt: "Assembled Mesh_Hand V2, back", caption: "Assembled board, back" },
            { src: "/images/projects/mesh-hand/v2/proof-working.webp", alt: "Mesh_Hand V2 powered and running", caption: "Powered up and running, October 20" },
            { src: "/images/projects/mesh-hand/v2/proof-hotplate.webp", alt: "Mesh_Hand V2 reflow on hotplate", caption: "Reflow on the hotplate, October 19" },
          ].map((p) => (
            <figure key={p.src} className="overflow-hidden rounded-xl border border-border">
              <Image src={p.src} alt={p.alt} width={1200} height={900} className="h-auto w-full" />
              <figcaption className="border-t border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2>Firmware</h2>
        <p>
          V2 runs the Meshtastic firmware. Flash it over USB-C using the Meshtastic flasher or <code>esptool</code>.
          The board enumerates as a USB serial device for flashing and console access.
        </p>

        <h2>Fabrication</h2>
        <p>
          Production files are in <code>kicad/production/</code>: BOM, designators, positions, and fabrication
          archives for JLCPCB and PCBWay. The board was assembled in October 2026.
        </p>

        <h2>Status</h2>
        <p>
          Built and working. The Meshtastic mesh test passed on October 20, 2026. Assembly details and known issues in
          <code>proof/V2/PROOF.md</code> are still being filled in.
        </p>

        <h2>Credits</h2>
        <p>Designed by pn2222a. Meshtastic is an open-source project.</p>

        <h2>License</h2>
        <p>Open-source hardware. Designed with KiCad.</p>
      </article>
    </div>
  );
}

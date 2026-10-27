import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "STM32H743 FPGA Devboard V1 — Docs",
  description:
    "Hardware documentation for the STM32H743 and iCE40 UP5K devboard with USB High-Speed, Ethernet, and audio I/O.",
  alternates: { canonical: "/projects/stm32h743-v1/docs/" },
};

const BLOCKS = [
  {
    block: "MCU",
    part: "STM32H743XIH6",
    role: "Main controller — USB, Ethernet MAC, SDMMC, audio, control",
  },
  {
    block: "FPGA",
    part: "ICE40UP5K-SG48I",
    role: "Programmable logic and custom interfaces on two 2.54 mm headers",
  },
  {
    block: "USB PHY",
    part: "USB3300-EZK",
    role: "ULPI PHY for USB 2.0 High-Speed",
  },
  { block: "Ethernet PHY", part: "LAN8742A", role: "RMII 10/100 PHY with RJ45 and magnetics" },
  { block: "Clock", part: "Si5351C-B-GM", role: "Eight-output clock generator, 25 MHz TCXO" },
  { block: "Audio DAC", part: "CS4344", role: "Stereo I2S DAC to the 3.5 mm jack" },
  {
    block: "Microphones",
    part: "ICS-43434, MMICT390200012",
    role: "PDM digital microphones",
  },
  { block: "Storage", part: "Hirose DM3D-SF", role: "microSD socket on a 4-bit SDMMC bus" },
  { block: "USB power", part: "TPD3S014", role: "Current-limited USB-A host port switch" },
  {
    block: "Power",
    part: "TLV75733 / 75725 / 75718 / 75712",
    role: "3.3 V, 2.5 V, 1.8 V, and 1.2 V LDO rails",
  },
];

const HEADERS = [
  { iface: "FPGA", signals: "BANK0_IOT, BANK1_IOB, BANK2_IOB, CDONE, CRESET" },
  { iface: "MCU GPIO", signals: "PB, PF, PG, PH, PI, PJ, PK pins" },
  { iface: "Analog", signals: "ADC1, ADC2, ADC3, COMP2, OPAMP2" },
  { iface: "Camera", signals: "DCMI D0–D7, HSYNC, VSYNC, PIXCLK" },
  { iface: "Serial", signals: "USART1, USART2, USART3, USART6, LPUART1" },
  { iface: "Other", signals: "FDCAN1, I2C2, I2S2, QUADSPI, RTC, SAI1A, SPI4, SWD" },
];

const SCHEMATIC_IMAGES = [
  {
    src: "/images/projects/stm32h743/01-root.webp",
    alt: "STM32H743 root schematic",
    caption: "Root sheet",
  },
  {
    src: "/images/projects/stm32h743/02-power.webp",
    alt: "STM32H743 power schematic",
    caption: "Power — LDO rails and ferrite filtering",
  },
  {
    src: "/images/projects/stm32h743/04-mcu.webp",
    alt: "STM32H743 MCU schematic",
    caption: "STM32H743 MCU",
  },
  {
    src: "/images/projects/stm32h743/05-fpga.webp",
    alt: "STM32H743 FPGA schematic",
    caption: "iCE40 UP5K FPGA",
  },
];

const KNOWN_ISSUES = [
  "The LTDC sheet is a placeholder with bus labels but no display connector, so LTDC is not physically brought out.",
  "X2 uses a 3225 4-pad footprint for the 32.768 kHz LSE crystal; rev B should use a 3215 2-pad footprint or a non-LCSC 4-pad part.",
  "C1 is specified as 120 µF in an 0603 footprint, which cannot be assembled; the BOM substitutes a 47 µF 0603 part, below the USB 2.0 host recommendation.",
  "The ICE40UP5K-SG48ITR is obsolete; the BOM uses the industrial-temperature ICE40UP5K-SG48I in the same package.",
  "Firmware is included but has never run on hardware because no board has been fabricated.",
  "Ethernet is not usable in rev A — the RMII 50 MHz REF_CLK is not connected to H743 PA1, which is used for the PHY interrupt.",
  "No USB stack is included; the USB3300 ULPI PHY is only probed at the register level.",
  "The two PDM microphones are not supported by the firmware.",
  "There is no enclosure, native CAD source, or mechanical assembly — only a STEP export of the PCB.",
  "The design has not been reviewed by another person yet.",
  "kicad/fpgaperipherals.kicad_sch contains parts not on the PCB and kicad/sensors.kicad_sch is empty; neither sheet is in the hierarchy.",
  "The root schematic title block is empty.",
];

export default function STM32H743DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Button
        render={<Link href="/projects/stm32h743-v1/" />}
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
            <h1 className="font-heading text-3xl font-bold !mb-0">STM32H743 FPGA Devboard V1</h1>
            <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              In Progress
            </span>
          </div>
          <p className="text-muted-foreground">
            An STM32H743 and iCE40 UP5K devboard with USB High-Speed, Ethernet, 4-bit microSD, stereo
            audio I/O, and a clock generator — aimed at audio DSP and FPGA experiments.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["STM32H743", "iCE40", "FPGA", "USB HS", "Ethernet", "Audio"].map((t) => (
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
            src="/images/projects/stm32h743/render-top.webp"
            alt="STM32H743 FPGA devboard 3D render"
            width={1200}
            height={900}
            className="w-full object-cover"
            priority
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            100 × 75 mm six-layer PCB — STM32H743, iCE40 UP5K, USB HS, Ethernet, audio
          </figcaption>
        </figure>

        <h2>Overview</h2>
        <p>
          This board puts an STM32H743XIH6 and an iCE40 UP5K on the same PCB. The H743 handles control,
          USB, Ethernet, storage, and audio, while the UP5K provides programmable logic for custom
          interfaces and filters. It replaces several separate dev boards for audio DSP and FPGA work.
        </p>
        <p>
          The PCB is 100 × 75 mm, 1.6 mm thick, and uses six copper layers with two M3 mounting holes.
          It has 173 footprints, 966 pads, 2257 track segments, 505 vias, and 6 copper zones.
        </p>

        <figure className="not-prose relative my-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/projects/stm32h743/pcb.webp"
            alt="STM32H743 PCB copper and silkscreen composite"
            width={1600}
            height={1200}
            className="w-full object-cover"
          />
          <figcaption className="border-t border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
            PCB copper and silkscreen composite
          </figcaption>
        </figure>

        <h2 id="blocks">Functional Blocks</h2>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Block</th>
                <th className="pb-2 pr-4 font-medium">Part</th>
                <th className="pb-2 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {BLOCKS.map((b) => (
                <tr key={b.block} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-medium">{b.block}</td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-primary">{b.part}</td>
                  <td className="py-2.5 text-muted-foreground">{b.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="power">Power Tree</h2>
        <p>
          USB 5 V VBUS feeds four TLV757 LDOs: 3.3 V, 2.5 V, 1.8 V, and 1.2 V. The FPGA core, PLL, and
          I/O rails are separated from the main rails with 1 kΩ at 100 MHz ferrites and local
          decoupling. Each LDO has its own input and output capacitors. The 3.3 V rail also supplies
          the MCU, Ethernet PHY, audio DAC, microphones, and microSD socket.
        </p>

        <h2 id="headers">Headers</h2>
        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Interface</th>
                <th className="pb-2 font-medium">Signals</th>
              </tr>
            </thead>
            <tbody>
              {HEADERS.map((h) => (
                <tr key={h.iface} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-medium">{h.iface}</td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{h.signals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="schematics">Schematics</h2>
        <p>
          The design uses 13 hierarchical KiCad sheets. The FPGA and MCU decoupling is placed on the
          same side as the pins, and the USB, Ethernet, and SD routes are kept short.
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
          Bare-metal C firmware lives in <code>firmware/</code> under the MIT license. It is a
          self-test and bring-up image, not a full USB, Ethernet, or audio application, and it has not
          been verified on hardware. The project uses PlatformIO:
        </p>
        <pre>
          <code>{`cd firmware
pio run
pio run -t upload   # SWD upload with ST-Link
pio debug           # GDB + semihosting console`}</code>
        </pre>
        <p>
          At boot the firmware configures the 400 MHz clock tree and switched LDO rail enables, then
          checks the Si5351C, loads the iCE40 bitstream over SPI1, initializes SDMMC, plays a short
          1 kHz stereo tone through the CS4344, and probes the LAN8742A over MDIO and the USB3300 over
          ULPI. A 1 Hz heartbeat runs on <code>MCU_ACT</code>.
        </p>

        <h2 id="fabrication">Fabrication</h2>
        <ul>
          <li>6-layer, 1.6 mm FR-4, standard finish</li>
          <li>
            Production files: <code>kicad/production/STM32H743.zip</code>
          </li>
          <li>BOM: <code>BOM.csv</code> — components about $67 per board</li>
          <li>STEP export: <code>cad/STM32H743.step</code></li>
        </ul>

        <h2 id="status">Status &amp; Known Issues</h2>
        <p>
          The board has not been fabricated, assembled, or brought up. These are the open items before
          it can be treated as finished:
        </p>
        <ol>
          {KNOWN_ISSUES.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ol>

        <h2>Credits</h2>
        <ul>
          <li>KiCad symbol, footprint, and 3D model libraries</li>
          <li>Hack Club Forge submission checklist and README structure</li>
        </ul>

        <h2>License</h2>
        <p>Hardware and firmware are open source; firmware is MIT licensed.</p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import { ProjectLanding } from "@/components/project-landing";

export const metadata: Metadata = {
  title: "BitcoinMiner V1",
  description:
    "Single BM1370 ASIC Bitcoin miner with ESP32-S3, 20 A core regulator, 9 addressable LEDs, and fan control.",
  alternates: { canonical: "/projects/bitcoinminer-v1/" },
  openGraph: {
    title: "BitcoinMiner V1 | pn2222a",
    description:
      "Single BM1370 ASIC Bitcoin miner with ESP32-S3, 20 A core regulator, 9 addressable LEDs, and fan control.",
    url: "/projects/bitcoinminer-v1/",
    type: "article",
    images: ["/images/projects/bitcoinminer/pcb-top-angle.webp"],
  },
};

export default function BitcoinMinerPage() {
  return (
    <ProjectLanding
      title="BitcoinMiner"
      version="V1"
      status="In Progress"
      summary="A single BM1370 ASIC Bitcoin miner with ESP32-S3 control, a 20 A core regulator, nine addressable status LEDs, and fan control."
      heroImage="/images/projects/bitcoinminer/pcb-top-angle.webp"
      heroAlt="BitcoinMiner BM1370 ASIC board 3D render"
      tags={["BM1370", "ESP32-S3", "Bitcoin", "ASIC", "Bitaxe"]}
      docsHref="/projects/bitcoinminer-v1/docs/"
      specs={[
        {
          icon: "microchip",
          label: "ASIC",
          value: "BM1370",
          detail: "Single Bitmain mining ASIC",
        },
        {
          icon: "cpu",
          label: "MCU",
          value: "ESP32-S3",
          detail: "WROOM-1 N16R8, WiFi + BLE",
        },
        {
          icon: "zap",
          label: "Core rail",
          value: "TPS546D24",
          detail: "20 A step-down at 1.2 V",
        },
        {
          icon: "fan",
          label: "Fan control",
          value: "EMC2101",
          detail: "I2C fan controller",
        },
        {
          icon: "circuit",
          label: "PCB",
          value: "4 layers",
          detail: "100 × 75 mm, dedicated ground",
        },
        {
          icon: "usb",
          label: "Programming",
          value: "USB-C + Tag-Connect",
          detail: "Native USB or TC2030 debug",
        },
      ]}
      overview={[
        "BitcoinMiner is a single-ASIC Bitcoin miner built around the BM1370. It follows the proven Bitaxe Gamma reference design for the ASIC support circuitry and replaces the power stage with a 20 A TPS546D24 buck rail for the 1.2 V core.",
        "An ESP32-S3-WROOM-1 N16R8 module provides WiFi and BLE control and can be programmed over the native USB-C port or a TC2030 Tag-Connect header. Nine WS2812B LEDs on the front give status feedback, and an EMC2101 fan controller talks to the ESP32 over I2C.",
        "The board is a 100 × 75 mm four-layer PCB with a dedicated ground inner layer. Firmware is based on ESP-Miner and is flashed with bitaxetool; see the docs for the exact build and flashing steps.",
      ]}
    />
  );
}

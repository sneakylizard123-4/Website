import type { Metadata } from "next";
import { ProjectLanding } from "@/components/project-landing";

const VERSIONS = [
  { label: "V1", href: "/projects/mesh_hand-v1/" },
  { label: "V2", href: "/projects/mesh_hand-v2/" },
];

export const metadata: Metadata = {
  title: "Mesh_Hand V2",
  description:
    "Second revision of the Mesh_Hand handheld Meshtastic node: ESP32-S3, E22-900M30S LoRa, NEO-M9N GPS, SSD1306 OLED, DS3231M RTC, and IP5306 LiPo power.",
  alternates: { canonical: "/projects/mesh_hand-v2/" },
  openGraph: {
    title: "Mesh_Hand V2 | pn2222a",
    description:
      "Second revision of the Mesh_Hand handheld Meshtastic node: ESP32-S3, E22-900M30S LoRa, NEO-M9N GPS, SSD1306 OLED, DS3231M RTC, and IP5306 LiPo power.",
    url: "/projects/mesh_hand-v2/",
    type: "article",
    images: ["/images/projects/mesh-hand/v2/render-top.webp"],
  },
};

export default function MeshHandV2Page() {
  return (
    <ProjectLanding
      title="Mesh_Hand"
      version="V2"
      status="In Progress"
      summary="Second revision of the handheld Meshtastic node — ESP32-S3, 900 MHz LoRa, GPS, OLED, RTC, and LiPo power on a compact board. Built and mesh-tested in October 2026."
      heroImage="/images/projects/mesh-hand/v2/render-top.webp"
      heroAlt="Mesh_Hand V2 handheld Meshtastic board 3D render"
      tags={["ESP32-S3", "Meshtastic", "LoRa", "GPS", "OLED"]}
      docsHref="/projects/mesh_hand-v2/docs/"
      versions={VERSIONS}
      currentVersion="V2"
      specs={[
        {
          icon: "cpu",
          label: "MCU",
          value: "ESP32-S3-WROOM-1",
          detail: "Dual-core 240 MHz, Wi-Fi + BLE",
        },
        {
          icon: "radio",
          label: "Radio",
          value: "E22-900M30S",
          detail: "LoRa 900 MHz, +22 dBm",
        },
        {
          icon: "satellite",
          label: "GPS",
          value: "NEO-M9N",
          detail: "u-blox multi-band GNSS",
        },
        {
          icon: "speaker",
          label: "Display",
          value: "SSD1306 OLED",
          detail: "4-pin I²C header",
        },
        {
          icon: "zap",
          label: "Power",
          value: "IP5306 + TLV75733",
          detail: "USB-C input, JST-PH LiPo",
        },
        {
          icon: "gauge",
          label: "RTC",
          value: "DS3231M",
          detail: "Battery-backed real-time clock",
        },
      ]}
      overview={[
        "Mesh_Hand V2 is the second revision of the handheld Meshtastic node. It combines an ESP32-S3-WROOM-1, E22-900M30S 900 MHz LoRa transceiver, NEO-M9N GPS, IP5306 power stage, SSD1306 OLED header, and DS3231M real-time clock on one board with USB-C and JST-PH LiPo input.",
        "Compared with V1, the V2 BOM drops the environmental sensor suite, rotary encoder, buzzer, and vibration motor, and reworks the power stage around two TLV75733 LDOs with USBLC6 ESD protection. The result is a simpler radio-and-GPS-focused node.",
        "V2 was fabricated and assembled in October 2026. It joined a Meshtastic mesh with six nodes online, delivered a test message on the LongFast channel, and received replies. Build photos, schematics, and the assembly proof are linked from the docs.",
      ]}
    />
  );
}

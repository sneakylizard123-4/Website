import type { Metadata } from "next";
import { ProjectLanding } from "@/components/project-landing";

export const metadata: Metadata = {
  title: "Dreamscape F405 V1",
  description:
    "20×20 mm STM32F405 flight controller for 3-inch FPV drones with ICM-42688-P IMU, AT7456E OSD, and full-size microSD blackbox.",
  alternates: { canonical: "/projects/dreamscape-f405-v1/" },
  openGraph: {
    title: "Dreamscape F405 V1 | pn2222a",
    description:
      "20×20 mm STM32F405 flight controller for 3-inch FPV drones with ICM-42688-P IMU, AT7456E OSD, and full-size microSD blackbox.",
    url: "/projects/dreamscape-f405-v1/",
    type: "article",
    images: ["/images/projects/dreamscape-f405/render-top.webp"],
  },
};

export default function DreamscapeF405Page() {
  return (
    <ProjectLanding
      title="Dreamscape F405"
      version="V1"
      status="In Progress"
      summary="20×20 mm STM32F405 flight controller for 3-inch FPV drones — ICM-42688-P IMU, AT7456E OSD, full-size microSD blackbox, and 6S power input."
      heroImage="/images/projects/dreamscape-f405/render-top.webp"
      heroAlt="Dreamscape F405 20x20 flight controller 3D render"
      tags={["STM32F405", "Betaflight", "ICM-42688-P", "20x20", "KiCad"]}
      docsHref="/projects/dreamscape-f405-v1/docs/"
      specs={[
        {
          icon: "cpu",
          label: "MCU",
          value: "STM32F405VGT6",
          detail: "ARM Cortex-M4, 168 MHz, LQFP-100",
        },
        {
          icon: "gauge",
          label: "IMU",
          value: "ICM-42688-P",
          detail: "6-axis gyro + accel on SPI",
        },
        {
          icon: "speaker",
          label: "OSD",
          value: "AT7456E",
          detail: "MAX7456-compatible analog OSD",
        },
        {
          icon: "storage",
          label: "Blackbox",
          value: "microSD",
          detail: "Full-size push-pull slot",
        },
        {
          icon: "radio",
          label: "Receiver",
          value: "ExpressLRS",
          detail: "Dedicated JST-SH 4-pin connector",
        },
        {
          icon: "zap",
          label: "Power",
          value: "6S input",
          detail: "5 V / 10 V bucks, 3.3 V LDO, USB mux",
        },
      ]}
      overview={[
        "Dreamscape F405 is a compact 20×20 mm flight controller for 3-inch FPV drones. It is built around the STM32F405VGT6 and runs Betaflight, with a dedicated ExpressLRS receiver connector, an AT7456E analog OSD, and a full-size microSD slot for blackbox logging.",
        "The power tree takes up to 6S battery input and generates a 10 V rail for camera and VTX, a 5 V rail for peripherals, and a 3.3 V rail for the MCU and sensors. A TPS2116 power mux switches between USB and the onboard buck so the board can be configured over USB without a battery.",
        "Solder pads along the edge expose battery, 3.3 V, 5 V, switchable 10 V, ESC current sense, telemetry, camera control, video in/out, motor outputs, LED strip, beeper, I2C, and four UARTs. The board has not been manufactured yet.",
      ]}
    />
  );
}

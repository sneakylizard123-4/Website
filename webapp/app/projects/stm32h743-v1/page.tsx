import type { Metadata } from "next";
import { ProjectLanding } from "@/components/project-landing";

export const metadata: Metadata = {
  title: "STM32H743 FPGA Devboard V1",
  description:
    "STM32H743 and iCE40 UP5K devboard with USB High-Speed PHY, Ethernet, 4-bit microSD, and stereo audio I/O.",
  alternates: { canonical: "/projects/stm32h743-v1/" },
  openGraph: {
    title: "STM32H743 FPGA Devboard V1 | pn2222a",
    description:
      "STM32H743 and iCE40 UP5K devboard with USB High-Speed PHY, Ethernet, 4-bit microSD, and stereo audio I/O.",
    url: "/projects/stm32h743-v1/",
    type: "article",
    images: ["/images/projects/stm32h743/render-top.webp"],
  },
};

export default function STM32H743Page() {
  return (
    <ProjectLanding
      title="STM32H743 FPGA Devboard"
      version="V1"
      status="In Progress"
      summary="An STM32H743 and iCE40 UP5K devboard with USB High-Speed, Ethernet, 4-bit microSD, stereo audio I/O, and a clock generator."
      heroImage="/images/projects/stm32h743/render-top.webp"
      heroAlt="STM32H743 and iCE40 UP5K devboard 3D render"
      tags={["STM32H743", "iCE40", "FPGA", "USB HS", "Ethernet", "Audio"]}
      docsHref="/projects/stm32h743-v1/docs/"
      specs={[
        {
          icon: "cpu",
          label: "MCU",
          value: "STM32H743XIH6",
          detail: "Cortex-M7, 2 MB flash, 400 MHz",
        },
        {
          icon: "circuit",
          label: "FPGA",
          value: "iCE40 UP5K",
          detail: "5K LUTs, open toolchain",
        },
        {
          icon: "usb",
          label: "USB",
          value: "USB3300 ULPI",
          detail: "USB 2.0 High-Speed PHY",
        },
        {
          icon: "network",
          label: "Ethernet",
          value: "LAN8742A",
          detail: "10/100 RMII PHY + RJ45",
        },
        {
          icon: "audio",
          label: "Audio",
          value: "CS4344 I2S",
          detail: "Stereo DAC + dual PDM mics",
        },
        {
          icon: "storage",
          label: "Storage",
          value: "microSD",
          detail: "4-bit SDMMC bus",
        },
      ]}
      overview={[
        "This board puts an STM32H743XIH6 and an iCE40 UP5K on the same PCB. The H743 handles control, USB, Ethernet, storage, and audio, while the UP5K provides programmable logic for custom interfaces and filters.",
        "Peripherals include a USB3300 ULPI PHY for USB 2.0 High-Speed, a LAN8742A 10/100 Ethernet PHY with an RJ45 jack, a Si5351C clock generator with a 25 MHz TCXO, a CS4344 stereo I2S DAC, two PDM microphones, and a microSD socket on a 4-bit SDMMC bus.",
        "The board has not been fabricated or brought up yet. Bare-metal firmware is included and builds cleanly, but it has not run on hardware. The design is a six-layer, 100 × 75 mm PCB with two M3 mounting holes.",
      ]}
    />
  );
}

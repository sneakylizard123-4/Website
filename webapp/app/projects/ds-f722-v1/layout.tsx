import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dreamscape F722 V1",
  description:
    "Open-hardware STM32F722 flight controller for FPV drones with ICM-42688-P IMU, BMP280 barometer, 5 UARTs, and 8 PWM outputs.",
  alternates: { canonical: "/projects/ds-f722-v1/" },
  openGraph: {
    title: "Dreamscape F722 V1 | pn2222a",
    description:
      "Open-hardware STM32F722 flight controller for FPV drones with ICM-42688-P IMU, BMP280 barometer, 5 UARTs, and 8 PWM outputs.",
    url: "/projects/ds-f722-v1/",
    type: "article",
    images: ["/images/projects/dreamscape-f722/pcb.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

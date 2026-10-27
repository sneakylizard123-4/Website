import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overkill nRF V1",
  description:
    "ESP32-S3 modular RF board with three nRF24L01+ radios, microSD storage, and addressable LEDs.",
  alternates: { canonical: "/projects/ok-nrf-v1/" },
  openGraph: {
    title: "Overkill nRF V1 | pn2222a",
    description:
      "ESP32-S3 modular RF board with three nRF24L01+ radios, microSD storage, and addressable LEDs.",
    url: "/projects/ok-nrf-v1/",
    type: "article",
    images: ["/images/projects/overkill-nrf/pcb.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

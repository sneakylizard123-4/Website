import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesh_Hand V1",
  description:
    "Handheld ESP32-S3 Meshtastic node with LoRa, GPS, and environmental sensors.",
  alternates: { canonical: "/projects/mesh_hand-v1/" },
  openGraph: {
    title: "Mesh_Hand V1 | pn2222a",
    description:
      "Handheld ESP32-S3 Meshtastic node with LoRa, GPS, and environmental sensors.",
    url: "/projects/mesh_hand-v1/",
    type: "article",
    images: ["/images/projects/mesh-hand/pcb.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

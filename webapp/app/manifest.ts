import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "pn2222a",
    short_name: "pn2222a",
    description:
      "Embedded systems, PCB design, firmware, and cybersecurity projects by pn2222a.",
    start_url: "/Website/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/Website/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Website/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

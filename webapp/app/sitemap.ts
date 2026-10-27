import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://sneakylizard123-4.github.io/Website";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/blog",
    "/links",
    "/now",
    "/sponsors",
    "/projects",
    "/projects/featured",
    "/projects/in-progress",
    "/projects/archive",
    "/projects/ds-f722-v1",
    "/projects/ds-f722-v1/docs",
    "/projects/mesh_hand-v1",
    "/projects/mesh_hand-v1/docs",
    "/projects/ok-nrf-v1",
    "/projects/ok-nrf-v1/docs",
    "/projects/dreamscape-f405-v1",
    "/projects/dreamscape-f405-v1/docs",
    "/projects/bitcoinminer-v1",
    "/projects/bitcoinminer-v1/docs",
    "/projects/stm32h743-v1",
    "/projects/stm32h743-v1/docs",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.8 : 0.6,
  }));
}

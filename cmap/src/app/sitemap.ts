import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://neducmap-1207.netlify.app/", lastModified: new Date("2026-10-14") },
    { url: "https://neducmap-1207.netlify.app/login", lastModified: new Date("2026-10-14") },
  ];
}

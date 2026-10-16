import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/login"], disallow: ["/api/", "/dashboard", "/offline"] },
    ],
    sitemap: "https://neducmap-1207.netlify.app/sitemap.xml",
  };
}
